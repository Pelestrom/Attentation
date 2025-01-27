import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BaseModal } from './BaseModal';
import { rfidRecords, rfidDevices } from '../../data/rfidRecords';
import { Student } from '../../types';
import { Calendar, DoorClosed, DoorOpen } from 'lucide-react';

interface RFIDHistoryModalProps {
  student: Student;
  onClose: () => void;
}

export const RFIDHistoryModal: React.FC<RFIDHistoryModalProps> = ({
  student,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  const studentRecords = rfidRecords
    .filter(record => record.studentId === student.id)
    .filter(record => record.timestamp.startsWith(selectedDate));

  return (
    <BaseModal
      title={`Historique RFID - ${student.firstName} ${student.lastName}`}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg animate-slideDown">
          <Calendar className="w-5 h-5 text-orange-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
              focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="space-y-4 animate-fadeIn">
          {studentRecords.length > 0 ? (
            studentRecords.map((record, index) => {
              const device = rfidDevices.find(d => d.id === record.deviceId);
              const Icon = record.type === 'entry' ? DoorOpen : DoorClosed;
              
              return (
                <div
                  key={record.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm
                    hover:shadow-md transition-all duration-200 hover:scale-[1.02] animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      record.type === 'entry' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        record.type === 'entry' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {record.type === 'entry' ? 'Entrée' : 'Sortie'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {device?.name || 'Dispositif inconnu'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-700">
                      {format(parseISO(record.timestamp), 'HH:mm', { locale: fr })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {device?.location}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-8 animate-fadeIn">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Aucun enregistrement pour cette date</p>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};