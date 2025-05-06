
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockPlywoodData, PlywoodSheet } from '@/lib/data-models';
import { Card, CardContent } from "@/components/ui/card";
import { CustomerLayout } from '@/components/CustomerLayout';

const CustomerCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [catalog, setCatalog] = useState<PlywoodSheet[]>(mockPlywoodData);
  
  const filteredCatalog = catalog.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          </div>
        </header>
        
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
      </div>
    </CustomerLayout>
  );
};

export default CustomerCatalog;
