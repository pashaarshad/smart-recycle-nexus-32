
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default test users for demonstration and testing
const defaultTestUsers = [
  {
    id: 'admin',
    email: 'admin@gmail.com',
    name: 'Admin User',
    phone: '+1234567890',
    address: '123 Admin Street, Admin City, AC 12345',
    password: 'ADMIN',
    isAdmin: true,
    points: 0,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'test-user',
    email: 'test@gmail.com',
    name: 'Test User',
    phone: '+1987654321',
    address: '456 Test Avenue, Test City, TC 54321',
    password: 'TEST123',
    isAdmin: false,
    points: 10000,
    createdAt: new Date('2024-01-15'),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  // Initialize default test data on first load
  useEffect(() => {
    const existingUsers = localStorage.getItem('registeredUsers');
    if (!existingUsers) {
      // Only add default users if no users exist yet
      localStorage.setItem('registeredUsers', JSON.stringify(defaultTestUsers));
    }

    // Check for existing session on mount
    const storedUser = localStorage.getItem('smartRecycleUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get all registered users (including default test users)
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find((u: any) => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const authUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        points: user.points || 0,
        createdAt: new Date(user.createdAt),
      };
      
      localStorage.setItem('smartRecycleUser', JSON.stringify(authUser));
      setAuthState({
        user: authUser,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    if (registeredUsers.some((u: any) => u.email === data.email)) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...data,
      isAdmin: false,
      points: 0,
      createdAt: new Date(),
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('smartRecycleUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUserPoints = (points: number) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, points };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('smartRecycleUser', JSON.stringify(updatedUser));
      
      // Also update in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === authState.user?.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].points = points;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateUserPoints,
    }}>
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
