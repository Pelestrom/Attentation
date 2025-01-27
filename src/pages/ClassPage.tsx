import React, { useState, useEffect } from 'react';
import { Class, Student } from '../types';
import { StudentDetailsModal } from '../components/modals/StudentDetailsModal';
import { EditAbsencesModal } from '../components/modals/EditAbsencesModal';
import { SearchBar } from '../components/SearchBar';
import { StudentList } from '../components/StudentList';
import { ClassHeader } from '../components/ClassHeader';
import { api } from '../lib/api';
import { LoadingDots } from '../components/LoadingDots';

interface ClassPageProps {
  classData: Class;
  onBack: () => void;
}

export const ClassPage: React.FC<ClassPageProps> = ({ classData, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await api.students.getByClassId(classData.id);
        setStudents(data);
      } catch (err) {
        setError('Erreur lors du chargement des étudiants');
        console.error('Error loading students:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [classData.id]);

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveAbsences = async (justifiedHours: number, unjustifiedHours: number) => {
    if (!editingStudent) return;

    try {
      await api.students.updateAbsences(editingStudent.id, justifiedHours, unjustifiedHours);
      
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id
          ? {
              ...student,
              justifiedAbsences: justifiedHours,
              unjustifiedAbsences: unjustifiedHours,
            }
          : student
      );

      setStudents(updatedStudents);
      setEditingStudent(null);
    } catch (err) {
      console.error('Error updating absences:', err);
      // Vous pourriez ajouter une notification d'erreur ici
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <ClassHeader
        classData={classData}
        onBack={onBack}
        onExport={() => {}}
        onShowRFIDHistory={() => {}}
        hasSelectedStudent={false}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher un étudiant..."
          />
        </div>

        <StudentList
          students={filteredStudents}
          onEdit={setEditingStudent}
          onSelect={setSelectedStudent}
        />
      </div>

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {editingStudent && (
        <EditAbsencesModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSaveAbsences}
        />
      )}
    </div>
  );
};