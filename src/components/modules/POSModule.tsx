
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Minus,
  ShoppingCart,
  CreditCard,
  Banknote,
  Receipt,
  Trash2,
  Package
} from "lucide-react";

const POSModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Array<{
    id: number;
    nom: string;
    prix: number;
    quantite: number;
    stock: number;
  }>>([]);

  const products = [
    { id: 1, nom: "Smartphone Galaxy S24", prix: 699.99, stock: 45, sku: "TEL-GS24-128" },
    { id: 2, nom: "Casque Audio Bluetooth", prix: 59.99, stock: 12, sku: "AUD-BT-PRO" },
    { id: 3, nom: "Chargeur USB-C 65W", prix: 24.99, stock: 89, sku: "ACC-CHG-65W" },
    { id: 4, nom: "Écouteurs sans fil", prix: 39.99, stock: 3, sku: "AUD-EAR-PRO" },
    { id: 5, nom: "Coque iPhone 15", prix: 19.99, stock: 67, sku: "ACC-COQ-IP15" },
    { id: 6, nom: "Cable HDMI 2m", prix: 12.99, stock: 34, sku: "ACC-HDMI-2M" }
  ];

  const filteredProducts = products.filter(product => 
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantite < product.stock) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantite: item.quantite + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantite: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, Math.min(item.stock, item.quantite + delta));
        return newQuantity === 0 ? null : { ...item, quantite: newQuantity };
      }
      return item;
    }).filter(Boolean) as typeof cart);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.prix * item.quantite), 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantite, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Catalogue des produits */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-violet-600" />
              <span>Catalogue Produits</span>
            </CardTitle>
            <CardDescription>
              Recherchez et ajoutez des produits à la vente
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-800 text-sm">{product.nom}</h4>
                        <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"} className="text-xs">
                          Stock: {product.stock}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{product.sku}</span>
                        <span className="font-semibold text-green-600">€{product.prix.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panier et checkout */}
      <div className="space-y-4">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                <span>Panier</span>
              </div>
              <Badge variant="outline">{itemsCount} article{itemsCount > 1 ? 's' : ''}</Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">Panier vide</p>
                  <p className="text-sm text-slate-400">Ajoutez des produits pour commencer</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-800 truncate">{item.nom}</p>
                        <p className="text-sm text-slate-500">€{item.prix.toFixed(2)} x {item.quantite}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">{item.quantite}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantite >= item.stock}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total:</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVA (20%):</span>
                      <span>€{(total * 0.2).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">€{(total * 1.2).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Paiement Carte
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Banknote className="w-4 h-4 mr-2" />
                      Paiement Espèces
                    </Button>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      <Receipt className="w-4 h-4 mr-2" />
                      Imprimer Ticket
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { POSModule };
