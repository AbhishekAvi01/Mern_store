import axios from 'axios';

const api = axios.create({
  // Backend ka Base URL
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Har request ke saath token bhejne ke liye
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

  if (userInfo && userInfo.token) {
    // Agar user login hai, toh Header mein Token add karein
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;