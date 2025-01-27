import { supabase } from './supabase';

export const api = {
  auth: {
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return { data, error: null };
    },
    getSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    }
  },

  schools: {
    getAll: async () => {
      try {
        console.log('Fetching schools...');
        const { data, error } = await supabase
          .from('schools')
          .select('*');
        
        if (error) {
          console.error('Error fetching schools:', error);
          throw error;
        }

        console.log('Schools data:', data);
        return data || [];
      } catch (error) {
        console.error('Error in getAll schools:', error);
        throw error;
      }
    }
  },

  filieres: {
    getBySchoolId: async (schoolId: string) => {
      try {
        const { data, error } = await supabase
          .from('filieres')
          .select('*')
          .eq('school_id', schoolId);
        
        if (error) {
          console.error('Error fetching filieres:', error);
          throw error;
        }

        console.log('Filieres data:', data);
        return data || [];
      } catch (error) {
        console.error('Error in getBySchoolId filieres:', error);
        throw error;
      }
    }
  },

  inspectors: {
    getByEmail: async (email: string) => {
      try {
        const { data, error } = await supabase
          .from('inspectors')
          .select(`
            *,
            filieres (
              name
            )
          `)
          .eq('email', email)
          .single();

        if (error) {
          console.error('Error fetching inspector:', error);
          return { data: null, error };
        }

        return {
          data: {
            ...data,
            filiere_name: data.filieres.name
          },
          error: null
        };
      } catch (error) {
        console.error('Error in getByEmail inspector:', error);
        return { data: null, error };
      }
    }
  },

  classes: {
    getByFiliereId: async (filiereId: string) => {
      try {
        const { data, error } = await supabase
          .from('classes')
          .select('*')
          .eq('filiere_id', filiereId);
        
        if (error) {
          console.error('Error fetching classes:', error);
          throw error;
        }

        console.log('Classes data:', data);
        return data || [];
      } catch (error) {
        console.error('Error in getByFiliereId classes:', error);
        throw error;
      }
    }
  },

  students: {
    getByClassId: async (classId: string) => {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('class_id', classId);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
      }
    }
  }
};