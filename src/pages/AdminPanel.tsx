import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, Clock, Users, Package, X } from 'lucide-react';

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

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<PickupRequest[]>([]);

  // Default test pickup requests
  const defaultRequests: PickupRequest[] = [
    {
      id: 'req-001',
      userId: 'test-user',
      userName: 'Rajesh Kumar',
      userEmail: 'rajesh@gmail.com',
      userPhone: '+91 98765 43210',
      userAddress: 'BTM Layout, 2nd Stage, Bangalore, Karnataka 560076',
      date: '2024-01-20',
      wasteTypes: ['Plastic Bottles', 'Paper/Cardboard', 'Metal Cans'],
      status: 'pending',
      createdAt: new Date('2024-01-18'),
    },
    {
      id: 'req-002',
      userId: 'test-user-2',
      userName: 'Priya Sharma',
      userEmail: 'priya@gmail.com',
      userPhone: '+91 87654 32109',
      userAddress: 'Koramangala, 5th Block, Bangalore, Karnataka 560095',
      date: '2024-01-21',
      wasteTypes: ['E-waste', 'Plastic Containers'],
      status: 'pending',
      createdAt: new Date('2024-01-19'),
    },
    {
      id: 'req-003',
      userId: 'test-user-3',
      userName: 'Arun Patel',
      userEmail: 'arun@gmail.com',
      userPhone: '+91 76543 21098',
      userAddress: 'Whitefield, EPIP Zone, Bangalore, Karnataka 560066',
      date: '2024-01-22',
      wasteTypes: ['Glass Bottles', 'Paper/Cardboard', 'Organic Waste'],
      status: 'pending',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 'req-004',
      userId: 'test-user-4',
      userName: 'Lakshmi Devi',
      userEmail: 'lakshmi@gmail.com',
      userPhone: '+91 65432 10987',
      userAddress: 'Indiranagar, 100 Feet Road, Bangalore, Karnataka 560038',
      date: '2024-01-23',
      wasteTypes: ['Mixed Plastic', 'Metal Cans'],
      status: 'pending',
      createdAt: new Date('2024-01-21'),
    },
  ];

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
    if (storedRequests.length === 0) {
      // Add default test requests if none exist
      localStorage.setItem('pickupRequests', JSON.stringify(defaultRequests));
      setRequests(defaultRequests);
    } else {
      setRequests(storedRequests.map((r: any) => ({ ...r, createdAt: new Date(r.createdAt) })));
    }
  }, []);

  const handleCompleteRequest = (requestId: string) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: 'completed' as const } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('pickupRequests', JSON.stringify(updatedRequests));
    
    // Award random points between 300-800 based on waste types
    const completedRequest = requests.find(r => r.id === requestId);
    if (completedRequest) {
      const pointsPerWasteType = {
        'Plastic Bottles': Math.floor(Math.random() * 200) + 150, // 150-350
        'Paper/Cardboard': Math.floor(Math.random() * 150) + 100, // 100-250
        'Metal Cans': Math.floor(Math.random() * 250) + 200, // 200-450
        'E-waste': Math.floor(Math.random() * 300) + 300, // 300-600
        'Glass Bottles': Math.floor(Math.random() * 180) + 120, // 120-300
        'Plastic Containers': Math.floor(Math.random() * 170) + 130, // 130-300
        'Organic Waste': Math.floor(Math.random() * 100) + 80, // 80-180
        'Mixed Plastic': Math.floor(Math.random() * 200) + 150, // 150-350
      };
      
      const totalPoints = completedRequest.wasteTypes.reduce((total, wasteType) => {
        return total + (pointsPerWasteType[wasteType as keyof typeof pointsPerWasteType] || 100);
      }, 0);

      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === completedRequest.userId);
      if (userIndex !== -1) {
        users[userIndex].points = (users[userIndex].points || 0) + totalPoints;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }

      toast({
        title: "Request Accepted & Completed",
        description: `Pickup completed successfully. User awarded ${totalPoints} points.`,
      });
    }
  };

  const handleRejectRequest = (requestId: string) => {
    const updatedRequests = requests.filter(request => request.id !== requestId);
    setRequests(updatedRequests);
    localStorage.setItem('pickupRequests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Request Rejected",
      description: "Pickup request has been rejected and removed.",
      variant: "destructive",
    });
  };

  if (!user?.isAdmin) {
    return <div className="p-8 text-center">Access denied. Admin only.</div>;
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const completedRequests = requests.filter(r => r.status === 'completed');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage pickup requests and system operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-hover border-0">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{pendingRequests.length}</div>
            <div className="text-sm text-muted-foreground">Pending Requests</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-hover border-0">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">{completedRequests.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-hover border-0">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{requests.length}</div>
            <div className="text-sm text-muted-foreground">Total Requests</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-hover border-0">
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">{completedRequests.length * 500}</div>
            <div className="text-sm text-muted-foreground">Points Awarded</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="shadow-hover border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-warning" />
            Pending Pickup Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-primary">{request.userName}</h4>
                      <p className="text-sm text-muted-foreground">{request.userEmail}</p>
                      <p className="text-sm text-muted-foreground">{request.userPhone}</p>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      Pending
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium">Date:</span>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Address:</span>
                      <p className="text-sm text-muted-foreground">{request.userAddress}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Waste Types:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.wasteTypes.map((type, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-success text-white hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept & Complete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Accept Pickup Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to accept and complete this pickup request for {request.userName}? 
                            Points will be awarded to the user based on their waste types.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleCompleteRequest(request.id)}
                            className="bg-success hover:bg-success/90"
                          >
                            Accept & Complete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Pickup Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject this pickup request for {request.userName}? 
                            This action cannot be undone and the request will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRejectRequest(request.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Reject Request
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No pending requests</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;