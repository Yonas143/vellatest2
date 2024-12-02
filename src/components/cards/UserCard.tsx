import React from 'react';
import { User } from '../../types/user';
import { Heart, X, Star } from 'lucide-react';
import { UserInfo } from './UserInfo';
import { ActionButtons } from './ActionButtons';

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
      <UserInfo user={user} />
      <ActionButtons
        onLike={onLike}
        onDislike={onDislike}
        onSuperlike={onSuperlike}
      />
    </div>
  );
};