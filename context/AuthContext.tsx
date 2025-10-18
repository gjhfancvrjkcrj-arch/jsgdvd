
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LIFETIME_USER_EMAIL = 'user@example.com';
const LIFETIME_USER_PASS = 'password123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start with the lifetime user logged in as requested
  const [user, setUser] = useState<User | null>({
    email: LIFETIME_USER_EMAIL,
    plan: 'lifetime',
  });

  const login = (email: string, pass: string): boolean => {
    if (email.toLowerCase() === LIFETIME_USER_EMAIL && pass === LIFETIME_USER_PASS) {
      setUser({ email: LIFETIME_USER_EMAIL, plan: 'lifetime' });
      return true;
    }
    // In a real app, you would have more users and plans
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
