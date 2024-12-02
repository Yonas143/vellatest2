import React from 'react';
import { Header } from '../../components/layout/Header';
import { Navigation } from '../../components/layout/Navigation';
import { MatchList } from '../../components/matches/MatchList';
import { useMatchStore } from '../../store/useMatchStore';

export const Matches: React.FC = () => {
  const { matches, loading, error } = useMatchStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Matches"
        onSettingsClick={() => console.log('Settings clicked')}
      />
      
      <main className="p-4 mb-20">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg">No matches yet</p>
            <p className="text-sm">Keep swiping to find your match!</p>
          </div>
        ) : (
          <MatchList matches={matches} />
        )}
      </main>

      <Navigation />
    </div>
  );
};