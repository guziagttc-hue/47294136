
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store, MapPin, Star, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function PublicShopPage() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id as string);
  const sellerProducts = products.filter(p => p.sellerId === 'admin' || p.sellerId === decodedId);

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      <main className="flex-grow pb-12">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-24 h-24 border-4 border-primary/10 shadow-lg">
                <AvatarImage src={`https://picsum.photos/seed/${decodedId}/200/200`} />
                <AvatarFallback className="bg-primary text-white font-bold text-2xl">{decodedId[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-black text-gray-800">{decodedId}'s Official Store</h1>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" /> Dhaka, Bangladesh
                </p>
              </div>
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-gray-200">
                <Share2 className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Products ({sellerProducts.length})</h2>
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
              <Link href="/"><Button variant="outline">Back to Home</Button></Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
