
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlywoodSheet } from '@/lib/data-models';
import { Card, CardContent } from "@/components/ui/card";
import { CustomerLayout } from '@/components/CustomerLayout';
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { fetchPlywoodInventory } from '@/services/plywoodService';

const CustomerCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catalog, setCatalog] = useState<PlywoodSheet[]>([]);
  const [cartItems, setCartItems] = useState<{id: string, quantity: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCatalog = async () => {
      setIsLoading(true);
      try {
        // Load inventory data
        const data = await fetchPlywoodInventory();
        setCatalog(data);
      } catch (error) {
        console.error('Error loading catalog data:', error);
        toast({
          title: "Error",
          description: "Failed to load catalog data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCatalog();
  }, []);
  
  const filteredCatalog = catalog.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item: PlywoodSheet) => {
    // Check if item is already in cart
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Update quantity if already in cart
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCartItems([...cartItems, { id: item.id, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${item.type} added to your cart.`
    });
  };

  return (
    <CustomerLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy">Plywood Catalog</h1>
            <p className="text-slate-600">Browse available plywood products</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search plywood..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>
            <div className="relative">
              <Button 
                variant="outline" 
                className="relative" 
                onClick={() => toast({ title: "Cart", description: "Cart functionality coming soon." })}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-wood" variant="secondary">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </header>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-navy" />
          </div>
        ) : (
          <Card className="shadow-md border-wood/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Dimensions (mm)</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCatalog.length > 0 ? (
                      filteredCatalog.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell>{item.grade}</TableCell>
                          <TableCell>{`${item.thickness} × ${item.width} × ${item.length}`}</TableCell>
                          <TableCell>
                            <span className={item.quantity < 10 ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                              {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">${(item.purchasePrice * 1.25).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              disabled={item.quantity === 0}
                              className="bg-wood hover:bg-wood-dark"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                          No plywood items found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerCatalog;
