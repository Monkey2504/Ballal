
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEY_USER = 'ballal_user_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation: Vérification de la session au chargement
    const storedUser = localStorage.getItem(STORAGE_KEY_USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string) => {
    // Simulation API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fakeUser: User = {
          id: 'user-' + Date.now(),
          name: name || email.split('@')[0],
          email: email,
          role: 'member',
          joinedAt: new Date().toISOString(),
          avatar: name ? name.charAt(0).toUpperCase() : 'U'
        };
        setUser(fakeUser);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(fakeUser));
        resolve();
      }, 800);
    });
  };

  const register = async (email: string, name: string) => {
    return login(email, name); // Pour ce prototype, register = login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
