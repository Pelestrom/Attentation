import React, { useEffect, useState } from 'react';
import { LineChart } from './LineChart';
import { AbsenceStats } from './AbsenceStats';
import { api } from '../../lib/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface StudentStatsProps {
  studentId: string;
}

export const StudentStats: React.FC<StudentStatsProps> = ({ studentId }) => {
  const [absences, setAbsences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbsences = async () => {
      try {
        const data = await api.students.getAbsences(studentId);
        setAbsences(data);
      } catch (error) {
        console.error('Error loading absences:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAbsences();
  }, [studentId]);

  if (loading) {
    return <div className="text-center py-8">Chargement des statistiques...</div>;
  }

  if (absences.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Aucune donnée d'absence disponible
      </div>
    );
  }

  const weeklyData = {
    labels: absences.map(a => `Semaine ${a.week_number}`),
    datasets: [
      {
        label: 'Heures de présence',
        data: absences.map(a => 30 - (a.justified_hours + a.unjustified_hours)),
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.3,
      },
      {
        label: 'Heures d\'absence',
        data: absences.map(a => a.justified_hours + a.unjustified_hours),
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.3,
      }
    ],
  };

  const totalHours = absences.reduce((sum, a) => sum + 30, 0);
  const totalAbsences = absences.reduce((sum, a) => sum + a.justified_hours + a.unjustified_hours, 0);
  const presenceRate = ((totalHours - totalAbsences) / totalHours) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AbsenceStats
          title="Taux de présence global"
          presenceRate={presenceRate}
          totalHours={totalHours}
          totalAbsences={totalAbsences}
        />
        <AbsenceStats
          title="Dernière semaine"
          presenceRate={((30 - (absences[absences.length - 1]?.justified_hours + absences[absences.length - 1]?.unjustified_hours)) / 30) * 100}
          totalHours={30}
          totalAbsences={absences[absences.length - 1]?.justified_hours + absences[absences.length - 1]?.unjustified_hours || 0}
        />
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <LineChart data={weeklyData} />
      </div>
    </div>
  );
};