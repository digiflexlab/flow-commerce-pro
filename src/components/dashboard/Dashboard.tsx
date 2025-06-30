
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  Euro,
  Users,
  Store
} from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Chiffre d'Affaires",
      value: "€15,847",
      change: "+12.5%",
      trend: "up",
      icon: Euro,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Ventes du Jour",
      value: "47",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Produits en Stock",
      value: "1,247",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Alertes Stock",
      value: "12",
      change: "Critique",
      trend: "alert",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const recentSales = [
    { id: "VT-001", client: "Marie Dubois", montant: "€245.50", produits: 3, heure: "14:30" },
    { id: "VT-002", client: "Jean Martin", montant: "€89.90", produits: 1, heure: "14:15" },
    { id: "VT-003", client: "Sarah Wilson", montant: "€156.75", produits: 2, heure: "13:45" },
    { id: "VT-004", client: "Client Anonyme", montant: "€34.99", produits: 1, heure: "13:30" }
  ];

  const topProducts = [
    { nom: "Smartphone Galaxy S24", ventes: 23, stock: 45, statut: "En stock" },
    { nom: "Casque Audio Bluetooth", ventes: 18, stock: 12, statut: "Stock faible" },
    { nom: "Chargeur USB-C", ventes: 15, stock: 89, statut: "En stock" },
    { nom: "Écouteurs sans fil", ventes: 12, stock: 3, statut: "Critique" }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{kpi.value}</div>
                <div className="flex items-center mt-2">
                  {kpi.trend === "up" && (
                    <>
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">{kpi.change}</span>
                    </>
                  )}
                  {kpi.trend === "down" && (
                    <>
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      <span className="text-sm text-red-600">{kpi.change}</span>
                    </>
                  )}
                  {kpi.trend === "alert" && (
                    <Badge variant="destructive" className="text-xs">
                      {kpi.change}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventes Récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span>Ventes Récentes</span>
            </CardTitle>
            <CardDescription>
              Dernières transactions de la journée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{sale.client}</p>
                    <p className="text-sm text-slate-500">
                      {sale.id} • {sale.produits} produit{sale.produits > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">{sale.montant}</p>
                    <p className="text-sm text-slate-500">{sale.heure}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produits Populaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-orange-600" />
              <span>Produits Populaires</span>
            </CardTitle>
            <CardDescription>
              Meilleurs ventes de la semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.nom} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{product.nom}</p>
                    <p className="text-sm text-slate-500">{product.ventes} ventes • Stock: {product.stock}</p>
                  </div>
                  <Badge 
                    variant={
                      product.statut === "Critique" ? "destructive" : 
                      product.statut === "Stock faible" ? "secondary" : "default"
                    }
                    className="text-xs"
                  >
                    {product.statut}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et Actions Rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alertes Stock</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">12 produits sous le seuil critique</p>
            <button className="mt-2 text-sm text-red-700 underline hover:text-red-800">
              Voir les détails
            </button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Équipe Active</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-600">8 vendeurs connectés</p>
            <p className="text-sm text-blue-500 mt-1">3 rapports en attente</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center space-x-2">
              <Store className="w-5 h-5" />
              <span>Magasins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">3 magasins actifs</p>
            <p className="text-sm text-green-500 mt-1">Tous opérationnels</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Dashboard };
