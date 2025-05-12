
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlywoodSheet, Transaction } from '@/lib/data-models';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPlywoodInventory } from '@/services/plywoodService';
import { fetchTransactions } from '@/services/transactionService';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [plywoodData, setPlywoodData] = useState<PlywoodSheet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Load inventory data
        const inventory = await fetchPlywoodInventory();
        setPlywoodData(inventory);
        
        // Load transaction data
        const txs = await fetchTransactions();
        setTransactions(txs);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);
  
  // Calculate dashboard metrics
  const totalInventoryItems = plywoodData.reduce((sum, item) => sum + item.quantity, 0);
  const totalInventoryTypes = new Set(plywoodData.map(item => item.type)).size;
  const lowStockItems = plywoodData.filter(item => item.quantity < 10).length;
  
  // Prepare chart data
  const inventoryByType = plywoodData.reduce((acc, item) => {
    const existingType = acc.find(t => t.name === item.type);
    if (existingType) {
      existingType.quantity += item.quantity;
    } else {
      acc.push({ name: item.type, quantity: item.quantity });
    }
    return acc;
  }, [] as { name: string; quantity: number }[]);
  
  // Get recent transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-slate-600">Welcome back, {user?.name}!</p>
      </header>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md border-wood/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-slate-600">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy">{totalInventoryItems.toLocaleString()}</div>
            <p className="text-sm text-slate-500">Sheets in stock</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-wood/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-slate-600">Types of Plywood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy">{totalInventoryTypes}</div>
            <p className="text-sm text-slate-500">Different varieties</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-wood/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-slate-600">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy">{lowStockItems}</div>
            <p className="text-sm text-slate-500">Items need reordering</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts & Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Inventory by Type Chart */}
        <Card className="col-span-2 shadow-md border-wood/20">
          <CardHeader>
            <CardTitle className="text-xl text-navy">Inventory by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {inventoryByType.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#DDA15E' }}
                    formatter={(value) => [`${value} sheets`, 'Quantity']}
                  />
                  <Bar dataKey="quantity" fill="#DDA15E" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">No inventory data available</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="shadow-md border-wood/20">
          <CardHeader>
            <CardTitle className="text-xl text-navy">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center p-3 bg-slate-50 rounded-md">
                    <div className={`w-2 h-8 rounded-full mr-3 ${transaction.type === 'addition' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {transaction.type === 'addition' ? 'Added' : 'Removed'} {transaction.quantity} sheets
                        </span>
                        <span className="text-xs text-slate-500">{transaction.date}</span>
                      </div>
                      <p className="text-xs text-slate-500">{transaction.reason}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-8">
                  <p className="text-slate-500">No transactions available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
