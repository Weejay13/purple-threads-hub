import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, ShoppingBag, User } from 'lucide-react';
import Header from '@/components/Header';

interface Booking {
  id: string;
  service_id: string;
  pickup_date: string;
  pickup_time: string;
  total_amount: number;
  status: string;
  services: {
    name: string;
    description: string;
  };
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: {
    quantity: number;
    unit_price: number;
    products: {
      name: string;
    };
  }[];
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }

    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          services(name, description)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            quantity,
            unit_price,
            products(name)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setBookings(bookingsData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}!</p>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">
                <Calendar className="w-4 h-4 mr-2" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="w-4 h-4 mr-2" />
                My Orders
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Bookings</CardTitle>
                  <CardDescription>Track your laundry service appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading bookings...</p>
                  ) : bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings yet. Book a service to get started!</p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{booking.services.name}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{booking.services.description}</p>
                          <div className="flex justify-between items-center text-sm">
                            <span>Pickup: {booking.pickup_date} at {booking.pickup_time}</span>
                            <span className="font-semibold">${booking.total_amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Orders</CardTitle>
                  <CardDescription>Your purchase history and order status</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-gray-500">No orders yet. Shop our products to get started!</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 mb-2">
                            {order.order_items.map((item, index) => (
                              <p key={index} className="text-gray-600 text-sm">
                                {item.quantity}x {item.products.name} - ${item.unit_price}
                              </p>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Ordered: {new Date(order.created_at).toLocaleDateString()}</span>
                            <span className="font-semibold">${order.total_amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Member Since</p>
                    <p className="text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={signOut}
                    className="mt-6"
                  >
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;