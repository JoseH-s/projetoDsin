using Microsoft.AspNetCore.Mvc;
using WebApplication2.Application.DTOs;
using WebApplication2.Domain.Interfaces;

namespace WebApplication2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ViolationAnalysisController : ControllerBase
{
    private readonly IViolationAnalysisService _violationAnalysisService;
    private readonly ILogger<ViolationAnalysisController> _logger;

    public ViolationAnalysisController(
        IViolationAnalysisService violationAnalysisService,
        ILogger<ViolationAnalysisController> logger)
    {
        _violationAnalysisService = violationAnalysisService;
        _logger = logger;
    }

    /// <summary>
    /// Analyzes violation information from an image using Gemini AI
    /// </summary>
    /// <param name="request">The violation analysis request containing the image</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Structured violation analysis result</returns>
    [HttpPost("analyze")]
    [Consumes("multipart/form-data")]
    [RequestFormLimits(MultipartBodyLengthLimit = 10485760)] // 10 MB
    [RequestSizeLimit(10485760)] // 10 MB
    [ProducesResponseType(typeof(ViolationAnalysisResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ViolationAnalysisResponse>> AnalyzeViolation(
        [FromForm] ViolationAnalysisRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Validate image
        if (request.Image == null || request.Image.Length == 0)
        {
            return BadRequest(new { error = "Image is required" });
        }

        // Validate file type
        var allowedMimeTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/webp" };
        if (!allowedMimeTypes.Contains(request.Image.ContentType.ToLowerInvariant()))
        {
            return BadRequest(new { error = "Invalid image format. Allowed formats: JPEG, PNG, WebP" });
        }

        // Validate file size (max 10 MB)
        if (request.Image.Length > 10485760)
        {
            return BadRequest(new { error = "Image size must be less than 10 MB" });
        }

        try
        {
            _logger.LogInformation(
                "Analyzing violation from image. FileName: {FileName}, Size: {Size} bytes, ContentType: {ContentType}",
                request.Image.FileName,
                request.Image.Length,
                request.Image.ContentType);

            // Read image bytes
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await request.Image.CopyToAsync(memoryStream, cancellationToken);
                imageBytes = memoryStream.ToArray();
            }

            var result = await _violationAnalysisService.AnalyzeViolationAsync(
                imageBytes,
                request.Image.ContentType,
                request.AdditionalContext,
                cancellationToken);

            var response = new ViolationAnalysisResponse
            {
                Brand = result.Brand,
                Model = result.Model,
                ViolationLocation = result.ViolationLocation,
                Reference = result.Reference,
                DateTime = result.DateTime,
                State = result.State,
                City = result.City,
                Description = result.Description,
                Color = result.Color,
                Type = result.Type.ToString().ToLowerInvariant()
            };

            return Ok(response);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error communicating with Gemini AI API");
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                new { error = "Service temporarily unavailable. Please try again later." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error analyzing violation");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { error = "An error occurred while processing your request." });
        }
    }

}

