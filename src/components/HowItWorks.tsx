
import React from 'react';
import { User, Truck, Package } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="w-12 h-12 text-white" />,
      title: "Book Online",
      description: "Schedule your pickup time and specify your laundry preferences through our easy online booking system."
    },
    {
      icon: <Truck className="w-12 h-12 text-white" />,
      title: "We Pickup & Clean",
      description: "Our trusted partners collect your items and provide professional cleaning with premium care and attention."
    },
    {
      icon: <Package className="w-12 h-12 text-white" />,
      title: "Fresh Delivery",
      description: "Receive your perfectly cleaned and pressed items delivered back to your door within 24-48 hours."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your laundry done has never been easier. Just three simple steps to fresh, clean clothes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 transform translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-400 z-0"></div>
              )}
              
              {/* Step Content */}
              <div className="relative z-10">
                <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-800 text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-purple-200">
            <span className="text-purple-600 font-semibold mr-2">💜</span>
            <span className="text-gray-700">Trusted by over 10,000 customers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
