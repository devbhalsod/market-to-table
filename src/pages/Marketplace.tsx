import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

// Demo data
const products = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    price: 320,
    unit: "kg",
    category: "Vegetables",
    location: "Punjab",
    farmerName: "Green Valley Farm",
    available: 50
  },
  {
    id: "2",
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    price: 200,
    unit: "kg",
    category: "Vegetables",
    location: "Haryana",
    farmerName: "Sunshine Organic",
    available: 75
  },
  {
    id: "3",
    name: "Sweet Corn",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
    price: 360,
    unit: "dozen",
    category: "Vegetables",
    location: "Karnataka",
    farmerName: "Harvest Hills",
    available: 30
  },
  {
    id: "4",
    name: "Fresh Strawberries",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    price: 480,
    unit: "kg",
    category: "Fruits",
    location: "Maharashtra",
    farmerName: "Berry Best Farm",
    available: 40
  },
  {
    id: "5",
    name: "Farm Eggs",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    price: 400,
    unit: "dozen",
    category: "Poultry",
    location: "Uttar Pradesh",
    farmerName: "Happy Hens Farm",
    available: 100
  },
  {
    id: "6",
    name: "Fresh Milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    price: 280,
    unit: "liter",
    category: "Dairy",
    location: "Rajasthan",
    farmerName: "Dairy Delight",
    available: 60
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
