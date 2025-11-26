using WebApplication2.Domain.Entities;

namespace WebApplication2.Domain.Interfaces;

/// <summary>
/// Repositório responsável pela persistência de <see cref="Ticket"/>.
/// Encapsula o acesso ao banco de dados (EF Core / SQLite).
/// </summary>
public interface ITicketRepository
{
    Task<Ticket> CreateAsync(Ticket ticket, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Ticket>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Ticket?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Ticket?> UpdateAsync(int id, Ticket ticket, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}



