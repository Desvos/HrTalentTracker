import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for user in localStorage (mock persistence)
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          // Clear invalid data
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Add event listener for storage changes (support multi-tab)
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', { email });
      const response = await apiRequest('POST', '/api/auth/login', { email, password });
      console.log('Login response:', response);
      
      if (response.data.user) {
        setUser(response.data.user);
        // Store user in localStorage for mock persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Login error details:', {
        error,
        message: error?.message || 'Unknown error',
        response: error?.response?.data
      });
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
