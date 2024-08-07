// services/auth.ts
import apiClient from '../utils/apiClient';

export const login = async (username: string, password: string): Promise<void> => {
  const response = await apiClient.post('auth/login/', { username, password });
  const { token } = response.data;
  localStorage.setItem('authToken', token);
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
};
