import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { MessageList } from '../../components/messages/MessageList';
import { MessageInput } from '../../components/messages/MessageInput';
import { useChatStore } from '../../store/useChatStore';

export const Chat: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { messages, match, loadMessages, sendMessage, loading, error } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchId) {
      loadMessages(matchId);
    }
  }, [matchId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error || 'Chat not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title={match.users[0].name}
        onBackClick={() => window.history.back()}
        showBackButton
      />
      
      <main className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </main>

      <MessageInput onSend={sendMessage} />
    </div>
  );
};