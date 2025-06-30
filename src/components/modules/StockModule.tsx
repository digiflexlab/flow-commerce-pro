
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Warehouse, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Package,
  Search,
  Filter
} from "lucide-react";

const StockModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const magasins = [
    {
      id: 1,
      nom: "Magasin Centre-Ville",
      adresse: "15 Rue de la République, 75001 Paris",
      telephone: "01 42 86 75 30",
      email: "centre@gestioflow.com",
      statut: "Actif"
    },
    {
      id: 2,
      nom: "Magasin Banlieue Nord",
      adresse: "45 Avenue des Champs, 93200 Saint-Denis",
      telephone: "01 48 13 25 67",
      email: "nord@gestioflow.com",
      statut: "Actif"
    },
    {
      id: 3,
      nom: "Magasin Sud",
      adresse: "12 Boulevard du Midi, 13008 Marseille",
      telephone: "04 91 25 48 37",
      email: "sud@gestioflow.com",
      statut: "Maintenance"
    }
  ];

  const stockParMagasin = [
    {
      produit: "Smartphone Galaxy S24",
      sku: "TEL-GS24-128",
      magasins: [
        { id: 1, nom: "Centre-Ville", stock: 15, seuil: 10, statut: "ok" },
        { id: 2, nom: "Banlieue Nord", stock: 20, seuil: 10, statut: "ok" },
        { id: 3, nom: "Sud", stock: 10, seuil: 10, statut: "limite" }
      ],
      total: 45
    },
    {
      produit: "Casque Audio Bluetooth",
      sku: "AUD-BT-PRO",
      magasins: [
        { id: 1, nom: "Centre-Ville", stock: 3, seuil: 5, statut: "critique" },
        { id: 2, nom: "Banlieue Nord", stock: 7, seuil: 5, statut: "ok" },
        { id: 3, nom: "Sud", stock: 2, seuil: 5, statut: "critique" }
      ],
      total: 12
    },
    {
      produit: "Chargeur USB-C 65W",
      sku: "ACC-CHG-65W",
      magasins: [
        { id: 1, nom: "Centre-Ville", stock: 30, seuil: 10, statut: "ok" },
        { id: 2, nom: "Banlieue Nord", stock: 35, seuil: 10, statut: "ok" },
        { id: 3, nom: "Sud", stock: 24, seuil: 10, statut: "ok" }
      ],
      total: 89
    }
  ];

  const alertesStock = [
    {
      produit: "Écouteurs sans fil",
      sku: "AUD-EAR-PRO",
      magasin: "Centre-Ville",
      stock_actuel: 2,
      seuil_alerte: 10,
      niveau: "critique"
    },
    {
      produit: "Casque Audio Bluetooth",
      sku: "AUD-BT-PRO",
      magasin: "Centre-Ville",
      stock_actuel: 3,
      seuil_alerte: 5,
      niveau: "faible"
    },
    {
      produit: "Casque Audio Bluetooth",
      sku: "AUD-BT-PRO",
      magasin: "Sud",
      stock_actuel: 2,
      seuil_alerte: 5,
      niveau: "critique"
    }
  ];

  const getStockBadge = (statut: string) => {
    switch (statut) {
      case "ok":
        return <Badge variant="default" className="bg-green-100 text-green-800">En stock</Badge>;
      case "limite":
        return <Badge variant="secondary">Stock limite</Badge>;
      case "critique":
        return <Badge variant="destructive">Stock critique</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Stock & Magasins</h1>
          <p className="text-slate-600">Gérez vos stocks et magasins</p>
        </div>
      </div>

      <Tabs defaultValue="stock" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stock">Vue Stock</TabsTrigger>
          <TabsTrigger value="magasins">Magasins</TabsTrigger>
          <TabsTrigger value="alertes">Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-6">
          {/* Vue globale des stocks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-600">Produits Référencés</p>
                    <p className="text-xl font-bold">247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-slate-600">Valeur Stock Total</p>
                    <p className="text-xl font-bold">€125,847</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-600">Alertes Stock</p>
                    <p className="text-xl font-bold text-orange-600">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-slate-600">Ruptures</p>
                    <p className="text-xl font-bold text-red-600">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détail stock par magasin */}
          <Card>
            <CardHeader>
              <CardTitle>Stock par Magasin</CardTitle>
              <CardDescription>
                Vue détaillée des stocks dans chaque magasin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockParMagasin.map((item) => (
                  <div key={item.sku} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-slate-800">{item.produit}</h4>
                        <p className="text-sm text-slate-500">SKU: {item.sku} • Total: {item.total} unités</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {item.magasins.map((magasin) => (
                        <div key={magasin.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{magasin.nom}</p>
                            <p className="text-xs text-slate-500">Stock: {magasin.stock} / Seuil: {magasin.seuil}</p>
                          </div>
                          {getStockBadge(magasin.statut)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="magasins" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gestion des Magasins</h2>
            <Button className="bg-violet-600 hover:bg-violet-700">
              Nouveau Magasin
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {magasins.map((magasin) => (
              <Card key={magasin.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-violet-600" />
                      <span>{magasin.nom}</span>
                    </CardTitle>
                    <Badge variant={magasin.statut === "Actif" ? "default" : "secondary"}>
                      {magasin.statut}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Adresse:</p>
                    <p className="text-sm font-medium">{magasin.adresse}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Téléphone:</p>
                    <p className="text-sm font-medium">{magasin.telephone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email:</p>
                    <p className="text-sm font-medium">{magasin.email}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      Gérer l'inventaire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alertes" className="space-y-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-700">
                <AlertTriangle className="w-5 h-5" />
                <span>Alertes Stock Actives</span>
              </CardTitle>
              <CardDescription className="text-orange-600">
                {alertesStock.length} produit{alertesStock.length > 1 ? 's' : ''} nécessite{alertesStock.length === 1 ? '' : 'nt'} votre attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertesStock.map((alerte, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`w-5 h-5 ${alerte.niveau === 'critique' ? 'text-red-600' : 'text-orange-600'}`} />
                        <div>
                          <p className="font-medium text-slate-800">{alerte.produit}</p>
                          <p className="text-sm text-slate-500">
                            {alerte.magasin} • SKU: {alerte.sku}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Stock: {alerte.stock_actuel} / {alerte.seuil_alerte}
                      </p>
                      <Badge variant={alerte.niveau === 'critique' ? 'destructive' : 'secondary'} className="text-xs">
                        {alerte.niveau === 'critique' ? 'Critique' : 'Stock faible'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { StockModule };
