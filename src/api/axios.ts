// src/api/axios.ts
// Why: This file creates a reusable Axios instance with a base URL and
// an interceptor to attach the JWT for authenticated requests.

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

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

export default api;