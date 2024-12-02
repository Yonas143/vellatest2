import React from 'react';
import { User } from '../../types/user';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
      <h2 className="text-2xl font-bold text-white">
        {user.name}, {user.age}
      </h2>
      <p className="text-white/80">{user.occupation}</p>
      <p className="text-white/60 text-sm">
        {user.location.city}, {user.location.state}
      </p>
    </div>
  );
};