import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Match } from '../../types/match';
import { useAuthStore } from '../../store/useAuthStore';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Link
          key={match.id}
          to={`/messages/${match.id}`}
          className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="p-4 flex items-center space-x-4">
            <div className="relative">
              <img
                src={match.users[0].images[0]}
                alt={match.users[0].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {match.users[0].online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {match.users[0].name}
                </h3>
                {match.lastMessage && (
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(match.lastMessage.timestamp), { addSuffix: true })}
                  </span>
                )}
              </div>
              
              {match.lastMessage ? (
                <p className="text-sm text-gray-600 truncate">
                  {match.lastMessage.senderId === user?.id ? 'You: ' : ''}
                  {match.lastMessage.content}
                </p>
              ) : (
                <p className="text-sm text-blue-600">
                  New match! Say hello 👋
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};