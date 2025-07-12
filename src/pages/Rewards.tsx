import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Gift, Star, Users, Heart, Leaf, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  category: 'eco' | 'premium' | 'special';
  image: string;
  inStock: boolean;
}

const Rewards = () => {
  const { user, updateUserPoints } = useAuth();
  const { toast } = useToast();
  const [claimedProducts, setClaimedProducts] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Sustainable Bamboo Pencil Set',
      description: 'Eco-friendly pencils made from bamboo, perfect for students and professionals',
      points: 400,
      category: 'eco',
      image: '🖊️',
      inStock: true,
    },
    {
      id: '2',
      name: 'Recycled Paper Notebook',
      description: 'High-quality notebook made from 100% recycled paper',
      points: 600,
      category: 'eco',
      image: '📔',
      inStock: true,
    },
    {
      id: '3',
      name: 'Organic Cotton Tote Bag',
      description: 'Reusable shopping bag made from organic cotton',
      points: 800,
      category: 'eco',
      image: '🛍️',
      inStock: true,
    },
    {
      id: '4',
      name: 'Solar-Powered Phone Charger',
      description: 'Portable solar charger for sustainable energy on the go',
      points: 1200,
      category: 'premium',
      image: '🔋',
      inStock: true,
    },
    {
      id: '5',
      name: 'Biodegradable Phone Case',
      description: 'Eco-friendly phone case that decomposes naturally',
      points: 1000,
      category: 'premium',
      image: '📱',
      inStock: true,
    },
    {
      id: '6',
      name: 'Stainless Steel Water Bottle',
      description: 'Durable, reusable water bottle to reduce plastic waste',
      points: 1500,
      category: 'premium',
      image: '🍼',
      inStock: true,
    },
    {
      id: '7',
      name: 'Smart Plant Monitor',
      description: 'IoT device to monitor your plants\' health and growth',
      points: 2500,
      category: 'premium',
      image: '🌱',
      inStock: true,
    },
    {
      id: '8',
      name: 'Eco-Friendly Lunch Box Set',
      description: 'Complete lunch box set made from sustainable materials',
      points: 1800,
      category: 'premium',
      image: '🍱',
      inStock: true,
    },
  ];

  const offlineContributions = [
    {
      id: '1',
      contributor: 'Rajesh Kumar',
      location: 'BTM Layout, Bangalore',
      wasteType: 'Mixed Plastic',
      quantity: '2.5 kg',
      foodProvided: 'Meal + Fruits',
      date: '2024-01-15',
    },
    {
      id: '2',
      contributor: 'Lakshmi Devi',
      location: 'Koramangala, Bangalore',
      wasteType: 'Paper & Cardboard',
      quantity: '1.8 kg',
      foodProvided: 'Meal + Fruits',
      date: '2024-01-14',
    },
    {
      id: '3',
      contributor: 'Munna Bhai',
      location: 'Whitefield, Bangalore',
      wasteType: 'Metal Cans',
      quantity: '3.2 kg',
      foodProvided: 'Meal + Fruits',
      date: '2024-01-13',
    },
    {
      id: '4',
      contributor: 'Anita Sharma',
      location: 'Indiranagar, Bangalore',
      wasteType: 'Mixed Waste',
      quantity: '2.1 kg',
      foodProvided: 'Meal + Fruits',
      date: '2024-01-12',
    },
  ];

  const handleClaimProduct = (product: Product) => {
    if (!user) return;
    
    if (user.points < product.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${product.points - user.points} more points to claim this reward.`,
        variant: "destructive",
      });
      return;
    }

    const newPoints = user.points - product.points;
    updateUserPoints(newPoints);
    setClaimedProducts([...claimedProducts, product.id]);

    toast({
      title: "Reward Claimed! 🎉",
      description: `You've successfully claimed ${product.name}. It will be shipped to your address.`,
    });
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'eco': return <Leaf className="h-5 w-5" />;
      case 'premium': return <Star className="h-5 w-5" />;
      case 'special': return <Gift className="h-5 w-5" />;
      default: return <ShoppingBag className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'eco': return 'success';
      case 'premium': return 'primary';
      case 'special': return 'accent';
      default: return 'secondary';
    }
  };

  if (!user) {
    return <div>Please log in to access rewards.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-eco rounded-2xl shadow-hover">
            <Gift className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Eco Rewards Store</h1>
        <p className="text-muted-foreground">
          Redeem your points for sustainable products and support our community initiatives
        </p>
      </div>

      {/* Points Balance */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-hover border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Eco Points Balance</h2>
              <p className="opacity-90">Earn more points by recycling waste and helping the environment!</p>
            </div>
            <div className="bg-white/10 px-8 py-4 rounded-xl backdrop-blur-sm">
              <div className="text-center">
                <div className="text-4xl font-bold">{user.points}</div>
                <div className="text-sm opacity-90">Points Available</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Sustainable Products</TabsTrigger>
          <TabsTrigger value="offline">Community Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          {/* Product Categories */}
          <div className="space-y-6">
            {/* Eco Products */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Eco-Friendly Products</h3>
                <Badge variant="secondary">400-800 points</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProductsByCategory('eco').map((product) => (
                  <Card key={product.id} className="shadow-hover border-0 group hover:shadow-eco transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {product.image}
                        </div>
                        <Badge variant={getCategoryColor(product.category) as any} className="mb-2">
                          {getCategoryIcon(product.category)}
                          <span className="ml-1 capitalize">{product.category}</span>
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-primary mb-2">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-success">{product.points} points</span>
                        <Button
                          variant={user.points >= product.points ? "eco" : "outline"}
                          size="sm"
                          onClick={() => handleClaimProduct(product)}
                          disabled={user.points < product.points || claimedProducts.includes(product.id)}
                        >
                          {claimedProducts.includes(product.id) 
                            ? 'Claimed ✓' 
                            : user.points >= product.points 
                              ? 'Claim' 
                              : 'Need More Points'
                          }
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Premium Products */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Premium Rewards</h3>
                <Badge variant="secondary">1000+ points</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProductsByCategory('premium').map((product) => (
                  <Card key={product.id} className="shadow-hover border-0 group hover:shadow-eco transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {product.image}
                        </div>
                        <Badge variant={getCategoryColor(product.category) as any} className="mb-2">
                          {getCategoryIcon(product.category)}
                          <span className="ml-1 capitalize">{product.category}</span>
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-primary mb-2">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-success">{product.points} points</span>
                        <Button
                          variant={user.points >= product.points ? "hero" : "outline"}
                          size="sm"
                          onClick={() => handleClaimProduct(product)}
                          disabled={user.points < product.points || claimedProducts.includes(product.id)}
                        >
                          {claimedProducts.includes(product.id) 
                            ? 'Claimed ✓' 
                            : user.points >= product.points 
                              ? 'Claim' 
                              : 'Need More Points'
                          }
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="offline" className="space-y-6">
          {/* Offline Community Program */}
          <Card className="shadow-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-heart/10 rounded-lg">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                Offline Community Impact Program
              </CardTitle>
              <CardDescription>
                Supporting our community members without digital access through our "Waste for Food" initiative
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-card p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-primary mb-3">🤝 How It Works</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h5 className="font-medium mb-1">Community Collection</h5>
                    <p className="text-muted-foreground">People bring waste to our collection centers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Gift className="h-6 w-6 text-success" />
                    </div>
                    <h5 className="font-medium mb-1">Food Exchange</h5>
                    <p className="text-muted-foreground">We provide nutritious meals and fruits in return</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Leaf className="h-6 w-6 text-accent" />
                    </div>
                    <h5 className="font-medium mb-1">Environmental Impact</h5>
                    <p className="text-muted-foreground">Waste gets properly recycled and processed</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-primary mb-4">📍 Recent Community Contributions</h4>
              <div className="space-y-4">
                {offlineContributions.map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center text-white font-bold">
                        {contribution.contributor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 className="font-medium">{contribution.contributor}</h5>
                        <p className="text-sm text-muted-foreground">{contribution.location}</p>
                        <p className="text-xs text-success">{contribution.foodProvided} provided</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{contribution.quantity}</div>
                      <div className="text-sm text-muted-foreground">{contribution.wasteType}</div>
                      <div className="text-xs text-muted-foreground">{contribution.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <h5 className="font-semibold text-success mb-2">🎯 Community Impact Stats</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">127</div>
                    <div className="text-sm text-muted-foreground">People Fed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">2.4T</div>
                    <div className="text-sm text-muted-foreground">Waste Collected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">15</div>
                    <div className="text-sm text-muted-foreground">Collection Centers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">98%</div>
                    <div className="text-sm text-muted-foreground">Recycling Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rewards;