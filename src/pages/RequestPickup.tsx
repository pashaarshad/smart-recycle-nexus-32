import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Trash2, Package, Calendar as CalendarIcon } from 'lucide-react';

interface PickupRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  date: string;
  wasteTypes: string[];
  status: 'pending' | 'completed';
  createdAt: Date;
}

const RequestPickup = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypes = [
    { id: 'plastic', label: 'Plastic', points: 100, icon: '🥤' },
    { id: 'paper', label: 'Paper', points: 80, icon: '📰' },
    { id: 'metal', label: 'Metal', points: 150, icon: '🥫' },
    { id: 'organic', label: 'Organic Waste', points: 60, icon: '🥬' },
    { id: 'electronic', label: 'Electronic Waste', points: 200, icon: '📱' },
    { id: 'glass', label: 'Glass', points: 90, icon: '🍾' },
  ];

  const handleWasteTypeChange = (wasteTypeId: string, checked: boolean) => {
    if (checked) {
      setSelectedWasteTypes([...selectedWasteTypes, wasteTypeId]);
    } else {
      setSelectedWasteTypes(selectedWasteTypes.filter(id => id !== wasteTypeId));
    }
  };

  const calculateTotalPoints = () => {
    return selectedWasteTypes.reduce((total, typeId) => {
      const wasteType = wasteTypes.find(type => type.id === typeId);
      return total + (wasteType?.points || 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (selectedWasteTypes.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one type of waste for pickup.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create pickup request
    const request: PickupRequest = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone || '',
      userAddress: user.address || '',
      date: selectedDate,
      wasteTypes: selectedWasteTypes,
      status: 'pending',
      createdAt: new Date(),
    };

    // Store in localStorage (in real app, this would be an API call)
    const existingRequests = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
    existingRequests.push(request);
    localStorage.setItem('pickupRequests', JSON.stringify(existingRequests));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Pickup Requested Successfully! 🎉",
      description: `Your request has been submitted. You'll earn ${calculateTotalPoints()} points once completed.`,
    });

    // Reset form
    setSelectedDate('');
    setSelectedWasteTypes([]);
    setIsSubmitting(false);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (!user) {
    return <div>Please log in to request pickup.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-eco rounded-2xl shadow-hover">
            <Trash2 className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Request Waste Pickup</h1>
        <p className="text-muted-foreground">
          Schedule a convenient time for our team to collect your recyclable waste
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-hover border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Pickup Request Form
              </CardTitle>
              <CardDescription>
                Fill in the details below to schedule your waste pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Information (Pre-filled) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  )}
                  {user.address && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Address</Label>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-date" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Preferred Pickup Date
                  </Label>
                  <Input
                    id="pickup-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    required
                    className="transition-all duration-300 focus:shadow-eco"
                  />
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Pickup time: 6:00 AM - 9:00 AM
                  </p>
                </div>

                {/* Waste Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Select Waste Types</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wasteTypes.map((wasteType) => (
                      <div
                        key={wasteType.id}
                        className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer hover:shadow-soft ${
                          selectedWasteTypes.includes(wasteType.id)
                            ? 'border-primary bg-primary/5 shadow-eco'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleWasteTypeChange(wasteType.id, !selectedWasteTypes.includes(wasteType.id))}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={wasteType.id}
                            checked={selectedWasteTypes.includes(wasteType.id)}
                            onCheckedChange={(checked) => handleWasteTypeChange(wasteType.id, !!checked)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{wasteType.icon}</span>
                              <Label htmlFor={wasteType.id} className="font-medium cursor-pointer">
                                {wasteType.label}
                              </Label>
                            </div>
                            <p className="text-sm text-success font-medium">
                              +{wasteType.points} points
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="eco" 
                  size="lg" 
                  className="w-full" 
                  disabled={isSubmitting || selectedWasteTypes.length === 0}
                >
                  {isSubmitting ? 'Submitting Request...' : 'Request Pickup'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Points Calculator */}
          <Card className="shadow-hover border-0">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Points Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedWasteTypes.length > 0 ? (
                  <>
                    {selectedWasteTypes.map(typeId => {
                      const wasteType = wasteTypes.find(type => type.id === typeId);
                      return wasteType ? (
                        <div key={typeId} className="flex justify-between items-center">
                          <span className="text-sm flex items-center gap-2">
                            <span>{wasteType.icon}</span>
                            {wasteType.label}
                          </span>
                          <span className="text-sm font-medium text-success">
                            +{wasteType.points}
                          </span>
                        </div>
                      ) : null;
                    })}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Points</span>
                        <span className="text-lg text-success">+{calculateTotalPoints()}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Select waste types to see points calculation
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Impact Preview */}
          <Card className="bg-gradient-card shadow-hover border-0">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>🌳 Trees Saved</span>
                  <span className="font-medium">{Math.floor(calculateTotalPoints() / 50)}</span>
                </div>
                <div className="flex justify-between">
                  <span>💧 Water Saved (L)</span>
                  <span className="font-medium">{Math.floor(calculateTotalPoints() * 2.5)}</span>
                </div>
                <div className="flex justify-between">
                  <span>♻️ CO2 Reduced (kg)</span>
                  <span className="font-medium">{Math.floor(calculateTotalPoints() * 1.8)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Info */}
          <Card className="bg-primary/5 border-primary/20 shadow-soft">
            <CardContent className="p-4">
              <h4 className="font-semibold text-primary mb-2">📍 Pickup Information</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Free pickup service</li>
                <li>• Morning slots: 6:00 AM - 9:00 AM</li>
                <li>• SMS confirmation sent</li>
                <li>• Points awarded on completion</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestPickup;