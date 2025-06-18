// API URLs configuration
const API_URLS = {
  development: 'http://localhost:3001',
  production: 'https://surreal-sellene-backend.onrender.com'
};

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? API_URLS.production 
  : API_URLS.development;

export const ENDPOINTS = {
  registerIP: `${API_BASE_URL}/register-ip`,
  health: `${API_BASE_URL}/health`,
  // Add more endpoints as needed
}; 