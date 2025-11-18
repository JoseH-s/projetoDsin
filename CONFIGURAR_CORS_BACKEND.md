# Configuração CORS no Backend C# (.NET)

## ⚠️ Problema
O erro `CORS policy: No 'Access-Control-Allow-Origin' header` significa que o backend não está permitindo requisições do frontend.

## ✅ Solução - Configure o Backend

### 1. Abra o arquivo `Program.cs` do seu projeto WebApplication1

### 2. Adicione a configuração CORS ANTES de `var app = builder.Build();`:

```csharp
// No topo do arquivo, após var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

// ... resto do código ...

var app = builder.Build();
```

### 3. USE o CORS ANTES dos controllers (após `var app = builder.Build();`):

```csharp
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ADICIONE ESTA LINHA AQUI:
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 📋 Exemplo Completo do Program.cs:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CONFIGURAÇÃO CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// USAR CORS (IMPORTANTE: antes de UseAuthorization)
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 🔧 Alternativa - CORS Liberado (apenas para desenvolvimento):

Se quiser liberar TUDO (não recomendado para produção):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// E depois:
app.UseCors("AllowAll");
```

## 🚀 Após Configurar:

1. **Reinicie o backend** (Ctrl+C e rode novamente)
2. **Teste o frontend** novamente
3. O erro de CORS deve sumir

## 📝 Verificar se está funcionando:

No console do navegador, você deve ver a requisição sendo feita com sucesso, sem erros de CORS.

---

## Problemas Comuns:

### ❌ Erro continua aparecendo?
- Certifique-se de que reiniciou o backend
- Verifique se a porta do backend está correta (7103)
- Verifique se `app.UseCors()` está ANTES de `app.UseAuthorization()`

### ❌ Backend não está rodando?
- Abra o projeto C# no Visual Studio
- Pressione F5 ou clique em "Run"
- Verifique se está rodando em `https://localhost:7103`
