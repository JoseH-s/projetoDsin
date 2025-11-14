import { condutorRoutes } from './condutorRoutes';
import { multaRoutes } from './multaRoutes';
import { tipoMultaRoutes } from './tipoMultaRoutes';
import { usuarioRoutes } from './usuarioRoutes';
import { veiculoRoutes } from './veiculoRoutes';
import { geminiRoutes } from './geminiRoutes';

export const API_BASE_URL = 'https://localhost:7103';

export const apiRoutes = {
    condutor: condutorRoutes,
    multa: multaRoutes,
    tipoMulta: tipoMultaRoutes,
    usuario: usuarioRoutes,
    veiculo: veiculoRoutes,
    gemini: geminiRoutes
};

export const buildUrl = (path, params = {}) => {
    let url = `${API_BASE_URL}${path}`;

    Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, params[key]);
    });

    return url;
};

export const addQueryParams = (url, queryParams = {}) => {
    const params = new URLSearchParams();

    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            params.append(key, queryParams[key]);
        }
    });

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
};

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');

    const headers = {
        ...options.headers
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
                throw new Error('Sessão expirada');
            }
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export {
    condutorRoutes,
    multaRoutes,
    tipoMultaRoutes,
    usuarioRoutes,
    veiculoRoutes,
    geminiRoutes
};
