
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store, MapPin, Star, MessageSquare, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function PublicShopPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  // In a real app, we would fetch seller data by ID. 
  // For this prototype, we'll simulate it using the ID as the seller name/email.
  const decodedId = decodeURIComponent(id as string);
  const sellerProducts = products.filter(p => p.sellerId === 'admin' || p.sellerId === decodedId);

  const handleChatNow = () => {
    const user = localStorage.getItem('techshop_user');
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to chat with the seller.",
        variant: "destructive"
      });
      router.push('/auth/login');
      return;
    }
    router.push(`/chat?sellerId=${decodedId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      
      <main className="flex-grow pb-12">
        {/* Shop Header / Banner */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/10 shadow-lg">
                  <AvatarImage src={`https://picsum.photos/seed/${decodedId}/200/200`} />
                  <AvatarFallback className="bg-primary text-white font-bold text-2xl">
                    {decodedId[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white border-none text-[10px]">
                  Verified Seller
                </Badge>
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-3xl font-black text-gray-800">{decodedId}'s Official Store</h1>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 text-gray-200" />
                    <span className="text-xs text-gray-400 ml-2">(4.0/5)</span>
                  </div>
                </div>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" /> Dhaka, Bangladesh
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <div className="text-center px-4 border-r">
                    <p className="text-lg font-bold">86%</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Positive Feedback</p>
                  </div>
                  <div className="text-center px-4 border-r">
                    <p className="text-lg font-bold">100%</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">On-time Ship</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-lg font-bold">98%</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Chat Response</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleChatNow} className="bg-primary text-white font-bold rounded-full px-8 h-12 hover:brightness-110 gap-2">
                  <MessageSquare className="w-5 h-5" /> Chat Now
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-gray-200">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Content */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">All Products ({sellerProducts.length})</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">Sort by: Popular</Button>
              <Button variant="ghost" size="sm" className="text-xs font-bold">Price: Low to High</Button>
            </div>
          </div>

          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {sellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-20 rounded-xl text-center shadow-sm border space-y-4">
              <Store className="w-16 h-16 text-gray-200 mx-auto" />
              <p className="text-gray-400 font-bold">This store has no products yet.</p>
              <Link href="/"><Button variant="outline">Back to Marketplace</Button></Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
