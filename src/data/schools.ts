import { School } from '../types';
import { students } from './students';

export const schools: School[] = [
  {
    id: 'esi',
    name: 'ESI',
    departments: [
      {
        id: 'stic',
        name: 'STIC',
        classes: [
          { id: 'ts-stic-1a', name: 'TS STIC 1-A', students: students.slice(0, 2) },
          { id: 'ing-stic-1b', name: 'ING STIC 1-B', students: [] },
        ],
      },
      {
        id: 'info',
        name: 'INFO',
        classes: [
          { id: 'ts-info-2', name: 'TS INFO 2', students: [students[2]] },
        ],
      },
    ],
  },
  {
    id: 'esmg',
    name: 'ESMG',
    departments: [],
  },
  {
    id: 'escae',
    name: 'ESCAE',
    departments: [],
  },
  {
    id: 'esas',
    name: 'ESAS',
    departments: [],
  },
];