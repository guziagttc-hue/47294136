
"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageSquare } from 'lucide-react';

function ChatContent() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get('sellerId');

  return (
    <main className="flex-grow container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 mx-auto">
          <MessageSquare className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Chat System Disabled</h3>
          <p className="text-sm text-gray-400 mt-2">
            The messaging system is currently unavailable. 
            {sellerId && ` You were trying to contact: ${sellerId}`}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      <Suspense fallback={
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-primary font-bold">Loading...</div>
        </main>
      }>
        <ChatContent />
      </Suspense>
      <Footer />
    </div>
  );
}
