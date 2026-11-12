import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // Check for customer user token or admin token
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const url = err.config?.url || '';
      if (url.includes('/admin')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      } else if (url.includes('/auth/profile')) {
        localStorage.removeItem('token');
        localStorage.removeItem('bakery_user');
      }
    }
    return Promise.reject(err);
  }
);

export default api;
