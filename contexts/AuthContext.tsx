import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types.ts';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced user type with additional metadata
interface StoredUserData extends User {
  sessionExpiry?: number;
  refreshToken?: string;
}

// Storage keys
const STORAGE_KEYS = {
  USER_SESSION: 'ballal_auth_session',
  SESSION_EXPIRY: 'ballal_session_expiry',
  REFRESH_TOKEN: 'ballal_refresh_token'
} as const;

// Session configuration
const SESSION_CONFIG = {
  EXPIRY_DAYS: 7, // Session lasts 7 days
  REFRESH_BUFFER: 30 * 60 * 1000, // Refresh 30 minutes before expiry
} as const;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Validation utilities
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule';
  }
  if (!/[a-z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une minuscule';
  }
  if (!/[0-9]/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre';
  }
  return null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate session expiry
  const getSessionExpiry = () => {
    return Date.now() + (SESSION_CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  };

  // Safe storage operations
  const safeSetItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Failed to store ${key}:`, e);
      setError('Erreur de stockage local');
    }
  };

  const safeGetItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(`Failed to retrieve ${key}:`, e);
      return null;
    }
  };

  // Check if session is valid
  const isSessionValid = useCallback((): boolean => {
    const expiryStr = safeGetItem(STORAGE_KEYS.SESSION_EXPIRY);
    if (!expiryStr) return false;
    
    const expiry = parseInt(expiryStr, 10);
    const now = Date.now();
    
    // Check if session needs refresh
    if (now > expiry - SESSION_CONFIG.REFRESH_BUFFER) {
      console.log('Session needs refresh');
      return false;
    }
    
    return now < expiry;
  }, []);

  // Clear all auth data
  const clearAuthData = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    setUser(null);
  };

  // Initialize auth from storage
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check session validity
        if (!isSessionValid()) {
          clearAuthData();
          setIsLoading(false);
          return;
        }

        // Load user data
        const storedUser = safeGetItem(STORAGE_KEYS.USER_SESSION);
        if (storedUser) {
          const parsedUser: StoredUserData = JSON.parse(storedUser);
          
          // Remove sensitive data before setting user
          const { sessionExpiry, refreshToken, ...userData } = parsedUser;
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        clearAuthData();
        setError('Erreur lors du chargement de la session');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [isSessionValid]);

  // Login function
  const login = async (email: string, password?: string, name?: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate email
      if (!isValidEmail(email)) {
        throw new Error('Adresse email invalide');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate fake user (replace with real API call)
      const fakeUser: StoredUserData = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        role: 'member' as UserRole,
        joinedAt: new Date().toISOString(),
        avatar: (name || email.split('@')[0]).charAt(0).toUpperCase(),
        preferences: {
          language: 'fr',
          notifications: true
        },
        lastLogin: new Date().toISOString(),
        sessionExpiry: getSessionExpiry(),
        refreshToken: `refresh-${Date.now()}`
      };

      // Store session
      safeSetItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(fakeUser));
      safeSetItem(STORAGE_KEYS.SESSION_EXPIRY, fakeUser.sessionExpiry.toString());
      safeSetItem(STORAGE_KEYS.REFRESH_TOKEN, fakeUser.refreshToken!);

      // Remove sensitive data before setting user
      const { sessionExpiry, refreshToken, ...userData } = fakeUser;
      setUser(userData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Échec de la connexion';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string): Promise<void> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!name.trim()) {
        throw new Error('Le nom est requis');
      }

      if (!isValidEmail(email)) {
        throw new Error('Adresse email invalide');
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        throw new Error(passwordError);
      }

      // Check if user already exists (simulated)
      const existingUser = safeGetItem(STORAGE_KEYS.USER_SESSION);
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email === email.toLowerCase()) {
          throw new Error('Un compte avec cet email existe déjà');
        }
      }

      // Create new user
      const fakeUser: StoredUserData = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: 'member' as UserRole,
        joinedAt: new Date().toISOString(),
        avatar: name.trim().charAt(0).toUpperCase(),
        preferences: {
          language: 'fr',
          notifications: true
        },
        lastLogin: new Date().toISOString(),
        sessionExpiry: getSessionExpiry(),
        refreshToken: `refresh-${Date.now()}`
      };

      // Store user
      safeSetItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(fakeUser));
      safeSetItem(STORAGE_KEYS.SESSION_EXPIRY, fakeUser.sessionExpiry.toString());
      safeSetItem(STORAGE_KEYS.REFRESH_TOKEN, fakeUser.refreshToken!);

      // Remove sensitive data before setting user
      const { sessionExpiry, refreshToken, ...userData } = fakeUser;
      setUser(userData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Échec de l\'inscription';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setIsLoading(true);
    try {
      clearAuthData();
      // Optional: Call API to invalidate server session
    } catch (err) {
      console.error('Logout error:', err);
      setError('Erreur lors de la déconnexion');
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      
      const updatedUser = { ...prev, ...updates };
      
      // Persist changes
      const storedUser = safeGetItem(STORAGE_KEYS.USER_SESSION);
      if (storedUser) {
        const parsedUser: StoredUserData = JSON.parse(storedUser);
        const updatedStorage = { ...parsedUser, ...updates };
        safeSetItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(updatedStorage));
      }
      
      return updatedUser;
    });
  };

  // Clear error
  const clearError = () => setError(null);

  // Check authentication status
  const isAuthenticated = !!user && isSessionValid();

  // Auto-logout on session expiry
  useEffect(() => {
    const checkSessionInterval = setInterval(() => {
      if (user && !isSessionValid()) {
        console.log('Session expired, logging out...');
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkSessionInterval);
  }, [user, isSessionValid]);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    updateUser,
    clearError,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for protected routes
export const useRequireAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    requireAuth: (requiredRole?: UserRole): boolean => {
      if (isLoading) return false;
      if (!isAuthenticated) return false;
      if (requiredRole && user?.role !== requiredRole) return false;
      return true;
    }
  };
};

// HOC for protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const { requireAuth, isLoading } = useRequireAuth();
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE1126]"></div>
        </div>
      );
    }
    
    if (!requireAuth(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Accès non autorisé
            </h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté{requiredRole ? ` et avoir le rôle ${requiredRole}` : ''} pour accéder à cette page.
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-[#CE1126] text-white rounded-lg hover:bg-[#B01020] transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
  
  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return WrappedComponent;
};