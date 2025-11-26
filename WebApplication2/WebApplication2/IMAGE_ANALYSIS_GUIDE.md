# 📸 Guia de Análise de Imagens

## Visão Geral

Esta API foi desenvolvida para analisar **imagens de infrações de trânsito** usando o Google Gemini AI (modelo multimodal). A IA analisa visualmente a imagem e extrai informações estruturadas sobre a infração.

## 🎯 Capacidades da IA

A API consegue identificar nas imagens:

✅ **Veículo**:
- Marca (ex: Fiat, Honda, Toyota)
- Modelo (ex: Uno, Civic, Corolla)
- Cor (ex: vermelho, preto, branco)

✅ **Localização**:
- Nome da via (rua, avenida, rodovia)
- Pontos de referência
- Cidade e estado

✅ **Infração**:
- Tipo de infração cometida
- Descrição detalhada do que foi observado
- Gravidade (gravíssima, grave, média, baixa)

✅ **Contexto Temporal**:
- Data e hora (se visível na imagem)

## 📋 Como Usar

### 1. Formato da Requisição

```http
POST /api/ViolationAnalysis/analyze
Content-Type: multipart/form-data

Image: [arquivo de imagem]
AdditionalContext: [texto opcional]
```

### 2. Exemplo com cURL

```bash
curl -X POST "https://localhost:7000/api/ViolationAnalysis/analyze" \
  -F "Image=@C:/fotos/infracao.jpg" \
  -F "AdditionalContext=Infração ocorrida na Avenida Paulista às 14h30"
```

### 3. Exemplo com PowerShell

```powershell
$uri = "https://localhost:7000/api/ViolationAnalysis/analyze"
$imagePath = "C:\fotos\infracao.jpg"

$form = @{
    Image = Get-Item -Path $imagePath
    AdditionalContext = "Infração ocorrida na Avenida Paulista às 14h30"
}

$response = Invoke-RestMethod -Uri $uri -Method Post -Form $form -SkipCertificateCheck
$response | ConvertTo-Json -Depth 10
```

### 4. Exemplo com Python

```python
import requests

url = "https://localhost:7000/api/ViolationAnalysis/analyze"

# Enviar imagem
with open('fotos/infracao.jpg', 'rb') as img:
    files = {'Image': img}
    data = {'AdditionalContext': 'Infração na Av. Paulista'}
    
    response = requests.post(url, files=files, data=data, verify=False)
    print(response.json())
```

### 5. Exemplo com JavaScript (Node.js)

```javascript
const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function analyzeViolation() {
    const form = new FormData();
    form.append('Image', fs.createReadStream('fotos/infracao.jpg'));
    form.append('AdditionalContext', 'Infração na Av. Paulista');
    
    const response = await fetch('https://localhost:7000/api/ViolationAnalysis/analyze', {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
    });
    
    const result = await response.json();
    console.log(result);
}

analyzeViolation();
```

## 📷 Requisitos das Imagens

### Formatos Aceitos
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)

### Tamanho
- **Máximo**: 10 MB por imagem
- **Recomendado**: 1-5 MB para melhor performance

### Qualidade Recomendada

✅ **Boas Práticas**:
- Imagem clara e bem iluminada
- Veículo completamente visível
- Foco adequado (não borrado)
- Resolução mínima: 640x480 pixels
- Placa do veículo visível (se possível)
- Contexto do local visível

❌ **Evitar**:
- Imagens muito escuras ou superexpostas
- Fotos desfocadas ou borradas
- Veículo parcialmente cortado
- Resolução muito baixa (< 320x240)
- Imagens comprimidas demais

## 📊 Formato da Resposta

```json
{
  "brand": "Fiat",
  "model": "Uno",
  "violationLocation": "Avenida Paulista, próximo ao MASP",
  "reference": "MASP",
  "datetime": "25/11/2025 às 14:30",
  "state": "SP",
  "city": "São Paulo",
  "description": "Veículo vermelho parado sobre faixa de pedestres durante sinal vermelho",
  "color": "vermelho",
  "type": "grave"
}
```

