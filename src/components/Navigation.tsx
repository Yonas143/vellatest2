import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, MessageSquare, User } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div className="max-w-md mx-auto flex justify-around">
        <Link to="/" className="text-blue-600">
          <Users size={24} />
        </Link>
        <Link to="/matches" className="text-gray-600">
          <Heart size={24} />
        </Link>
        <Link to="/messages" className="text-gray-600">
          <MessageSquare size={24} />
        </Link>
        <Link to="/profile" className="text-gray-600">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};