import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { api } from '../lib/api';
import { LoadingDots } from './LoadingDots';

interface LoginModalProps {
  department: string;
  onClose: () => void;
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ department, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data: inspectorData, error: inspectorError } = await api.inspectors.getByEmail(email);
      
      if (inspectorError || !inspectorData) {
        throw new Error("Inspecteur non trouvé");
      }

      const { data: authData, error: authError } = await api.auth.signIn(email, password);
      
      if (authError || !authData) {
        throw new Error("Identifiants invalides");
      }

      if (inspectorData.filiere_name !== department) {
        throw new Error("Vous n'avez pas accès à cette filière");
      }

      onLogin({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative transform transition-all animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-3">
              <Lock className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Connexion Inspecteur
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Filière: {department}
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                  dark:text-white transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                  dark:text-white transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 
                transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 
                disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? <LoadingDots /> : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};