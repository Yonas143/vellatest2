import React from 'react';
import { User } from '../types/user';
import { Heart, X, Star } from 'lucide-react';

interface UserCardProps {
  user: User;
  onLike: () => void;
  onDislike: () => void;
  onSuperlike: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onLike,
  onDislike,
  onSuperlike,
}) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] rounded-2xl overflow-hidden shadow-lg">
      <img
        src={user.images[0]}
        alt={user.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h2 className="text-2xl font-bold text-white">
          {user.name}, {user.age}
        </h2>
        <p className="text-white/80">{user.occupation}</p>
        <p className="text-white/60 text-sm">
          {user.location.city}, {user.location.state}
        </p>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
        <button
          onClick={onDislike}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          <X className="text-red-500" size={24} />
        </button>
        <button
          onClick={onLike}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          <Heart className="text-green-500" size={24} />
        </button>
        <button
          onClick={onSuperlike}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
        >
          <Star className="text-blue-500" size={24} />
        </button>
      </div>
    </div>
  );
};