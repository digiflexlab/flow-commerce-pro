
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Package, Users, ShoppingCart, AlertTriangle, Euro } from "lucide-react";

const salesData = [
  { name: 'Lun', ventes: 2400, revenus: 4800 },
  { name: 'Mar', ventes: 1398, revenus: 2796 },
  { name: 'Mer', ventes: 9800, revenus: 19600 },
  { name: 'Jeu', ventes: 3908, revenus: 7816 },
  { name: 'Ven', ventes: 4800, revenus: 9600 },
  { name: 'Sam', ventes: 3800, revenus: 7600 },
  { name: 'Dim', ventes: 4300, revenus: 8600 },
];

const topProducts = [
  { name: 'Smartphone XR', sales: 245, revenue: 12250 },
  { name: 'Écouteurs Bluetooth', sales: 189, revenue: 5670 },
  { name: 'Chargeur USB-C', sales: 156, revenue: 1560 },
  { name: 'Coque de Protection', sales: 134, revenue: 1340 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du Jour</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ 12,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> par rapport à hier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> par rapport à hier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">12 nouveaux cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 connectés maintenant</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventes de la Semaine</CardTitle>
            <CardDescription>Évolution des ventes et revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventes" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendance des Revenus</CardTitle>
            <CardDescription>Revenus quotidiens</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenus" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Produits les Plus Vendus</CardTitle>
            <CardDescription>Top 4 cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€ {product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Alertes Stock
            </CardTitle>
            <CardDescription>Produits à réapprovisionner</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Écouteurs Bluetooth</p>
                  <p className="text-sm text-gray-500">Magasin Central</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={15} className="w-20" />
                  <span className="text-sm font-medium">3/20</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chargeur USB-C</p>
                  <p className="text-sm text-gray-500">Magasin Central</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={25} className="w-20" />
                  <span className="text-sm font-medium">5/20</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Coque iPhone</p>
                  <p className="text-sm text-gray-500">Magasin Sud</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={40} className="w-20" />
                  <span className="text-sm font-medium">8/20</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
