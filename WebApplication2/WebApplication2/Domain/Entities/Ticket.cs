namespace WebApplication2.Domain.Entities;

public class Ticket
{
    /// <summary>
    /// Identificador único do ticket no banco de dados.
    /// </summary>
    public int Id { get; set; }

    public string? Brand { get; set; }
    public string Model { get; set; } = string.Empty;
    public string ViolationLocation { get; set; } = string.Empty;
    public string Reference { get; set; } = string.Empty;
    /// <summary>
    /// Data/hora da infração como tipo nativo DateTime para persistência em banco.
    /// </summary>
    public DateTime? DateTime { get; set; }
    public string State { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public ViolationType Type { get; set; }
}



