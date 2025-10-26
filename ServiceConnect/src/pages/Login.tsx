import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook up to local mock backend
    (async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        let data: any = null;
        try { data = await res.json(); } catch (e) { /* ignore non-json */ }
        if (!res.ok) {
          const msg = data?.error || `Login failed (${res.status})`;
          throw new Error(msg);
        }
        // store token and user
        if (data?.token) localStorage.setItem('sc_token', data.token);
        if (data.user?.email) localStorage.setItem('sc_user_email', data.user.email);
        navigate('/');
      } catch (err: any) {
        alert(err.message || 'Login failed');
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4">Log in to ServiceConnect</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">Log in</Button>
            <Link to="/signup" className="text-sm text-muted-foreground hover:underline">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
