
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, ShoppingCart, Truck, RefreshCcw, CreditCard } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-20">
        <section className="bg-muted py-16 text-center">
          <div className="container mx-auto px-4 space-y-6">
            <h1 className="text-3xl font-bold">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Input placeholder="Search for questions..." className="h-14 pl-12 rounded-full border-none shadow-sm" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="p-6 bg-white border rounded-2xl text-center space-y-3 hover:border-primary cursor-pointer transition-colors">
              <ShoppingCart className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold">Ordering</p>
            </div>
            <div className="p-6 bg-white border rounded-2xl text-center space-y-3 hover:border-primary cursor-pointer transition-colors">
              <Truck className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold">Shipping</p>
            </div>
            <div className="p-6 bg-white border rounded-2xl text-center space-y-3 hover:border-primary cursor-pointer transition-colors">
              <RefreshCcw className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold">Returns</p>
            </div>
            <div className="p-6 bg-white border rounded-2xl text-center space-y-3 hover:border-primary cursor-pointer transition-colors">
              <CreditCard className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold">Payments</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> FAQ
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by going to "My Orders" in your profile and clicking on the tracking number.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 7-day easy return policy for most items. Ensure the product is in its original condition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I pay for my order?</AccordionTrigger>
                <AccordionContent>
                  We accept bKash, Nagad, Visa, Mastercard, and Cash on Delivery (COD).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
