import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <div className="animate-rotate-theme">
        {isDark ? (
          <Moon className="w-5 h-5 text-yellow-500" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </div>
    </button>
  );
};