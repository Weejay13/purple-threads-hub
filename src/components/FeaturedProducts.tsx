import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category: string;
  is_active: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(4);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: Product) => {
    toast({
      title: "Buy now",
      description: `Redirecting to checkout for ${product.name}.`,
    });
  };

  return (
    <section id="shop" className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-handwritten">
            Featured <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-handwritten">
            Premium laundry products to keep your clothes looking their best
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-purple-600 text-white">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm font-handwritten">{product.name}</h3>
                      <div className="flex flex-col gap-1">
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-6"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-purple-200 text-purple-600 hover:bg-purple-50 text-xs h-6"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-purple-600">${product.price}</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock_quantity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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