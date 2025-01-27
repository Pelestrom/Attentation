import React from 'react';
import { LucideIcon } from 'lucide-react';
import useSound from 'use-sound';
import clickSound from '../assets/sounds/click.mp3';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const [playClick] = useSound(clickSound, { volume: 0.5 });

  const baseStyles = "flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105";
  const variantStyles = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  const handleClick = () => {
    playClick();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};