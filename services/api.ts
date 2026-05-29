import axios from 'axios';

export const api = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_API_URL // servidor: chama a API diretamente
      : '/api', // browser: passa pelo proxy Next.js (sem CORS)
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRoute = error.config?.url?.includes('/auth/login');
    const hasToken =
      typeof window !== 'undefined' && !!localStorage.getItem('token');

    if (error.response?.status === 401 && !isLoginRoute && hasToken) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
