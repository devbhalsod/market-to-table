import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, ShoppingBasket, User, LogIn } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Sprout className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">FarmFresh</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/marketplace" 
            className={`flex items-center gap-2 transition-colors ${
              isActive("/marketplace") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <ShoppingBasket className="h-5 w-5" />
            <span className="hidden sm:inline">Marketplace</span>
          </Link>
          
          <Link 
            to="/farmer-dashboard" 
            className={`flex items-center gap-2 transition-colors ${
              isActive("/farmer-dashboard") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Sprout className="h-5 w-5" />
            <span className="hidden sm:inline">Sell</span>
          </Link>
          
          <Link 
            to="/buyer-dashboard" 
            className={`flex items-center gap-2 transition-colors ${
              isActive("/buyer-dashboard") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">My Orders</span>
          </Link>
          
          <Button size="sm" variant="default" className="shadow-sm hover:shadow-md transition-shadow">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
