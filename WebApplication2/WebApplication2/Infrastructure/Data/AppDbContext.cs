using Microsoft.EntityFrameworkCore;
using WebApplication2.Domain.Entities;

namespace WebApplication2.Infrastructure.Data;

/// <summary>
/// DbContext da aplicação para persistência em banco de dados.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Brand).HasMaxLength(100);
            entity.Property(t => t.Model).HasMaxLength(100);
            entity.Property(t => t.ViolationLocation).HasMaxLength(255);
            entity.Property(t => t.Reference).HasMaxLength(255);
            entity.Property(t => t.State).HasMaxLength(2);
            entity.Property(t => t.City).HasMaxLength(150);
            entity.Property(t => t.Description).HasMaxLength(500);
            entity.Property(t => t.Color).HasMaxLength(50);
        });
    }
}


