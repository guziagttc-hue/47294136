
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
      {/* Top bar */}
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
      <nav className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 group">
              <span className="text-3xl font-black text-primary tracking-tighter group-hover:opacity-80 transition-opacity">TechShop BD</span>
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
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/20 p-0 overflow-hidden">
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
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary">
                    <User className="w-7 h-7" />
                  </Button>
                </Link>
              )}

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
              <Link href={isLoggedIn ? "/profile" : "/auth/login"} onClick={() => setIsMenuOpen(false)}>
                {isLoggedIn ? "My Profile" : "Login"}
              </Link>
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
              <Link href="/seller" onClick={() => setIsMenuOpen(false)}>Become a Seller</Link>
              <Link href="/help" onClick={() => setIsMenuOpen(false)}>Help & Support</Link>
              {isLoggedIn && (
                <button className="text-left text-destructive" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
