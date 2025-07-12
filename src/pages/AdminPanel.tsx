import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Users, Package } from 'lucide-react';

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

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
    setRequests(storedRequests.map((r: any) => ({ ...r, createdAt: new Date(r.createdAt) })));
  }, []);

  const handleCompleteRequest = (requestId: string) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: 'completed' as const } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('pickupRequests', JSON.stringify(updatedRequests));
    
    // Award points to user (500 points as specified)
    const completedRequest = requests.find(r => r.id === requestId);
    if (completedRequest) {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === completedRequest.userId);
      if (userIndex !== -1) {
        users[userIndex].points = (users[userIndex].points || 0) + 500;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    }

    toast({
      title: "Request Completed",
      description: "Pickup marked as completed. User awarded 500 points.",
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
                  <Button 
                    variant="success" 
                    size="sm" 
                    onClick={() => handleCompleteRequest(request.id)}
                    className="bg-success text-success-foreground hover:bg-success/90"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
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