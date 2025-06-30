
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Shield,
  UserCheck
} from "lucide-react";

const UsersModule = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      nom: "Sophie Martin",
      email: "sophie.martin@gestioflow.com",
      role: "admin",
      magasins: ["Centre-Ville", "Banlieue Nord"],
      statut: "Actif",
      derniere_connexion: "Aujourd'hui à 14:30",
      ventes_mois: 156,
      initiales: "SM"
    },
    {
      id: 2,
      nom: "Pierre Durand",
      email: "pierre.durand@gestioflow.com",
      role: "manager",
      magasins: ["Centre-Ville"],
      statut: "Actif",
      derniere_connexion: "Aujourd'hui à 12:45",
      ventes_mois: 89,
      initiales: "PD"
    },
    {
      id: 3,
      nom: "Marie Dubois",
      email: "marie.dubois@gestioflow.com",
      role: "vendeur",
      magasins: ["Centre-Ville"],
      statut: "Actif",
      derniere_connexion: "Aujourd'hui à 16:20",
      ventes_mois: 234,
      initiales: "MD"
    },
    {
      id: 4,
      nom: "Jean Lefebvre",
      email: "jean.lefebvre@gestioflow.com",
      role: "vendeur",
      magasins: ["Banlieue Nord"],
      statut: "Inactif",
      derniere_connexion: "Hier à 18:00",
      ventes_mois: 67,
      initiales: "JL"
    },
    {
      id: 5,
      nom: "Claire Moreau",
      email: "claire.moreau@gestioflow.com",
      role: "manager",
      magasins: ["Sud"],
      statut: "Actif",
      derniere_connexion: "Aujourd'hui à 10:15",
      ventes_mois: 145,
      initiales: "CM"
    }
  ];

  const roleLabels = {
    admin: "Administrateur",
    manager: "Manager",
    vendeur: "Vendeur"
  };

  const roleColors = {
    admin: "destructive",
    manager: "default",
    vendeur: "secondary"
  } as const;

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roleLabels[user.role as keyof typeof roleLabels].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsGlobales = {
    total_users: users.length,
    actifs: users.filter(u => u.statut === "Actif").length,
    admins: users.filter(u => u.role === "admin").length,
    managers: users.filter(u => u.role === "manager").length,
    vendeurs: users.filter(u => u.role === "vendeur").length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
          <p className="text-slate-600">Gérez les comptes et permissions</p>
        </div>
        
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-violet-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{statsGlobales.total_users}</p>
            <p className="text-sm text-slate-600">Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{statsGlobales.actifs}</p>
            <p className="text-sm text-slate-600">Actifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{statsGlobales.admins}</p>
            <p className="text-sm text-slate-600">Admins</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{statsGlobales.managers}</p>
            <p className="text-sm text-slate-600">Managers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{statsGlobales.vendeurs}</p>
            <p className="text-sm text-slate-600">Vendeurs</p>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher par nom, email ou rôle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-violet-100 text-violet-700 font-semibold">
                      {user.initiales}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <CardTitle className="text-lg">{user.nom}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={user.statut === "Actif" ? "default" : "secondary"}>
                    {user.statut}
                  </Badge>
                  <Badge variant={roleColors[user.role as keyof typeof roleColors]}>
                    {roleLabels[user.role as keyof typeof roleLabels]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">
                  Magasin{user.magasins.length > 1 ? 's' : ''}: {user.magasins.join(", ")}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Dernière connexion:</span>
                <span className="font-medium">{user.derniere_connexion}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Ventes ce mois:</span>
                <span className="font-semibold text-green-600">{user.ventes_mois}</span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  {user.role !== "admin" && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                  <Shield className="w-4 h-4 mr-1" />
                  Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              Aucun utilisateur trouvé
            </h3>
            <p className="text-slate-600 mb-4">
              Aucun utilisateur ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Réinitialiser la recherche
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { UsersModule };
