import axios from 'axios';

// Create an Axios instance pointing to the backend's base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Interceptor to inject JWT token into request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
