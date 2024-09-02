// src/axiosSetup.js

import axios from 'axios';

const axiosServices = axios.create({ 
    baseURL: import.meta.env.VITE_APP_BASE_API || 'http://localhost:7005/api' 
});

// Request Interceptor
axiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('serviceToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.href.includes('/login')) {
            window.location.pathname = '/login';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosServices.get(url, { ...config });
    return res.data;
};
