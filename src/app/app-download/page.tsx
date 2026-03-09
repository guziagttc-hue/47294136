
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Smartphone, Apple, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export default function AppDownloadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-black text-primary leading-tight">
              Download the <br />TechShop BD App
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get exclusive deals, real-time order tracking, and a faster shopping experience right at your fingertips.
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-black text-white rounded-xl h-16 gap-3 px-8">
                  <Apple className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-70">Download on the</p>
                    <p className="text-xl font-bold">App Store</p>
                  </div>
                </Button>
                <Button size="lg" className="bg-black text-white rounded-xl h-16 gap-3 px-8">
                  <PlayCircle className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-70">Get it on</p>
                    <p className="text-xl font-bold">Google Play</p>
                  </div>
                </Button>
              </div>
            </div>

            <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-6">
              <div className="w-24 h-24 bg-white p-2 rounded-xl border">
                <Image src="https://placehold.co/100x100?text=QR+CODE" width={100} height={100} alt="QR Code" />
              </div>
              <div>
                <p className="font-bold text-lg">Scan to Download</p>
                <p className="text-sm text-muted-foreground">Point your camera to the QR code to install the app instantly.</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-72 h-[580px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
               <Image 
                src="https://picsum.photos/seed/app1/300/600" 
                alt="App Screenshot" 
                fill 
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 space-y-4">
                <span className="text-2xl font-black">TechShop BD</span>
                <p className="text-xs">Your Daily Tech Companion</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
