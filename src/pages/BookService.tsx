import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number;
  image_url: string;
}

const BookService = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      // Store intended destination before redirect
      sessionStorage.setItem('intendedDestination', '/book-service');
      window.location.href = '/auth';
      return;
    }
    fetchServices();
  }, [user]);

  const fetchServices = async () => {
    try {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !pickupDate || !pickupTime || !pickupAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id,
          service_id: selectedService.id,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          pickup_address: pickupAddress,
          special_instructions: specialInstructions,
          total_amount: selectedService.price,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "Your laundry service has been booked successfully.",
      });

      // Reset form
      setSelectedService(null);
      setPickupDate('');
      setPickupTime('');
      setPickupAddress('');
      setSpecialInstructions('');
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="lg:pl-64 pb-20 lg:pb-0">
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-600" />
              Book Your Service
            </h1>
            <p className="text-purple-600 text-lg">Professional laundry care at your doorstep</p>
          </div>

          {!selectedService ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 bg-white/80 backdrop-blur-sm"
                  onClick={() => setSelectedService(service)}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-purple-800">{service.name}</CardTitle>
                    <CardDescription className="text-purple-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">${service.price}</div>
                    <div className="text-sm text-gray-600 mb-4">
                      Duration: {service.duration_hours} hours
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Booking Details - {selectedService.name}
                </CardTitle>
                <CardDescription>Fill in your pickup details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Pickup Date
                    </label>
                    <Input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Pickup Time
                    </label>
                    <Input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Pickup Address
                  </label>
                  <Input
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter your full pickup address"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <Textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special care instructions for your laundry"
                    className="border-purple-200 focus:border-purple-400"
                    rows={3}
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-purple-800">Total Amount:</span>
                    <span className="text-green-600">${selectedService.price}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Back to Services
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookService;