using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Application.DTOs;

/// <summary>
/// DTO recebido do front-end para criação de Ticket.
/// O campo DateTime chega como string e será convertido para DateTime no backend.
/// </summary>
public class TicketRequest
{
    public string? Brand { get; set; }

    [Required]
    public string Model { get; set; } = string.Empty;

    public string? ViolationLocation { get; set; }

    public string? Reference { get; set; }

    /// <summary>
    /// Data/hora em formato string (ex: \"2025-11-25T10:30:00\" ou \"25/11/2025 10:30\").
    /// Será convertida para DateTime ao salvar.
    /// </summary>
    public string? DateTime { get; set; }

    public string? State { get; set; }

    public string? City { get; set; }

    public string? Description { get; set; }

    public string? Color { get; set; }

    [Required]
    public string Type { get; set; } = string.Empty;
}


