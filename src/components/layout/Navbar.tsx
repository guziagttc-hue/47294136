
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-tight">
            <span className="text-xl lg:text-2xl font-bold tracking-tighter">TechShop BD</span>
            <span className="text-[10px] lg:text-xs opacity-80 uppercase tracking-widest hidden sm:block">Best Tech, Right Price</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <Input 
              type="text" 
              placeholder="Search for products, brands..." 
              className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-accent"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-primary font-bold border-2 border-primary">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white/10 border-white/20 text-white"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" />
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors">Home</Link>
            <Link href="/about" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors">About Us</Link>
            <Link href="/contact" className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
