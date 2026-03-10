
"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield, 
  MapPin, 
  Store,
  ChevronRight,
  Info
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Product not found.</h2>
            <Link href="/"><Button>Back to Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

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

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      <main className="flex-grow py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 line-clamp-1">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 bg-white p-4 rounded-sm shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative aspect-square bg-white rounded-sm overflow-hidden border">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-4"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-xl font-medium text-gray-800 leading-tight">{product.name}</h1>
                  <div className="py-4 border-y border-gray-100">
                    <div className="text-2xl font-bold text-primary">৳ {product.price.toLocaleString()}</div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 line-through">৳ {product.originalPrice.toLocaleString()}</span>
                        <span className="text-gray-700">-{discount}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500 w-16">Quantity</span>
                    <div className="flex items-center border rounded-sm">
                      <button 
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                      >-</button>
                      <span className="px-6 py-1 font-medium">{quantity}</span>
                      <button 
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600"
                        onClick={() => setQuantity(prev => prev + 1)}
                      >+</button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button className="flex-1 bg-[#2abbe8] hover:bg-[#1f93b8] text-white rounded-sm h-11 font-medium uppercase text-xs">Buy Now</Button>
                    <Button onClick={handleAddToCart} className="flex-1 bg-primary hover:brightness-110 text-white rounded-sm h-11 font-medium uppercase text-xs">Add to Cart</Button>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="bg-[#fafafa] border-b p-3">
                  <h3 className="text-sm font-bold text-gray-700">Product details</h3>
                </div>
                <div className="p-4 text-sm text-gray-600 leading-relaxed"><p>{product.description}</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <h4 className="text-[12px] font-bold text-gray-500 uppercase">Delivery Options</h4>
                <div className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div className="text-[13px]"><p className="text-gray-700 font-medium">Dhaka, Bangladesh</p></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Sold by</div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-primary/20">
                    <AvatarImage src={`https://picsum.photos/seed/${product.sellerId}/100/100`} />
                    <AvatarFallback>{product.sellerId[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-[13px] font-bold text-gray-700 capitalize">{product.sellerId}'s Store</span>
                </div>
                <Link href={`/shop/${product.sellerId}`} className="block text-center text-blue-500 font-bold uppercase text-[12px] py-2 border rounded-sm hover:bg-blue-50 transition-colors">GO TO STORE</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
