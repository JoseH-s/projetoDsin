# Arquitetura Hexagonal - Violation Analysis API

## 📐 Visão Geral

Este projeto implementa uma API para análise de infrações de trânsito usando **Arquitetura Hexagonal** (também conhecida como Ports and Adapters Pattern).

## 🎯 Princípios da Arquitetura Hexagonal

A arquitetura hexagonal separa o código em camadas com responsabilidades distintas:

1. **Domain** (Núcleo/Core): Contém a lógica de negócio pura
2. **Application**: Orquestra casos de uso e define contratos
3. **Infrastructure**: Implementa detalhes técnicos (BD, APIs externas)
4. **API**: Expõe funcionalidades via HTTP

```
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                            │
│  ┌───────────────────────────────────────────────────┐      │
│  │    ViolationAnalysisController.cs                 │      │
│  │    - POST /api/ViolationAnalysis/analyze         │      │
│  │    - POST /api/ViolationAnalysis/analyze-stream  │      │
│  └───────────────────────────────────────────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │ (usa)
┌───────────────────────────▼─────────────────────────────────┐
│                   Application Layer                         │
│  ┌─────────────────────────────────────────────┐            │
│  │  DTOs (Data Transfer Objects)               │            │
│  │  - ViolationAnalysisRequest.cs              │            │
│  │  - ViolationAnalysisResponse.cs             │            │
│  └─────────────────────────────────────────────┘            │
└───────────────────────────┬─────────────────────────────────┘
                            │ (mapeia)
┌───────────────────────────▼─────────────────────────────────┐
│                     Domain Layer                            │
│  ┌─────────────────────────────────────────────┐            │
│  │  Entities (Entidades de Domínio)            │            │
│  │  - ViolationAnalysis.cs                     │            │
│  │  - ViolationType (enum)                     │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │  Interfaces (Ports)                         │            │
│  │  - IViolationAnalysisService.cs             │            │
│  │    • AnalyzeViolationAsync()                │            │
│  │    • AnalyzeViolationStreamAsync()          │            │
│  └─────────────────────────────────────────────┘            │
└───────────────────────────┬─────────────────────────────────┘
                            │ (implementado por)
┌───────────────────────────▼─────────────────────────────────┐
│                  Infrastructure Layer                       │
│  ┌─────────────────────────────────────────────┐            │
│  │  Configuration                              │            │
│  │  - GeminiSettings.cs                        │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │  Services (Adapters)                        │            │
│  │  - GeminiAiService.cs                       │            │
│  │    • Implements IViolationAnalysisService   │            │
│  │    • Integrates with Google Gemini AI API   │            │
│  └─────────────────────────────────────────────┘            │
└───────────────────────────┬─────────────────────────────────┘
                            │ (chama)
                            ▼
                   ┌─────────────────┐
                   │  Google Gemini  │
                   │      AI API     │
                   └─────────────────┘
```

## 🔄 Fluxo de Requisição

```
1. Cliente HTTP
   │
   │ POST /api/ViolationAnalysis/analyze
   │ multipart/form-data
   │ { Image: [arquivo.jpg], AdditionalContext: "..." }
   │
   ▼
2. ViolationAnalysisController
   │
   │ • Valida ModelState
   │ • Valida tipo de arquivo (JPEG, PNG, WebP)
   │ • Valida tamanho (max 10 MB)
   │ • Lê bytes da imagem
   │
   ▼
3. IViolationAnalysisService (Interface)
   │
   │ AnalyzeViolationAsync(imageBytes, mimeType, context)
   │
   ▼
4. GeminiAiService (Implementação)
   │
   │ • Converte imagem para Base64
   │ • Constrói request body multimodal com:
   │   - Imagem inline (inlineData)
   │   - Prompt de análise
   │   - Schema de resposta JSON
   │ • Faz chamada HTTP para Gemini API
   │ • Parseia resposta JSON
   │
   ▼
5. Google Gemini AI (Multimodal)
   │
   │ • Analisa imagem visualmente
   │ • Identifica veículo, local, infração
   │ • Extrai informações da cena
   │ • Retorna JSON estruturado
   │
   ▼
6. ViolationAnalysis (Entity)
   │
   │ Entidade de domínio populada
   │
   ▼
7. ViolationAnalysisResponse (DTO)
   │
   │ Mapeamento para formato de resposta
   │
   ▼
8. Cliente HTTP
   {
     "brand": "Fiat",
     "model": "Uno",
     "color": "vermelho",
     "description": "Veículo passou sinal vermelho",
     ...
   }
```

## 🧩 Componentes Detalhados

### Domain Layer (Núcleo)

**Responsabilidade**: Conter a lógica de negócio pura, sem dependências externas.

#### Entities
- `ViolationAnalysis.cs`: Representa uma análise de infração
- `ViolationType`: Enum com tipos de gravidade (Grave, Media, Baixa, Gravissima)

