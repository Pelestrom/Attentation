/*
  # Initial database schema

  1. New Tables
    - schools
      - id (uuid, primary key)
      - name (text)
      - created_at (timestamp)
    
    - departments
      - id (uuid, primary key)
      - name (text)
      - school_id (uuid, foreign key)
      - created_at (timestamp)
    
    - classes
      - id (uuid, primary key)
      - name (text)
      - department_id (uuid, foreign key)
      - created_at (timestamp)
    
    - inspectors
      - id (uuid, primary key)
      - email (text)
      - department_id (uuid, foreign key)
      - created_at (timestamp)
    
    - students
      - id (uuid, primary key)
      - first_name (text)
      - last_name (text)
      - email (text)
      - phone (text)
      - parents_phone (text)
      - profile_image (text)
      - matricule (text)
      - rfid_card_id (text)
      - class_id (uuid, foreign key)
      - created_at (timestamp)
    
    - absences
      - id (uuid, primary key)
      - student_id (uuid, foreign key)
      - week_start_date (date)
      - justified_hours (integer)
      - unjustified_hours (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE inspectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  parents_phone text,
  profile_image text,
  matricule text UNIQUE NOT NULL,
  rfid_card_id text UNIQUE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE absences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  week_start_date date NOT NULL,
  justified_hours integer DEFAULT 0,
  unjustified_hours integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all authenticated users"
ON schools FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to all authenticated users"
ON departments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to all authenticated users"
ON classes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to all authenticated users"
ON inspectors FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to all authenticated users"
ON students FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to all authenticated users"
ON absences FOR SELECT
TO authenticated
USING (true);

-- Create policy for inspectors to update absences
CREATE POLICY "Allow inspectors to update absences"
ON absences FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM inspectors i
    JOIN students s ON s.class_id IN (
      SELECT c.id FROM classes c
      WHERE c.department_id = i.department_id
    )
    WHERE i.email = auth.email()
    AND s.id = absences.student_id
  )
);