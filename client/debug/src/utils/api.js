// client/src/utils/api.js
// Centralized Axios instance for making API requests to the backend.

import axios from 'axios';
import { API_BASE_URL } from './constants'; // Import the base URL

// Create an Axios instance with a base URL
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for sending cookies if authentication is added later
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add headers here, e.g., for authentication tokens
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Add response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors, e.g., redirect to login on 401
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request. Redirecting to login...');
            // Example: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
