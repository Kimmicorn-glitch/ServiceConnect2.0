import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, logout, loading } = useAuth();

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
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="space-y-3 bg-card p-6 rounded-lg border">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Approved:</strong> {user.approved ? 'Yes' : 'No'}</p>
          <div className="pt-4">
            <Button onClick={() => { logout(); window.location.assign('/'); }}>Log out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
