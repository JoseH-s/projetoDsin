export const ticketRoutes = {
    getAll: {
        method: 'GET',
        path: '/api/Tickets',
        protected: true,
        description: 'Get all tickets'
    },

    create: {
        method: 'POST',
        path: '/api/Tickets',
        protected: true,
        description: 'Create new ticket',
        requiredFields: ['model', 'type'],
        optionalFields: ['brand', 'violationLocation', 'reference', 'dateTime', 'state', 'city', 'description', 'color']
    },

    getById: {
        method: 'GET',
        path: '/api/Tickets/:id',
        protected: true,
        description: 'Get ticket by ID'
    },

    update: {
        method: 'PUT',
        path: '/api/Tickets/:id',
        protected: true,
        description: 'Update ticket by ID'
    },

    delete: {
        method: 'DELETE',
        path: '/api/Tickets/:id',
        protected: true,
        description: 'Delete ticket by ID'
    },

    getByModel: {
        method: 'GET',
        path: '/api/Tickets/model/:model',
        protected: true,
        description: 'Get tickets by model'
    },

    getByType: {
        method: 'GET',
        path: '/api/Tickets/type/:type',
        protected: true,
        description: 'Get tickets by violation type'
    },

    getByDateRange: {
        method: 'GET',
        path: '/api/Tickets/period',
        protected: true,
        description: 'Get tickets by date range',
        queryParams: ['startDate', 'endDate']
    }
};
