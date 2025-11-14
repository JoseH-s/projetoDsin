export const condutorRoutes = {
    getAll: {
        method: 'GET',
        path: '/api/Condutor',
        protected: true,
        description: 'Get all condutores'
    },

    create: {
        method: 'POST',
        path: '/api/Condutor',
        protected: true,
        description: 'Create new condutor',
        requiredFields: ['nome', 'cpf', 'cnh']
    },

    getById: {
        method: 'GET',
        path: '/api/Condutor/:id',
        protected: true,
        description: 'Get condutor by ID'
    },

    update: {
        method: 'PUT',
        path: '/api/Condutor/:id',
        protected: true,
        description: 'Update condutor by ID'
    },

    delete: {
        method: 'DELETE',
        path: '/api/Condutor/:id',
        protected: true,
        description: 'Delete condutor by ID'
    },

    getByCpf: {
        method: 'GET',
        path: '/api/Condutor/cpf/:cpf',
        protected: true,
        description: 'Get condutor by CPF'
    },

    getByCnh: {
        method: 'GET',
        path: '/api/Condutor/cnh/:cnh',
        protected: true,
        description: 'Get condutor by CNH'
    }
};
