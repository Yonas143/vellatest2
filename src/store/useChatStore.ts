import { create } from 'zustand';
import { Match, Message } from '../types/match';

interface ChatState {
  match: Match | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  loadMessages: (matchId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  match: null,
  messages: [],
  loading: false,
  error: null,

  loadMessages: async (matchId: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({
        match: {
          id: matchId,
          users: [
            {
              id: '2',
              name: 'Emma Davis',
              images: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04'],
              online: true
            }
          ],
          createdAt: new Date().toISOString()
        },
        messages: [
          {
            id: '1',
            matchId,
            content: 'Hey, how are you?',
            senderId: '2',
            timestamp: new Date().toISOString(),
            read: true,
            type: 'text'
          }
        ],
        loading: false
      });
    } catch (error) {
      set({ error: 'Failed to load messages', loading: false });
    }
  },

  sendMessage: async (content: string) => {
    const { match } = get();
    if (!match) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newMessage: Message = {
        id: Date.now().toString(),
        matchId: match.id,
        content,
        senderId: '1', // Current user ID
        timestamp: new Date().toISOString(),
        read: false,
        type: 'text'
      };
      set(state => ({
        messages: [...state.messages, newMessage]
      }));
    } catch (error) {
      set({ error: 'Failed to send message' });
    }
  }
}));