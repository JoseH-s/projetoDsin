import axios from 'axios';
import { condutorRoutes } from './condutorRoutes';
import { multaRoutes } from './multaRoutes';
import { tipoMultaRoutes } from './tipoMultaRoutes';
import { usuarioRoutes } from './usuarioRoutes';
import { veiculoRoutes } from './veiculoRoutes';
import { geminiRoutes } from './geminiRoutes';

export const API_BASE_URL = 'https://localhost:7103';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };

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



export {
    condutorRoutes,
    multaRoutes,
    tipoMultaRoutes,
    usuarioRoutes,
    veiculoRoutes,
    geminiRoutes
};
