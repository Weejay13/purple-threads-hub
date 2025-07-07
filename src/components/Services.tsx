
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: "👔",
      title: "Dry cleaning",
      description: "Professional care for delicate fabrics.",
      detail: "Expert cleaning preserves your garments' quality and extends their lifespan."
    },
    {
      icon: "👔",
      title: "Shirt Laundry", 
      description: "Fresh, crisp shirts ready to wear.",
      detail: "Professional pressing ensures a polished, professional appearance every time."
    },
    {
      icon: "👕",
      title: "Wash & fold laundry",
      description: "Convenient wash and fold service.",
      detail: "Your clothes are washed, dried, and neatly folded with care and attention."
    },
    {
      icon: "🧺",
      title: "Household items",
      description: "Complete care for bedding and linens.",
      detail: "From comforters to curtains, we handle all your household textile needs."
    },
    {
      icon: "👗",
      title: "Wedding Dresses",
      description: "Specialized care for precious gowns.",
      detail: "Delicate handling and expert cleaning preserve your most treasured garments."
    },
    {
      icon: "🧥",
      title: "Outerwear",
      description: "Professional cleaning for coats and jackets.",
      detail: "Specialized techniques maintain the integrity of leather, wool, and technical fabrics."
    },
    {
      icon: "✂️",
      title: "Alterations",
      description: "Expert tailoring and repairs.",
      detail: "Professional alterations ensure the perfect fit for all your garments."
    },
    {
      icon: "👠",
      title: "Shoes",
      description: "Professional shoe cleaning and care.",
      detail: "Restore and maintain your footwear with specialized cleaning and conditioning."
    }
  ];

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

        {/* Mobile: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-handwritten">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-2 font-handwritten">{service.description}</p>
                {/* <p className="text-xs text-gray-500 font-handwritten">{service.detail}</p> */}
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white mt-2 font-handwritten"
                >
                  Book Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
