import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In production, this would be your remote API URL (e.g. https://api.kwickly.com)
// For local testing on emulator/device, use the machine's IP address if using Android
export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if it exists
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('kwickly_jwt_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error reading token from AsyncStorage', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
