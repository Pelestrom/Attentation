import React from 'react';
import { School, Department } from '../types';
import { DepartmentCard } from '../components/DepartmentCard';

interface DepartmentsPageProps {
  school: School;
  onBack: () => void;
  onDepartmentSelect: (department: Department) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  school,
  onBack,
  onDepartmentSelect,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex items-center justify-between mb-6 animate-fadeIn">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Filières - {school.name}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          ← Retour aux écoles
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {school.departments.map((department, index) => (
          <div
            key={department.id}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DepartmentCard
              department={department}
              onClick={onDepartmentSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};