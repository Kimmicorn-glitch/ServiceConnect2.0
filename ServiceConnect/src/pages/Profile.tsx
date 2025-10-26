import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Alert } from '@/components/ui/alert';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('sc_token');
      try {
        const res = await fetch('/api/auth/me', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        const data = await res.json();
        if (res.ok && data.user) setUser(data.user);
      } catch (e) {
        console.warn('Failed to load profile', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_user_email');
    window.location.assign('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Not logged in.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        {!user.approved && (
          <Alert variant="warning" className="mb-4">
            Your account is pending approval. You will be notified once approved.
          </Alert>
        )}
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <div className="space-y-3 bg-card p-6 rounded-lg border">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Approved:</strong> {user.approved ? 'Yes' : 'No'}</p>
          <div className="pt-4">
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
