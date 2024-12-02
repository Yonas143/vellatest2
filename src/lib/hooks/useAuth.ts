import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/auth.service';
import { ROUTES } from '../constants/routes';
import type { LoginCredentials, RegisterData } from '../types/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setLoading, setError } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
      navigate(ROUTES.DISCOVER);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [navigate, setUser, setLoading, setError]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(data);
      setUser(response.user);
      navigate(ROUTES.DISCOVER);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, [navigate, setUser, setLoading, setError]);

  return { login, register };
}