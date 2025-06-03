import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userId: string) => Promise<void>;
  register: (userData: { name: string; email: string; role: UserRole }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem('suitrace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (userId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to authenticate
      // For demo, we'll use our mock data
      const foundUser = mockUsers.find(u => u.id === userId);
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      setUser(foundUser);
      localStorage.setItem('suitrace_user', JSON.stringify(foundUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; role: UserRole }) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to register
      // For demo, we'll create a new mock user
      const newUser: User = {
        id: `${userData.role}-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        location: 'United States',
        walletConnected: false,
      };
      
      setUser(newUser);
      localStorage.setItem('suitrace_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('suitrace_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};