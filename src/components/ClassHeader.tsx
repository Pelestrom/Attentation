import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { AnimatedDownloadIcon } from './AnimatedDownloadIcon';
import { History } from 'lucide-react';
import { Class } from '../types';

interface ClassHeaderProps {
  classData: Class;
  onBack: () => void;
  onExport: () => void;
  onShowRFIDHistory: () => void;
  hasSelectedStudent: boolean;
}

export const ClassHeader: React.FC<ClassHeaderProps> = ({
  classData,
  onBack,
  onExport,
  onShowRFIDHistory,
  hasSelectedStudent,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {classData.name}
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <ActionButton
          icon={AnimatedDownloadIcon}
          label="Exporter PDF"
          onClick={onExport}
          variant="primary"
        />
        <ActionButton
          icon={History}
          label="Historique RFID"
          onClick={onShowRFIDHistory}
          variant="secondary"
          className={!hasSelectedStudent ? 'opacity-50 cursor-not-allowed' : ''}
          disabled={!hasSelectedStudent}
        />
      </div>
    </div>
  );
};