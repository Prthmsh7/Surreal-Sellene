// API URLs configuration
const API_URLS = {
  development: 'http://localhost:3001',
  production: import.meta.env.VITE_API_URL || 'https://surreal-sellene-backend.onrender.com'
};

export const API_BASE_URL = import.meta.env.PROD 
  ? API_URLS.production 
  : API_URLS.development;

export const ENDPOINTS = {
  registerIP: `${API_BASE_URL}/register-ip`,
  health: `${API_BASE_URL}/health`,
  // Add more endpoints as needed
}; 