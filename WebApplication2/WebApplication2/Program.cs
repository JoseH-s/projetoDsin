using Microsoft.EntityFrameworkCore;
using WebApplication2.Domain.Interfaces;
using WebApplication2.Infrastructure.Configuration;
using WebApplication2.Infrastructure.Data;
using WebApplication2.Infrastructure.Repositories;
using WebApplication2.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// CORS para permitir chamadas do front-end (MVP - aberto para qualquer origem)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configure SQLite database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Gemini AI settings
builder.Services.Configure<GeminiSettings>(
    builder.Configuration.GetSection(GeminiSettings.SectionName));

// Register HttpClient for Gemini AI Service
builder.Services.AddHttpClient<IViolationAnalysisService, GeminiAiService>(client =>
{
    client.Timeout = TimeSpan.FromMinutes(2);
});

// Register repositories
builder.Services.AddScoped<ITicketRepository, TicketRepository>();

// Register services
builder.Services.AddScoped<IViolationAnalysisService, GeminiAiService>();
builder.Services.AddScoped<ITicketService, TicketService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Violation Analysis API",
        Version = "v1",
        Description = "API for analyzing traffic violation information using Google Gemini AI"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// Habilitar CORS antes dos controllers
app.UseCors("AllowAll");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Garantir que o banco SQLite e o schema foram criados
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
