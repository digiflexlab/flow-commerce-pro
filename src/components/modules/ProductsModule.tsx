
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<'produits'>;
type Category = Tables<'categories'>;
type Supplier = Tables<'fournisseurs'>;

export const ProductsModule = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nom: "",
    sku: "",
    categorie_id: "",
    fournisseur_id: "",
    prix_achat: "",
    prix_min_vente: "",
    prix_courant: "",
    description: "",
    date_expiration: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('produits')
      .select(`
        *,
        categories(nom),
        fournisseurs(nom)
      `);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const fetchSuppliers = async () => {
    const { data, error } = await supabase
      .from('fournisseurs')
      .select('*');

    if (error) {
      console.error('Error fetching suppliers:', error);
    } else {
      setSuppliers(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      nom: formData.nom,
      sku: formData.sku,
      categorie_id: formData.categorie_id || null,
      fournisseur_id: formData.fournisseur_id || null,
      prix_achat: parseFloat(formData.prix_achat),
      prix_min_vente: parseFloat(formData.prix_min_vente),
      prix_courant: parseFloat(formData.prix_courant),
      description: formData.description || null,
      date_expiration: formData.date_expiration || null,
    };

    let error;
    if (editingProduct) {
      const { error: updateError } = await supabase
        .from('produits')
        .update(productData)
        .eq('id', editingProduct.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('produits')
        .insert([productData]);
      error = insertError;
    }

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: editingProduct ? "Produit modifié avec succès" : "Produit créé avec succès",
      });
      setDialogOpen(false);
      resetForm();
      fetchProducts();
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    const { error } = await supabase
      .from('produits')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
      });
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      sku: product.sku,
      categorie_id: product.categorie_id || "",
      fournisseur_id: product.fournisseur_id || "",
      prix_achat: product.prix_achat.toString(),
      prix_min_vente: product.prix_min_vente.toString(),
      prix_courant: product.prix_courant.toString(),
      description: product.description || "",
      date_expiration: product.date_expiration || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      nom: "",
      sku: "",
      categorie_id: "",
      fournisseur_id: "",
      prix_achat: "",
      prix_min_vente: "",
      prix_courant: "",
      description: "",
      date_expiration: "",
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.categorie_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Produits</h1>
          <p className="text-slate-600">Gérez votre catalogue de produits</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Nouveau Produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Modifier le Produit" : "Nouveau Produit"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Modifiez les informations du produit" : "Ajoutez un nouveau produit à votre catalogue"}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom du produit *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select value={formData.categorie_id} onValueChange={(value) => setFormData({...formData, categorie_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fournisseur">Fournisseur</Label>
                    <Select value={formData.fournisseur_id} onValueChange={(value) => setFormData({...formData, fournisseur_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un fournisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prix_achat">Prix d'achat *</Label>
                    <Input
                      id="prix_achat"
                      type="number"
                      step="0.01"
                      value={formData.prix_achat}
                      onChange={(e) => setFormData({...formData, prix_achat: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prix_min_vente">Prix min. vente *</Label>
                    <Input
                      id="prix_min_vente"
                      type="number"
                      step="0.01"
                      value={formData.prix_min_vente}
                      onChange={(e) => setFormData({...formData, prix_min_vente: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prix_courant">Prix de vente *</Label>
                    <Input
                      id="prix_courant"
                      type="number"
                      step="0.01"
                      value={formData.prix_courant}
                      onChange={(e) => setFormData({...formData, prix_courant: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_expiration">Date d'expiration</Label>
                  <Input
                    id="date_expiration"
                    type="date"
                    value={formData.date_expiration}
                    onChange={(e) => setFormData({...formData, date_expiration: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : editingProduct ? "Modifier" : "Créer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom ou SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Produits</CardTitle>
          <CardDescription>{filteredProducts.length} produit(s) trouvé(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Prix d'achat</TableHead>
                  <TableHead>Prix de vente</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.nom}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.sku}</Badge>
                    </TableCell>
                    <TableCell>{(product as any).categories?.nom || "-"}</TableCell>
                    <TableCell>{(product as any).fournisseurs?.nom || "-"}</TableCell>
                    <TableCell>€ {product.prix_achat}</TableCell>
                    <TableCell>€ {product.prix_courant}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
