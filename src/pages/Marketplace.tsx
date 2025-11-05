import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .eq("is_available", true);

    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory);
    }

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh Produce Marketplace</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Browse quality produce directly from local farmers. Fresh, affordable, and sustainable.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search produce..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="poultry">Poultry</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-card">
                    <img 
                      src={product.image_url || "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop"} 
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <Badge className="mt-1">{product.category}</Badge>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">₹{Number(product.price)}</span>
                          <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{product.location}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.stock_quantity} {product.unit} available
                      </p>
                      
                      <Button 
                        className="w-full"
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          image: product.image_url || "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop",
                          price: Number(product.price),
                          unit: product.unit,
                          farmerName: "Local Farmer",
                        })}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
