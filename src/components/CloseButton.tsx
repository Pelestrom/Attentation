import React from 'react';
import { X } from 'lucide-react';
import useSound from 'use-sound';
import closeSound from '../assets/sounds/close.mp3';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  const [playClose] = useSound(closeSound, { volume: 0.5 });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la propagation du clic
    playClose();
    onClose();
  };

  return (
    <button
      onClick={handleClick}
      className="absolute right-4 top-4 p-3 bg-red-100 rounded-full hover:bg-red-200 
        transform transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      <X className="w-5 h-5 text-red-600" />
    </button>
  );
};