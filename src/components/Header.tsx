
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, ShoppingBag, Truck, X, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
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
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <User className="w-3 h-3 mr-1" />
                  Dashboard
                </Button>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-200 text-green-600 hover:bg-green-50 font-handwritten text-xs"
                    onClick={() => window.location.href = '/admin'}
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Admin
                  </Button>
                )}
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten text-xs"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten text-xs"
                  onClick={() => window.location.href = '/auth'}
                >
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
              </>
            )}
          </div>

          {/* Mobile Actions - Reduced sizes */}
          <div className="md:hidden flex items-center space-x-1">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten px-1.5 py-1 text-xs h-7"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <User className="w-2.5 h-2.5 mr-0.5" />
                  Dashboard
                </Button>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-200 text-green-600 hover:bg-green-50 font-handwritten px-1.5 py-1 text-xs h-7"
                    onClick={() => window.location.href = '/admin'}
                  >
                    <Settings className="w-2.5 h-2.5 mr-0.5" />
                    Admin
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten px-1.5 py-1 text-xs h-7"
                  onClick={() => window.location.href = '/auth'}
                >
                  <User className="w-2.5 h-2.5 mr-0.5" />
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-handwritten px-1.5 py-1 text-xs h-7">
                  <Truck className="w-2.5 h-2.5 mr-0.5" />
                  Book Service
                </Button>
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-handwritten px-1.5 py-1 text-xs h-7">
                  <ShoppingBag className="w-2.5 h-2.5 mr-0.5" />
                  Shop Products
                </Button>
              </>
            )}
            
            {/* Mobile menu button with three lines - reduced size */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors p-0.5"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
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
