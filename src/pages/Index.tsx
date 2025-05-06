
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-wood-light">
      <header className="py-8 px-6 bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">PlyInventory</h1>
          <p className="text-xl mt-2">Complete Plywood Inventory Management System</p>
        </div>
      </header>
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Welcome to PlyInventory</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The comprehensive solution for managing plywood inventory, tracking transactions,
              and optimizing your supply chain.
            </p>
          </section>

          <section className="mb-16 grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-wood/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Employee Access</CardTitle>
                <CardDescription>For staff managing inventory and operations</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-6">
                <div className="mb-4">
                  <svg className="mx-auto h-24 w-24 text-wood" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-slate-600 mb-4">
                  Access inventory management, transactions, supplier management, and reports.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="w-full bg-wood hover:bg-wood-dark" onClick={() => navigate('/employee-login')}>
                  Employee Login
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-lg border-wood/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Customer Access</CardTitle>
                <CardDescription>For customers viewing available stock</CardDescription>
              </CardHeader>
              <CardContent className="text-center p-6">
                <div className="mb-4">
                  <svg className="mx-auto h-24 w-24 text-wood" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-slate-600 mb-4">
                  Browse available stock, place orders, and view order history.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="w-full bg-wood hover:bg-wood-dark" onClick={() => navigate('/customer-login')}>
                  Customer Login
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-wood/10">
              <h3 className="text-xl font-bold text-navy mb-3">Inventory Management</h3>
              <p className="text-slate-600">Track plywood quantities, properties, and locations with precision.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-wood/10">
              <h3 className="text-xl font-bold text-navy mb-3">Transaction Tracking</h3>
              <p className="text-slate-600">Record all stock movements with detailed transaction history.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-wood/10">
              <h3 className="text-xl font-bold text-navy mb-3">Supplier Management</h3>
              <p className="text-slate-600">Maintain supplier details and order history in one place.</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-navy text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">PlyInventory</h3>
            <p className="text-slate-300">Complete Plywood Inventory Management</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-slate-300">© 2025 PlyInventory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
