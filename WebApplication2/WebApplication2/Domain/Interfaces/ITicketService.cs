using WebApplication2.Domain.Entities;

namespace WebApplication2.Domain.Interfaces;

/// <summary>
/// Porta de aplicação para operações com Ticket.
/// A conversão de string para DateTime é feita antes de persistir.
/// </summary>
public interface ITicketService
{
    Task<Ticket> CreateAsync(Ticket ticket, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Ticket>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Ticket?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Ticket?> UpdateAsync(int id, Ticket ticket, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}


