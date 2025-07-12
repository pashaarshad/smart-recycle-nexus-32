import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, PieChart, Pie, Cell } from 'recharts';
import { TreePine, Droplets, Globe, Recycle, Award, TrendingUp, Leaf, Target } from 'lucide-react';

const TrackImpact = () => {
  const { user } = useAuth();

  // Mock user impact data based on points
  const userPoints = user?.points || 0;
  const treesJaved = Math.floor(userPoints / 50);
  const waterSaved = Math.floor(userPoints * 2.5);
  const co2Reduced = Math.floor(userPoints * 1.8);
  const plasticRecycled = Math.floor(userPoints * 0.8);

  const monthlyImpact = [
    { month: 'Jan', trees: 12, water: 580, co2: 45, plastic: 28 },
    { month: 'Feb', trees: 18, water: 720, co2: 62, plastic: 35 },
    { month: 'Mar', trees: 25, water: 950, co2: 78, plastic: 42 },
    { month: 'Apr', trees: 22, water: 890, co2: 71, plastic: 38 },
    { month: 'May', trees: 30, water: 1200, co2: 95, plastic: 52 },
    { month: 'Jun', trees: 35, water: 1350, co2: 108, plastic: 58 },
  ];

  const wasteTypeImpact = [
    { name: 'Plastic', value: 35, color: '#ef4444' },
    { name: 'Paper', value: 28, color: '#f59e0b' },
    { name: 'Metal', value: 15, color: '#6b7280' },
    { name: 'Organic', value: 22, color: '#10b981' },
  ];

  const impactMetrics = [
    {
      title: 'Trees Saved',
      value: treesJaved,
      icon: TreePine,
      color: 'success',
      description: 'Through paper recycling',
      target: 100,
      unit: 'trees',
    },
    {
      title: 'Water Conserved',
      value: waterSaved,
      icon: Droplets,
      color: 'primary',
      description: 'Liters of water saved',
      target: 5000,
      unit: 'liters',
    },
    {
      title: 'CO2 Reduced',
      value: co2Reduced,
      icon: Globe,
      color: 'accent',
      description: 'Carbon footprint reduction',
      target: 1000,
      unit: 'kg',
    },
    {
      title: 'Waste Recycled',
      value: plasticRecycled,
      icon: Recycle,
      color: 'earth',
      description: 'Total waste processed',
      target: 500,
      unit: 'kg',
    },
  ];

  const achievements = [
    { title: 'First Pickup', description: 'Completed your first waste pickup', achieved: userPoints > 0, points: 100 },
    { title: 'Eco Warrior', description: 'Recycled 5 different waste types', achieved: userPoints > 500, points: 500 },
    { title: 'Tree Saver', description: 'Saved 10 trees through recycling', achieved: treesJaved >= 10, points: 1000 },
    { title: 'Water Guardian', description: 'Conserved 1000L of water', achieved: waterSaved >= 1000, points: 1500 },
    { title: 'Carbon Fighter', description: 'Reduced 100kg of CO2', achieved: co2Reduced >= 100, points: 2000 },
    { title: 'Sustainability Champion', description: 'Reached 2000 points milestone', achieved: userPoints >= 2000, points: 2500 },
  ];

  if (!user) {
    return <div>Please log in to track your impact.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-eco rounded-2xl shadow-hover">
            <Target className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Track Your Impact</h1>
        <p className="text-muted-foreground">
          See how your eco-friendly actions are making a real difference in the world
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-hover transition-all duration-300 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-${metric.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{metric.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{metric.unit}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">{metric.title}</h3>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress to target</span>
                    <span>{Math.min(100, Math.round((metric.value / metric.target) * 100))}%</span>
                  </div>
                  <Progress value={Math.min(100, (metric.value / metric.target) * 100)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Impact Trend */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Monthly Impact Trends
          </CardTitle>
          <CardDescription>
            Track your environmental impact over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyImpact}>
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
                <Line type="monotone" dataKey="trees" stroke="hsl(var(--success))" strokeWidth={3} name="Trees Saved" />
                <Line type="monotone" dataKey="water" stroke="hsl(var(--primary))" strokeWidth={3} name="Water Saved (L)" />
                <Line type="monotone" dataKey="co2" stroke="hsl(var(--accent))" strokeWidth={3} name="CO2 Reduced (kg)" />
                <Line type="monotone" dataKey="plastic" stroke="hsl(var(--earth))" strokeWidth={3} name="Waste Recycled (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Type Distribution */}
        <Card className="shadow-hover border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-primary" />
              Waste Type Impact
            </CardTitle>
            <CardDescription>
              Distribution of your recycling efforts by waste type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteTypeImpact}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteTypeImpact.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {wasteTypeImpact.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-hover border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Unlock badges as you reach environmental milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    achievement.achieved 
                      ? 'bg-success/10 border-success/20 shadow-soft' 
                      : 'bg-muted/30 border-border'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.achieved 
                      ? 'bg-success text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.achieved ? '🏆' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.achieved ? 'text-success' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-primary font-medium">+{achievement.points} points</p>
                  </div>
                  {achievement.achieved && (
                    <Leaf className="h-5 w-5 text-success animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-hover border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Environmental Legacy 🌍</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-2xl font-bold">{treesJaved}</div>
              <div className="text-sm opacity-90">Trees Saved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{waterSaved.toLocaleString()}</div>
              <div className="text-sm opacity-90">Liters Conserved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{co2Reduced}</div>
              <div className="text-sm opacity-90">kg CO2 Reduced</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{plasticRecycled}</div>
              <div className="text-sm opacity-90">kg Waste Recycled</div>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Every action you take creates ripples of positive change. Together, we're building a more sustainable future! 🌱
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackImpact;