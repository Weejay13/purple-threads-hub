import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Truck, Sparkles, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number;
  image_url: string;
  is_active: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookService = (service: Service) => {
    toast({
      title: "Service booking",
      description: `Redirecting to book ${service.name} service.`,
    });
  };

  const getServiceIcon = (index: number) => {
    const icons = [
      <Sparkles className="h-8 w-8 text-purple-600" />,
      <Shield className="h-8 w-8 text-purple-600" />,
      <Clock className="h-8 w-8 text-purple-600" />,
      <Truck className="h-8 w-8 text-purple-600" />
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-handwritten">
            Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Premium Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-handwritten">
            Professional laundry and garment care services tailored to your needs
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {getServiceIcon(index)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-handwritten">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                  </div>
                  <div className="mb-8">
                    <p className="text-gray-600 text-sm">
                      ✓ {service.duration_hours} hour turnaround
                    </p>
                    <p className="text-gray-600 text-sm">
                      ✓ Professional service
                    </p>
                    <p className="text-gray-600 text-sm">
                      ✓ Quality guarantee
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    onClick={() => handleBookService(service)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 font-handwritten"
          >
            Book Service Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;