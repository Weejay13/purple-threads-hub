import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Settings,
  Shield,
  Bell,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface Profile {
  full_name: string;
  phone: string;
  address: string;
  avatar_url: string;
}

const Profile = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone: '',
    address: '',
    avatar_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [memberSince, setMemberSince] = useState('');

  useEffect(() => {
    if (!user) {
      sessionStorage.setItem('intendedDestination', '/profile');
      window.location.href = '/auth';
      return;
    }
    fetchProfile();
    fetchStats();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [bookingsResult, ordersResult] = await Promise.all([
        supabase
          .from('bookings')
          .select('id')
          .eq('user_id', user?.id),
        supabase
          .from('orders')
          .select('id')
          .eq('user_id', user?.id)
      ]);

      setTotalBookings(bookingsResult.data?.length || 0);
      setTotalOrders(ordersResult.data?.length || 0);
      setMemberSince(new Date(user?.created_at || '').toLocaleDateString());
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          avatar_url: profile.avatar_url
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="lg:pl-64 pb-20 lg:pb-0">
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
              <User className="h-8 w-8 text-green-600" />
              My Profile
            </h1>
            <p className="text-green-600 text-lg">Manage your account and preferences</p>
          </div>

          {/* Profile Header */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-green-200">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-green-800">
                    {profile.full_name || user.email}
                  </h2>
                  <p className="text-green-600 flex items-center gap-1 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <Badge className="bg-green-100 text-green-700">
                      <Calendar className="h-3 w-3 mr-1" />
                      Member since {memberSince}
                    </Badge>
                    {isAdmin && (
                      <Badge className="bg-purple-100 text-purple-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-800">Total Bookings</CardTitle>
                <div className="text-3xl font-bold text-purple-600">{totalBookings}</div>
              </CardHeader>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-800">Total Orders</CardTitle>
                <div className="text-3xl font-bold text-pink-600">{totalOrders}</div>
              </CardHeader>
            </Card>
          </div>

          {/* Profile Information */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Settings className="h-6 w-6" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  <Input
                    value={profile.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Enter your full name"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Address
                </label>
                <Textarea
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  className="border-green-200 focus:border-green-400"
                  rows={3}
                />
              </div>

              <Button
                onClick={updateProfile}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/admin'}
                    className="h-16 border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Shield className="h-6 w-6 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Admin Panel</div>
                      <div className="text-xs text-gray-500">Manage system settings</div>
                    </div>
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard'}
                  className="h-16 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Settings className="h-6 w-6 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">View Dashboard</div>
                    <div className="text-xs text-gray-500">Check your activity</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={signOut}
                  className="h-16 border-red-200 text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-6 w-6 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">Sign Out</div>
                    <div className="text-xs text-gray-500">Log out of your account</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;