export const geminiRoutes = {
    processarImagem: {
        method: 'POST',
        path: '/api/Gemini/processar-imagem',
        protected: true,
        description: 'Processar imagem com Gemini AI',
        contentType: 'multipart/form-data'
    },

    processarImagemJson: {
        method: 'POST',
        path: '/api/Gemini/processar-imagem-json',
        protected: true,
        description: 'Processar imagem com Gemini AI e retornar dados estruturados em JSON',
        contentType: 'multipart/form-data',
        responseType: 'GeminiResponse'
    }
};
