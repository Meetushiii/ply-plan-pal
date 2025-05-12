
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  company?: string; // For customers who represent a company
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType?: 'employee' | 'customer') => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'employee' | 'customer', company?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const fetchUser = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If we have a session, get user details from the profiles table
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) throw userError;
          
          setUser({
            id: session.user.id,
            name: userData.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: userData.role || 'customer',
            company: userData.company
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
    
    // Set up subscription for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User signed in, get their profile data
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (!userError && userData) {
            setUser({
              id: session.user.id,
              name: userData.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: userData.role || 'customer',
              company: userData.company
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, userType: 'employee' | 'customer' = 'employee') => {
    setIsLoading(true);
    
    try {
      // For demo purposes, accept any email with "password" as the password
      if (password !== 'password') {
        throw new Error('Invalid credentials');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Check if user profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      // If no profile or wrong role type, create/update it
      if (profileError || (profileData && profileData.role !== userType)) {
        const role = userType === 'employee' 
          ? (email.includes('admin') ? 'admin' : 'employee')
          : 'customer';
          
        // Create or update profile
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: email.split('@')[0],
          email: email,
          role: role,
          company: userType === 'customer' ? 'Demo Company Ltd.' : null,
          updated_at: new Date().toISOString()
        });
        
        setUser({
          id: data.user.id,
          name: email.split('@')[0],
          email: email,
          role: role,
          company: userType === 'customer' ? 'Demo Company Ltd.' : undefined
        });
      } else if (profileData) {
        setUser({
          id: data.user.id,
          name: profileData.name || email.split('@')[0],
          email: email,
          role: profileData.role,
          company: profileData.company
        });
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${email.split('@')[0]}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string,
    userType: 'employee' | 'customer',
    company?: string
  ) => {
    setIsLoading(true);
    
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      if (!data.user) throw new Error('User registration failed');
      
      // Determine role
      const role = userType === 'employee' 
        ? (email.includes('admin') ? 'admin' : 'employee')
        : 'customer';
      
      // Create a profile for the user
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        name: name,
        email: email,
        role: role,
        company: userType === 'customer' ? company : null,
        updated_at: new Date().toISOString()
      });
      
      if (profileError) throw profileError;
      
      setUser({
        id: data.user.id,
        name: name,
        email: email,
        role: role,
        company: userType === 'customer' ? company : undefined
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again with different credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
