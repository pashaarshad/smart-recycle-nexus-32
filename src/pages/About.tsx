import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, Users, Globe, Target, Heart, Recycle, TreePine, Droplets, Star, Award } from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: 'Team Lead', role: 'Project Architecture & Strategy', avatar: '👨‍💼' },
    { name: 'Developer 1', role: 'Frontend Development & UI/UX', avatar: '👩‍💻' },
    { name: 'Developer 2', role: 'Backend Development & API', avatar: '👨‍💻' },
    { name: 'Developer 3', role: 'Data Analytics & Optimization', avatar: '👩‍🔬' },
    { name: 'Developer 4', role: 'Mobile Development & Testing', avatar: '👨‍🔧' },
  ];

  const sdgGoals = [
    { id: 3, title: 'Good Health and Well-being', icon: '🏥', progress: 78 },
    { id: 6, title: 'Clean Water and Sanitation', icon: '💧', progress: 65 },
    { id: 11, title: 'Sustainable Cities', icon: '🏙️', progress: 82 },
    { id: 12, title: 'Responsible Consumption', icon: '♻️', progress: 90 },
    { id: 15, title: 'Life on Land', icon: '🌍', progress: 73 },
  ];

  const achievements = [
    { metric: '10,000+', description: 'Kg Waste Recycled', icon: Recycle },
    { metric: '2,500+', description: 'Trees Saved', icon: TreePine },
    { metric: '50,000+', description: 'Liters Water Conserved', icon: Droplets },
    { metric: '500+', description: 'Families Helped', icon: Users },
  ];

  const technologies = [
    'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python Flask', 
    'Supabase', 'Chart.js', 'PWA', 'Responsive Design'
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-gradient-eco rounded-3xl shadow-hover">
            <Globe className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-primary mb-4">About Smart Recycle</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Revolutionizing waste management through technology, creating a circular economy that benefits 
          both the environment and communities across India.
        </p>
        <div className="flex justify-center gap-2 mt-6">
          <Badge variant="default" className="bg-gradient-eco text-white">
            Infosys Hackathon 2025
          </Badge>
          <Badge variant="outline">
            Tech for Good
          </Badge>
          <Badge variant="outline">
            Global Impact
          </Badge>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-hover border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="h-8 w-8 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To create a comprehensive waste management ecosystem that bridges the gap between urban waste 
              generation and sustainable recycling, while empowering communities and solving the hunger crisis 
              through innovative technology solutions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Leaf className="h-4 w-4 text-success" />
                <span>Zero waste to landfills</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>Community empowerment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Hunger eradication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-hover border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Star className="h-8 w-8 text-accent" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To become India's leading circular economy platform where waste is completely eliminated, 
              every citizen is empowered to contribute to sustainability, and technology serves as the 
              bridge between environmental protection and social welfare.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-accent" />
                <span>Nationwide circular economy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TreePine className="h-4 w-4 text-success" />
                <span>Carbon-neutral cities</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span>Global sustainability leadership</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unique Value Proposition */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-3xl text-primary text-center mb-2">
            💡 Our Unique Approach - Circular Economy Model
          </CardTitle>
          <CardDescription className="text-center text-lg">
            How we transform waste into resources while creating sustainable profit and social impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-primary text-primary-foreground rounded-xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Smart Collection</h3>
              <p className="text-sm opacity-90">
                On-demand pickup requests through our platform ensure comprehensive coverage
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-eco text-primary-foreground rounded-xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-semibold mb-2">Processing & Classification</h3>
              <p className="text-sm opacity-90">
                Plastic → recycled products, Organic → fertilizer, Metal → raw materials
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-earth text-earth-foreground rounded-xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Revenue Generation</h3>
              <p className="text-sm opacity-90">
                Selling processed materials to manufacturers creates sustainable revenue
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-card border border-border rounded-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2 text-primary">Social Impact</h3>
              <p className="text-sm text-muted-foreground">
                Food-for-waste program helps communities without digital access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDG Goals */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-3xl text-primary text-center">
            🎯 UN Sustainable Development Goals We Address
          </CardTitle>
          <CardDescription className="text-center">
            Our platform directly contributes to achieving multiple UN SDG targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sdgGoals.map((goal) => (
              <div key={goal.id} className="text-center p-4 bg-gradient-card rounded-lg border border-border">
                <div className="text-4xl mb-2">{goal.icon}</div>
                <h4 className="font-semibold text-primary text-sm mb-1">SDG {goal.id}</h4>
                <p className="text-xs text-muted-foreground mb-2">{goal.title}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-eco h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-success font-medium">{goal.progress}% Impact</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Numbers */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-3xl text-center">🌍 Our Global Impact</CardTitle>
          <CardDescription className="text-center text-primary-foreground/90">
            Real numbers, real change, real impact on communities and environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{achievement.metric}</div>
                <div className="text-sm opacity-90">{achievement.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary text-center">
            🚀 Technology Stack
          </CardTitle>
          <CardDescription className="text-center">
            Built with modern, scalable technologies for optimal performance and user experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-primary text-center">
            👥 Our Team
          </CardTitle>
          <CardDescription className="text-center">
            Five passionate developers united by a common goal: making the world more sustainable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.avatar}
                </div>
                <h4 className="font-semibold text-primary mb-1">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-eco text-primary-foreground shadow-hover border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Green Revolution! 🌱</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Together, we can create a world where waste doesn't exist, communities thrive, 
            and sustainability is not just a goal but a way of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/request-pickup'}
            >
              Start Recycling Today
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/rewards'}
            >
              Explore Rewards
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            Infosys Hackathon 2025 • Tech for Good • Building a Sustainable Future
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;