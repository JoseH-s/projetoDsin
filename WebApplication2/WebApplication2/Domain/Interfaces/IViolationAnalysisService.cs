using WebApplication2.Domain.Entities;

namespace WebApplication2.Domain.Interfaces;

public interface IViolationAnalysisService
{
    Task<ViolationAnalysis> AnalyzeViolationAsync(
        byte[] imageBytes,
        string mimeType,
        string? additionalContext = null,
        CancellationToken cancellationToken = default);

    IAsyncEnumerable<string> AnalyzeViolationStreamAsync(
        byte[] imageBytes,
        string mimeType,
        string? additionalContext = null,
        CancellationToken cancellationToken = default);
}

