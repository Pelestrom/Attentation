import React from 'react';
import { Search } from 'lucide-react';
import { VoiceSearch } from './VoiceSearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher..."
}) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 
          focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
      />
      <div className="absolute right-2">
        <VoiceSearch onSearchChange={onChange} />
      </div>
    </div>
  );
};