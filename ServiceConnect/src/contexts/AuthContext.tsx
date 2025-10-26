import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { id: number; email: string; name: string; approved: boolean } | null;
  login: (user: { id: number; email: string; name: string; approved: boolean }) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<{ id: number; email: string; name: string; approved: boolean } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: number; email: string; name: string; approved: boolean } | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: { id: number; email: string; name: string; approved: boolean }) => {
    setUser(user);
    localStorage.setItem('auth_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};