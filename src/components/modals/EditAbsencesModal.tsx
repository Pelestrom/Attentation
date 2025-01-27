import React, { useState } from 'react';
import { Student } from '../../types';
import { BaseModal } from './BaseModal';
import { ActionButton } from '../ActionButton';
import { Save, X } from 'lucide-react';

interface EditAbsencesModalProps {
  student: Student;
  onClose: () => void;
  onSave: (justifiedHours: number, unjustifiedHours: number) => void;
}

export const EditAbsencesModal: React.FC<EditAbsencesModalProps> = ({
  student,
  onClose,
  onSave,
}) => {
  const [justifiedHours, setJustifiedHours] = useState(student.justifiedAbsences);
  const [unjustifiedHours, setUnjustifiedHours] = useState(student.unjustifiedAbsences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(justifiedHours, unjustifiedHours);
    onClose();
  };

  return (
    <BaseModal
      title={`Modifier les absences - ${student.firstName} ${student.lastName}`}
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Heures justifiées
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={justifiedHours}
              onChange={(e) => setJustifiedHours(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                dark:text-white transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Heures non justifiées
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={unjustifiedHours}
              onChange={(e) => setUnjustifiedHours(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                dark:text-white transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <ActionButton
            icon={X}
            label="Annuler"
            onClick={onClose}
            variant="secondary"
          />
          <ActionButton
            icon={Save}
            label="Enregistrer"
            onClick={handleSubmit}
            variant="primary"
          />
        </div>
      </form>
    </BaseModal>
  );
};