
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, Zap, Sparkles } from 'lucide-react';

const FeaturedProducts = () => {
  const [animatingSection, setAnimatingSection] = useState<number | null>(null);

  const productSections = [
    {
      title: "Flash Sale",
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      products: [
        { name: "Cotton Bedsheet Set", price: "$49.99", originalPrice: "$89.99", image: "bg-gradient-to-br from-blue-100 to-blue-200" },
        { name: "Bath Towel Bundle", price: "$25.99", originalPrice: "$45.99", image: "bg-gradient-to-br from-green-100 to-green-200" },
        { name: "Pillow Pair", price: "$19.99", originalPrice: "$29.99", image: "bg-gradient-to-br from-purple-100 to-purple-200" }
      ]
    },
    {
      title: "What's New",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      products: [
        { name: "Organic Cotton Sheets", price: "$119.99", originalPrice: "", image: "bg-gradient-to-br from-teal-100 to-teal-200" },
        { name: "Bamboo Towel Set", price: "$69.99", originalPrice: "", image: "bg-gradient-to-br from-amber-100 to-amber-200" },
        { name: "Memory Foam Pillow", price: "$39.99", originalPrice: "", image: "bg-gradient-to-br from-rose-100 to-rose-200" }
      ]
    },
    {
      title: "Exclusive",
      icon: <Tag className="w-5 h-5 text-gold-500" />,
      products: [
        { name: "Luxury Silk Sheets", price: "$299.99", originalPrice: "", image: "bg-gradient-to-br from-indigo-100 to-indigo-200" },
        { name: "Designer Comforter", price: "$199.99", originalPrice: "", image: "bg-gradient-to-br from-pink-100 to-pink-200" },
        { name: "Premium Mattress Pad", price: "$89.99", originalPrice: "", image: "bg-gradient-to-br from-cyan-100 to-cyan-200" }
      ]
    }
  ];

  const triggerAnimation = (sectionIndex: number) => {
    setAnimatingSection(sectionIndex);
    setTimeout(() => setAnimatingSection(null), 1000);
  };

  return (
    <section id="shop" className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-handwritten">
            Featured <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-handwritten">
            Discover our curated selection of premium home essentials from trusted partner retailers
          </p>
        </div>

        {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {productSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {section.icon}
                  <h3 className="text-2xl font-bold text-gray-900 font-handwritten">{section.title}</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-purple-600 hover:text-purple-700 font-handwritten"
                  onClick={() => triggerAnimation(sectionIndex)}
                >
                  View More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Products Grid */}
              <div className="space-y-4 overflow-hidden">
                {section.products.map((product, productIndex) => (
                  <Card 
                    key={productIndex} 
                    className={`border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md ${
                      animatingSection === sectionIndex 
                        ? 'animate-slide-out-right opacity-0' 
                        : 'animate-slide-in-right'
                    }`}
                    style={{
                      animationDelay: animatingSection === sectionIndex ? '0ms' : `${productIndex * 100}ms`
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 ${product.image} rounded-lg flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 font-handwritten truncate">{product.name}</h4>
                          <div className="flex items-center space-x-2 mt-1 mb-2">
                            <span className="text-lg font-bold text-purple-600 font-casual">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through font-handwritten">{product.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1">
                              Buy Now
                            </Button>
                            <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 text-xs px-2 py-1">
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 font-handwritten"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
