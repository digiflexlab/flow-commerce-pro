
import { useState } from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, UserPlus, Edit, Shield } from 'lucide-react';
import CreateUserForm from '@/components/admin/CreateUserForm';

const UsersModule = () => {
  const { profiles, loading, fetchProfiles, updateProfile } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<'admin' | 'manager' | 'vendeur'>('vendeur');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredProfiles = profiles.filter(profile =>
    profile.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleUpdate = async (id: string) => {
    await updateProfile(id, { role: editingRole });
    setEditingId(null);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'default';
      case 'vendeur': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'manager': return 'Manager';
      case 'vendeur': return 'Vendeur';
      default: return role;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-600" />
            Gestion des Utilisateurs
          </h2>
          <p className="text-slate-600">Gérez les utilisateurs et leurs rôles</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          {showCreateForm ? 'Fermer' : 'Nouvel Utilisateur'}
        </Button>
      </div>

      {showCreateForm && (
        <div className="mb-6">
          <CreateUserForm onUserCreated={() => {
            fetchProfiles();
            setShowCreateForm(false);
          }} />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs ({profiles.length})</CardTitle>
          <CardDescription>
            Recherchez et gérez tous les utilisateurs du système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.nom}</TableCell>
                    <TableCell>
                      {editingId === profile.id ? (
                        <div className="flex items-center gap-2">
                          <Select
                            value={editingRole}
                            onValueChange={(value) => setEditingRole(value as 'admin' | 'manager' | 'vendeur')}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vendeur">Vendeur</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" onClick={() => handleRoleUpdate(profile.id)}>
                            Sauver
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Annuler
                          </Button>
                        </div>
                      ) : (
                        <Badge variant={getRoleBadgeVariant(profile.role)}>
                          {getRoleLabel(profile.role)}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(profile.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      {editingId !== profile.id && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(profile.id);
                            setEditingRole(profile.role);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProfiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Statistiques des Rôles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {profiles.filter(p => p.role === 'admin').length}
              </div>
              <div className="text-sm text-slate-600">Administrateurs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profiles.filter(p => p.role === 'manager').length}
              </div>
              <div className="text-sm text-slate-600">Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {profiles.filter(p => p.role === 'vendeur').length}
              </div>
              <div className="text-sm text-slate-600">Vendeurs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersModule;
