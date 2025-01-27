import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-orange-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
              Gestion des Absences
              <span className="text-orange-500"> Simplifiée</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Une plateforme moderne pour gérer efficacement les présences et absences 
              des étudiants dans votre établissement.
            </p>
            <button
              onClick={onGetStarted}
              className="group flex items-center space-x-3 bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              <span>Commencer</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="hidden lg:block">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};