import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Package, ShoppingBag, Shirt } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8 text-purple-600" />,
      title: "Pickup & Delivery",
      description: "Convenient pickup and delivery service right to your door",
      features: ["Free pickup & delivery", "Same-day service available", "Real-time tracking"],
      price: "Starting at $15"
    },
    {
      icon: <Shirt className="w-8 h-8 text-purple-600" />,
      title: "Premium Laundry",
      description: "Professional care for your everyday clothing and linens",
      features: ["Eco-friendly detergents", "Gentle fabric care", "Expert stain removal"],
      price: "Starting at $12"
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Specialty Items",
      description: "Expert care for delicate and specialty garments",
      features: ["Dry cleaning", "Designer items", "Leather & suede care"],
      price: "Starting at $25"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-purple-600" />,
      title: "Home Essentials",
      description: "Curated selection of quality bedding and clothing",
      features: ["Premium brands", "Competitive prices", "Fast shipping"],
      price: "Various pricing"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Premium Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From professional laundry care to curated home essentials, we provide everything you need for a luxurious lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600 mb-3">{service.price}</div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
