import React, { useEffect } from 'react';
import { ProfileCard } from '../components/discover/ProfileCard';
import { Navigation } from '../components/layout/Navigation';
import { Header } from '../components/layout/Header';
import { useDiscoverStore } from '../store/useDiscoverStore';
import { Loader2 } from 'lucide-react';

export const Discover: React.FC = () => {
  const { currentUser, loadUsers, likeUser, dislikeUser, superlikeUser, loading, error } = useDiscoverStore();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No more profiles to show.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Discover"
        onBackClick={() => console.log('Back clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
      />
      
      <main className="p-4 mb-20">
        <ProfileCard
          user={currentUser}
          onLike={() => likeUser(currentUser.id)}
          onDislike={() => dislikeUser(currentUser.id)}
          onSuperlike={() => superlikeUser(currentUser.id)}
        />
      </main>

      <Navigation />
    </div>
  );
};