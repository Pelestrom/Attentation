import React from 'react';
import { Mail, Phone, LineChart } from 'lucide-react';
import { Student } from '../../types';
import { StudentStats } from '../stats/StudentStats';
import { BaseModal } from './BaseModal';
import { CopyButton } from '../CopyButton';

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
  return (
    <BaseModal
      title={`Détails de l'étudiant`}
      onClose={onClose}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="text-center animate-slideDown">
            <div className="relative inline-block">
              <img
                src={student.profileImage}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-100 
                  hover:border-orange-200 transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/20" />
            </div>
            <h2 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Matricule: {student.matricule}</p>
          </div>

          <div className="mt-6 space-y-4 animate-slideUp">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 p-3 
              bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
              transition-all duration-200">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>{student.email}</span>
              </div>
              <CopyButton text={student.email} />
            </div>
            
            <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 
              dark:hover:bg-gray-700 transition-all duration-200">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>Étudiant: {student.phone}</span>
                </div>
                <CopyButton text={student.phone} />
              </div>
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>Parents: {student.parentsPhone}</span>
                </div>
                <CopyButton text={student.parentsPhone} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 animate-fadeIn">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-orange-500" />
              Statistiques de présence
            </h3>
            <StudentStats studentId={student.id} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};