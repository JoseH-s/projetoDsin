export const veiculoRoutes = {
    obterTodos: {
        method: 'GET',
        path: '/api/Veiculo',
        protected: true,
        description: 'Obter todos os veículos'
    },

    criar: {
        method: 'POST',
        path: '/api/Veiculo',
        protected: true,
        description: 'Criar novo veículo',
        requiredFields: ['placa']
    },

    obterPorId: {
        method: 'GET',
        path: '/api/Veiculo/:id',
        protected: true,
        description: 'Obter veículo por ID'
    },

    atualizar: {
        method: 'PUT',
        path: '/api/Veiculo/:id',
        protected: true,
        description: 'Atualizar veículo por ID'
    },

    deletar: {
        method: 'DELETE',
        path: '/api/Veiculo/:id',
        protected: true,
        description: 'Deletar veículo por ID'
    },

    obterPorPlaca: {
        method: 'GET',
        path: '/api/Veiculo/placa/:placa',
        protected: true,
        description: 'Obter veículo por placa'
    },

    obterPorProprietario: {
        method: 'GET',
        path: '/api/Veiculo/proprietario/:proprietario',
        protected: true,
        description: 'Obter veículos por proprietário'
    }
};
