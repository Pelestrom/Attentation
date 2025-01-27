import React from 'react';
import { GraduationCap, Home, Info, Mail, School } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'schools', label: 'Écoles', icon: School },
    { id: 'about', label: 'À propos', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className={`${isDark ? 'bg-white' : 'bg-gray-900'} shadow-md transition-colors duration-200 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap className={`w-8 h-8 ${isDark ? 'text-orange-500' : 'text-orange-400'}`} />
            <span className={`text-xl font-bold ${isDark ? 'text-gray-900' : 'text-white'}`}>
              AbsenceManager
            </span>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link flex items-center space-x-2 px-3 py-2 transition-all duration-200
                    ${currentPage === item.id
                      ? `${isDark ? 'text-orange-500' : 'text-orange-400'}`
                      : `${isDark ? 'text-gray-900 hover:text-orange-500' : 'text-white hover:text-orange-400'}`
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
};