
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import CreateUserForm from '@/components/admin/CreateUserForm';
import { useProfiles } from '@/hooks/useProfiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, AlertTriangle } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const { profiles, fetchProfiles } = useProfiles();

  // Vérifier si l'utilisateur est admin
  const userProfile = profiles.find(p => p.id === user?.id);
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userProfile && userProfile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Accès Refusé</h2>
            <p className="text-slate-600">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-8 h-8 text-violet-600" />
            Panneau d'Administration
          </h1>
          <p className="text-slate-600 mt-2">
            Gestion des utilisateurs et paramètres système
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CreateUserForm onUserCreated={fetchProfiles} />
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Statistiques
                </CardTitle>
                <CardDescription>
                  Vue d'ensemble des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total utilisateurs:</span>
                  <span className="font-semibold">{profiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Administrateurs:</span>
                  <span className="font-semibold text-red-600">
                    {profiles.filter(p => p.role === 'admin').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Managers:</span>
                  <span className="font-semibold text-blue-600">
                    {profiles.filter(p => p.role === 'manager').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Vendeurs:</span>
                  <span className="font-semibold text-orange-600">
                    {profiles.filter(p => p.role === 'vendeur').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
