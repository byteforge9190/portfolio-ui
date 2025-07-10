// src/api/axios.ts
// Why: This file creates a reusable Axios instance with a base URL and
// interceptors for authentication and error handling

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Why: Add a request interceptor to automatically attach the token to headers.
// This runs before every request is sent.
api.interceptors.request.use(
  (config) => {
    // Why: Get the token from localStorage.
    const token = localStorage.getItem('token');
    // Why: If a token exists, attach it to the Authorization header.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Why: Add a response interceptor to handle authentication errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log detailed error information for debugging
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      console.warn('Authentication failed - token may be expired');
      // Clear invalid token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 errors (forbidden - insufficient permissions)
    if (error.response?.status === 403) {
      console.warn('Access forbidden - insufficient permissions');
    }
    
    return Promise.reject(error);
  }
);

export default api;