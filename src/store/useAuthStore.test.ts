import { useAuthStore } from './useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock API
jest.mock('../services/api', () => ({
  post: jest.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ user: null, token: null, isLoading: true });
  });

  it('should restore auth state if token and user exist', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('mock-token');
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify({ id: '1', name: 'Test' }));

    await useAuthStore.getState().checkAuth();

    const state = useAuthStore.getState();
    expect(state.token).toBe('mock-token');
    expect(state.user).toEqual({ id: '1', name: 'Test' });
    expect(state.isLoading).toBe(false);
  });

  it('should handle storage errors gracefully during checkAuth', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage Error'));

    await useAuthStore.getState().checkAuth();

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('should store JWT token and user on login', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { token: 'new-token', user: { id: '2', name: 'Login User' } }
    });

    await useAuthStore.getState().login('test@example.com', 'password');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('kwickly_jwt_token', 'new-token');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('kwickly_user', JSON.stringify({ id: '2', name: 'Login User' }));

    const state = useAuthStore.getState();
    expect(state.token).toBe('new-token');
    expect(state.user).toEqual({ id: '2', name: 'Login User' });
    expect(state.isLoading).toBe(false);
  });

  it('should remove JWT token and user on logout', async () => {
    useAuthStore.setState({ token: 'mock-token', user: { id: '1', name: 'Test' } as any });

    await useAuthStore.getState().logout();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('kwickly_jwt_token');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('kwickly_user');

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
