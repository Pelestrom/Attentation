import React from 'react';
import { School } from '../types';
import { School as SchoolIcon } from 'lucide-react';

interface SchoolCardProps {
  school: School;
  onClick: (school: School) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onClick }) => {
  return (
    <div
      onClick={() => onClick(school)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transform 
        transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-orange-500"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <SchoolIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{school.name}</h3>
      </div>
    </div>
  );
};