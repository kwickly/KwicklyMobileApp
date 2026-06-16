import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('kwickly_jwt_token');
      const userStr = await AsyncStorage.getItem('kwickly_user');
      if (token && userStr) {
        set({ token, user: JSON.parse(userStr), isLoading: false });
        return;
      }
    } catch (e) {
      console.error('Failed to restore auth state', e);
    }
    set({ isLoading: false });
  },

  login: async (email, password = 'password') => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      await AsyncStorage.setItem('kwickly_jwt_token', token);
      await AsyncStorage.setItem('kwickly_user', JSON.stringify(user));
      
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password = 'password') => {
    set({ isLoading: true });
    try {
      // In our ecosystem, the auth endpoint handles customer registration
      const res = await api.post('/auth/register', { name, email, password, role: 'CUSTOMER' });
      const { token, user } = res.data;
      
      await AsyncStorage.setItem('kwickly_jwt_token', token);
      await AsyncStorage.setItem('kwickly_user', JSON.stringify(user));
      
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('kwickly_jwt_token');
      await AsyncStorage.removeItem('kwickly_user');
    } catch (e) {
      console.error('Failed to clear auth state', e);
    }
    set({ user: null, token: null });
  },
}));
