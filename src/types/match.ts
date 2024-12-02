export interface Match {
  id: string;
  users: [string, string];
  createdAt: string;
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
  };
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'voice';
}