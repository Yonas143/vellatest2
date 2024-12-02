import { create } from 'zustand';
import { User } from '../types/user';

interface DiscoverState {
  users: User[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
  likeUser: (userId: string) => Promise<void>;
  dislikeUser: (userId: string) => Promise<void>;
  superlikeUser: (userId: string) => Promise<void>;
  getCurrentUser: () => User | null;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 24,
    gender: 'female',
    occupation: 'Software Engineer',
    location: {
      city: 'Addis Ababa',
      state: 'Addis Ababa',
      country: 'Ethiopia',
      distance: '2 km'
    },
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    ],
    bio: 'Passionate about technology and innovation. Looking for someone who shares my enthusiasm for learning and growth.',
    interests: ['Technology', 'Travel', 'Photography'],
    verified: true,
    premium: false,
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Emma Davis',
    age: 26,
    gender: 'female',
    occupation: 'Marketing Manager',
    location: {
      city: 'Addis Ababa',
      state: 'Addis Ababa',
      country: 'Ethiopia',
      distance: '5 km'
    },
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1'
    ],
    bio: 'Creative soul with a love for art and music. Seeking genuine connections and shared adventures.',
    interests: ['Art', 'Music', 'Travel'],
    verified: true,
    premium: true,
    lastActive: new Date().toISOString()
  }
];

export const useDiscoverStore = create<DiscoverState>((set, get) => ({
  users: [],
  currentIndex: 0,
  loading: false,
  error: null,

  loadUsers: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ users: mockUsers, loading: false });
    } catch (error) {
      set({ error: 'Failed to load users', loading: false });
    }
  },

  likeUser: async (userId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({ currentIndex: state.currentIndex + 1 }));
    } catch (error) {
      set({ error: 'Failed to like user' });
    }
  },

  dislikeUser: async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({ currentIndex: state.currentIndex + 1 }));
    } catch (error) {
      set({ error: 'Failed to dislike user' });
    }
  },

  superlikeUser: async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({ currentIndex: state.currentIndex + 1 }));
    } catch (error) {
      set({ error: 'Failed to superlike user' });
    }
  },

  getCurrentUser: () => {
    const state = get();
    return state.users[state.currentIndex] || null;
  }
}));