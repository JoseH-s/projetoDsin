# Instruções do Servidor de Upload

## 📦 Instalação

Primeiro, instale as novas dependências:

```bash
npm install
```

## 🚀 Como Usar

### Opção 1: Rodar servidor e frontend juntos
```bash
npm run dev:all
```

### Opção 2: Rodar separadamente

**Terminal 1 - Servidor:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📝 Funcionalidades Implementadas

### Servidor (server.js)
- **POST /api/upload** - Upload de imagens
- **GET /api/images** - Lista todas as imagens enviadas
- **DELETE /api/images/:filename** - Deleta uma imagem específica
- **GET /uploads/:filename** - Serve arquivos estáticos (imagens)

### Frontend (Upload.jsx)
- Upload de imagens via drag-and-drop ou seleção de arquivo
- Preview da imagem antes de confirmar o upload
- Histórico de imagens enviadas exibido ao lado
- Miniaturas das imagens com informações (nome, tamanho, data)
- Botão para deletar imagens do histórico

## 🗂️ Estrutura de Arquivos

```
projeto/
├── server.js           # Servidor Express
├── uploads/            # Pasta criada automaticamente para armazenar imagens
├── src/
│   └── Components/
│       ├── Upload.jsx          # Componente com histórico
│       └── Upload.module.css   # Estilos atualizados
```

## 🔧 Configuração

O servidor roda na porta **3001** por padrão.
O frontend Vite roda na porta **5173** por padrão.

Para alterar a porta do servidor, edite a constante `PORT` em `server.js`.

## 📸 Upload de Imagens

1. Acesse a página de Upload
2. Arraste uma imagem ou clique para selecionar
3. Visualize o preview
4. Clique em "Confirmar" para enviar
5. A imagem aparecerá no histórico à direita

## 🗑️ Deletar Imagens

Clique no botão vermelho "×" ao lado de cada imagem no histórico.

## ⚙️ Formatos Suportados

- JPEG / JPG
- PNG
- GIF
- WEBP

## 📏 Limite de Tamanho

Máximo de **10MB** por imagem.
