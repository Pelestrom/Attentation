export interface School {
  id: string;
  name: string;
  filieres: Filiere[];
}

export interface Filiere {
  id: string;
  name: string;
  school_id: string;
  classes: Class[];
}

export interface Class {
  id: string;
  name: string;
  filiere_id: string;
  students: Student[];
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  parents_phone: string;
  profile_image: string;
  matricule: string;
  class_id: string;
}