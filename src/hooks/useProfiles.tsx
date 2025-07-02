
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  nom: string;
  role: 'admin' | 'manager' | 'vendeur';
  created_at: string;
  updated_at: string;
}

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Assurer que les rôles correspondent à notre type union
      const typedProfiles: Profile[] = (data || []).map(profile => ({
        ...profile,
        role: profile.role as 'admin' | 'manager' | 'vendeur'
      }));
      
      setProfiles(typedProfiles);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les profils utilisateurs",
        variant: "destructive",
      });
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchProfiles();
      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    profiles,
    loading,
    fetchProfiles,
    updateProfile,
  };
};
