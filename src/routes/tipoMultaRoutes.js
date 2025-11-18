export const tipoMultaRoutes = {
    obterTodos: {
        method: 'GET',
        path: '/api/TipoMulta',
        protected: true,
        description: 'Obter todos os tipos de multa'
    },

    criar: {
        method: 'POST',
        path: '/api/TipoMulta',
        protected: true,
        description: 'Criar novo tipo de multa',
        requiredFields: ['codigoMulta', 'valorMulta', 'gravidade']
    },

    obterPorId: {
        method: 'GET',
        path: '/api/TipoMulta/:id',
        protected: true,
        description: 'Obter tipo de multa por ID'
    },

    atualizar: {
        method: 'PUT',
        path: '/api/TipoMulta/:id',
        protected: true,
        description: 'Atualizar tipo de multa por ID'
    },

    deletar: {
        method: 'DELETE',
        path: '/api/TipoMulta/:id',
        protected: true,
        description: 'Deletar tipo de multa por ID'
    },

    obterPorCodigo: {
        method: 'GET',
        path: '/api/TipoMulta/codigo/:codigo',
        protected: true,
        description: 'Obter tipo de multa por código'
    },

    obterPorGravidade: {
        method: 'GET',
        path: '/api/TipoMulta/gravidade/:gravidade',
        protected: true,
        description: 'Obter tipos de multa por gravidade'
    }
};
