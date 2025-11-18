export const multaRoutes = {
    obterTodas: {
        method: 'GET',
        path: '/api/Multa',
        protected: true,
        description: 'Obter todas as multas'
    },

    criar: {
        method: 'POST',
        path: '/api/Multa',
        protected: true,
        description: 'Criar nova multa',
        requiredFields: ['veiculoId', 'usuarioId', 'dataHora', 'tipoMultaId']
    },

    obterPorId: {
        method: 'GET',
        path: '/api/Multa/:id',
        protected: true,
        description: 'Obter multa por ID'
    },

    atualizar: {
        method: 'PUT',
        path: '/api/Multa/:id',
        protected: true,
        description: 'Atualizar multa por ID'
    },

    deletar: {
        method: 'DELETE',
        path: '/api/Multa/:id',
        protected: true,
        description: 'Deletar multa por ID'
    },

    obterPorVeiculo: {
        method: 'GET',
        path: '/api/Multa/veiculo/:veiculoId',
        protected: true,
        description: 'Obter multas por ID do veículo'
    },

    obterPorCondutor: {
        method: 'GET',
        path: '/api/Multa/condutor/:condutorId',
        protected: true,
        description: 'Obter multas por ID do condutor'
    },

    obterPorUsuario: {
        method: 'GET',
        path: '/api/Multa/usuario/:usuarioId',
        protected: true,
        description: 'Obter multas por ID do usuário'
    },

    obterPorTipoMulta: {
        method: 'GET',
        path: '/api/Multa/tipomulta/:tipoMultaId',
        protected: true,
        description: 'Obter multas por ID do tipo de multa'
    },

    obterPorPeriodo: {
        method: 'GET',
        path: '/api/Multa/periodo',
        protected: true,
        description: 'Obter multas por período',
        queryParams: ['dataInicio', 'dataFim']
    }
};
