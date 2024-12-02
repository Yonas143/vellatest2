import React from 'react';
import { Heart, X, Star } from 'lucide-react';

interface ActionButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  onSuperlike: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onLike,
  onDislike,
  onSuperlike,
}) => {
  return (
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
  );
};