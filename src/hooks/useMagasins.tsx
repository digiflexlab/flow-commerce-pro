
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMagasins = () => {
  const [magasins, setMagasins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMagasins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('magasins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMagasins(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les magasins",
        variant: "destructive",
      });
      console.error('Error fetching magasins:', error);
    } finally {
      setLoading(false);
    }
  };

  const insertMagasin = async (newData: any) => {
    try {
      const { error } = await supabase
        .from('magasins')
        .insert([newData]);

      if (error) throw error;
      
      await fetchMagasins();
      toast({
        title: "Succès",
        description: "Magasin ajouté avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le magasin",
        variant: "destructive",
      });
      console.error('Error inserting magasin:', error);
    }
  };

  const updateMagasin = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('magasins')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchMagasins();
      toast({
        title: "Succès",
        description: "Magasin mis à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le magasin",
        variant: "destructive",
      });
      console.error('Error updating magasin:', error);
    }
  };

  const deleteMagasin = async (id: string) => {
    try {
      const { error } = await supabase
        .from('magasins')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchMagasins();
      toast({
        title: "Succès",
        description: "Magasin supprimé avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le magasin",
        variant: "destructive",
      });
      console.error('Error deleting magasin:', error);
    }
  };

  useEffect(() => {
    fetchMagasins();
  }, []);

  return {
    data: magasins,
    loading,
    fetchData: fetchMagasins,
    insertData: insertMagasin,
    updateData: updateMagasin,
    deleteData: deleteMagasin,
  };
};
