using Microsoft.EntityFrameworkCore;
using WebApplication2.Domain.Entities;
using WebApplication2.Domain.Interfaces;
using WebApplication2.Infrastructure.Data;

namespace WebApplication2.Infrastructure.Repositories;

/// <summary>
/// Implementação de repositório para <see cref="Ticket"/> usando EF Core.
/// </summary>
public class TicketRepository : ITicketRepository
{
    private readonly AppDbContext _dbContext;

    public TicketRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Ticket> CreateAsync(Ticket ticket, CancellationToken cancellationToken = default)
    {
        await _dbContext.Tickets.AddAsync(ticket, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ticket;
    }

    public async Task<IReadOnlyList<Ticket>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Tickets
            .AsNoTracking()
            .OrderBy(t => t.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<Ticket?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Tickets
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
    }

    public async Task<Ticket?> UpdateAsync(int id, Ticket ticket, CancellationToken cancellationToken = default)
    {
        var existing = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

        if (existing is null)
        {
            return null;
        }

        existing.Brand = ticket.Brand;
        existing.Model = ticket.Model;
        existing.ViolationLocation = ticket.ViolationLocation;
        existing.Reference = ticket.Reference;
        existing.DateTime = ticket.DateTime;
        existing.State = ticket.State;
        existing.City = ticket.City;
        existing.Description = ticket.Description;
        existing.Color = ticket.Color;
        existing.Type = ticket.Type;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return existing;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _dbContext.Tickets
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

        if (existing is null)
        {
            return false;
        }

        _dbContext.Tickets.Remove(existing);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}



