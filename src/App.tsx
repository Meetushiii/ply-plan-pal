
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeLogin from "./pages/EmployeeLogin";
import CustomerLogin from "./pages/CustomerLogin";
import EmployeeRegister from "./pages/EmployeeRegister";
import CustomerRegister from "./pages/CustomerRegister";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import CustomerCatalog from "./pages/CustomerCatalog";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";

const queryClient = new QueryClient();

// Protected Route component for employees
const EmployeeRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wood"></div>
      </div>
    );
  }
  
  if (!user || (user.role !== 'employee' && user.role !== 'admin')) {
    return <Navigate to="/employee-login" replace />;
  }
  
  return children;
};

// Protected Route component for customers
const CustomerRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wood"></div>
      </div>
    );
  }
  
  if (!user || user.role !== 'customer') {
    return <Navigate to="/customer-login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Legacy Routes */}
      <Route path="/login" element={<Navigate to="/employee-login" replace />} />
      <Route path="/register" element={<Navigate to="/employee-register" replace />} />
      
      {/* Employee Authentication Routes */}
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/employee-register" element={<EmployeeRegister />} />
      
      {/* Customer Authentication Routes */}
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      
      {/* Employee Protected Routes */}
      <Route path="/dashboard" element={
        <EmployeeRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </EmployeeRoute>
      } />
      <Route path="/inventory" element={
        <EmployeeRoute>
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        </EmployeeRoute>
      } />
      
      {/* Customer Protected Routes */}
      <Route path="/customer/catalog" element={
        <CustomerRoute>
          <CustomerCatalog />
        </CustomerRoute>
      } />
      
      {/* Placeholder routes for employees */}
      <Route path="/search" element={
        <EmployeeRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Search</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </EmployeeRoute>
      } />
      <Route path="/reports" element={
        <EmployeeRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Reports</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </EmployeeRoute>
      } />
      <Route path="/transactions" element={
        <EmployeeRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Transactions</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </EmployeeRoute>
      } />
      <Route path="/suppliers" element={
        <EmployeeRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Suppliers</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </EmployeeRoute>
      } />
      <Route path="/settings" element={
        <EmployeeRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Settings</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </EmployeeRoute>
      } />
      
      {/* Placeholder routes for customers */}
      <Route path="/customer/orders" element={
        <CustomerRoute>
          <div className="min-h-screen">
            <p className="p-8">Orders page under construction.</p>
          </div>
        </CustomerRoute>
      } />
      <Route path="/customer/cart" element={
        <CustomerRoute>
          <div className="min-h-screen">
            <p className="p-8">Cart page under construction.</p>
          </div>
        </CustomerRoute>
      } />
      <Route path="/customer/account" element={
        <CustomerRoute>
          <div className="min-h-screen">
            <p className="p-8">Account page under construction.</p>
          </div>
        </CustomerRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
