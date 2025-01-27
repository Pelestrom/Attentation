import React from 'react';
import { CloseButton } from '../CloseButton';
import useSound from 'use-sound';
import openSound from '../../assets/sounds/open.mp3';

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  title,
  onClose,
  children,
  maxWidth = 'max-w-4xl'
}) => {
  const [playOpen] = useSound(openSound, { volume: 0.5 });

  React.useEffect(() => {
    playOpen();
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${maxWidth} relative modal-enter
          hover:shadow-2xl transform transition-all duration-300`}
      >
        <CloseButton onClose={onClose} />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 animate-slideDown">{title}</h2>
          <div className="animate-fadeIn delay-150 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};