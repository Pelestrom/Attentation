import React from 'react';
import { Class } from '../types';
import { Users } from 'lucide-react';

interface ClassListProps {
  classes: Class[];
  onClassSelect: (classItem: Class) => void;
}

export const ClassList: React.FC<ClassListProps> = ({ classes, onClassSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          onClick={() => onClassSelect(classItem)}
          className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all 
            duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{classItem.name}</h3>
              <p className="text-gray-600">{classItem.students.length} étudiants</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};