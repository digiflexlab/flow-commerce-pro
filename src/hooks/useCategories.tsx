
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const insertCategory = async (newData: any) => {
    try {
      const { error } = await supabase
        .from('categories')
        .insert([newData]);

      if (error) throw error;
      
      await fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie ajoutée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie",
        variant: "destructive",
      });
      console.error('Error inserting category:', error);
    }
  };

  const updateCategory = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie mise à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      });
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    data: categories,
    loading,
    fetchData: fetchCategories,
    insertData: insertCategory,
    updateData: updateCategory,
    deleteData: deleteCategory,
  };
};
