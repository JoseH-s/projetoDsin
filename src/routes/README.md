# Documentação das Rotas da API

Este projeto implementa rotas protegidas para todas as operações da API. Todas as rotas requerem autenticação.

## 📁 Estrutura de Rotas

```
src/routes/
├── ProtectedRoute.jsx        # Componente de proteção de rotas
├── index.js                   # Exportação central e helpers
├── condutorRoutes.js          # Rotas de Condutores
├── multaRoutes.js             # Rotas de Multas
├── tipoMultaRoutes.js         # Rotas de Tipos de Multa
├── usuarioRoutes.js           # Rotas de Usuários
├── veiculoRoutes.js           # Rotas de Veículos
└── geminiRoutes.js            # Rotas de processamento Gemini AI
```

## 🔒 Autenticação

Todas as rotas da API são protegidas e requerem um token de autenticação. O token é armazenado no `localStorage` após o login bem-sucedido.

## 📝 Como Usar

### Importar rotas
```javascript
import { apiRoutes, buildUrl, fetchWithAuth } from './routes';
```

### Exemplo de uso - GET
```javascript
// Obter todos os condutores
const url = buildUrl(apiRoutes.condutor.obterTodos.path);
const response = await fetchWithAuth(url, {
  method: 'GET'
});
const condutores = await response.json();
```

### Exemplo de uso - GET com parâmetro
```javascript
// Obter condutor por ID
const url = buildUrl(apiRoutes.condutor.obterPorId.path, { id: 123 });
const response = await fetchWithAuth(url, {
  method: 'GET'
});
const condutor = await response.json();
```

### Exemplo de uso - POST
```javascript
// Criar nova multa
const url = buildUrl(apiRoutes.multa.criar.path);
const response = await fetchWithAuth(url, {
  method: 'POST',
  body: JSON.stringify({
    veiculoId: 1,
    usuarioId: 2,
    condutorId: 3,
    dataHora: new Date().toISOString(),
    endereco: 'Av. Principal, 123',
    descricao: 'Excesso de velocidade',
    tipoMultaId: 4
  })
});
const novaMulta = await response.json();
```

### Exemplo de uso - Query Parameters
```javascript
import { addQueryParams } from './routes';

// Obter multas por período
const baseUrl = buildUrl(apiRoutes.multa.obterPorPeriodo.path);
const url = addQueryParams(baseUrl, {
  dataInicio: '2025-01-01',
  dataFim: '2025-12-31'
});
const response = await fetchWithAuth(url, {
  method: 'GET'
});
const multas = await response.json();
```

## 🛣️ Rotas Disponíveis

### Condutor (`/api/Condutor`)
- `GET /api/Condutor` - Listar todos
- `POST /api/Condutor` - Criar novo
- `GET /api/Condutor/{id}` - Obter por ID
- `PUT /api/Condutor/{id}` - Atualizar
- `DELETE /api/Condutor/{id}` - Deletar
- `GET /api/Condutor/cpf/{cpf}` - Obter por CPF
- `GET /api/Condutor/cnh/{cnh}` - Obter por CNH

### Multa (`/api/Multa`)
- `GET /api/Multa` - Listar todas
- `POST /api/Multa` - Criar nova
- `GET /api/Multa/{id}` - Obter por ID
- `PUT /api/Multa/{id}` - Atualizar
- `DELETE /api/Multa/{id}` - Deletar
- `GET /api/Multa/veiculo/{veiculoId}` - Por veículo
- `GET /api/Multa/condutor/{condutorId}` - Por condutor
- `GET /api/Multa/usuario/{usuarioId}` - Por usuário
- `GET /api/Multa/tipomulta/{tipoMultaId}` - Por tipo
- `GET /api/Multa/periodo` - Por período (query params)

### TipoMulta (`/api/TipoMulta`)
- `GET /api/TipoMulta` - Listar todos
- `POST /api/TipoMulta` - Criar novo
- `GET /api/TipoMulta/{id}` - Obter por ID
- `PUT /api/TipoMulta/{id}` - Atualizar
- `DELETE /api/TipoMulta/{id}` - Deletar
- `GET /api/TipoMulta/codigo/{codigo}` - Por código
- `GET /api/TipoMulta/gravidade/{gravidade}` - Por gravidade

### Usuario (`/api/Usuario`)
- `GET /api/Usuario` - Listar todos
- `POST /api/Usuario` - Criar novo
- `GET /api/Usuario/{id}` - Obter por ID
- `PUT /api/Usuario/{id}` - Atualizar
- `DELETE /api/Usuario/{id}` - Deletar
- `GET /api/Usuario/email/{email}` - Por email

### Veiculo (`/api/Veiculo`)
- `GET /api/Veiculo` - Listar todos
- `POST /api/Veiculo` - Criar novo
- `GET /api/Veiculo/{id}` - Obter por ID
- `PUT /api/Veiculo/{id}` - Atualizar
- `DELETE /api/Veiculo/{id}` - Deletar
- `GET /api/Veiculo/placa/{placa}` - Por placa
- `GET /api/Veiculo/proprietario/{proprietario}` - Por proprietário

### Gemini (`/api/Gemini`)
- `POST /api/Gemini/processar-imagem` - Processar imagem
- `POST /api/Gemini/processar-imagem-json` - Processar e retornar JSON

## 🔐 Componente ProtectedRoute

O componente `ProtectedRoute` protege as rotas do React Router que requerem autenticação:

```jsx
<Route 
  path="/upload" 
  element={
    <ProtectedRoute isAuthenticated={isLogged}>
      <Upload />
    </ProtectedRoute>
  } 
/>
```

Se o usuário não estiver autenticado, será redirecionado para `/login`.

## ⚙️ Configuração

A URL base da API está definida em `src/routes/index.js`:
```javascript
export const API_BASE_URL = 'https://localhost:7103';
```

## 🔄 Tratamento de Erros

O helper `fetchWithAuth` trata automaticamente:
- Tokens expirados (status 401)
- Redirecionamento para login quando necessário
- Remoção de tokens inválidos

## 📦 Campos Obrigatórios

Cada rota POST possui campos obrigatórios definidos. Consulte os arquivos individuais para detalhes:
- **Condutor**: nome, cpf, cnh
- **Multa**: veiculoId, usuarioId, dataHora, tipoMultaId
- **TipoMulta**: codigoMulta, valorMulta, gravidade
- **Usuario**: nome, email, senha, tipo
- **Veiculo**: placa
