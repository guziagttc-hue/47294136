
"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Smartphone, Globe } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('BN');
  const { cartCount } = useCart();
  const { toast } = useToast();

  const toggleLanguage = () => {
    const newLang = language === 'BN' ? 'EN' : 'BN';
    setLanguage(newLang);
    toast({
      title: newLang === 'BN' ? "ভাষা পরিবর্তন করা হয়েছে" : "Language Changed",
      description: newLang === 'BN' ? "এখন আপনি বাংলা ভার্সন দেখছেন।" : "You are now viewing the English version.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[#f5f5f5] text-[12px] py-1.5 hidden lg:block border-b">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-[#757575] font-medium">
          <Link href="/app-download" className="hover:text-primary transition-colors">Save More on App</Link>
          <Link href="/seller" className="hover:text-primary transition-colors">Become a Seller</Link>
          <Link href="/help" className="hover:text-primary transition-colors">Help & Support</Link>
          <Link href="/auth/login" className="hover:text-primary transition-colors uppercase font-bold text-gray-800">Login</Link>
          <Link href="/auth/signup" className="hover:text-primary transition-colors uppercase font-bold text-gray-800 border-l pl-6">Sign Up</Link>
          <button 
            onClick={toggleLanguage}
            className="hover:text-primary transition-colors flex items-center gap-1 border-l pl-6 font-bold text-primary"
          >
            <Globe className="w-3 h-3" />
            {language === 'BN' ? 'English' : 'বাংলা'}
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo - Points to Admin Panel */}
            <Link href="/admin" className="shrink-0 group">
              <span className="text-3xl font-black text-primary tracking-tighter group-hover:opacity-80 transition-opacity">TechShop BD</span>
              <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-tighter -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Admin Panel</span>
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
              
              <Link href="/app-download" className="hidden lg:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-bold text-sm">
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
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
              <Link href="/seller" onClick={() => setIsMenuOpen(false)}>Become a Seller</Link>
              <Link href="/help" onClick={() => setIsMenuOpen(false)}>Help & Support</Link>
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
