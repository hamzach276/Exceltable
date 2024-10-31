// src/services/axios-instance.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import { apiurl } from "src/env-variable";
// Define custom types
type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

interface APIError extends AxiosError {
    status?: number;
    data?: any;
}

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://kmytrust-001-site2.atempurl.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: any) => {
        // Get token from localStorage or your auth management system
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        // Handle different error scenarios
        if (error.response) {
            const apiError: APIError = {
                ...error,
                status: error.response.status,
                data: error.response.data,
            };
            switch (apiError.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Handle forbidden
                    break;
                case 404:
                    // Handle not found
                    break;
                case 500:
                    // Handle server error
                    break;
                default:
                    // Handle other errors
                    break;
            }
            return Promise.reject(apiError);
        } else if (error.request) {
            // Network error
            console.error('Network Error:', error.request);
            return Promise.reject(error);
        } else {
            // Other errors
            console.error('Error:', error.message);
            return Promise.reject(error);
        }
    }
);

// Reusable API functions
const api = {
    request: async <T = any>(
        method: HTTPMethod,
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        try {
            const response = await axiosInstance.request<T>({
                method,
                url,
                data,
                ...config,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return api.request<T>('get', url, undefined, config);
    },
    post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return api.request<T>('post', url, data, config);
    },
    put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return api.request<T>('put', url, data, config);
    },
    delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return api.request<T>('delete', url, undefined, config);
    },
};

export default api;