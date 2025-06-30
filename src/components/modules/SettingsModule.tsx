
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Building2, 
  Palette, 
  Shield, 
  Bell,
  Upload,
  Save,
  AlertTriangle
} from "lucide-react";

const SettingsModule = () => {
  const [companySettings, setCompanySettings] = useState({
    nom_entreprise: "GestioFlow Pro",
    logo_entreprise: "",
    adresse: "123 Rue du Commerce, 75001 Paris",
    telephone: "01 42 86 75 30",
    email: "contact@gestioflow.com",
    siret: "12345678901234",
    tva_intracommunautaire: "FR12345678901"
  });

  const [systemSettings, setSystemSettings] = useState({
    devise_principale: "EUR",
    taux_tva_defaut: 20,
    fuseau_horaire: "Europe/Paris",
    langue_defaut: "fr",
    format_date: "DD/MM/YYYY",
    seuil_stock_alerte: 10
  });

  const [securitySettings, setSecuritySettings] = useState({
    duree_session_minutes: 480,
    politique_mot_de_passe_complexe: true,
    deux_facteurs_obligatoire: false,
    tentatives_connexion_max: 5,
    blocage_compte_minutes: 30
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    alertes_stock: true,
    rapports_quotidiens: true,
    ventes_importantes: true,
    maintenance_systeme: true
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Configuration Système</h1>
          <p className="text-slate-600">Gérez les paramètres de votre application</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-violet-600" />
                <span>Informations de l'Entreprise</span>
              </CardTitle>
              <CardDescription>
                Configurez les informations de base de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom_entreprise">Nom de l'entreprise</Label>
                  <Input
                    id="nom_entreprise"
                    value={companySettings.nom_entreprise}
                    onChange={(e) => setCompanySettings({...companySettings, nom_entreprise: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siret">Numéro SIRET</Label>
                  <Input
                    id="siret"
                    value={companySettings.siret}
                    onChange={(e) => setCompanySettings({...companySettings, siret: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse complète</Label>
                <Input
                  id="adresse"
                  value={companySettings.adresse}
                  onChange={(e) => setCompanySettings({...companySettings, adresse: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={companySettings.telephone}
                    onChange={(e) => setCompanySettings({...companySettings, telephone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tva">Numéro TVA Intracommunautaire</Label>
                <Input
                  id="tva"
                  value={companySettings.tva_intracommunautaire}
                  onChange={(e) => setCompanySettings({...companySettings, tva_intracommunautaire: e.target.value})}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Logo de l'Entreprise</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-violet-600" />
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Changer le logo
                  </Button>
                  <p className="text-sm text-slate-500">
                    Format recommandé: PNG, JPG (max 2MB)
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Paramètres Système</span>
              </CardTitle>
              <CardDescription>
                Configurez les paramètres généraux du système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="devise">Devise principale</Label>
                  <Input
                    id="devise"
                    value={systemSettings.devise_principale}
                    onChange={(e) => setSystemSettings({...systemSettings, devise_principale: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tva">Taux TVA par défaut (%)</Label>
                  <Input
                    id="tva"
                    type="number"
                    value={systemSettings.taux_tva_defaut}
                    onChange={(e) => setSystemSettings({...systemSettings, taux_tva_defaut: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Input
                    id="timezone"
                    value={systemSettings.fuseau_horaire}
                    onChange={(e) => setSystemSettings({...systemSettings, fuseau_horaire: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="langue">Langue par défaut</Label>
                  <Input
                    id="langue"
                    value={systemSettings.langue_defaut}
                    onChange={(e) => setSystemSettings({...systemSettings, langue_defaut: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="format_date">Format de date</Label>
                  <Input
                    id="format_date"
                    value={systemSettings.format_date}
                    onChange={(e) => setSystemSettings({...systemSettings, format_date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seuil_stock">Seuil d'alerte stock par défaut</Label>
                  <Input
                    id="seuil_stock"
                    type="number"
                    value={systemSettings.seuil_stock_alerte}
                    onChange={(e) => setSystemSettings({...systemSettings, seuil_stock_alerte: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Paramètres de Sécurité</span>
              </CardTitle>
              <CardDescription>
                Configurez les politiques de sécurité de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-700 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Attention</span>
                </div>
                <p className="text-sm text-red-600">
                  Les modifications de sécurité peuvent affecter l'accès de tous les utilisateurs. 
                  Une double validation sera requise pour sauvegarder.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duree_session">Durée de session (minutes)</Label>
                  <Input
                    id="duree_session"
                    type="number"
                    value={securitySettings.duree_session_minutes}
                    onChange={(e) => setSecuritySettings({...securitySettings, duree_session_minutes: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tentatives_max">Tentatives de connexion max</Label>
                  <Input
                    id="tentatives_max"
                    type="number"
                    value={securitySettings.tentatives_connexion_max}
                    onChange={(e) => setSecuritySettings({...securitySettings, tentatives_connexion_max: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mdp_complexe">Politique de mot de passe complexe</Label>
                    <p className="text-sm text-slate-500">
                      Exiger 8 caractères minimum, majuscules, chiffres et symboles
                    </p>
                  </div>
                  <Switch
                    id="mdp_complexe"
                    checked={securitySettings.politique_mot_de_passe_complexe}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, politique_mot_de_passe_complexe: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Authentification à deux facteurs obligatoire</Label>
                    <p className="text-sm text-slate-500">
                      Forcer tous les utilisateurs à activer la 2FA
                    </p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={securitySettings.deux_facteurs_obligatoire}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, deux_facteurs_obligatoire: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="destructive">
                  <Shield className="w-4 h-4 mr-2" />
                  Sauvegarder (Double validation requise)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-green-600" />
                <span>Paramètres de Notifications</span>
              </CardTitle>
              <CardDescription>
                Configurez les notifications système et par email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email_notif">Notifications par email</Label>
                    <p className="text-sm text-slate-500">
                      Activer l'envoi de notifications par email
                    </p>
                  </div>
                  <Switch
                    id="email_notif"
                    checked={notificationSettings.email_notifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email_notifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alertes_stock">Alertes de stock</Label>
                    <p className="text-sm text-slate-500">
                      Notifications quand un produit atteint son seuil d'alerte
                    </p>
                  </div>
                  <Switch
                    id="alertes_stock"
                    checked={notificationSettings.alertes_stock}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, alertes_stock: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rapports_quotidiens">Rapports quotidiens</Label>
                    <p className="text-sm text-slate-500">
                      Envoi automatique des rapports de ventes quotidiens
                    </p>
                  </div>
                  <Switch
                    id="rapports_quotidiens"
                    checked={notificationSettings.rapports_quotidiens}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, rapports_quotidiens: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ventes_importantes">Ventes importantes</Label>
                    <p className="text-sm text-slate-500">
                      Notifications pour les ventes dépassant un certain montant
                    </p>
                  </div>
                  <Switch
                    id="ventes_importantes"
                    checked={notificationSettings.ventes_importantes}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, ventes_importantes: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance système</Label>
                    <p className="text-sm text-slate-500">
                      Notifications techniques et de maintenance
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={notificationSettings.maintenance_systeme}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, maintenance_systeme: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { SettingsModule };
