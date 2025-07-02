
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseData = (table: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de charger les données de ${table}`,
        variant: "destructive",
      });
      console.error(`Error fetching ${table}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const insertData = async (newData: any) => {
    try {
      const { error } = await supabase
        .from(table)
        .insert([newData]);

      if (error) throw error;
      
      await fetchData();
      toast({
        title: "Succès",
        description: "Données ajoutées avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter les données",
        variant: "destructive",
      });
      console.error(`Error inserting to ${table}:`, error);
    }
  };

  const updateData = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchData();
      toast({
        title: "Succès",
        description: "Données mises à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données",
        variant: "destructive",
      });
      console.error(`Error updating ${table}:`, error);
    }
  };

  const deleteData = async (id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchData();
      toast({
        title: "Succès",
        description: "Données supprimées avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les données",
        variant: "destructive",
      });
      console.error(`Error deleting from ${table}:`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  return {
    data,
    loading,
    fetchData,
    insertData,
    updateData,
    deleteData,
  };
};
