
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Share2, CheckCircle2, Truck, RefreshCw, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden border">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:border-accent">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-accent/10 text-primary border-none hover:bg-accent/20">Official Product</Badge>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-secondary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">(48 Customer Reviews)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border rounded-full">
                    <button 
                      className="px-4 py-2 hover:bg-muted transition-colors rounded-l-full"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >-</button>
                    <span className="px-6 font-bold">{quantity}</span>
                    <button 
                      className="px-4 py-2 hover:bg-muted transition-colors rounded-r-full"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >+</button>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleAddToCart}
                    className="flex-1 bg-accent text-primary font-bold hover:brightness-110 rounded-full h-14 text-lg gap-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 rounded-full gap-2">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-full gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>

              {/* Service Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Truck className="w-6 h-6 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <RefreshCw className="w-6 h-6 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest">7 Days Return</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Shield className="w-6 h-6 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest">Originality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="mt-20 space-y-8">
            <h2 className="text-2xl font-bold pb-4 border-b">Technical Specifications</h2>
            <div className="max-w-4xl">
              <Table>
                <TableBody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-bold bg-muted/50 w-1/3 py-4">{key}</TableCell>
                      <TableCell className="py-4">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