### Campos Retornados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `brand` | string | Marca do veículo (pode ser null se não identificado) |
| `model` | string | Modelo do veículo |
| `violationLocation` | string | Local onde ocorreu a infração |
| `reference` | string | Ponto de referência próximo |
| `datetime` | string | Data e hora (ou "Não especificado") |
| `state` | string | Sigla do estado (UF) |
| `city` | string | Nome da cidade |
| `description` | string | Descrição detalhada da infração |
| `color` | string | Cor do veículo |
| `type` | string | Gravidade: `gravissima`, `grave`, `media`, `baixa` |

## 🎯 Exemplos de Cenários

### Cenário 1: Passagem de Sinal Vermelho
**Imagem**: Foto de veículo cruzando sinal vermelho  
**Contexto Adicional**: "Cruzamento Av. Paulista com Rua Augusta"

**Resposta Esperada**:
```json
{
  "type": "gravissima",
  "description": "Veículo ultrapassou cruzamento com sinal vermelho"
}
```

### Cenário 2: Estacionamento Irregular
**Imagem**: Veículo estacionado em local proibido  
**Contexto Adicional**: "Rua Augusta, próximo ao metrô"

**Resposta Esperada**:
```json
{
  "type": "media",
  "description": "Veículo estacionado em local proibido (placa de proibição visível)"
}
```

### Cenário 3: Excesso de Velocidade (com radar)
**Imagem**: Foto de radar mostrando velocidade  
**Contexto Adicional**: "Via com limite de 60 km/h"

**Resposta Esperada**:
```json
{
  "type": "grave",
  "description": "Veículo trafegando a velocidade superior ao limite permitido"
}
```

## 🔄 Modo Streaming

Para receber a resposta em tempo real:

```bash
curl -X POST "https://localhost:7000/api/ViolationAnalysis/analyze-stream" \
  -F "Image=@infracao.jpg" \
  -N
```

A resposta virá em formato Server-Sent Events (SSE):

```
data: {"brand":"Fiat"
data: ,"model":"Uno"
data: ,"color":"vermelho"
...
data: [DONE]
```

## 🛠️ Contexto Adicional

O campo `AdditionalContext` é **opcional** mas **recomendado** para:

1. **Complementar informações não visíveis**: Data/hora, velocidade, etc.
2. **Especificar localização exata**: Quando não está clara na imagem
3. **Adicionar detalhes relevantes**: Condições climáticas, testemunhas, etc.

### Exemplos de Contexto Útil:

```
"Infração ocorrida em 25/11/2025 às 14h30 na Avenida Paulista, altura do número 1000"
```

```
"Veículo trafegava a 120 km/h em via com limite de 60 km/h"
```

```
"Motorista realizou conversão proibida causando risco a pedestres"
```

## ⚠️ Tratamento de Erros

### Erro 400 - Bad Request
```json
{
  "error": "Invalid image format. Allowed formats: JPEG, PNG, WebP"
}
```

**Causa**: Formato de arquivo não suportado  
**Solução**: Converter imagem para JPEG, PNG ou WebP

### Erro 400 - Image Too Large
```json
{
  "error": "Image size must be less than 10 MB"
}
```

**Causa**: Arquivo muito grande  
**Solução**: Comprimir imagem ou reduzir resolução

### Erro 503 - Service Unavailable
```json
{
  "error": "Service temporarily unavailable. Please try again later."
}
```

**Causa**: API do Gemini indisponível ou API Key inválida  
**Solução**: Verificar configuração da API Key e tentar novamente

## 🔐 Considerações de Segurança

1. **Dados Sensíveis**: Imagens podem conter dados pessoais (placas, rostos)
2. **LGPD/GDPR**: Garanta conformidade ao processar imagens
3. **Armazenamento**: Por padrão, imagens NÃO são armazenadas
4. **Logs**: Cuidado com logs que podem conter informações sensíveis

## 📈 Performance

- **Tempo médio de análise**: 2-5 segundos
- **Throughput**: ~10-20 requisições/minuto (limite da API Gemini)
- **Cache**: Não implementado por padrão (considere Redis para produção)

## 🚀 Melhorias Futuras

- [ ] Suporte para análise em lote (múltiplas imagens)
- [ ] Detecção de placa com OCR
- [ ] Integração com banco de dados de veículos
- [ ] Cache de respostas para imagens similares
- [ ] Suporte para vídeos (análise frame-a-frame)
- [ ] Webhooks para processamento assíncrono