#### Interfaces (Ports)
- `IViolationAnalysisService.cs`: Contrato para serviço de análise
  - Define O QUE fazer, não COMO fazer

### Application Layer

**Responsabilidade**: Definir contratos de entrada/saída e orquestrar casos de uso.

#### DTOs
- `ViolationAnalysisRequest`: Request com imagem (IFormFile) e contexto opcional
- `ViolationAnalysisResponse`: Response formatada com dados extraídos da imagem

### Infrastructure Layer (Adaptadores)

**Responsabilidade**: Implementar detalhes técnicos e integrações externas.

#### Configuration
- `GeminiSettings.cs`: Configurações do Gemini AI

#### Services
- `GeminiAiService.cs`: Implementa `IViolationAnalysisService`
  - HttpClient para chamadas à API
  - Conversão de imagem para Base64
  - Construção de requests multimodais (imagem + texto)
  - Serialização/Deserialização JSON
  - Tratamento de streaming (SSE)

### API Layer (Adaptadores de Entrada)

**Responsabilidade**: Expor funcionalidades via HTTP.

#### Controllers
- `ViolationAnalysisController.cs`:
  - Endpoint `/analyze`: Upload de imagem com resposta completa
  - Endpoint `/analyze-stream`: Upload de imagem com Server-Sent Events (SSE)
  - Validação de formato e tamanho de arquivo
  - Suporte para multipart/form-data

## 🎨 Vantagens da Arquitetura

### 1. **Testabilidade**
```csharp
// Fácil criar mocks
public class ViolationAnalysisControllerTests
{
    [Fact]
    public async Task Analyze_ReturnsOk_WithValidInput()
    {
        // Arrange
        var mockService = new Mock<IViolationAnalysisService>();
        mockService.Setup(s => s.AnalyzeViolationAsync(It.IsAny<string>(), default))
            .ReturnsAsync(new ViolationAnalysis { ... });
        
        var controller = new ViolationAnalysisController(mockService.Object, logger);
        
        // Act & Assert
        ...
    }
}
```

### 2. **Substituibilidade**
Trocar implementação sem afetar o resto do sistema:

```csharp
// Hoje: Gemini AI
builder.Services.AddScoped<IViolationAnalysisService, GeminiAiService>();

// Amanhã: OpenAI GPT
builder.Services.AddScoped<IViolationAnalysisService, OpenAiGptService>();

// Ou: Azure OpenAI
builder.Services.AddScoped<IViolationAnalysisService, AzureOpenAiService>();
```

### 3. **Independência de Framework**
O domínio não sabe nada sobre ASP.NET, Entity Framework, ou qualquer biblioteca externa.

### 4. **Separação de Responsabilidades**
Cada camada tem uma responsabilidade clara e única.

## 🔌 Dependency Injection

```csharp
// Program.cs

// 1. Configuração
builder.Services.Configure<GeminiSettings>(
    builder.Configuration.GetSection(GeminiSettings.SectionName));

// 2. HttpClient tipado
builder.Services.AddHttpClient<IViolationAnalysisService, GeminiAiService>();

// 3. Serviço scoped (uma instância por requisição)
builder.Services.AddScoped<IViolationAnalysisService, GeminiAiService>();
```

## 📊 Convenções de Nomenclatura

- **Entities**: Substantivos no singular (ex: `ViolationAnalysis`)
- **Interfaces**: Prefixo `I` + Substantivo + `Service` (ex: `IViolationAnalysisService`)
- **DTOs**: Substantivo + `Request`/`Response` (ex: `ViolationAnalysisRequest`)
- **Services**: Substantivo + `Service` (ex: `GeminiAiService`)
- **Controllers**: Substantivo + `Controller` (ex: `ViolationAnalysisController`)

## 🔒 Segregação de Responsabilidades

| Camada | Pode Referenciar | NÃO Pode Referenciar |
|--------|------------------|----------------------|
| Domain | Nada (puro) | Application, Infrastructure, API |
| Application | Domain | Infrastructure, API |
| Infrastructure | Domain, Application | API |
| API | Domain, Application, Infrastructure | - |

## 🚀 Extensibilidade

### Adicionar Nova Fonte de IA

1. Criar nova implementação em `Infrastructure/Services`:
```csharp
public class OpenAiService : IViolationAnalysisService
{
    public async Task<ViolationAnalysis> AnalyzeViolationAsync(...)
    {
        // Implementação com OpenAI
    }
}
```

2. Registrar no `Program.cs`:
```csharp
builder.Services.AddScoped<IViolationAnalysisService, OpenAiService>();
```

### Adicionar Novo Endpoint

1. Adicionar método no controller:
```csharp
[HttpPost("batch-analyze")]
public async Task<ActionResult<List<ViolationAnalysisResponse>>> 
    AnalyzeBatch([FromBody] List<ViolationAnalysisRequest> requests)
{
    // Implementação
}
```

## 📚 Referências

- [Alistair Cockburn - Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)

