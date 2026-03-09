
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingBag, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function BecomeSellerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-20 text-white text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Sell on TechShop BD</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Reach millions of customers across Bangladesh. Start your online business with the most trusted platform.
            </p>
            <Button size="lg" className="bg-white text-primary font-bold hover:bg-gray-100 rounded-full px-12 h-14 text-lg">
              Start Selling Now
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Why Sell With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Fastest Growth</h3>
                <p className="text-muted-foreground">Join the fastest growing e-commerce community and scale your sales.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Trusted Payments</h3>
                <p className="text-muted-foreground">Secure and timely payments directly to your bank account or wallet.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Seller Support</h3>
                <p className="text-muted-foreground">Dedicated team to help you manage your store and resolve issues.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
