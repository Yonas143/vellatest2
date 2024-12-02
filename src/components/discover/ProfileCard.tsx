import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Verified } from 'lucide-react';
import { User } from '../../types/user';
import { ActionButtons } from './ActionButtons';

interface ProfileCardProps {
  user: User;
  onLike: () => void;
  onDislike: () => void;
  onSuperlike: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onLike,
  onDislike,
  onSuperlike,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < user.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* Image Gallery */}
      <div className="relative h-full">
        <img
          src={user.images[currentImageIndex]}
          alt={user.name}
          className="w-full h-full object-cover"
        />

        {/* Image Navigation */}
        <div className="absolute top-0 w-full px-2 py-4 flex justify-between">
          <div className="flex gap-1">
            {user.images.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 w-4'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentImageIndex > 0 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentImageIndex < user.images.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* User Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white">
              {user.name}, {user.age}
            </h2>
            {user.verified && (
              <Verified className="w-5 h-5 text-blue-400" />
            )}
          </div>

          <div className="flex items-center gap-1 text-white/90 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {user.location.city}, {user.location.distance}
            </span>
          </div>

          <p className="text-white/80 text-sm mb-3">{user.occupation}</p>

          {user.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white/20 text-white text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <ActionButtons
        onLike={onLike}
        onDislike={onDislike}
        onSuperlike={onSuperlike}
      />
    </div>
  );
};