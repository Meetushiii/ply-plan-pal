
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-wood-light">
      {/* Header */}
      <header className="bg-navy text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">PlyInventory</h1>
          <p className="text-slate-300">Complete Plywood Inventory Management System</p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">Welcome to PlyInventory</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Efficiently manage your plywood inventory with our comprehensive system. 
            Track stock levels, process orders, and more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Employee Access */}
          <Card className="shadow-lg border-wood/20 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-navy text-white">
              <CardTitle className="text-2xl">Employee Access</CardTitle>
              <CardDescription className="text-slate-300">
                For staff and inventory managers
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6">
                Access inventory management, supplier information, stock levels, 
                and administrative functions.
              </p>
              <div className="flex space-x-3">
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Track Inventory</h3>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Manage Orders</h3>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Reports</h3>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/employee-login">
                <Button className="bg-wood hover:bg-wood-dark">Employee Login</Button>
              </Link>
              <Link to="/employee-register">
                <Button variant="outline">Register</Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Customer Access */}
          <Card className="shadow-lg border-wood/20 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-navy text-white">
              <CardTitle className="text-2xl">Customer Access</CardTitle>
              <CardDescription className="text-slate-300">
                For buyers and clients
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6">
                Browse available plywood products, place orders, track shipments,
                and manage your account.
              </p>
              <div className="flex space-x-3">
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Browse Catalog</h3>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Place Orders</h3>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 flex-1 text-center">
                  <h3 className="font-semibold">Order History</h3>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/customer-login">
                <Button className="bg-wood hover:bg-wood-dark">Customer Login</Button>
              </Link>
              <Link to="/customer-register">
                <Button variant="outline">Register</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-500">
            <strong>Demo Instructions:</strong> For demo purposes, use any valid email and "password" as the password to login.
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-navy text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} PlyInventory. All rights reserved.</p>
          <p className="text-sm text-slate-400 mt-2">A complete plywood inventory management solution.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
