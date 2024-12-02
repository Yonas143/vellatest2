import { api } from './api';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const authService = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),

  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', data),

  verifyEmail: (token: string) =>
    api.post<void>('/auth/verify-email', { token }),

  resetPassword: (email: string) =>
    api.post<void>('/auth/reset-password', { email }),
};