-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price > 0),
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  location TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can view available products
CREATE POLICY "Anyone can view available products"
ON public.products
FOR SELECT
USING (is_available = true);

-- Farmers can view their own products
CREATE POLICY "Farmers can view their own products"
ON public.products
FOR SELECT
USING (auth.uid() = farmer_id);

-- Farmers can create their own products
CREATE POLICY "Farmers can create their own products"
ON public.products
FOR INSERT
WITH CHECK (auth.uid() = farmer_id);

-- Farmers can update their own products
CREATE POLICY "Farmers can update their own products"
ON public.products
FOR UPDATE
USING (auth.uid() = farmer_id);

-- Farmers can delete their own products
CREATE POLICY "Farmers can delete their own products"
ON public.products
FOR DELETE
USING (auth.uid() = farmer_id);

-- Create indexes for better performance
CREATE INDEX idx_products_farmer_id ON public.products(farmer_id);
CREATE INDEX idx_products_is_available ON public.products(is_available);
CREATE INDEX idx_products_category ON public.products(category);

-- Create trigger to update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();