import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  verifyPhone: (phone: string, code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ 
        isAuthenticated: true, 
        loading: false,
        user: {
          id: '1',
          name: 'Sarah',
          age: 25,
          gender: 'female',
          occupation: 'Software Engineer',
          location: {
            city: 'Addis Ababa',
            state: 'Addis Ababa',
            country: 'Ethiopia',
            distance: '5 km'
          },
          images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2'],
          bio: 'Looking for meaningful connections',
          interests: ['Technology', 'Travel', 'Music'],
          verified: true,
          premium: false,
          lastActive: new Date().toISOString()
        }
      });
    } catch (error) {
      set({ error: 'Login failed', loading: false });
    }
  },
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({ error: 'Registration failed', loading: false });
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  verifyPhone: async (phone: string, code: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ loading: false });
    } catch (error) {
      set({ error: 'Verification failed', loading: false });
    }
  }
}));