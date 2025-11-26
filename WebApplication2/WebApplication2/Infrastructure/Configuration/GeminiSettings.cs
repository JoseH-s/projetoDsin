namespace WebApplication2.Infrastructure.Configuration;

public class GeminiSettings
{
    public const string SectionName = "GeminiAI";

    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = "gemini-3-pro-preview";
    public double Temperature { get; set; } = 0;
    public string ThinkingLevel { get; set; } = "HIGH";
}

