'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { mockPatients } from '@/lib/mock-data/patients';
import { mockEmployees } from '@/lib/mock-data/employees';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isCustomer: boolean;
  isEmployee: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  canManageContent: () => boolean;
  canUpdateHealthPlans: () => boolean;
  canDeleteContent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Combine all mock users for login
const allMockUsers: User[] = [
  ...mockPatients,
  ...mockEmployees,
];

// Demo credentials for easy testing
const DEMO_CREDENTIALS: Record<string, string> = {
  'erik.svensson@example.com': 'demo123',         // Customer
  'sara.blank@sention.se': 'doctor123',  // Doctor
  'emma.lundgren@sention.se': 'nurse123', // Nurse
  'admin@sention.se': 'admin123',         // Admin
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check credentials against demo accounts
    const expectedPassword = DEMO_CREDENTIALS[email];
    if (!expectedPassword || password !== expectedPassword) {
      return false;
    }

    // Find user by email
    const foundUser = allMockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  // Role-based computed properties
  const isCustomer = user?.role === 'customer';
  const isEmployee = user?.role === 'employee';

  // Permission helpers
  const canManageContent = (): boolean => {
    if (!isEmployee || !user?.employeeType) return false;
    return ['doctor', 'nurse', 'admin'].includes(user.employeeType);
  };

  const canUpdateHealthPlans = (): boolean => {
    if (!isEmployee || !user?.employeeType) return false;
    return ['doctor', 'admin'].includes(user.employeeType);
  };

  const canDeleteContent = (): boolean => {
    if (!isEmployee || !user?.employeeType) return false;
    return user.employeeType === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isCustomer,
        isEmployee,
        login,
        logout,
        isLoading,
        canManageContent,
        canUpdateHealthPlans,
        canDeleteContent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
