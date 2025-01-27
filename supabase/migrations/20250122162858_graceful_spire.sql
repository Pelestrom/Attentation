/*
  # Seed initial data

  1. Data Population
    - Schools
    - Departments
    - Classes
    - Inspectors
    - Students
    - Initial absences data

  2. Notes
    - All IDs are generated using gen_random_uuid()
    - Foreign key relationships are maintained using variables
*/

DO $$
DECLARE
  esi_id uuid;
  esmg_id uuid;
  escae_id uuid;
  esas_id uuid;
  stic_id uuid;
  info_id uuid;
  ts_stic_1a_id uuid;
  ing_stic_1b_id uuid;
  ts_info_2_id uuid;
BEGIN
  -- Insert Schools
  INSERT INTO schools (id, name) VALUES
    (gen_random_uuid(), 'ESI') RETURNING id INTO esi_id;
  INSERT INTO schools (id, name) VALUES
    (gen_random_uuid(), 'ESMG') RETURNING id INTO esmg_id;
  INSERT INTO schools (id, name) VALUES
    (gen_random_uuid(), 'ESCAE') RETURNING id INTO escae_id;
  INSERT INTO schools (id, name) VALUES
    (gen_random_uuid(), 'ESAS') RETURNING id INTO esas_id;

  -- Insert Departments
  INSERT INTO departments (id, name, school_id) VALUES
    (gen_random_uuid(), 'STIC', esi_id) RETURNING id INTO stic_id;
  INSERT INTO departments (id, name, school_id) VALUES
    (gen_random_uuid(), 'INFO', esi_id) RETURNING id INTO info_id;

  -- Insert Classes
  INSERT INTO classes (id, name, department_id) VALUES
    (gen_random_uuid(), 'TS STIC 1-A', stic_id) RETURNING id INTO ts_stic_1a_id;
  INSERT INTO classes (id, name, department_id) VALUES
    (gen_random_uuid(), 'ING STIC 1-B', stic_id) RETURNING id INTO ing_stic_1b_id;
  INSERT INTO classes (id, name, department_id) VALUES
    (gen_random_uuid(), 'TS INFO 2', info_id) RETURNING id INTO ts_info_2_id;

  -- Insert Inspectors
  INSERT INTO inspectors (id, email, department_id) VALUES
    (gen_random_uuid(), 'inspector.stic@esi-sba.dz', stic_id);
  INSERT INTO inspectors (id, email, department_id) VALUES
    (gen_random_uuid(), 'inspector.info@esi-sba.dz', info_id);

  -- Insert Students
  INSERT INTO students (
    id, first_name, last_name, email, phone, parents_phone, 
    profile_image, matricule, rfid_card_id, class_id
  ) VALUES
    (
      gen_random_uuid(),
      'Thomas',
      'Dubois',
      'thomas.dubois@esi-sba.dz',
      '+213 555 123 456',
      '+213 555 789 012',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      '20INFO1234',
      'RFID001',
      ts_stic_1a_id
    ),
    (
      gen_random_uuid(),
      'Sarah',
      'Benali',
      'sarah.benali@esi-sba.dz',
      '+213 555 234 567',
      '+213 555 890 123',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      '20INFO1235',
      'RFID002',
      ts_stic_1a_id
    ),
    (
      gen_random_uuid(),
      'Karim',
      'Hadj',
      'karim.hadj@esi-sba.dz',
      '+213 555 345 678',
      '+213 555 901 234',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      '20INFO1236',
      'RFID003',
      ts_info_2_id
    );
END $$;