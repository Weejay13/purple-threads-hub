import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Sparkles, Star, Crown, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import laundryHero from '@/assets/laundry-hero.jpg';
import serviceIcon from '@/assets/service-icon.jpg';

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
    fetchServices();
  }, []);

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

  

  return (
    <div className="lg:pl-64 pb-20 lg:pb-0">
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(261_83%_58%/0.1),transparent_70%)]"></div>
        
        {/* Hero Section */}
        <div className="relative z-10 pt-8 pb-12">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-0.5 mb-6 shadow-[0_0_60px_hsl(261_83%_58%/0.5)]">
                <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Crown className="h-10 w-10 text-yellow-300" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
                Luxury Laundry
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 mb-2">Premium Care • White Glove Service</p>
              <div className="flex items-center justify-center gap-2 text-yellow-300/80">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-2 text-white/70">Trusted by 10,000+ customers</span>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative mb-16">
              <div className="rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)] mx-auto max-w-4xl">
                <img 
                  src={laundryHero} 
                  alt="Luxury Laundry Service" 
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="relative z-10 px-4 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            {!selectedService ? (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Choose Your Experience</h2>
                  <p className="text-white/70 text-lg">Select from our premium service collection</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                    <Card 
                      key={service.id} 
                      className="group cursor-pointer transition-all duration-500 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:from-white/20 hover:to-white/10 hover:scale-105 hover:shadow-[0_25px_80px_rgba(168,85,247,0.4)] rounded-2xl overflow-hidden"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardHeader className="text-center relative z-10 pt-8 pb-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_10px_40px_rgba(168,85,247,0.3)] group-hover:shadow-[0_15px_60px_rgba(168,85,247,0.5)] transition-all duration-500">
                          <img src={serviceIcon} alt="Service" className="w-12 h-12 rounded-full object-cover" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-white/70 text-lg leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="text-center pb-8 relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                            ${service.price}
                          </div>
                          <Gem className="h-6 w-6 text-yellow-400" />
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 text-white/60 mb-6">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">Duration: {service.duration_hours} hours</span>
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all duration-300 group-hover:scale-105">
                          <Crown className="h-5 w-5 mr-2" />
                          Book Premium Service
                        </Button>
                      </CardContent>
                      
                      {/* Luxury accent */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-pink-400 text-black text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        PREMIUM
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-0 rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-pink-500/5 to-purple-600/5"></div>
                  
                  <CardHeader className="relative z-10 text-center pb-8 pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4 shadow-[0_10px_40px_rgba(168,85,247,0.4)]">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                      Complete Your Luxury Booking
                    </CardTitle>
                    <CardDescription className="text-white/70 text-lg">
                      {selectedService.name} - Premium Service Experience
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-8 p-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                          <Calendar className="inline h-5 w-5 mr-2 text-yellow-300" />
                          Preferred Date
                        </label>
                        <Input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300 focus:ring-yellow-300/20 rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                          <Clock className="inline h-5 w-5 mr-2 text-pink-300" />
                          Preferred Time
                        </label>
                        <Input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-300 focus:ring-pink-300/20 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        <MapPin className="inline h-5 w-5 mr-2 text-purple-300" />
                        Pickup Address
                      </label>
                      <Input
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="Enter your complete address for premium pickup service"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300/20 rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        <Sparkles className="inline h-5 w-5 mr-2 text-yellow-300" />
                        Special Care Instructions (Optional)
                      </label>
                      <Textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any special care requirements, fabric preferences, or additional services..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300 focus:ring-yellow-300/20 rounded-xl min-h-[100px] resize-none"
                        rows={4}
                      />
                    </div>

                    <div className="bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-white flex items-center gap-2">
                          <Gem className="h-6 w-6 text-yellow-300" />
                          Premium Service Total:
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                          ${selectedService.price}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-white/60 flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-400" />
                        Includes premium pickup, luxury care, and white-glove delivery
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedService(null)}
                        className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 rounded-xl h-12 font-semibold backdrop-blur-sm"
                      >
                        ← Back to Services
                      </Button>
                      <Button
                        onClick={handleBooking}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl h-12 shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] transition-all duration-300"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Crown className="h-5 w-5" />
                            Confirm Luxury Booking
                          </div>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;