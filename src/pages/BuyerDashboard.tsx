import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Clock, CheckCircle } from "lucide-react";

const BuyerDashboard = () => {
  const orders = [
    {
      id: "1",
      date: "2025-01-10",
      items: "Fresh Tomatoes, Organic Carrots",
      total: 1000,
      status: "delivered",
      farmer: "Green Valley Farm"
    },
    {
      id: "2",
      date: "2025-01-12",
      items: "Sweet Corn, Fresh Strawberries",
      total: 1480,
      status: "in-transit",
      farmer: "Harvest Hills"
    },
    {
      id: "3",
      date: "2025-01-14",
      items: "Farm Eggs, Fresh Milk",
      total: 680,
      status: "pending",
      farmer: "Happy Hens Farm"
    }
  ];

  const savedItems = [
    { id: "1", name: "Fresh Tomatoes", price: 320, farmer: "Green Valley Farm" },
    { id: "2", name: "Organic Carrots", price: 200, farmer: "Sunshine Organic" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-success text-white";
      case "in-transit": return "bg-info text-white";
      case "pending": return "bg-warning text-white";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "in-transit": return <ShoppingBag className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Track your orders and manage saved items</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm">{order.items}</p>
                        <p className="text-xs text-muted-foreground">from {order.farmer}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold text-lg">₹{order.total}</span>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Saved Items Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Saved Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 space-y-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">by {item.farmer}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <span className="font-bold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Spent</span>
                    <span className="font-bold">₹27,400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saved Items</span>
                    <span className="font-bold">{savedItems.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
