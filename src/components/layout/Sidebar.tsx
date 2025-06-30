
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  Users, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Tableau de Bord",
    icon: LayoutDashboard,
    color: "text-violet-600"
  },
  {
    id: "products",
    label: "Produits",
    icon: Package,
    color: "text-blue-600"
  },
  {
    id: "pos",
    label: "Point de Vente",
    icon: ShoppingCart,
    color: "text-green-600"
  },
  {
    id: "stock",
    label: "Stock & Magasins",
    icon: Warehouse,
    color: "text-orange-600"
  },
  {
    id: "users",
    label: "Utilisateurs",
    icon: Users,
    color: "text-indigo-600"
  },
  {
    id: "settings",
    label: "Configuration",
    icon: Settings,
    color: "text-gray-600"
  }
];

export const Sidebar = ({ activeModule, setActiveModule, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-30",
        isOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GF</span>
                </div>
                <h1 className="font-bold text-xl text-slate-800">GestioFlow Pro</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? "bg-violet-50 text-violet-700 border border-violet-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-violet-600" : item.color)} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
