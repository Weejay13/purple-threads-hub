import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  ShoppingBag, 
  Star, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    {
      to: '/book-service',
      icon: Calendar,
      label: 'Book Service',
      color: 'text-purple-600',
      activeColor: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      to: '/shop-products',
      icon: ShoppingBag,
      label: 'Shop Products',
      color: 'text-pink-600',
      activeColor: 'bg-pink-100 text-pink-700 border-pink-200'
    },
    {
      to: '/my-points',
      icon: Star,
      label: 'My Points',
      color: 'text-amber-600',
      activeColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      to: '/profile',
      icon: User,
      label: 'Profile',
      color: 'text-green-600',
      activeColor: 'bg-green-100 text-green-700 border-green-200'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-purple-700">PureLaundry</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 border ${
                      isActive(item.to)
                        ? item.activeColor
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent'
                    }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive(item.to) ? '' : item.color
                      }`}
                    />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="px-2 pb-4">
              <Button 
                variant="outline" 
                onClick={signOut}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 ${
                  isActive(item.to)
                    ? `${item.color} bg-opacity-10`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon
                  className={`h-6 w-6 mb-1 ${
                    isActive(item.to) ? item.color : ''
                  }`}
                />
                <span className={isActive(item.to) ? item.color : ''}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;