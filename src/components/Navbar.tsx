import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Recycle, User, LogOut, Leaf } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/dashboard', icon: '🏠' },
    { name: 'Request Pickup', path: '/request-pickup', icon: '📞' },
    { name: 'Track Impact', path: '/track-impact', icon: '📊' },
    { name: 'Rewards', path: '/rewards', icon: '🏆' },
    { name: 'Nearby City', path: '/nearby-city', icon: '🌍' },
    { name: 'About Us', path: '/about', icon: 'ℹ️' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-soft">
      {/* Top Header with User Info */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            <span className="text-sm font-medium">Making the world greener, one pickup at a time</span>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Welcome, {user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-primary-foreground hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-eco rounded-xl shadow-eco group-hover:shadow-hover transition-all duration-300 group-hover:scale-105">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Smart Recycle</span>
              <span className="text-xs text-muted-foreground">Circular Economy Platform</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-eco'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Points */}
          {user && !user.isAdmin && (
            <div className="flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-lg shadow-soft">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-success">{user.points} Points</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-t border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-3 gap-1">
            {navigationItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-3 rounded-lg text-xs font-medium transition-all duration-300 flex flex-col items-center gap-1 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="leading-tight text-center">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;