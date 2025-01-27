import React from 'react';
import { Department } from '../types';
import { BookOpen } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
  onClick: (department: Department) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onClick }) => {
  return (
    <div
      onClick={() => onClick(department)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transform 
        transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
          <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{department.name}</h3>
      </div>
    </div>
  );
};