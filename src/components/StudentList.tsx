import React from 'react';
import { Edit, Info } from 'lucide-react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onSelect: (student: Student) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Étudiant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Matricule
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Absences Justifiées
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Absences Non Justifiées
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {students.map((student, index) => (
            <tr
              key={student.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors animate-slideUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover transform transition-transform hover:scale-110"
                    src={student.profileImage}
                    alt={`${student.firstName} ${student.lastName}`}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {student.firstName} {student.lastName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-gray-300">{student.matricule}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {student.justifiedAbsences}h
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {student.unjustifiedAbsences}h
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onEdit(student)}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300 transition-colors p-2 hover:bg-orange-50 dark:hover:bg-orange-900/50 rounded-full"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => onSelect(student)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};