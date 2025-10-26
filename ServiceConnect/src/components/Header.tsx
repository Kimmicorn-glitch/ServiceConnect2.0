import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/providers', label: 'Providers' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
    { to: '/help', label: 'Help' },
    { to: '/safety', label: 'Safety' },
    { to: '/terms', label: 'Terms' },
    { to: '/privacy', label: 'Privacy' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_user_email');
    setUserEmail(null);
    navigate('/');
  };

  return (
    <header className="bg-white/80 dark:bg-sidebar p-4 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">ServiceConnect</Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>Profile</Button>
              <Button size="sm" onClick={() => { logout(); navigate('/'); }}>Log out</Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log in</Button>
              <Button size="sm" onClick={() => navigate('/signup')}>Sign up</Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded hover:bg-muted/50" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-card border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">{l.label}</Link>
            ))}
            <div className="flex gap-2 mt-2">
              {!user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => { setOpen(false); navigate('/login'); }}>Log in</Button>
                  <Button size="sm" onClick={() => { setOpen(false); navigate('/signup'); }}>Sign up</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => { setOpen(false); navigate('/profile'); }}>Profile</Button>
                  <Button size="sm" onClick={() => { setOpen(false); logout(); navigate('/'); }}>Log out</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pending approval banner */}
      {user && user.approved === false && (
        <div className="w-full bg-yellow-50 border-t border-yellow-200 text-yellow-800 text-sm py-2">
          <div className="container mx-auto px-4">Your account is pending approval by an administrator. You will receive an email when approved.</div>
        </div>
      )}
    </header>
  );
};

export default Header;
