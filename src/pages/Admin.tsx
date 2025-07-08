import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Users, Package, Calendar, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number;
  is_active: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  is_active: boolean;
}

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration_hours: '24'
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: ''
  });

  useEffect(() => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }

    if (!isAdmin) {
      window.location.href = '/dashboard';
      return;
    }

    fetchAdminData();
  }, [user, isAdmin]);

  const fetchAdminData = async () => {
    try {
      // Fetch services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch counts
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      setServices(servicesData || []);
      setProducts(productsData || []);
      setBookingsCount(bookingsCount || 0);
      setOrdersCount(ordersCount || 0);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('services')
        .insert([{
          name: newService.name,
          description: newService.description,
          price: parseFloat(newService.price),
          duration_hours: parseInt(newService.duration_hours)
        }]);

      if (error) throw error;

      toast({
        title: "Service added successfully",
        description: "The new service is now available for booking.",
      });

      setNewService({ name: '', description: '', price: '', duration_hours: '24' });
      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error adding service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          stock_quantity: parseInt(newProduct.stock_quantity),
          category: newProduct.category
        }]);

      if (error) throw error;

      toast({
        title: "Product added successfully",
        description: "The new product is now available for purchase.",
      });

      setNewProduct({ name: '', description: '', price: '', stock_quantity: '', category: '' });
      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Service updated",
        description: `Service ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
      });

      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Product updated",
        description: `Product ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
      });

      fetchAdminData();
    } catch (error: any) {
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your laundry business</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{bookingsCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{ordersCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Services</p>
                    <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="services">Manage Services</TabsTrigger>
              <TabsTrigger value="products">Manage Products</TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddService} className="space-y-4">
                      <Input
                        placeholder="Service Name"
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Service Description"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Duration (hours)"
                        value={newService.duration_hours}
                        onChange={(e) => setNewService({ ...newService, duration_hours: e.target.value })}
                        required
                      />
                      <Button type="submit" className="w-full">Add Service</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{service.name}</h3>
                            <Badge variant={service.is_active ? "default" : "secondary"}>
                              {service.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">${service.price}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleServiceStatus(service.id, service.is_active)}
                            >
                              {service.is_active ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Product
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <Input
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="Stock Quantity"
                        value={newProduct.stock_quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                      />
                      <Button type="submit" className="w-full">Add Product</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <Badge variant={product.is_active ? "default" : "secondary"}>
                              {product.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold">${product.price}</span>
                              <span className="text-gray-500 ml-2">Stock: {product.stock_quantity}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleProductStatus(product.id, product.is_active)}
                            >
                              {product.is_active ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;