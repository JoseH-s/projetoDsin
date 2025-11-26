using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Application.DTOs;
using WebApplication2.Domain.Entities;
using WebApplication2.Domain.Interfaces;

namespace WebApplication2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;
    private readonly ILogger<TicketsController> _logger;

    public TicketsController(ITicketService ticketService, ILogger<TicketsController> logger)
    {
        _ticketService = ticketService;
        _logger = logger;
    }

    /// <summary>
    /// Retorna todos os tickets cadastrados.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Ticket>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetAll(CancellationToken cancellationToken)
    {
        var tickets = await _ticketService.GetAllAsync(cancellationToken);
        return Ok(tickets);
    }

    /// <summary>
    /// Cria um novo ticket de infração.
    /// O front-end envia DateTime como string; aqui é feita a conversão para DateTime antes de salvar.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(Ticket), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Ticket>> CreateTicket(
        [FromBody] TicketRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        DateTime? violationDateTime = null;
        if (!string.IsNullOrWhiteSpace(request.DateTime))
        {
            // Tenta primeiro formato brasileiro, depois ISO 8601
            var formats = new[]
            {
                "dd/MM/yyyy HH:mm",
                "dd/MM/yyyy H:mm",
                "dd/MM/yyyy",
                "yyyy-MM-ddTHH:mm:ss",
                "yyyy-MM-ddTHH:mm:ssZ",
                "yyyy-MM-dd"
            };

            if (!DateTime.TryParseExact(
                    request.DateTime.Trim(),
                    formats,
                    CultureInfo.GetCultureInfo("pt-BR"),
                    DateTimeStyles.AssumeLocal,
                    out var parsed))
            {
                ModelState.AddModelError(
                    nameof(request.DateTime),
                    "Invalid date format. Use 'dd/MM/yyyy HH:mm' or ISO 'yyyy-MM-ddTHH:mm:ss'.");
                return BadRequest(ModelState);
            }

            violationDateTime = parsed;
        }

        var ticket = new Ticket
        {
            Brand = string.IsNullOrWhiteSpace(request.Brand) ? null : request.Brand.Trim(),
            Model = request.Model.Trim(),
            ViolationLocation = request.ViolationLocation?.Trim() ?? string.Empty,
            Reference = request.Reference?.Trim() ?? string.Empty,
            DateTime = violationDateTime,
            State = request.State?.Trim() ?? string.Empty,
            City = request.City?.Trim() ?? string.Empty,
            Description = request.Description?.Trim() ?? string.Empty,
            Color = request.Color?.Trim() ?? string.Empty,
            Type = ParseViolationType(request.Type)
        };

        var created = await _ticketService.CreateAsync(ticket, cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created);
    }

    /// <summary>
    /// Obtém um ticket pelo identificador.
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Ticket), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Ticket>> GetById(int id, CancellationToken cancellationToken)
    {
        var ticket = await _ticketService.GetByIdAsync(id, cancellationToken);
        if (ticket is null)
        {
            return NotFound();
        }

        return Ok(ticket);
    }

    /// <summary>
    /// Atualiza um ticket existente.
    /// </summary>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(Ticket), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Ticket>> UpdateTicket(
        int id,
        [FromBody] TicketRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        DateTime? violationDateTime = null;
        if (!string.IsNullOrWhiteSpace(request.DateTime))
        {
            var formats = new[]
            {
                "dd/MM/yyyy HH:mm",
                "dd/MM/yyyy H:mm",
                "dd/MM/yyyy",
                "yyyy-MM-ddTHH:mm:ss",
                "yyyy-MM-ddTHH:mm:ssZ",
                "yyyy-MM-dd"
            };

            if (!DateTime.TryParseExact(
                    request.DateTime.Trim(),
                    formats,
                    CultureInfo.GetCultureInfo("pt-BR"),
                    DateTimeStyles.AssumeLocal,
                    out var parsed))
            {
                ModelState.AddModelError(
                    nameof(request.DateTime),
                    "Invalid date format. Use 'dd/MM/yyyy HH:mm' or ISO 'yyyy-MM-ddTHH:mm:ss'.");
                return BadRequest(ModelState);
            }

            violationDateTime = parsed;
        }

        var ticketToUpdate = new Ticket
        {
            Brand = string.IsNullOrWhiteSpace(request.Brand) ? null : request.Brand.Trim(),
            Model = request.Model.Trim(),
            ViolationLocation = request.ViolationLocation?.Trim() ?? string.Empty,
            Reference = request.Reference?.Trim() ?? string.Empty,
            DateTime = violationDateTime,
            State = request.State?.Trim() ?? string.Empty,
            City = request.City?.Trim() ?? string.Empty,
            Description = request.Description?.Trim() ?? string.Empty,
            Color = request.Color?.Trim() ?? string.Empty,
            Type = ParseViolationType(request.Type)
        };

        var updated = await _ticketService.UpdateAsync(id, ticketToUpdate, cancellationToken);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(updated);
    }

    /// <summary>
    /// Remove um ticket pelo identificador.
    /// </summary>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteTicket(int id, CancellationToken cancellationToken)
    {
        var deleted = await _ticketService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private ViolationType ParseViolationType(string type)
    {
        return type.ToLowerInvariant() switch
        {
            "grave" => ViolationType.Grave,
            "media" => ViolationType.Media,
            "baixa" => ViolationType.Baixa,
            "gravissima" => ViolationType.Gravissima,
            _ => ViolationType.Media
        };
    }
}


