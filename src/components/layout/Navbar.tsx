
"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[#f5f5f5] text-[12px] py-1 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-end gap-6 text-gray-600">
          <Link href="#" className="hover:text-primary">SAVE MORE ON APP</Link>
          <Link href="#" className="hover:text-primary">BECOME A SELLER</Link>
          <Link href="#" className="hover:text-primary">HELP & SUPPORT</Link>
          <Link href="#" className="hover:text-primary">LOGIN</Link>
          <Link href="#" className="hover:text-primary">SIGN UP</Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="text-3xl font-black text-primary tracking-tighter">TechShop BD</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative hidden md:flex group">
              <Input 
                type="text" 
                placeholder="Search in TechShop BD" 
                className="w-full pl-4 pr-12 h-11 bg-[#eff0f5] border-none focus-visible:ring-0 placeholder:text-gray-500 rounded-sm"
              />
              <button className="absolute right-0 top-0 h-full w-12 bg-primary flex items-center justify-center rounded-r-sm hover:brightness-110 transition-all">
                <Search className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-1 bg-primary text-white border-2 border-white rounded-full text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
              
              <Link href="#" className="hidden lg:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-bold text-sm">
                <Smartphone className="w-4 h-4" /> Download App
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#eff0f5] border-none"
              />
              <button className="absolute right-0 top-0 h-full w-10 bg-primary flex items-center justify-center rounded-r-sm">
                <Search className="text-white w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-4 font-medium text-gray-600">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
