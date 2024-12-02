import React from 'react';
import { format } from 'date-fns';
import { Message } from '../../types/match';
import { useAuthStore } from '../../store/useAuthStore';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuthStore();

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.senderId === user?.id;

    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 ${
            isOwnMessage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-900'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {messages.map(renderMessage)}
    </div>
  );
};