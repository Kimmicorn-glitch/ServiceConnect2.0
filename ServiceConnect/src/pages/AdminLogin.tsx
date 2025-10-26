import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Login failed');
      }
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem('sc_admin_token', data.token);
        toast({ title: 'Login successful' });
        navigate('/admin');
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Login failed', description: (err as Error).message || 'Unable to login' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-card rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <div className="flex justify-between">
            <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
            <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
