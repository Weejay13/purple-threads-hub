
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-800/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left relative">
            {/* Mobile structured title */}
            <div className="lg:hidden">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-left mb-2">
                <div className="text-gray-900">Premium</div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">laundry</div>
                <div className="text-gray-900">services &</div>
                <div className="text-gray-900">home</div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">essentials.</div>
              </h1>
              
              {/* Mobile buttons - positioned as requested */}
              <div className="absolute right-0 top-0 flex flex-col gap-2">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1.5 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-handwritten mt-16"
                >
                  <Truck className="w-3 h-3 mr-1" />
                  Book Service
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-3 py-1.5 text-xs font-semibold font-handwritten"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Shop Products
                </Button>
              </div>
            </div>

            {/* Desktop title */}
            <div className="hidden lg:block">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-left">
                <span className="text-gray-900">Premium</span>{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Laundry Services
                </span>{' '}
                <span className="text-gray-900">&</span>{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Home Essentials
                </span>
              </h1>
            </div>
            
            {/* Handwritten tagline */}
            <div className="font-casual text-2xl md:text-3xl text-purple-700 mt-6 text-left">
              do your thing while we handle the laundry hassle
            </div>
            
            {/* Desktop description and buttons */}
            <div className="hidden lg:block">
              <p className="text-xl text-gray-600 mt-6 leading-relaxed font-handwritten">
                Connect with trusted laundry professionals for premium care of your garments, 
                plus shop curated home essentials from our partner retailers.
              </p>
              
              {/* Desktop CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-handwritten"
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Book Laundry Service
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold font-handwritten"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Products
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 font-casual">500+</div>
                <div className="text-sm text-gray-600 font-handwritten">Trusted Cleaners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 font-casual">10k+</div>
                <div className="text-sm text-gray-600 font-handwritten">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 font-casual">24hrs</div>
                <div className="text-sm text-gray-600 font-handwritten">Turnaround</div>
              </div>
            </div>

            {/* Purple S-shaped curve for mobile */}
            <div className="lg:hidden absolute right-0 top-8 w-full h-full pointer-events-none">
              <svg 
                className="absolute right-0 top-0 w-full h-96" 
                viewBox="0 0 200 300" 
                preserveAspectRatio="none"
              >
                <path
                  d="M180 60 Q120 100 60 140 Q120 180 180 220"
                  stroke="url(#purpleGradient)"
                  strokeWidth="4"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 font-handwritten">Premium Care Guarantee</h3>
                  <p className="text-gray-600 text-sm font-handwritten">Professional cleaning with 100% satisfaction guarantee</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 font-handwritten">Available Now</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⭐</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 font-casual">4.9/5</div>
                  <div className="text-xs text-gray-600 font-handwritten">Student Rating</div>
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
