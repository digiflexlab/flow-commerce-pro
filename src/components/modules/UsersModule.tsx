
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Search,
  Edit,
  Shield,
  UserCheck,
  Loader2
} from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";

const UsersModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const { profiles, loading, updateProfile } = useProfiles();

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

  const filteredUsers = profiles.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roleLabels[user.role].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsGlobales = {
    total_users: profiles.length,
    admins: profiles.filter(u => u.role === "admin").length,
    managers: profiles.filter(u => u.role === "manager").length,
    vendeurs: profiles.filter(u => u.role === "vendeur").length
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateProfile(userId, { role: newRole as 'admin' | 'manager' | 'vendeur' });
    setEditingUser(null);
  };

  const getInitials = (nom: string) => {
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Chargement des utilisateurs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
          <p className="text-slate-600">Gérez les comptes et permissions</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-violet-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{statsGlobales.total_users}</p>
            <p className="text-sm text-slate-600">Total</p>
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
              placeholder="Rechercher par nom ou rôle..."
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
                      {getInitials(user.nom)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <CardTitle className="text-lg">{user.nom}</CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      ID: {user.id.slice(0, 8)}...
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {editingUser === user.id ? (
                    <Select 
                      value={user.role} 
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="vendeur">Vendeur</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Créé le:</span>
                <span className="font-medium">
                  {new Date(user.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Modifié le:</span>
                <span className="font-medium">
                  {new Date(user.updated_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {editingUser === user.id ? 'Annuler' : 'Modifier'}
                </Button>
                
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
