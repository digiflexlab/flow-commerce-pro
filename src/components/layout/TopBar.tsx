
import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  onMenuToggle: () => void;
  activeModule: string;
}

const moduleNames: Record<string, string> = {
  dashboard: "Tableau de Bord",
  products: "Gestion des Produits",
  pos: "Point de Vente",
  stock: "Stock & Magasins",
  users: "Gestion des Utilisateurs",
  settings: "Configuration"
};

export const TopBar = ({ onMenuToggle, activeModule }: TopBarProps) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {moduleNames[activeModule]}
            </h2>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 w-64"
            />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-medium">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
