/*
  # Database Restructure

  1. Changes
    - Rename tables:
      - departments -> filieres
      - classes -> cours
    - Change UUIDs to auto-incrementing IDs
    - Add password column to inspectors
    - Add week column to absences
    - Set up authentication

  2. Security
    - Enable RLS on all tables
    - Add policies for inspectors
*/

-- Rename tables and restructure with serial IDs
ALTER TABLE departments RENAME TO filieres;
ALTER TABLE classes RENAME TO cours;

-- Create temporary tables with new structure
CREATE TABLE temp_schools (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE temp_filieres (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  school_id integer REFERENCES temp_schools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE temp_cours (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  filiere_id integer REFERENCES temp_filieres(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE temp_inspectors (
  id SERIAL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  filiere_id integer REFERENCES temp_filieres(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE temp_students (
  id SERIAL PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  parents_phone text,
  profile_image text,
  matricule text UNIQUE NOT NULL,
  rfid_card_id text UNIQUE,
  cours_id integer REFERENCES temp_cours(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE temp_absences (
  id SERIAL PRIMARY KEY,
  student_id integer REFERENCES temp_students(id) ON DELETE CASCADE,
  week_number text NOT NULL,
  week_start_date date NOT NULL,
  justified_hours integer DEFAULT 0,
  unjustified_hours integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Copy data to new tables
INSERT INTO temp_schools (name)
SELECT name FROM schools;

INSERT INTO temp_filieres (name, school_id)
SELECT d.name, s2.id
FROM filieres d
JOIN schools s1 ON d.school_id = s1.id
JOIN temp_schools s2 ON s2.name = s1.name;

INSERT INTO temp_cours (name, filiere_id)
SELECT c.name, f2.id
FROM cours c
JOIN filieres f1 ON c.department_id = f1.id
JOIN temp_filieres f2 ON f2.name = f1.name;

-- Insert inspectors with hashed passwords
INSERT INTO temp_inspectors (email, password, filiere_id)
SELECT 
  i.email,
  crypt('password123', gen_salt('bf')), -- Default password, should be changed
  f2.id
FROM inspectors i
JOIN filieres f1 ON i.department_id = f1.id
JOIN temp_filieres f2 ON f2.name = f1.name;

INSERT INTO temp_students (
  first_name, last_name, email, phone, parents_phone,
  profile_image, matricule, rfid_card_id, cours_id
)
SELECT 
  s.first_name,
  s.last_name,
  s.email,
  s.phone,
  s.parents_phone,
  s.profile_image,
  s.matricule,
  s.rfid_card_id,
  c2.id
FROM students s
JOIN cours c1 ON s.class_id = c1.id
JOIN temp_cours c2 ON c2.name = c1.name;

-- Drop old tables
DROP TABLE absences;
DROP TABLE students;
DROP TABLE inspectors;
DROP TABLE cours;
DROP TABLE filieres;
DROP TABLE schools;

-- Rename temp tables to final names
ALTER TABLE temp_schools RENAME TO schools;
ALTER TABLE temp_filieres RENAME TO filieres;
ALTER TABLE temp_cours RENAME TO cours;
ALTER TABLE temp_inspectors RENAME TO inspectors;
ALTER TABLE temp_students RENAME TO students;
ALTER TABLE temp_absences RENAME TO absences;

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE filieres ENABLE ROW LEVEL SECURITY;
ALTER TABLE cours ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;

-- Create authentication function
CREATE OR REPLACE FUNCTION authenticate_inspector(
  p_email text,
  p_password text
) RETURNS json AS $$
DECLARE
  v_inspector inspectors%ROWTYPE;
  v_token text;
BEGIN
  SELECT * INTO v_inspector
  FROM inspectors
  WHERE email = p_email AND password = crypt(p_password, password);
  
  IF v_inspector.id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Invalid credentials');
  END IF;
  
  -- Generate JWT token
  SELECT sign(
    json_build_object(
      'role', 'inspector',
      'inspector_id', v_inspector.id,
      'filiere_id', v_inspector.filiere_id,
      'exp', extract(epoch from now() + interval '24 hours')::integer
    ),
    current_setting('app.jwt_secret')
  ) INTO v_token;
  
  RETURN json_build_object(
    'success', true,
    'token', v_token,
    'inspector', json_build_object(
      'id', v_inspector.id,
      'email', v_inspector.email,
      'filiere_id', v_inspector.filiere_id
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies
CREATE POLICY "Allow inspectors to read their filiere data"
ON filieres FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT filiere_id FROM inspectors 
    WHERE email = current_setting('request.jwt.claims')::json->>'email'
  )
);

CREATE POLICY "Allow inspectors to read their cours data"
ON cours FOR SELECT
TO authenticated
USING (
  filiere_id IN (
    SELECT filiere_id FROM inspectors 
    WHERE email = current_setting('request.jwt.claims')::json->>'email'
  )
);

CREATE POLICY "Allow inspectors to read their students data"
ON students FOR SELECT
TO authenticated
USING (
  cours_id IN (
    SELECT c.id FROM cours c
    JOIN inspectors i ON c.filiere_id = i.filiere_id
    WHERE i.email = current_setting('request.jwt.claims')::json->>'email'
  )
);

CREATE POLICY "Allow inspectors to manage absences for their students"
ON absences FOR ALL
TO authenticated
USING (
  student_id IN (
    SELECT s.id FROM students s
    JOIN cours c ON s.cours_id = c.id
    JOIN inspectors i ON c.filiere_id = i.filiere_id
    WHERE i.email = current_setting('request.jwt.claims')::json->>'email'
  )
);