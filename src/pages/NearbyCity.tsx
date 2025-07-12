import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

interface CollectionTeam {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  operatingHours: string;
  specialties: string[];
  verified: boolean;
}

const NearbyCity = () => {
  const [radius, setRadius] = useState([5]);
  
  const mockTeams: CollectionTeam[] = [
    {
      id: '1',
      name: 'Green Earth Collectors',
      address: 'BTM Layout, Bangalore, Karnataka',
      phone: '+91 98765 43210',
      distance: 1.2,
      rating: 4.8,
      operatingHours: '6:00 AM - 10:00 PM',
      specialties: ['Plastic', 'Electronic', 'Metal'],
      verified: true,
    },
    {
      id: '2',
      name: 'EcoSafe Waste Management',
      address: 'Koramangala, Bangalore, Karnataka',
      phone: '+91 98765 43211',
      distance: 2.8,
      rating: 4.6,
      operatingHours: '7:00 AM - 9:00 PM',
      specialties: ['Organic', 'Paper', 'Plastic'],
      verified: true,
    },
    {
      id: '3',
      name: 'Sustainable Solutions Pvt Ltd',
      address: 'Indiranagar, Bangalore, Karnataka',
      phone: '+91 98765 43212',
      distance: 3.5,
      rating: 4.9,
      operatingHours: '6:00 AM - 8:00 PM',
      specialties: ['All Types', 'Hazardous Waste'],
      verified: true,
    },
    {
      id: '4',
      name: 'City Clean Collectors',
      address: 'Whitefield, Bangalore, Karnataka',
      phone: '+91 98765 43213',
      distance: 4.2,
      rating: 4.4,
      operatingHours: '8:00 AM - 6:00 PM',
      specialties: ['Paper', 'Cardboard', 'Metal'],
      verified: false,
    },
    {
      id: '5',
      name: 'Karnataka Recycle Hub',
      address: 'Jayanagar, Bangalore, Karnataka',
      phone: '+91 98765 43214',
      distance: 4.8,
      rating: 4.7,
      operatingHours: '6:00 AM - 9:00 PM',
      specialties: ['Plastic', 'Glass', 'Electronic'],
      verified: true,
    },
    {
      id: '6',
      name: 'Eco Warriors Collective',
      address: 'HSR Layout, Bangalore, Karnataka',
      phone: '+91 98765 43215',
      distance: 6.2,
      rating: 4.5,
      operatingHours: '7:00 AM - 8:00 PM',
      specialties: ['Organic', 'Composting'],
      verified: true,
    },
    {
      id: '7',
      name: 'Green Tech Recyclers',
      address: 'Electronic City, Bangalore, Karnataka',
      phone: '+91 98765 43216',
      distance: 8.5,
      rating: 4.3,
      operatingHours: '9:00 AM - 5:00 PM',
      specialties: ['Electronic', 'Battery', 'Metal'],
      verified: false,
    },
    {
      id: '8',
      name: 'Bangalore Waste Solutions',
      address: 'Marathahalli, Bangalore, Karnataka',
      phone: '+91 98765 43217',
      distance: 9.8,
      rating: 4.6,
      operatingHours: '6:00 AM - 10:00 PM',
      specialties: ['All Types', 'Industrial Waste'],
      verified: true,
    },
  ];

  const filteredTeams = mockTeams.filter(team => team.distance <= radius[0]);

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      'Plastic': 'destructive',
      'Paper': 'earth',
      'Metal': 'secondary',
      'Organic': 'success',
      'Electronic': 'primary',
      'Glass': 'accent',
      'All Types': 'primary',
      'Hazardous Waste': 'destructive',
      'Cardboard': 'earth',
      'Battery': 'warning',
      'Composting': 'success',
      'Industrial Waste': 'secondary',
    };
    return colors[specialty] || 'secondary';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : i < rating
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-eco rounded-2xl shadow-hover">
            <MapPin className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Nearby Collection Teams</h1>
        <p className="text-muted-foreground">
          Find verified waste collection teams in Karnataka, India within your preferred radius
        </p>
      </div>

      {/* Search Controls */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            Search Radius
          </CardTitle>
          <CardDescription>
            Adjust the radius to find collection teams near you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Radius: {radius[0]} miles</span>
                <Badge variant="secondary">{filteredTeams.length} teams found</Badge>
              </div>
              <Slider
                value={radius}
                onValueChange={setRadius}
                max={15}
                min={1}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 mile</span>
                <span>5 miles</span>
                <span>10 miles</span>
                <span>15 miles</span>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">📍 Current Location</h4>
              <p className="text-sm text-muted-foreground">Bangalore, Karnataka, India</p>
              <p className="text-xs text-muted-foreground mt-1">
                Showing collection teams within {radius[0]} mile radius
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collection Teams List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Available Collection Teams</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>{filteredTeams.filter(t => t.verified).length} Verified Teams</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="shadow-hover border-0 group hover:shadow-eco transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-primary">{team.name}</h3>
                      {team.verified && (
                        <Badge variant="default" className="text-xs bg-success text-success-foreground">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(team.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({team.rating}/5.0)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{team.distance} mi</div>
                    <div className="text-xs text-muted-foreground">distance</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{team.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{team.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{team.operatingHours}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {team.specialties.map((specialty, index) => (
                        <Badge 
                          key={index} 
                          variant={getSpecialtyColor(specialty) as any}
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="eco" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(`tel:${team.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(team.address)}`, '_blank')}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <Card className="shadow-soft border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">No Teams Found</h3>
              <p className="text-muted-foreground mb-4">
                No collection teams found within {radius[0]} mile radius. Try increasing the search radius.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setRadius([10])}
              >
                Expand to 10 miles
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Service Areas Info */}
      <Card className="bg-gradient-card shadow-hover border-0">
        <CardHeader>
          <CardTitle className="text-primary">📍 Service Coverage</CardTitle>
          <CardDescription>
            Our network covers major areas in Karnataka with focus on sustainable waste management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-primary mb-2">Bangalore Metropolitan</h4>
              <p className="text-sm text-muted-foreground">
                Complete coverage across all major areas including BTM, Koramangala, Indiranagar, and more
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-success" />
              </div>
              <h4 className="font-semibold text-success mb-2">Verified Partners</h4>
              <p className="text-sm text-muted-foreground">
                All our collection teams are verified and follow sustainable waste management practices
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold text-accent mb-2">Flexible Hours</h4>
              <p className="text-sm text-muted-foreground">
                Most teams operate from early morning to evening to accommodate your schedule
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearbyCity;