import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts';
import { Leaf, TreePine, Droplets, Globe, Target, Users, Recycle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for waste statistics
  const wasteData = [
    { month: 'Jan', plastic: 1200, paper: 800, metal: 300, organic: 2000 },
    { month: 'Feb', plastic: 1100, paper: 900, metal: 350, organic: 2200 },
    { month: 'Mar', plastic: 1300, paper: 850, metal: 280, organic: 1900 },
    { month: 'Apr', plastic: 1000, paper: 920, metal: 400, organic: 2400 },
    { month: 'May', plastic: 950, paper: 1000, metal: 380, organic: 2300 },
    { month: 'Jun', plastic: 800, paper: 1100, metal: 420, organic: 2500 },
  ];

  const impactData = [
    { name: 'Trees Saved', value: 2847, icon: TreePine, color: 'success' },
    { name: 'Water Saved (L)', value: 15420, icon: Droplets, color: 'primary' },
    { name: 'CO2 Reduced (kg)', value: 8950, icon: Globe, color: 'accent' },
    { name: 'Plastic Recycled (kg)', value: 4532, icon: Recycle, color: 'earth' },
  ];

  const sdgGoals = [
    { 
      id: 3, 
      title: 'Good Health and Well-being', 
      description: 'Reducing pollution and promoting clean environments',
      progress: 78 
    },
    { 
      id: 6, 
      title: 'Clean Water and Sanitation', 
      description: 'Preventing water contamination through proper waste disposal',
      progress: 65 
    },
    { 
      id: 11, 
      title: 'Sustainable Cities and Communities', 
      description: 'Creating cleaner, more sustainable urban environments',
      progress: 82 
    },
    { 
      id: 12, 
      title: 'Responsible Consumption and Production', 
      description: 'Promoting circular economy and waste reduction',
      progress: 90 
    },
    { 
      id: 15, 
      title: 'Life on Land', 
      description: 'Protecting ecosystems through reduced environmental impact',
      progress: 73 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-eco rounded-2xl shadow-hover animate-pulse">
            <Leaf className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Welcome to Smart Recycling
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Today's Impact, Tomorrow's Future. Join us in creating a sustainable circular economy 
          where waste becomes resources and every action counts towards a greener planet.
        </p>
      </div>

      {/* User Greeting & Daily Task */}
      {user && (
        <Card className="bg-gradient-card shadow-hover border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Welcome back, {user.name}! 🌟
                </h2>
                <p className="text-muted-foreground mb-4">
                  Ready to make a difference today?
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success font-medium">Today's Task: Save Trees, Save Water</span>
                </div>
              </div>
              {!user.isAdmin && (
                <div className="bg-gradient-primary text-primary-foreground px-6 py-4 rounded-xl shadow-eco">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.points}</div>
                    <div className="text-sm opacity-90">Eco Points</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Global Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactData.map((item, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-hover transition-all duration-300 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
                  <p className="text-2xl font-bold text-primary">{item.value.toLocaleString()}</p>
                </div>
                <div className={`p-3 bg-gradient-${item.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-success">
                <TrendingUp className="h-4 w-4" />
                <span>+12% this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Unique Approach */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-3">
            <Target className="h-8 w-8" />
            Our Unique Point of Sale - Circular Economy Model
          </CardTitle>
          <CardDescription>
            How Smart Recycle transforms waste into value while creating sustainable impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-card rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Smart Collection</h3>
              <p className="text-sm text-muted-foreground">
                On-demand waste pickup through our platform ensures no area is left behind
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-card rounded-xl">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold text-success mb-2">Resource Recovery</h3>
              <p className="text-sm text-muted-foreground">
                We classify and process waste into valuable resources: plastic → products, organic → fertilizer
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-card rounded-xl">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-accent mb-2">Social Impact</h3>
              <p className="text-sm text-muted-foreground">
                Supporting communities through food-for-waste programs for those without digital access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDG Goals */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            🎯 Sustainable Development Goals We're Advancing
          </CardTitle>
          <CardDescription>
            Our platform directly contributes to multiple UN SDG targets through circular economy principles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sdgGoals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-primary">SDG {goal.id}: {goal.title}</h4>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <span className="text-sm font-medium text-success">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waste Statistics Chart */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            📊 Daily Waste Generation Trends
          </CardTitle>
          <CardDescription>
            Tracking waste generation patterns to optimize our collection and recycling efforts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="plastic" fill="hsl(var(--destructive))" name="Plastic (kg)" />
                <Bar dataKey="paper" fill="hsl(var(--earth))" name="Paper (kg)" />
                <Bar dataKey="metal" fill="hsl(var(--muted-foreground))" name="Metal (kg)" />
                <Bar dataKey="organic" fill="hsl(var(--success))" name="Organic (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Plastic Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-earth rounded-full"></div>
              <span>Paper Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              <span>Metal Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Organic Waste</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-hover border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact? 🌱</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Every small action contributes to a bigger change. Start your journey towards a sustainable future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/request-pickup'}
            >
              Request Pickup Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/track-impact'}
            >
              Track Your Impact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;