using WebApplication2.Domain.Entities;
using WebApplication2.Domain.Interfaces;

namespace WebApplication2.Infrastructure.Services;

/// <summary>
/// Implementação do serviço de Ticket usando EF Core (SQLite).
/// </summary>
public class TicketService : ITicketService
{
    private readonly ITicketRepository _ticketRepository;
    private readonly ILogger<TicketService> _logger;

    public TicketService(ITicketRepository ticketRepository, ILogger<TicketService> logger)
    {
        _ticketRepository = ticketRepository;
        _logger = logger;
    }

    public async Task<Ticket> CreateAsync(Ticket ticket, CancellationToken cancellationToken = default)
    {
        if (ticket is null)
        {
            throw new ArgumentNullException(nameof(ticket));
        }

        _logger.LogInformation(
            "Saving Ticket (SQLite): Brand={Brand}, Model={Model}, DateTime={DateTime}, City={City}, State={State}",
            ticket.Brand, ticket.Model, ticket.DateTime, ticket.City, ticket.State);

        return await _ticketRepository.CreateAsync(ticket, cancellationToken);
    }

    public async Task<IReadOnlyList<Ticket>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _ticketRepository.GetAllAsync(cancellationToken);
    }

    public async Task<Ticket?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _ticketRepository.GetByIdAsync(id, cancellationToken);
    }

    public async Task<Ticket?> UpdateAsync(int id, Ticket ticket, CancellationToken cancellationToken = default)
    {
        return await _ticketRepository.UpdateAsync(id, ticket, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _ticketRepository.DeleteAsync(id, cancellationToken);
    }
}


