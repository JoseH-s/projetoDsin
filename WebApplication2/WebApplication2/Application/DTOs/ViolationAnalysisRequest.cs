using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApplication2.Application.DTOs;

public class ViolationAnalysisRequest
{
    [Required(ErrorMessage = "Image is required")]
    public IFormFile Image { get; set; } = null!;

    public string? AdditionalContext { get; set; }
}

