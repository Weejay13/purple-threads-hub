
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, ShoppingBag, Truck, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-900 font-casual">
              PureLaundry
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
              Laundry Services
            </a>
            <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
              Shop Products
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
              How It Works
            </a>
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs">
              <User className="w-3 h-3 mr-1" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten text-xs">
              <Truck className="w-3 h-3 mr-1" />
              Book Service
            </Button>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Shop Products
            </Button>
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                0
              </span>
            </div>
          </div>

          {/* Mobile Actions - Show buttons first, then menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs px-2">
              <User className="w-3 h-3 mr-1" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten text-xs px-2">
              <Truck className="w-3 h-3 mr-1" />
              Book Service
            </Button>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs px-2">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Shop Products
            </Button>
            
            {/* Mobile menu button with three lines */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors p-1"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3">
            <div className="flex flex-col space-y-3">
              <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
                Laundry Services
              </a>
              <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
                Shop Products
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
                How It Works
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium font-handwritten text-sm">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
