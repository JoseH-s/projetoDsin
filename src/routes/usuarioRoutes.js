export const usuarioRoutes = {
    obterTodos: {
        method: 'GET',
        path: '/api/Usuario',
        protected: true,
        description: 'Obter todos os usuários'
    },

    criar: {
        method: 'POST',
        path: '/api/Usuario',
        protected: true,
        description: 'Criar novo usuário',
        requiredFields: ['nome', 'email', 'senha', 'tipo']
    },

    obterPorId: {
        method: 'GET',
        path: '/api/Usuario/:id',
        protected: true,
        description: 'Obter usuário por ID'
    },

    atualizar: {
        method: 'PUT',
        path: '/api/Usuario/:id',
        protected: true,
        description: 'Atualizar usuário por ID'
    },

    deletar: {
        method: 'DELETE',
        path: '/api/Usuario/:id',
        protected: true,
        description: 'Deletar usuário por ID'
    },

    obterPorEmail: {
        method: 'GET',
        path: '/api/Usuario/email/:email',
        protected: true,
        description: 'Obter usuário por email'
    }
};
