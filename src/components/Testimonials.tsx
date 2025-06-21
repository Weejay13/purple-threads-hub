
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      content: "PureLaundry has been a game-changer for my hectic schedule. The quality of service is exceptional and the convenience is unmatched.",
      rating: 5,
      avatar: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      name: "Michael Chen",
      role: "Family Father",
      content: "The team takes such great care of our family's clothes. Plus, being able to shop for quality bedding on the same platform is fantastic!",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      name: "Emily Rodriguez",
      role: "Working Mom",
      content: "I love the pickup and delivery service. It saves me so much time, and my clothes always come back looking perfect.",
      rating: 5,
      avatar: "bg-gradient-to-br from-pink-400 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us with their laundry and home needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 border-white bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${testimonial.avatar} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg border border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-purple-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-purple-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
