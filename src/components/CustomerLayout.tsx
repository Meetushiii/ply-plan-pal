
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Package, ShoppingCart, User, LogOut, FileText } from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">PlyInventory</h1>
            <nav className="hidden md:flex items-center space-x-6 ml-10">
              <Link to="/customer/catalog" className="hover:text-wood transition-colors">
                Products
              </Link>
              <Link to="/customer/orders" className="hover:text-wood transition-colors">
                My Orders
              </Link>
              <Link to="/customer/account" className="hover:text-wood transition-colors">
                Account
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/customer/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-wood text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <div className="flex items-center">
              <span className="mr-3 hidden md:inline-block">
                {user?.name || 'Customer'}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-navy-dark"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="md:hidden bg-slate-100 p-2">
        <div className="flex justify-between">
          <Link to="/customer/catalog" className="flex flex-col items-center text-xs text-slate-600">
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link to="/customer/orders" className="flex flex-col items-center text-xs text-slate-600">
            <FileText className="h-5 w-5" />
            Orders
          </Link>
          <Link to="/customer/cart" className="flex flex-col items-center text-xs text-slate-600">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
          <Link to="/customer/account" className="flex flex-col items-center text-xs text-slate-600">
            <User className="h-5 w-5" />
            Account
          </Link>
        </div>
      </div>
      
      <main className="flex-1 bg-slate-50">
        {children}
      </main>
      
      <footer className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PlyInventory</h3>
              <p className="text-slate-300">Your trusted source for quality plywood products.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/customer/catalog" className="text-slate-300 hover:text-wood">Products</Link></li>
                <li><Link to="/customer/orders" className="text-slate-300 hover:text-wood">My Orders</Link></li>
                <li><Link to="/customer/account" className="text-slate-300 hover:text-wood">My Account</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-slate-300">support@plyinventory.com</p>
              <p className="text-slate-300">1-800-PLYWOOD</p>
            </div>
          </div>
          <div className="border-t border-navy-dark mt-8 pt-6 text-center text-slate-300">
            <p>&copy; {new Date().getFullYear()} PlyInventory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
