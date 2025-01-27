import React, { useState, useEffect } from 'react';
import { School, Filiere } from '../types';
import { DepartmentCard } from '../components/DepartmentCard';
import { api } from '../lib/api';
import { LoadingDots } from '../components/LoadingDots';

interface FilieresPageProps {
  school: School;
  onBack: () => void;
  onFiliereSelect: (filiere: Filiere) => void;
}

export const FilieresPage: React.FC<FilieresPageProps> = ({
  school,
  onBack,
  onFiliereSelect,
}) => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFilieres = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.filieres.getBySchoolId(school.id);
        setFilieres(data);
      } catch (err) {
        console.error('Error loading filieres:', err);
        setError('Erreur lors du chargement des filières');
      } finally {
        setLoading(false);
      }
    };

    loadFilieres();
  }, [school.id]);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Filières - {school.name}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          ← Retour aux écoles
        </button>
      </div>
      {filieres.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-8">
          <p>Aucune filière disponible pour cette école</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filieres.map((filiere, index) => (
            <div
              key={filiere.id}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DepartmentCard
                department={filiere}
                onClick={onFiliereSelect}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};