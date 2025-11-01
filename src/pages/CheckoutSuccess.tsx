import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { items, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [orderSaved, setOrderSaved] = useState(false);

  useEffect(() => {
    const saveOrder = async () => {
      if (!sessionId || !user || orderSaved || items.length === 0) return;

      try {
        // Create order record
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total: totalPrice + 50, // Including delivery
            status: 'completed',
            stripe_session_id: sessionId,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          farmer_name: item.farmerName,
          image: item.image,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        setOrderSaved(true);
        clearCart();
      } catch (error) {
        console.error('Error saving order:', error);
      }
    };

    saveOrder();
  }, [sessionId, user, items, totalPrice, clearCart, orderSaved]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Thank you for your order. Your payment has been processed successfully.
            </p>
            {sessionId && (
              <p className="text-center text-sm text-muted-foreground">
                Order ID: {sessionId}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <Link to="/marketplace">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link to="/buyer-dashboard">
                <Button variant="outline" className="w-full">View My Orders</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
