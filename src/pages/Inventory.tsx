
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockPlywoodData, PlywoodSheet } from '@/lib/data-models';
import { Card, CardContent } from "@/components/ui/card";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<PlywoodSheet[]>(mockPlywoodData);
  
  const filteredInventory = inventory.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Inventory</h1>
          <p className="text-slate-600">Manage your plywood stock</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-[250px]"
            />
          </div>
          <Button className="bg-wood hover:bg-wood-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
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
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell>{item.grade}</TableCell>
                      <TableCell>{`${item.thickness} × ${item.width} × ${item.length}`}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.quantity < 10 ? "text-red-500 font-medium" : ""}>
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">${item.purchasePrice.toFixed(2)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                      No inventory items found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
