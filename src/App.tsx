
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wood"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/inventory" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Placeholder routes */}
      <Route path="/search" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Search</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Reports</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/transactions" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Transactions</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/suppliers" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Suppliers</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="p-6">
              <h1 className="text-3xl font-bold text-navy">Settings</h1>
              <p className="text-slate-600">This page is under construction.</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
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
