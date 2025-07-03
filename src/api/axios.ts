// src/api/axios.ts
// Why: This file creates a reusable Axios instance with a base URL
// and default headers, centralizing our API configuration.

import axios from 'axios';

// Why: Get the API base URL from the environment variable.
const baseURL = import.meta.env.VITE_API_URL;

// Why: Create an Axios instance. This allows us to set a base URL
// and potentially add interceptors for things like authentication tokens.
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json', // Default content type for all requests
  },
});

export default api;