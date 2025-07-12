
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Recycle, Leaf, Globe, Shield, UserPlus, LogIn, Sparkles, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(loginData);
    
    if (success) {
      toast({
        title: "🎉 Welcome back!",
        description: "Successfully logged in to Smart Recycle.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "❌ Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await register(registerData);
    
    if (success) {
      toast({
        title: "🎉 Registration successful!",
        description: "Account created successfully. Please login to continue.",
      });
      setRegisterData({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      });
    } else {
      toast({
        title: "❌ Registration failed",
        description: "User with this email already exists.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleQuickLogin = (email: string, password: string) => {
    setLoginData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-muted/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23059669%22%20fill-opacity=%220.08%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in-50 duration-700">
        {/* Enhanced Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                <Recycle className="h-14 w-14 text-white animate-spin [animation-duration:3s]" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Smart Recycle
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Circular Economy Waste Management Platform
            </p>
            <div className="flex justify-center items-center gap-1 text-sm text-green-600">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="font-semibold">Join the Green Revolution</span>
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">Global Impact</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">Secure</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-xl transform hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl text-center font-bold">Welcome Back!</CardTitle>
            <CardDescription className="text-center text-base">
              Sign in to your account or create a new one to start making a difference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="login" className="flex items-center gap-2 text-sm font-medium">
                  <LogIn className="h-4 w-4" />
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2 text-sm font-medium">
                  <UserPlus className="h-4 w-4" />
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
                
                {/* Quick Login Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground font-medium">Quick Login (Testing)</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 justify-between group hover:bg-red-50 hover:border-red-200 transition-all duration-300"
                      onClick={() => handleQuickLogin('admin@gmail.com', 'ADMIN')}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Admin Access</span>
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 justify-between group hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                      onClick={() => handleQuickLogin('test@gmail.com', 'TEST123')}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Test User (1250 pts)</span>
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-center text-muted-foreground bg-muted/30 p-3 rounded-lg border">
                    💡 <strong>Testing Mode:</strong> Use quick login buttons above or enter credentials manually
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-5 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-semibold">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-semibold">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={registerData.address}
                      onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                      required
                      className="h-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] border-2 focus:border-green-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 space-y-3">
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Infosys Hackathon 2025</span>
            </div>
            <span>•</span>
            <span>Tech for Good</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Building a sustainable future, one pickup at a time 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
