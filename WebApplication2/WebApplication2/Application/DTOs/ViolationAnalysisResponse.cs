namespace WebApplication2.Application.DTOs;

public class ViolationAnalysisResponse
{
    public string? Brand { get; set; }
    public string Model { get; set; } = string.Empty;
    public string ViolationLocation { get; set; } = string.Empty;
    public string Reference { get; set; } = string.Empty;
    public string DateTime { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}
