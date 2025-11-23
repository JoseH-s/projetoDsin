# 🔍 Guia de Troubleshooting - Upload de Imagens

## Como Testar

1. **Inicie o servidor e o frontend:**
   ```bash
   npm run dev:all
   ```

2. **Acesse a aplicação:**
   - Frontend: http://localhost:5174 (ou 5173)
   - Servidor: http://localhost:3001

3. **Teste o upload:**
   - Arraste uma imagem ou clique para selecionar
   - Clique em "Confirmar"
   - Verifique os logs no console

## 📋 Checklist de Verificação

### No Console do Navegador (F12):
- [ ] `🔄 Buscando histórico de uploads...` - Aparece ao carregar a página
- [ ] `📦 Resposta do servidor:` - Mostra a resposta da API
- [ ] `📤 Iniciando upload:` - Aparece ao clicar em Confirmar
- [ ] `✅ Upload realizado com sucesso!` - Confirma o sucesso

### No Terminal do Servidor:
- [ ] `🚀 Servidor rodando em http://localhost:3001`
- [ ] `📋 Listando imagens da pasta:` - Ao carregar histórico
- [ ] `📤 Upload recebido:` - Ao fazer upload
- [ ] `✅ Upload salvo:` - Confirma salvamento

## ⚠️ Problemas Comuns

### 1. Histórico vazio mas imagens foram enviadas
**Causa:** CORS ou erro de conexão
**Solução:** 
- Verifique se o servidor está rodando na porta 3001
- Verifique se não há firewall bloqueando

### 2. Erro ao fazer upload
**Causa:** Campo FormData incorreto
**Solução:**
- O campo deve ser 'image' (não 'file')
- Verifique os logs do servidor

### 3. Imagens não aparecem
**Causa:** Pasta uploads ou arquivos não acessíveis
**Solução:**
```bash
# Verificar se a pasta existe
Test-Path "uploads"

# Listar arquivos
Get-ChildItem "uploads"

# Dar permissões (se necessário)
```

### 4. Erro "Cannot read properties"
**Causa:** Estado do React não inicializado
**Solução:** Verificar se `uploadHistory` está inicializado como array

## 🧪 Teste Manual da API

### Listar imagens:
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/images" -Method GET
```

### Verificar pasta uploads:
```powershell
Get-ChildItem ".\uploads" | Format-Table Name, Length, LastWriteTime
```

## 🎯 Logs Esperados (Funcionando Corretamente)

### Console do Navegador:
```
🔄 Buscando histórico de uploads...
📦 Resposta do servidor: {success: true, data: Array(0)}
✅ Histórico atualizado: 0 imagens

[Ao fazer upload]
📤 Iniciando upload: imagem.jpg
🌐 Enviando para: http://localhost:3001/api/upload
📨 Resposta do upload: {success: true, message: "Imagem enviada com sucesso", data: {...}}
✅ Upload realizado com sucesso!
🔄 Buscando histórico de uploads...
📦 Resposta do servidor: {success: true, data: Array(1)}
✅ Histórico atualizado: 1 imagens
```

### Terminal do Servidor:
```
🚀 Servidor rodando em http://localhost:3001
📁 Uploads salvos em: C:\Users\...\uploads

📋 Listando imagens da pasta: C:\Users\...\uploads
📁 Arquivos encontrados: 0
🖼️ Imagens retornadas: 0

[Ao fazer upload]
📤 Upload recebido: Arquivo presente
✅ Upload salvo: 1731430000000-123456789.jpg

📋 Listando imagens da pasta: C:\Users\...\uploads
📁 Arquivos encontrados: 1
🖼️ Imagens retornadas: 1
```

## 🔧 Reset Completo

Se nada funcionar:
```bash
# 1. Parar todos os processos
Ctrl+C

# 2. Limpar pasta uploads
Remove-Item "uploads\*" -Force

# 3. Reinstalar dependências
npm install

# 4. Reiniciar
npm run dev:all
```
