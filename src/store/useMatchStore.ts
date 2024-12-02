import { create } from 'zustand';
import { Match } from '../types/match';

interface MatchState {
  matches: Match[];
  loading: boolean;
  error: string | null;
  loadMatches: () => Promise<void>;
  createMatch: (userId: string) => Promise<void>;
  unmatch: (matchId: string) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  loading: false,
  error: null,

  loadMatches: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({
        matches: [
          {
            id: '1',
            users: [
              {
                id: '2',
                name: 'Emma Davis',
                images: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'],
                online: true
              }
            ],
            createdAt: new Date().toISOString(),
            lastMessage: {
              id: '1',
              content: 'Hey, how are you?',
              senderId: '2',
              timestamp: new Date().toISOString()
            }
          }
        ],
        loading: false
      });
    } catch (error) {
      set({ error: 'Failed to load matches', loading: false });
    }
  },

  createMatch: async (userId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Handle match creation
    } catch (error) {
      set({ error: 'Failed to create match' });
    }
  },

  unmatch: async (matchId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        matches: state.matches.filter(match => match.id !== matchId)
      }));
    } catch (error) {
      set({ error: 'Failed to unmatch' });
    }
  }
}));