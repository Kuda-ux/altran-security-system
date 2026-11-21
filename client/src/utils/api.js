import axios from 'axios';
import branding from '../config/branding';

// API base URLs
const LOCAL_API = 'http://localhost:5000/api';

// Production API URL — set via REACT_APP_API_URL env var on Vercel,
// or falls back to the value in branding config.
const PRODUCTION_API = branding.apiBaseUrl || 'https://your-api.onrender.com/api';

const getApiUrl = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  const url = isLocal ? LOCAL_API : PRODUCTION_API;
  if (process.env.NODE_ENV === 'development') {
    console.log('[API] Using:', url, '| Host:', hostname);
  }
  return url;
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000, // Increased timeout for Render cold starts
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
