
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProductsModule } from "@/components/modules/ProductsModule";
import { POSModule } from "@/components/modules/POSModule";
import { StockModule } from "@/components/modules/StockModule";
import { UsersModule } from "@/components/modules/UsersModule";
import { SettingsModule } from "@/components/modules/SettingsModule";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsModule />;
      case "pos":
        return <POSModule />;
      case "stock":
        return <StockModule />;
      case "users":
        return <UsersModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <TopBar 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          activeModule={activeModule}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
