import React from 'react';

interface AbsenceStatsProps {
  title: string;
  data: {
    datasets: {
      label: string;
      data: number[];
    }[];
  };
}

export const AbsenceStats: React.FC<AbsenceStatsProps> = ({ title, data }) => {
  const totalHours = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const totalAbsences = data.datasets[1].data.reduce((a, b) => a + b, 0);
  const presenceRate = ((totalHours - totalAbsences) / totalHours) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{presenceRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-600">Taux de présence</p>
        </div>
        <div className="text-right">
          <p className="text-sm">
            <span className="text-green-600">{totalHours - totalAbsences}h</span> /{' '}
            <span className="text-gray-600">{totalHours}h</span>
          </p>
          <p className="text-sm text-red-600">{totalAbsences}h d'absence</p>
        </div>
      </div>
    </div>
  );
};