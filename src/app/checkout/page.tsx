
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { MapPin, Phone, User, Home, Briefcase, ChevronRight, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useCart();
  const { toast } = useToast();
  const [addressLabel, setAddressLabel] = useState<'HOME' | 'OFFICE'>('HOME');

  const deliveryFee = 70;
  const totalAmount = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully!",
      description: "Redirecting you to the payment gateway...",
    });
  };

  if (cartCount === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty.</h2>
            <Link href="/"><Button className="bg-primary text-white font-bold rounded-sm">Back to Home</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4">
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Delivery & Items */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Delivery Information */}
              <div className="bg-white p-6 rounded-sm shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Delivery Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="text-[13px] font-medium text-gray-600">Full name</Label>
                    <Input id="fullname" placeholder="Enter your first and last name" required className="bg-[#f5f5f5] border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[13px] font-medium text-gray-600">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Please enter your phone number" required className="bg-[#f5f5f5] border-none h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="building" className="text-[13px] font-medium text-gray-600">Building / House No / Floor / Street</Label>
                    <Input id="building" placeholder="Please enter" required className="bg-[#f5f5f5] border-none h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colony" className="text-[13px] font-medium text-gray-600">Colony / Suburb / Locality / Landmark</Label>
                    <Input id="colony" placeholder="Please enter" required className="bg-[#f5f5f5] border-none h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-gray-600">Region</Label>
                    <Select required>
                      <SelectTrigger className="bg-[#f5f5f5] border-none h-11">
                        <SelectValue placeholder="Choose region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-gray-600">City</Label>
                    <Select required>
                      <SelectTrigger className="bg-[#f5f5f5] border-none h-11">
                        <SelectValue placeholder="Choose city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka-north">Dhaka North</SelectItem>
                        <SelectItem value="dhaka-south">Dhaka South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-gray-600">Area</Label>
                    <Select required>
                      <SelectTrigger className="bg-[#f5f5f5] border-none h-11">
                        <SelectValue placeholder="Choose area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banani">Banani</SelectItem>
                        <SelectItem value="gulshan">Gulshan</SelectItem>
                        <SelectItem value="uttara">Uttara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[13px] font-medium text-gray-600">Address</Label>
                  <Textarea id="address" placeholder="For Example: House# 123, Street# 123, ABC Road" required className="bg-[#f5f5f5] border-none min-h-[80px]" />
                </div>

                <div className="space-y-3">
                  <p className="text-[13px] font-medium text-gray-600">Select a label for effective delivery:</p>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setAddressLabel('HOME')}
                      className={`flex items-center gap-2 px-6 py-2 rounded-sm border transition-all text-sm font-bold ${
                        addressLabel === 'HOME' ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-600 bg-white'
                      }`}
                    >
                      <Home className="w-4 h-4" /> HOME
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAddressLabel('OFFICE')}
                      className={`flex items-center gap-2 px-6 py-2 rounded-sm border transition-all text-sm font-bold ${
                        addressLabel === 'OFFICE' ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-600 bg-white'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" /> OFFICE
                    </button>
                  </div>
                </div>
                
                <Button type="button" variant="outline" className="w-full border-primary text-primary font-bold rounded-sm h-11 hover:bg-primary/5">
                  SAVE
                </Button>
              </div>

              {/* Package Details */}
              <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                <div className="bg-[#fafafa] p-4 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">Package 1 of 1</span>
                  </div>
                  <span className="text-[12px] text-gray-500">Shipped by <span className="font-bold text-gray-700">TechShop BD Official</span></span>
                </div>
                
                <div className="p-4 space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-muted border rounded-sm shrink-0 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h4>
                        <p className="text-[11px] text-gray-400">No Brand, Color: Standard</p>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-primary font-bold">৳ {item.price.toLocaleString()}</p>
                            <p className="text-[11px] text-gray-400 line-through">৳ {(item.price * 1.5).toLocaleString()}</p>
                          </div>
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-sm shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Items Total ({cartCount} Items)</span>
                    <span className="text-sm font-bold text-gray-800">৳ {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Delivery Fee</span>
                    <span className="text-sm font-bold text-gray-800">৳ {deliveryFee}</span>
                  </div>
                  
                  {/* Voucher Section */}
                  <div className="flex gap-2">
                    <Input placeholder="Enter Voucher Code" className="bg-[#f5f5f5] border-none rounded-sm" />
                    <Button type="button" className="bg-[#2abbe8] text-white font-bold rounded-sm px-6 h-10 hover:brightness-110">APPLY</Button>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <div className="text-right">
                      <span className="text-xl font-bold text-primary">৳ {totalAmount.toLocaleString()}</span>
                      <p className="text-[10px] text-gray-400 mt-1">VAT included, where applicable</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:brightness-110 text-white font-bold rounded-sm h-12 uppercase">
                    Proceed to Pay
                  </Button>
                </div>
              </div>

              {/* Secure Info */}
              <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 6.707l-4.5 4.5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 111.414-1.414L8.5 11.086l3.793-3.793a1 1 0 111.414 1.414z" />
                    </svg>
                  </div>
                  <div className="text-[11px]">
                    <p className="font-bold text-gray-700">100% Secure Payments</p>
                    <p className="text-gray-400">Your data is always protected</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
