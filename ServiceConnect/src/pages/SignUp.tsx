import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data: any = null;
      try { data = await res.json(); } catch (e) { /* noop */ }
      if (!res.ok) throw new Error((data && data.error) ? data.error : `Signup failed (${res.status})`);

      // Signup creates an unapproved account in dev. Notify user and return to home.
      if (data && data.user) {
        // mark pending email - used by header to show user if needed
        localStorage.setItem('sc_pending_email', data.user.email);
        alert('Account created. An administrator will review and approve your account. You will receive an email once approved.');
        navigate('/');
      } else {
        alert('Account created. Awaiting approval.');
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="border-2">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <p className="text-sm text-muted-foreground">Sign up to book and manage service requests</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <div className="flex items-center justify-between">
                <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
