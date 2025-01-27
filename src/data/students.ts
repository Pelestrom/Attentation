import { Student } from '../types';

export const students: Student[] = [
  {
    id: '1',
    matricule: '20INFO1234',
    firstName: 'Pélé',
    lastName: 'Dubois',
    email: 'thomas.dubois@esi-sba.dz',
    phone: '+213 555 123 456',
    parentsPhone: '+213 555 789 012',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    justifiedAbsences: 4,
    unjustifiedAbsences: 2
  },
  {
    id: '2',
    matricule: '20INFO1235',
    firstName: 'Sarah',
    lastName: 'Benali',
    email: 'sarah.benali@esi-sba.dz',
    phone: '+213 555 234 567',
    parentsPhone: '+213 555 890 123',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    justifiedAbsences: 6,
    unjustifiedAbsences: 0
  },
  {
    id: '3',
    matricule: '20INFO1236',
    firstName: 'Karim',
    lastName: 'Hadj',
    email: 'karim.hadj@esi-sba.dz',
    phone: '+213 555 345 678',
    parentsPhone: '+213 555 901 234',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    justifiedAbsences: 2,
    unjustifiedAbsences: 8
  }
];