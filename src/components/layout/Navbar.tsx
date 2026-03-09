
"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Smartphone, Globe, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('BN');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar (Desktop Only) */}
      <div className="bg-[#f5f5f5] text-[12px] py-1.5 hidden lg:block border-b">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-[#757575] font-medium">
          <Link href="/app-download" className="hover:text-primary transition-colors">Save More on App</Link>
          <Link href="/seller" className="hover:text-primary transition-colors">Become a Seller</Link>
          <Link href="/help" className="hover:text-primary transition-colors">Help & Support</Link>
          
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login" className="hover:text-primary transition-colors uppercase font-bold text-gray-800">Login</Link>
              <Link href="/auth/signup" className="hover:text-primary transition-colors uppercase font-bold text-gray-800 border-l pl-6">Sign Up</Link>
            </>
          ) : (
            <Link href="/profile" className="hover:text-primary transition-colors uppercase font-bold text-gray-800">My Account</Link>
          )}

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
      <nav className="bg-white border-b shadow-sm py-3 lg:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/admin" className="shrink-0 group" title="Click for Admin Panel">
              <span className="text-2xl lg:text-3xl font-black text-primary tracking-tighter group-hover:opacity-80 transition-opacity">TechShop BD</span>
            </Link>

            {/* Search Bar (Hidden on very small mobile, shown on md+) */}
            <div className="flex-1 max-w-2xl relative hidden sm:flex group">
              <Input 
                type="text" 
                placeholder="Search in TechShop BD" 
                className="w-full pl-4 pr-12 h-10 lg:h-11 bg-[#eff0f5] border-none focus-visible:ring-0 placeholder:text-gray-500 rounded-sm"
              />
              <button className="absolute right-0 top-0 h-full w-10 lg:w-12 bg-primary flex items-center justify-center rounded-r-sm hover:brightness-110 transition-all">
                <Search className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 lg:h-10 lg:w-10 rounded-full border-2 border-primary/20 p-0 overflow-hidden">
                      <Avatar className="h-full w-full">
                        <AvatarImage src="https://picsum.photos/seed/user1/100/100" />
                        <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">Rahman Ahmed</p>
                        <p className="text-xs leading-none text-muted-foreground">rahman@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin">
                      <DropdownMenuItem className="cursor-pointer">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login" className="hidden lg:block">
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary">
                    <User className="w-6 h-6 lg:w-7 lg:h-7" />
                  </Button>
                </Link>
              )}

              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7 text-gray-700 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 min-w-4 lg:h-5 lg:min-w-5 flex items-center justify-center p-1 bg-primary text-white border-2 border-white rounded-full text-[9px] lg:text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Search Bar (Only shown on small screens) */}
          <div className="mt-3 sm:hidden relative group">
            <Input 
              type="text" 
              placeholder="Search in TechShop BD" 
              className="w-full pl-4 pr-12 h-10 bg-[#eff0f5] border-none focus-visible:ring-0 placeholder:text-gray-500 rounded-sm"
            />
            <button className="absolute right-0 top-0 h-full w-10 bg-primary flex items-center justify-center rounded-r-sm">
              <Search className="text-white w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)}>
            <div 
              className="absolute left-0 top-0 h-full w-[280px] bg-white p-6 space-y-8 animate-in slide-in-from-left duration-300 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary tracking-tighter">TechShop BD</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}><X /></Button>
              </div>

              <div className="flex flex-col gap-6 font-bold text-gray-800">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <HomeIcon className="w-5 h-5 text-primary" /> Home
                </Link>
                <Link href={isLoggedIn ? "/profile" : "/auth/login"} className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-5 h-5 text-primary" /> {isLoggedIn ? "My Profile" : "Login / Signup"}
                </Link>
                <Link href="/admin" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <SettingsIcon className="w-5 h-5 text-primary" /> Admin Panel
                </Link>
                <Link href="/seller" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <Smartphone className="w-5 h-5 text-primary" /> Become a Seller
                </Link>
                <Link href="/help" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <Globe className="w-5 h-5 text-primary" /> Help & Support
                </Link>
                {isLoggedIn && (
                  <button className="flex items-center gap-3 text-destructive" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                )}
              </div>

              <div className="pt-8 border-t">
                <button 
                  onClick={toggleLanguage}
                  className="w-full py-3 bg-primary/5 rounded-xl text-primary font-bold flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'BN' ? 'Switch to English' : 'বাংলা ভার্সন'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
