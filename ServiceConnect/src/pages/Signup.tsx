/**
 * SIGN UP PAGE
 * User registration and login page with Youware authentication
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Check current user authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('https://backend.youware.com/__user_info__');
        const result = await response.json();
        
        if (result.code === 0 && result.data) {
          setUserInfo(result.data);
          
          // If user is logged in, create/update user profile in backend
          if (result.data.display_name && result.data.photo_url) {
            await fetch('https://backend.youware.com/api/auth/me');
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://backend.youware.com/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: userInfo?.display_name,
          photoUrl: userInfo?.photo_url,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const result = await response.json();
      
      if (result.user) {
        alert('Profile updated successfully!');
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert('Failed to update profile. Please try again.');
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

  const isLoggedIn = userInfo?.display_name && userInfo?.photo_url;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              {isLoggedIn && userInfo.photo_url ? (
                <img 
                  src={userInfo.photo_url} 
                  alt={userInfo.display_name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl text-center">
              {isLoggedIn ? `Welcome, ${userInfo.display_name}!` : 'Welcome to ServiceConnect'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLoggedIn 
                ? 'Complete your profile to get started'
                : 'This platform uses Youware authentication. Please log in through the Youware platform to access all features.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={userInfo.display_name}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Managed by Youware platform
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+27 11 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Complete Profile
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Authentication is handled by the Youware platform.
                    <br />
                    <br />
                    To access authenticated features:
                    <br />
                    1. Ensure you're logged into Youware
                    <br />
                    2. Refresh this page
                    <br />
                    3. Your account will be automatically recognized
                  </p>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
