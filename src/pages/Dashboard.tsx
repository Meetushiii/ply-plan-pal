
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPlywoodData, mockTransactions } from '@/lib/data-models';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Calculate dashboard metrics
  const totalInventoryItems = mockPlywoodData.reduce((sum, item) => sum + item.quantity, 0);
  const totalInventoryTypes = new Set(mockPlywoodData.map(item => item.type)).size;
  const lowStockItems = mockPlywoodData.filter(item => item.quantity < 10).length;
  
  // Prepare chart data
  const inventoryByType = mockPlywoodData.reduce((acc, item) => {
    const existingType = acc.find(t => t.name === item.type);
    if (existingType) {
      existingType.quantity += item.quantity;
    } else {
      acc.push({ name: item.type, quantity: item.quantity });
    }
    return acc;
  }, [] as { name: string; quantity: number }[]);
  
  // Get recent transactions
  const recentTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="shadow-md border-wood/20">
          <CardHeader>
            <CardTitle className="text-xl text-navy">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map(transaction => (
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
