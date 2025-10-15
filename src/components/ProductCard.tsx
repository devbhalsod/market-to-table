import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  category: string;
  location: string;
  farmerName: string;
  available: number;
}

const ProductCard = ({ 
  name, 
  image, 
  price, 
  unit, 
  category, 
  location, 
  farmerName, 
  available 
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">by {farmerName}</p>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">₹{price}</span>
          <span className="text-sm text-muted-foreground">/ {unit}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          {available} {unit} available
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group/btn">
          <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
