using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Options;
using WebApplication2.Domain.Entities;
using WebApplication2.Domain.Interfaces;
using WebApplication2.Infrastructure.Configuration;

namespace WebApplication2.Infrastructure.Services;

public class GeminiAiService : IViolationAnalysisService
{
    private readonly HttpClient _httpClient;
    private readonly GeminiSettings _settings;
    private readonly ILogger<GeminiAiService> _logger;

    public GeminiAiService(
        HttpClient httpClient,
        IOptions<GeminiSettings> settings,
        ILogger<GeminiAiService> logger)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<ViolationAnalysis> AnalyzeViolationAsync(
        byte[] imageBytes,
        string mimeType,
        string? additionalContext = null,
        CancellationToken cancellationToken = default)
    {
        var requestBody = BuildRequestBody(imageBytes, mimeType, additionalContext, streaming: false);
        var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/{_settings.Model}:generateContent?key={_settings.ApiKey}";

        _logger.LogInformation("Enviando requisição ao Gemini (modelo: {Model})", _settings.Model);

        var payload = JsonSerializer.Serialize(requestBody, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        });

        var content = new StringContent(payload, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(apiUrl, content, cancellationToken);

        var responseContent = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Erro na API do Gemini: {StatusCode} - {Error}", response.StatusCode, responseContent);
            throw new HttpRequestException($"Erro na API do Gemini: {response.StatusCode} - {responseContent}");
        }

        _logger.LogInformation("Gemini API Response (Status: {Status}): {Response}",
            response.StatusCode,
            responseContent.Length > 500 ? responseContent.Substring(0, 500) + "..." : responseContent);

        var geminiResponse = JsonSerializer.Deserialize<GeminiResponse>(responseContent);

        if (geminiResponse?.Candidates == null || geminiResponse.Candidates.Count == 0)
        {
            _logger.LogError("Resposta da API do Gemini está vazia ou sem candidatos");
            throw new InvalidOperationException("No response from Gemini AI");
        }

        var textResponse = geminiResponse.Candidates[0].Content.Parts[0].Text;
        _logger.LogInformation("Texto extraído da resposta do Gemini: {Text}", textResponse);

