import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Class, Student } from '../types';

export const exportClassToPDF = (classData: Class) => {
  const doc = new jsPDF();
  
  // En-tête
  doc.setFontSize(20);
  doc.text(`Rapport d'absences - ${classData.name}`, 14, 15);
  doc.setFontSize(11);
  doc.text(`Généré le ${format(new Date(), 'PPP', { locale: fr })}`, 14, 25);

  // Tableau des absences
  const tableData = classData.students.map(student => [
    `${student.firstName} ${student.lastName}`,
    student.matricule,
    `${student.justifiedAbsences}h`,
    `${student.unjustifiedAbsences}h`,
    `${student.justifiedAbsences + student.unjustifiedAbsences}h`
  ]);

  autoTable(doc, {
    head: [['Étudiant', 'Matricule', 'Justifiées', 'Non justifiées', 'Total']],
    body: tableData,
    startY: 35,
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: [239, 68, 68] },
  });

  // Statistiques
  const totalStudents = classData.students.length;
  const totalAbsences = classData.students.reduce(
    (sum, student) => sum + student.justifiedAbsences + student.unjustifiedAbsences,
    0
  );

  const statsY = (doc as any).lastAutoTable.finalY + 20;
  doc.text(`Nombre d'étudiants: ${totalStudents}`, 14, statsY);
  doc.text(`Total des absences: ${totalAbsences}h`, 14, statsY + 7);

  doc.save(`absences_${classData.name}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};