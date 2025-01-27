import React, { useState, useEffect } from 'react';
import { School } from '../types';
import { SchoolCard } from '../components/SchoolCard';
import { api } from '../lib/api';
import { LoadingDots } from '../components/LoadingDots';

interface SchoolsPageProps {
  onSchoolSelect: (school: School) => void;
}

export const SchoolsPage: React.FC<SchoolsPageProps> = ({ onSchoolSelect }) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.schools.getAll();
        setSchools(data);
      } catch (err) {
        console.error('Error in loadSchools:', err);
        setError('Erreur lors du chargement des écoles');
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 bg-red-100 p-4 rounded-lg">
          <p className="font-semibold">Erreur:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 animate-fadeIn">
          Sélectionnez votre école
        </h2>
        {schools.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            <p>Aucune école disponible</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((school, index) => (
              <div
                key={school.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SchoolCard
                  school={school}
                  onClick={onSchoolSelect}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};