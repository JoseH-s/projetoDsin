import axios from 'axios';
import { usuarioRoutes } from './usuarioRoutes';
import { ticketRoutes } from './ticketRoutes';
import { violationAnalysisRoutes } from './violationAnalysisRoutes';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7103';

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
    usuario: usuarioRoutes,
    ticket: ticketRoutes,
    violationAnalysis: violationAnalysisRoutes
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
    usuarioRoutes,
    ticketRoutes,
    violationAnalysisRoutes
};
