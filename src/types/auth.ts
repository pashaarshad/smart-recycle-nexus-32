export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
  points: number;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}