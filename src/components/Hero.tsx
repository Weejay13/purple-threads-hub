
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-800/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Premium</span>{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Laundry Services
              </span>{' '}
              <span className="text-gray-900">&</span>{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Home Essentials
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Connect with trusted laundry professionals for premium care of your garments, 
              plus shop curated home essentials from our partner retailers.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Truck className="w-5 h-5 mr-2" />
                Book Laundry Service
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Products
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Trusted Cleaners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24hrs</div>
                <div className="text-sm text-gray-600">Turnaround</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Premium Care Guarantee</h3>
                  <p className="text-gray-600 text-sm">Professional cleaning with 100% satisfaction guarantee</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Available Now</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⭐</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">4.9/5</div>
                  <div className="text-xs text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
