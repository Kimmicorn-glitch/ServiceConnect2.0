/**
 * ADMIN PAGE
 * Dashboard for project creators/administrators
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Wrench, Star, TrendingUp, Settings, Shield, CheckCircle, XCircle } from "lucide-react";

interface PlatformStats {
  users: number;
  providers: number;
  bookings: number;
  reviews: number;
}

interface Provider {
  id: number;
  business_name: string;
  city: string;
  verified: number;
  rating_average: number;
  created_at: string;
}

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('https://backend.youware.com/api/auth/is-admin');
        const data = await response.json();
        setIsAdmin(data.isAdmin);
        
        if (data.isAdmin) {
          // Fetch platform stats
          const statsResponse = await fetch('https://backend.youware.com/api/admin/stats');
          const statsData = await statsResponse.json();
          setStats(statsData.stats);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  const loadProviders = async () => {
    setLoadingProviders(true);
    try {
      const response = await fetch('https://backend.youware.com/api/admin/providers');
      const data = await response.json();
      setProviders(data.providers || []);
    } catch (error) {
      console.error("Failed to load providers:", error);
    } finally {
      setLoadingProviders(false);
    }
  };

  const verifyProvider = async (providerId: number, verified: boolean) => {
    try {
      await fetch('https://backend.youware.com/api/admin/providers/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, verified })
      });
      // Refresh provider list
      loadProviders();
    } catch (error) {
      console.error("Failed to verify provider:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <Card className="max-w-md w-full border-2">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-center">Access Denied</CardTitle>
            <CardDescription className="text-center">
              You don't have permission to access the admin dashboard.
              <br />
              Only project creators can access this area.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const statsDisplay = [
    { title: "Total Users", value: stats?.users || 0, icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Service Providers", value: stats?.providers || 0, icon: Wrench, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Total Bookings", value: stats?.bookings || 0, icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Total Reviews", value: stats?.reviews || 0, icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your ServiceConnect platform
              </p>
            </div>
            <Badge variant="secondary" className="h-8 px-4">
              <Shield className="h-4 w-4 mr-2" />
              Project Creator
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Provider Management */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Provider Management</CardTitle>
                <CardDescription>Review and verify service provider applications</CardDescription>
              </div>
              <Button onClick={loadProviders} disabled={loadingProviders}>
                {loadingProviders ? 'Loading...' : 'Load Providers'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {providers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No providers yet. Click "Load Providers" to see applications.
              </p>
            ) : (
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{provider.business_name}</p>
                        {provider.verified === 1 ? (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{provider.city}</p>
                      <p className="text-xs text-muted-foreground">
                        Rating: {provider.rating_average.toFixed(1)} ⭐ | 
                        Joined: {new Date(provider.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {provider.verified === 0 ? (
                        <Button 
                          size="sm" 
                          onClick={() => verifyProvider(provider.id, true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => verifyProvider(provider.id, false)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Platform Settings */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform features and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Platform Configuration
              </Button>
              <Button className="w-full" variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Manage Reviews
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