        return ParseViolationAnalysis(textResponse);
    }

    public async IAsyncEnumerable<string> AnalyzeViolationStreamAsync(
        byte[] imageBytes,
        string mimeType,
        string? additionalContext = null,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var requestBody = BuildRequestBody(imageBytes, mimeType, additionalContext, streaming: true);
        var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/{_settings.Model}:streamGenerateContent?key={_settings.ApiKey}&alt=sse";

        var content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json");

        using var request = new HttpRequestMessage(HttpMethod.Post, apiUrl)
        {
            Content = content
        };

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/event-stream"));

        using var response = await _httpClient.SendAsync(
            request,
            HttpCompletionOption.ResponseHeadersRead,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
        using var reader = new StreamReader(stream);

        while (!reader.EndOfStream && !cancellationToken.IsCancellationRequested)
        {
            var line = await reader.ReadLineAsync(cancellationToken);

            if (string.IsNullOrWhiteSpace(line) || !line.StartsWith("data: "))
                continue;

            var jsonData = line.Substring(6); // Remove "data: " prefix

            if (jsonData == "[DONE]")
                break;

            GeminiResponse? chunk;
            try
            {
                chunk = JsonSerializer.Deserialize<GeminiResponse>(jsonData);
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, "Failed to parse chunk: {JsonData}", jsonData);
                continue;
            }

            if (chunk?.Candidates != null && chunk.Candidates.Count > 0)
            {
                var text = chunk.Candidates[0].Content?.Parts?[0]?.Text;
                if (!string.IsNullOrEmpty(text))
                {
                    yield return text;
                }
            }
        }
    }

    private object BuildRequestBody(byte[] imageBytes, string mimeType, string? additionalContext, bool streaming)
    {
        var base64Image = Convert.ToBase64String(imageBytes);

        var parts = new List<object>
        {
            new
            {
                inlineData = new
                {
                    mimeType = mimeType,
                    data = base64Image
                }
            },
            new
            {
                text = BuildPromptText(additionalContext)
            }
        };

        return new
        {
            contents = new[]
            {
                new
                {
                    role = "user",
                    parts = parts.ToArray()
                }
            },
            generationConfig = new
            {
                temperature = _settings.Temperature
            }
        };
    }

    private string BuildPromptText(string? additionalContext)
    {
        var basePrompt = @"Você é um especialista em análise de infrações de trânsito.

Analise esta imagem de infração de trânsito e extraia as seguintes informações em formato JSON.

IMPORTANTE: Retorne APENAS um objeto JSON válido, sem texto adicional antes ou depois.

Formato esperado:
{
  ""brand"": ""marca do veículo ou null se não visível"",
  ""model"": ""modelo do veículo ou 'Não identificado' se não visível"",
  ""violation_location"": ""local da infração (rua, avenida, etc)"",
  ""reference"": ""ponto de referência próximo"",
  ""datetime"": ""data e hora se visível ou 'Não especificado'"",
  ""state"": ""UF (sigla do estado brasileiro)"",
  ""city"": ""nome da cidade"",
  ""description"": ""descrição detalhada da infração observada"",
  ""color"": ""cor do veículo"",
  ""type"": ""gravidade: grave, media, baixa ou gravissima""
}

Analise a imagem cuidadosamente e preencha todos os campos.
Se alguma informação não estiver visível, use 'Não identificado' ou 'Não especificado'.";

        if (!string.IsNullOrWhiteSpace(additionalContext))
        {
            basePrompt += $"\n\nContexto adicional fornecido: {additionalContext}";
        }

        basePrompt += "\n\nRetorne APENAS o JSON, sem explicações ou texto adicional.";

        return basePrompt;
    }

    private ViolationAnalysis ParseViolationAnalysis(string jsonText)
    {
        // Limpar possíveis markdown code blocks
        jsonText = jsonText.Trim();

        if (jsonText.StartsWith("```json"))
        {
            jsonText = jsonText.Substring(7);
        }
        else if (jsonText.StartsWith("```"))
        {
            jsonText = jsonText.Substring(3);
        }

        if (jsonText.EndsWith("```"))
        {
            jsonText = jsonText.Substring(0, jsonText.Length - 3);
        }

        jsonText = jsonText.Trim();

        _logger.LogInformation("JSON limpo para parsing: {Json}", jsonText);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };

        ViolationAnalysisJson? parsed;
        try
        {
            parsed = JsonSerializer.Deserialize<ViolationAnalysisJson>(jsonText, options);
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Erro ao fazer parse do JSON: {Json}", jsonText);
            throw new InvalidOperationException($"Falha ao fazer parse da resposta do Gemini: {ex.Message}", ex);
        }

        if (parsed == null)
        {
            throw new InvalidOperationException("Failed to parse violation analysis response");
        }

        return new ViolationAnalysis
        {
            Brand = CleanOptional(parsed.Brand),
            Model = CleanOptional(parsed.Model),
            ViolationLocation = CleanOptional(parsed.ViolationLocation),
            Reference = CleanOptional(parsed.Reference),
            DateTime = CleanOptional(parsed.DateTime),
            State = CleanOptional(parsed.State),
            City = CleanOptional(parsed.City),
            Description = CleanOptional(parsed.Description),
            Color = CleanOptional(parsed.Color),
            Type = ParseViolationType(parsed.Type)
        };
    }

    /// <summary>
    /// Normaliza campos opcionais, convertendo valores como
    /// "Não especificado" / "Nao especificado" / "Não identificado"
    /// para string vazia.
    /// </summary>
    private string CleanOptional(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return string.Empty;

        var trimmed = value.Trim();
        var lower = trimmed.ToLowerInvariant();

        if (lower == "não especificado" ||
            lower == "nao especificado" ||
            lower == "não identificado" ||
            lower == "nao identificado")
        {
            return string.Empty;
        }

        return trimmed;
    }

    private ViolationType ParseViolationType(string? type)
    {
        return type?.ToLowerInvariant() switch
        {
            "grave" => ViolationType.Grave,
            "media" => ViolationType.Media,
            "baixa" => ViolationType.Baixa,
            "gravissima" => ViolationType.Gravissima,
            _ => ViolationType.Media
        };
    }

    // Internal classes for JSON deserialization
    private class GeminiResponse
    {
        [JsonPropertyName("candidates")]
        public List<Candidate> Candidates { get; set; } = new();
    }

    private class Candidate
    {
        [JsonPropertyName("content")]
        public Content Content { get; set; } = new();
    }

    private class Content
    {
        [JsonPropertyName("parts")]
        public List<Part> Parts { get; set; } = new();
    }

    private class Part
    {
        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
    }

    private class ViolationAnalysisJson
    {
        [JsonPropertyName("brand")]
        public string? Brand { get; set; }

        [JsonPropertyName("model")]
        public string? Model { get; set; }

        [JsonPropertyName("violation_location")]
        public string? ViolationLocation { get; set; }

        [JsonPropertyName("reference")]
        public string? Reference { get; set; }

        [JsonPropertyName("datetime")]
        public string? DateTime { get; set; }

        [JsonPropertyName("state")]
        public string? State { get; set; }

        [JsonPropertyName("city")]
        public string? City { get; set; }

        [JsonPropertyName("description")]
        public string? Description { get; set; }

        [JsonPropertyName("color")]
        public string? Color { get; set; }

        [JsonPropertyName("type")]
        public string? Type { get; set; }
    }
}

