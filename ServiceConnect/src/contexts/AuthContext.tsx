import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: number; email: string; name?: string; approved?: boolean } | null;

interface AuthContextValue {
  user: User;
  token: string | null;
  adminToken: string | null;
  loading: boolean;
  setUserFromToken: (token: string | null) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sc_token'));
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('sc_admin_token'));
  const [loading, setLoading] = useState(true);

  const fetchMe = async (t: string | null) => {
    if (!t) return setUser(null);
    try {
      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (data && data.user) setUser(data.user);
      else setUser(null);
    } catch (e) {
      console.warn('Failed to refresh user', e);
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sToken = localStorage.getItem('sc_token');
      const aToken = localStorage.getItem('sc_admin_token');
      setToken(sToken);
      setAdminToken(aToken);
      if (sToken) await fetchMe(sToken);
      setLoading(false);
    })();
  }, []);

  const setUserFromToken = async (t: string | null) => {
    setToken(t);
    if (t) localStorage.setItem('sc_token', t); else localStorage.removeItem('sc_token');
    await fetchMe(t);
  };

  const loginWithToken = async (t: string) => {
    await setUserFromToken(t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAdminToken(null);
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_admin_token');
    localStorage.removeItem('sc_user_email');
  };

  return (
    <AuthContext.Provider value={{ user, token, adminToken, loading, setUserFromToken, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
