import React from 'react';
import { Department, Class } from '../types';
import { ClassList } from '../components/ClassList';

interface ClassesPageProps {
  department: Department;
  onBack: () => void;
  onClassSelect: (classItem: Class) => void;
}

export const ClassesPage: React.FC<ClassesPageProps> = ({
  department,
  onBack,
  onClassSelect,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Classes - {department.name}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          ← Retour aux filières
        </button>
      </div>
      <ClassList classes={department.classes} onClassSelect={onClassSelect} />
    </div>
  );
};