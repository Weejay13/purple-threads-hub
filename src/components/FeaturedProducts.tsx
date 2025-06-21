
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Tag } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Premium Cotton Bedsheet Set",
      price: "$89.99",
      originalPrice: "$120.00",
      image: "bg-gradient-to-br from-blue-100 to-blue-200",
      badge: "Best Seller"
    },
    {
      name: "Luxury Bath Towel Collection",
      price: "$45.99",
      originalPrice: "$65.00",
      image: "bg-gradient-to-br from-purple-100 to-purple-200",
      badge: "New Arrival"
    },
    {
      name: "Organic Cotton Pillows",
      price: "$29.99",
      originalPrice: "$40.00",
      image: "bg-gradient-to-br from-green-100 to-green-200",
      badge: "Eco-Friendly"
    },
    {
      name: "Designer Comforter Set",
      price: "$159.99",
      originalPrice: "$200.00",
      image: "bg-gradient-to-br from-pink-100 to-pink-200",
      badge: "Premium"
    }
  ];

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of premium home essentials from trusted partner retailers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg group overflow-hidden">
              <div className="relative">
                <div className={`aspect-square ${product.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-white">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-purple-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  <div className="flex items-center text-green-600 text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    <span className="font-medium">Save</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
