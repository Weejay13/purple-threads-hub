
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, ShoppingBag } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-50 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent font-casual">
              PureLaundry
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
              Laundry Services
            </a>
            <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
              Shop Products
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
              How It Works
            </a>
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten">
              Book Service
            </Button>
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <div className="flex flex-col space-y-1">
                <ChevronDown className="w-6 h-6" />
                <ChevronDown className="w-6 h-6" />
                <ChevronDown className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-100 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
                Laundry Services
              </a>
              <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
                Shop Products
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
                How It Works
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten">
                  Book Service
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
