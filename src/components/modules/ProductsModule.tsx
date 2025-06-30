
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Package
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductsModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const products = [
    {
      id: 1,
      nom: "Smartphone Galaxy S24",
      sku: "TEL-GS24-128",
      categorie: "Téléphones",
      fournisseur: "Samsung Electronics",
      prix_achat: 450.00,
      prix_min_vente: 500.00,
      prix_courant: 699.99,
      stock: 45,
      seuil_alerte: 10,
      description: "Smartphone dernière génération avec écran AMOLED"
    },
    {
      id: 2,
      nom: "Casque Audio Bluetooth",
      sku: "AUD-BT-PRO",
      categorie: "Audio",
      fournisseur: "Audio Tech",
      prix_achat: 25.50,
      prix_min_vente: 35.00,
      prix_courant: 59.99,
      stock: 12,
      seuil_alerte: 15,
      description: "Casque sans fil avec réduction de bruit active"
    },
    {
      id: 3,
      nom: "Chargeur USB-C 65W",
      sku: "ACC-CHG-65W",
      categorie: "Accessoires",
      fournisseur: "Power Solutions",
      prix_achat: 8.90,
      prix_min_vente: 12.00,
      prix_courant: 24.99,
      stock: 89,
      seuil_alerte: 20,
      description: "Chargeur rapide compatible tous appareils USB-C"
    },
    {
      id: 4,
      nom: "Écouteurs sans fil",
      sku: "AUD-EAR-PRO",
      categorie: "Audio",
      fournisseur: "Audio Tech",
      prix_achat: 15.00,
      prix_min_vente: 20.00,
      prix_courant: 39.99,
      stock: 3,
      seuil_alerte: 10,
      description: "Écouteurs true wireless avec étui de charge"
    }
  ];

  const categories = ["Téléphones", "Audio", "Accessoires", "Informatique"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.categorie === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock: number, seuil: number) => {
    if (stock === 0) return { label: "Rupture", variant: "destructive" as const };
    if (stock <= seuil) return { label: "Stock faible", variant: "secondary" as const };
    return { label: "En stock", variant: "default" as const };
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Produits</h1>
          <p className="text-slate-600">Gérez votre catalogue de produits</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Produit
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock, product.seuil_alerte);
          const marge = ((product.prix_courant - product.prix_achat) / product.prix_achat * 100).toFixed(1);
          
          return (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{product.nom}</CardTitle>
                      <CardDescription className="text-sm">
                        SKU: {product.sku}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Catégorie:</span>
                  <Badge variant="outline">{product.categorie}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Stock:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{product.stock}</span>
                    <Badge variant={stockStatus.variant} className="text-xs">
                      {stockStatus.label}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prix d'achat:</span>
                    <span className="font-medium">€{product.prix_achat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prix de vente:</span>
                    <span className="font-semibold text-green-600">€{product.prix_courant.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Marge:</span>
                    <span className="font-medium text-green-600">+{marge}%</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="text-xs text-slate-400">
                  Fournisseur: {product.fournisseur}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-slate-600 mb-4">
              Aucun produit ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setCategoryFilter("all"); }}>
              Réinitialiser les filtres
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { ProductsModule };
