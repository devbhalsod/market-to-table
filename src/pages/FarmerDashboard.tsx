import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Package, TrendingUp, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.string().min(1, "Quantity is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required").max(500),
});

type ProductFormData = z.infer<typeof productSchema>;

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, revenue: 0 });
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      unit: "",
      quantity: "",
      location: "",
      description: "",
    },
  });

  const fetchProducts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("farmer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch products");
      return;
    }

    setProducts(data || []);
    
    // Fetch order items for this farmer
    const { data: orderItems, error: orderError } = await supabase
      .from("order_items")
      .select("order_id, price, quantity")
      .eq("farmer_name", user.email || "");

    if (orderError) {
      console.error("Failed to fetch order stats:", orderError);
    }

    // Calculate stats
    const uniqueOrders = new Set(orderItems?.map(item => item.order_id) || []);
    const totalRevenue = orderItems?.reduce((sum, item) => {
      return sum + (Number(item.price) * item.quantity);
    }, 0) || 0;

    setStats({
      totalProducts: data?.length || 0,
      totalOrders: uniqueOrders.size,
      revenue: totalRevenue,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const onSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast.error("You must be logged in to add products");
      return;
    }

    const { error } = await supabase.from("products").insert({
      farmer_id: user.id,
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      unit: data.unit,
      stock_quantity: parseInt(data.quantity),
      location: data.location,
      description: data.description,
      is_available: true,
    });

    if (error) {
      toast.error("Failed to add product");
      console.error(error);
      return;
    }

    toast.success("Product added successfully!");
    form.reset();
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and track your sales</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active listings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Add Product Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </CardTitle>
              <CardDescription>List your fresh produce for buyers to discover</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Fresh Tomatoes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="vegetables">Vegetables</SelectItem>
                              <SelectItem value="fruits">Fruits</SelectItem>
                              <SelectItem value="dairy">Dairy</SelectItem>
                              <SelectItem value="poultry">Poultry</SelectItem>
                              <SelectItem value="grains">Grains</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Unit</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kg">Kilogram (kg)</SelectItem>
                              <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                              <SelectItem value="dozen">Dozen</SelectItem>
                              <SelectItem value="liter">Liter</SelectItem>
                              <SelectItem value="piece">Piece</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your product, growing methods, and any certifications..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
                    <Plus className="h-4 w-4 mr-2" />
                    {form.formState.isSubmitting ? "Adding..." : "List Product"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerDashboard;
