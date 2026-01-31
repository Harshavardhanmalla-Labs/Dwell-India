// API Configuration
// Automatically uses production API in production builds

export const API_BASE_URL = import.meta.env.PROD
    ? 'https://isdwell.in/api'
    : 'http://localhost:8000';

export const config = {
    apiBaseUrl: API_BASE_URL,
    environment: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};
