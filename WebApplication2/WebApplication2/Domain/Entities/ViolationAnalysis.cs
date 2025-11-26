namespace WebApplication2.Domain.Entities;

public class ViolationAnalysis
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
    public ViolationType Type { get; set; }
}

public enum ViolationType
{
    Grave,
    Media,
    Baixa,
    Gravissima
}

