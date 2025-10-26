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
  const [usersList, setUsersList] = useState<Array<any>>([]);
  const [emailsList, setEmailsList] = useState<Array<any>>([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(false);

  useEffect(() => {
    const BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "";

    const tryFetchJson = async (path: string, opts?: RequestInit) => {
      const url = BACKEND ? `${BACKEND}${path}` : path;
      try {
        const res = await fetch(url, opts);
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        console.warn("fetch failed", url, err);
        return null;
      }
    };

    const MOCK_STATS: PlatformStats = { users: 1024, providers: 234, bookings: 456, reviews: 789 };

    const checkAdmin = async () => {
      try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const data = await tryFetchJson('/api/auth/is-admin', { headers });
        if (data && typeof data.isAdmin !== 'undefined') {
          setIsAdmin(!!data.isAdmin);

          if (data.isAdmin) {
            const statsData = await tryFetchJson('/api/admin/stats');
            setStats(statsData?.stats || MOCK_STATS);
          }
        } else {
          // No backend available; enable a safe dev-mode admin view so the UI can be inspected
          if ((import.meta as any).env?.DEV) {
            setIsAdmin(true);
            setStats(MOCK_STATS);
          } else {
            setIsAdmin(false);
          }
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
    const BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "";

    const tryFetchJson = async (path: string, opts?: RequestInit) => {
      const url = BACKEND ? `${BACKEND}${path}` : path;
      try {
        const res = await fetch(url, opts);
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        console.warn("fetch failed", url, err);
        return null;
      }
    };

    const MOCK_PROVIDERS: Provider[] = [
      { id: 1, business_name: "John's Plumbing", city: "Johannesburg", verified: 1, rating_average: 4.8, created_at: new Date().toISOString() },
      { id: 2, business_name: "Sarah's Electrical", city: "Cape Town", verified: 0, rating_average: 4.6, created_at: new Date().toISOString() },
    ];

    (async () => {
      try {
        const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        const data = await tryFetchJson('/api/admin/providers', { headers });
        if (data && data.providers) {
          setProviders(data.providers || []);
        } else if ((import.meta as any).env?.DEV) {
          setProviders(MOCK_PROVIDERS);
        } else {
          setProviders([]);
        }
      } catch (error) {
        console.error("Failed to load providers:", error);
      } finally {
        setLoadingProviders(false);
      }
    })();
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    const BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "";
    const tryFetchJson = async (path: string, opts?: RequestInit) => {
      const url = BACKEND ? `${BACKEND}${path}` : path;
      try {
        const res = await fetch(url, opts);
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        console.warn("fetch failed", url, err);
        return null;
      }
    };

    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const data = await tryFetchJson('/api/admin/users', { headers });
      if (data && data.users) {
        setUsersList(data.users || []);
      } else if ((import.meta as any).env?.DEV) {
        setUsersList([]);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const verifyProvider = async (providerId: number, verified: boolean) => {
    try {
      const BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "";
      const url = BACKEND ? `${BACKEND}/api/admin/providers/verify` : '/api/admin/providers/verify';
      const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ providerId, verified }),
      });

      if (!res.ok) {
        // In dev, simulate server response by updating state directly
        if ((import.meta as any).env?.DEV) {
          setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, verified: verified ? 1 : 0 } : p)));
          return;
        }
        throw new Error('Verification failed');
      }

      // Refresh provider list
      loadProviders();
    } catch (error) {
      console.error("Failed to verify provider:", error);
    }
  };

  const approveUser = async (userId: number) => {
    try {
      const BACKEND = (import.meta as any).env?.VITE_BACKEND_URL || "";
      const url = BACKEND ? `${BACKEND}/api/admin/users/approve` : '/api/admin/users/approve';
      const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error('Approve failed');
      // refresh users list
      loadUsers();
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const loadEmails = async () => {
    setLoadingEmails(true);
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('sc_admin_token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const res = await fetch('/api/admin/emails', { headers });
      if (!res.ok) {
        setEmailsList([]);
        return;
      }
      const data = await res.json();
      setEmailsList(data.emails || []);
    } catch (error) {
      console.error('Failed to load emails:', error);
      setEmailsList([]);
    } finally {
      setLoadingEmails(false);
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
            <div className="p-6 text-center">
              <Button onClick={() => window.location.assign('/admin/login')}>Admin Login</Button>
            </div>
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

        {/* User Management */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending User Approvals</CardTitle>
                <CardDescription>Review and approve newly created user accounts</CardDescription>
              </div>
              <Button onClick={loadUsers} disabled={loadingUsers}>
                {loadingUsers ? 'Loading...' : 'Load Users'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {usersList.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No users to review. Click "Load Users" to fetch accounts.</p>
            ) : (
              <div className="space-y-3">
                {usersList.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{u.name} <span className="text-xs text-muted-foreground">({u.email})</span></p>
                      <p className="text-xs text-muted-foreground">Created: {new Date(u.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                      {u.approved ? (
                        <Badge variant="secondary">Approved</Badge>
                      ) : (
                        <Button size="sm" onClick={() => approveUser(u.id)}>Approve</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
                        Rating: {(provider.rating_average ?? 0).toFixed(1)} ⭐ | 
                        Joined: {provider.created_at ? new Date(provider.created_at).toLocaleDateString() : 'Unknown'}
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
          {/* Sent Emails Viewer */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Sent Emails (simulated)</CardTitle>
              <CardDescription>View the e-mails the mock server recorded/sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div />
                <div className="flex gap-2">
                  <Button onClick={loadEmails} disabled={loadingEmails}>{loadingEmails ? 'Loading...' : 'Refresh'}</Button>
                </div>
              </div>

              {emailsList.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No emails recorded. Approve a user to generate an email.</p>
              ) : (
                <div className="space-y-3">
                  {emailsList.map((e, idx) => (
                    <div key={idx} className="p-3 border rounded bg-card">
                      <p className="text-sm font-medium">To: {e.to} <span className="text-xs text-muted-foreground">{e.sent_via ? `(${e.sent_via})` : ''}</span></p>
                      <p className="text-sm text-muted-foreground">Subject: {e.subject}</p>
                      <pre className="whitespace-pre-wrap text-xs text-muted-foreground mt-2">{e.body}</pre>
                      <p className="text-xs text-muted-foreground mt-2">Sent: {e.created_at ? new Date(e.created_at).toLocaleString() : '—'}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
