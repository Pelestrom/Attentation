/*
  # Database Schema Update
  
  1. Changes
    - Drop existing tables with CASCADE to handle dependencies
    - Recreate tables with serial IDs
    - Add password field for inspectors
    - Add week number for absences
    - Set up proper relationships and constraints
*/

-- Drop existing tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS absences CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS inspectors CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS filieres CASCADE;
DROP TABLE IF EXISTS schools CASCADE;

-- Create tables with serial IDs
CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE filieres (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  school_id integer REFERENCES schools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  filiere_id integer REFERENCES filieres(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE inspectors (
  id SERIAL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password varchar(5) NOT NULL DEFAULT '12345',
  filiere_id integer REFERENCES filieres(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT password_format CHECK (password ~ '^[0-9]{5}$')
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  parents_phone text,
  profile_image text,
  matricule text UNIQUE NOT NULL,
  rfid_card_id text UNIQUE,
  class_id integer REFERENCES classes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE absences (
  id SERIAL PRIMARY KEY,
  student_id integer REFERENCES students(id) ON DELETE CASCADE,
  week_number text NOT NULL,
  week_start_date date NOT NULL,
  justified_hours integer DEFAULT 0,
  unjustified_hours integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insert initial data
INSERT INTO schools (name) VALUES
  ('ESI'),
  ('ESMG'),
  ('ESCAE'),
  ('ESAS');

-- Insert departments for ESI
WITH esi AS (SELECT id FROM schools WHERE name = 'ESI')
INSERT INTO filieres (name, school_id) VALUES
  ('STIC', (SELECT id FROM esi)),
  ('INFO', (SELECT id FROM esi));

-- Insert classes
WITH 
  stic AS (SELECT id FROM filieres WHERE name = 'STIC'),
  info AS (SELECT id FROM filieres WHERE name = 'INFO')
INSERT INTO classes (name, filiere_id) VALUES
  ('TS STIC 1-A', (SELECT id FROM stic)),
  ('ING STIC 1-B', (SELECT id FROM stic)),
  ('TS INFO 2', (SELECT id FROM info));

-- Insert inspectors
WITH 
  stic AS (SELECT id FROM filieres WHERE name = 'STIC'),
  info AS (SELECT id FROM filieres WHERE name = 'INFO')
INSERT INTO inspectors (email, password, filiere_id) VALUES
  ('inspector.stic@esi-sba.dz', '12345', (SELECT id FROM stic)),
  ('inspector.info@esi-sba.dz', '12345', (SELECT id FROM info));

-- Insert students
WITH ts_stic_1a AS (SELECT id FROM classes WHERE name = 'TS STIC 1-A'),
     ts_info_2 AS (SELECT id FROM classes WHERE name = 'TS INFO 2')
INSERT INTO students (
  first_name, last_name, email, phone, parents_phone,
  profile_image, matricule, rfid_card_id, class_id
) VALUES
  (
    'Thomas',
    'Dubois',
    'thomas.dubois@esi-sba.dz',
    '+213 555 123 456',
    '+213 555 789 012',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    '20INFO1234',
    'RFID001',
    (SELECT id FROM ts_stic_1a)
  ),
  (
    'Sarah',
    'Benali',
    'sarah.benali@esi-sba.dz',
    '+213 555 234 567',
    '+213 555 890 123',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    '20INFO1235',
    'RFID002',
    (SELECT id FROM ts_stic_1a)
  ),
  (
    'Karim',
    'Hadj',
    'karim.hadj@esi-sba.dz',
    '+213 555 345 678',
    '+213 555 901 234',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    '20INFO1236',
    'RFID003',
    (SELECT id FROM ts_info_2)
  );

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE filieres ENABLE ROW LEVEL SECURITY;
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
ON filieres FOR SELECT
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

CREATE POLICY "Allow inspectors to manage absences"
ON absences FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM inspectors i
    JOIN classes c ON c.filiere_id = i.filiere_id
    JOIN students s ON s.class_id = c.id
    WHERE i.email = auth.email()
    AND s.id = absences.student_id
  )
);