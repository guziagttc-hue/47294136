
"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground max-w-md">
            Looks like you haven't added anything to your cart yet. Check out our latest tech gadgets!
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-white rounded-full px-8">
              Start Shopping
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">Shopping Cart ({cartCount})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-sm border-none shadow-sm items-center">
                <div className="relative w-24 h-24 rounded-sm overflow-hidden bg-muted border shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-primary font-bold">৳{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center border rounded-sm">
                  <button 
                    className="px-3 py-1 hover:bg-muted text-gray-500 font-bold"
                    onClick={() => updateQuantity(item.id, -1)}
                  >-</button>
                  <span className="px-4 font-bold text-gray-700">{item.quantity}</span>
                  <button 
                    className="px-3 py-1 hover:bg-muted text-gray-500 font-bold"
                    onClick={() => updateQuantity(item.id, 1)}
                  >+</button>
                </div>
                <div className="text-right sm:w-32">
                  <p className="font-black text-lg text-gray-800">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold mt-4">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-sm space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Subtotal</span>
                  <span className="text-gray-800 font-bold">৳{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Shipping Fee</span>
                  <span className="text-gray-800 font-bold">৳70</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-black text-primary">৳{(cartTotal + 70).toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full bg-primary text-white font-bold hover:brightness-110 rounded-sm h-14 text-lg uppercase">
                  Proceed to Checkout
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 6.707l-4.5 4.5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 111.414-1.414L8.5 11.086l3.793-3.793a1 1 0 111.414 1.414z" />
                </svg>
                Secure Checkout Powered by TechShop BD
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
