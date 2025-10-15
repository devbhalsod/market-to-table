import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-farmers-market.jpg";
import farmerIcon from "@/assets/farmer-icon.png";
import buyerIcon from "@/assets/buyer-icon.png";
import { Sprout, ShoppingBasket, TrendingUp, Shield, Truck, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          </div>
          
          <div className="relative container mx-auto px-4 py-20 text-center text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Fresh from Farm to Your Table
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Connect directly with local farmers. No middlemen, just fresh, quality produce at fair prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <Link to="/marketplace">
                <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
                  <ShoppingBasket className="mr-2 h-5 w-5" />
                  Browse Marketplace
                </Button>
              </Link>
              <Link to="/farmer-dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
                  <Sprout className="mr-2 h-5 w-5" />
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FarmFresh?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're revolutionizing how farmers and buyers connect, creating a sustainable food ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Better Prices</CardTitle>
                  <CardDescription>
                    Direct trade means better prices for buyers and fair compensation for farmers
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Quality Assured</CardTitle>
                  <CardDescription>
                    Fresh, locally-sourced produce with transparent sourcing and verified farmers
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fast Delivery</CardTitle>
                  <CardDescription>
                    Quick and reliable delivery from farm to your doorstep, maintaining freshness
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community Driven</CardTitle>
                  <CardDescription>
                    Support local farmers and build stronger community connections
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sustainable</CardTitle>
                  <CardDescription>
                    Eco-friendly farming practices and reduced carbon footprint
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShoppingBasket className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy to Use</CardTitle>
                  <CardDescription>
                    Simple platform for listing, browsing, and purchasing fresh produce
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* For Farmers & Buyers Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2">
                <CardHeader className="text-center">
                  <img src={farmerIcon} alt="For Farmers" className="h-24 w-24 mx-auto mb-4" />
                  <CardTitle className="text-2xl">For Farmers</CardTitle>
                  <CardDescription className="text-base">
                    Expand your reach and grow your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>List unlimited products with detailed descriptions and images</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Manage orders and inventory in real-time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Direct connection with buyers across your region</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Fair pricing without middlemen taking cuts</span>
                    </li>
                  </ul>
                  <Link to="/farmer-dashboard" className="block">
                    <Button className="w-full mt-6" size="lg">
                      <Sprout className="mr-2 h-5 w-5" />
                      Start Selling Today
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-2">
                <CardHeader className="text-center">
                  <img src={buyerIcon} alt="For Buyers" className="h-24 w-24 mx-auto mb-4" />
                  <CardTitle className="text-2xl">For Buyers</CardTitle>
                  <CardDescription className="text-base">
                    Access fresh, quality produce from local farms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Browse a wide variety of fresh produce from local farmers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Filter by location to find nearby farms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Track orders and delivery in real-time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                      <span>Secure payments with multiple payment options</span>
                    </li>
                  </ul>
                  <Link to="/marketplace" className="block">
                    <Button className="w-full mt-6" size="lg" variant="default">
                      <ShoppingBasket className="mr-2 h-5 w-5" />
                      Browse Marketplace
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of farmers and buyers creating a better food system together.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
