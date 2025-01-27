import { RFIDRecord, RFIDDevice } from '../types';
import { format, subHours } from 'date-fns';

const today = new Date();

export const rfidDevices: RFIDDevice[] = [
  {
    id: 'device-1',
    name: 'Entrée principale',
    location: 'Bâtiment A',
    status: 'active',
    lastPing: format(today, "yyyy-MM-dd'T'HH:mm:ss'Z'")
  },
  {
    id: 'device-2',
    name: 'Sortie de secours',
    location: 'Bâtiment A',
    status: 'active',
    lastPing: format(today, "yyyy-MM-dd'T'HH:mm:ss'Z'")
  }
];

// Simulation d'une journée complète de passages RFID
export const rfidRecords: RFIDRecord[] = [
  // Thomas Dubois (id: '1')
  {
    id: 'record-1',
    studentId: '1',
    timestamp: format(subHours(today, 8), "yyyy-MM-dd'T'08:00:00'Z'"),
    type: 'entry',
    deviceId: 'device-1'
  },
  {
    id: 'record-2',
    studentId: '1',
    timestamp: format(subHours(today, 4), "yyyy-MM-dd'T'12:30:00'Z'"),
    type: 'exit',
    deviceId: 'device-2'
  },
  {
    id: 'record-3',
    studentId: '1',
    timestamp: format(subHours(today, 3), "yyyy-MM-dd'T'13:45:00'Z'"),
    type: 'entry',
    deviceId: 'device-1'
  },
  {
    id: 'record-4',
    studentId: '1',
    timestamp: format(today, "yyyy-MM-dd'T'17:00:00'Z'"),
    type: 'exit',
    deviceId: 'device-2'
  },
  // Sarah Benali (id: '2')
  {
    id: 'record-5',
    studentId: '2',
    timestamp: format(subHours(today, 8), "yyyy-MM-dd'T'07:55:00'Z'"),
    type: 'entry',
    deviceId: 'device-1'
  },
  {
    id: 'record-6',
    studentId: '2',
    timestamp: format(today, "yyyy-MM-dd'T'17:05:00'Z'"),
    type: 'exit',
    deviceId: 'device-2'
  },
  // Karim Hadj (id: '3')
  {
    id: 'record-7',
    studentId: '3',
    timestamp: format(subHours(today, 8), "yyyy-MM-dd'T'08:15:00'Z'"),
    type: 'entry',
    deviceId: 'device-1'
  },
  {
    id: 'record-8',
    studentId: '3',
    timestamp: format(subHours(today, 4), "yyyy-MM-dd'T'12:00:00'Z'"),
    type: 'exit',
    deviceId: 'device-2'
  }
];