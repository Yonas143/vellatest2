import React from 'react';
import { Settings, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackClick,
  onSettingsClick,
}) => {
  return (
    <header className="p-4 flex justify-between items-center">
      <button onClick={onBackClick} className="p-2">
        <ArrowLeft size={24} className="text-gray-600" />
      </button>
      <h1 className="text-xl font-semibold">{title}</h1>
      <button onClick={onSettingsClick} className="p-2">
        <Settings size={24} className="text-gray-600" />
      </button>
    </header>
  );
};