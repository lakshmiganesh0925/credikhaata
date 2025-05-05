import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const login = (credentials: { email: string; password: string }) => api.post('/auth/login', credentials);
export const signup = (userData: { email: string; password: string }) => api.post('/auth/signup', userData);