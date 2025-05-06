
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Box, 
  PackageSearch, 
  TrendingUp, 
  FileText, 
  Truck, 
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-navy text-white transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-navy-dark",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="font-bold text-xl">PlyInventory</div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-navy-dark rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          <NavLink to="/dashboard" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <Home size={20} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          
          <NavLink to="/inventory" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <Box size={20} />
            {!collapsed && <span>Inventory</span>}
          </NavLink>
          
          <NavLink to="/search" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <PackageSearch size={20} />
            {!collapsed && <span>Search</span>}
          </NavLink>
          
          <NavLink to="/reports" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <TrendingUp size={20} />
            {!collapsed && <span>Reports</span>}
          </NavLink>
          
          <NavLink to="/transactions" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <FileText size={20} />
            {!collapsed && <span>Transactions</span>}
          </NavLink>
          
          <NavLink to="/suppliers" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <Truck size={20} />
            {!collapsed && <span>Suppliers</span>}
          </NavLink>
          
          <NavLink to="/settings" className={({ isActive }) => 
            cn("nav-item", isActive ? "active" : "", "mb-1")
          }>
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-navy-dark">
          <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
            {!collapsed ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 bg-wood text-navy">
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-slate-300">{user?.role}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-auto text-white hover:bg-navy-dark rounded-full"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-navy-dark rounded-full"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </Button>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
