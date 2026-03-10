
"use client";

import Link from 'next/link';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Smartphone, 
  Globe, 
  User, 
  LogOut, 
  Settings as SettingsIcon,
  Home as HomeIcon,
  Store
} from 'lucide-react';
import { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('BN');
  const [user, setUser] = useState<any>(null);
  const { cartCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('techshop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'BN' ? 'EN' : 'BN';
    setLanguage(newLang);
    toast({
      title: newLang === 'BN' ? "ভাষা পরিবর্তন করা হয়েছে" : "Language Changed",
      description: newLang === 'BN' ? "এখন আপনি বাংলা ভার্সন দেখছেন।" : "You are now viewing the English version.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('techshop_user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar (Hidden on Mobile) */}
      <div className="bg-[#f5f5f5] text-[12px] py-1.5 hidden lg:block border-b">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-[#757575] font-medium">
          <Link href="/app-download" className="hover:text-primary transition-colors">Save More on App</Link>
          <Link href={user?.role === 'SELLER' ? '/seller/dashboard' : '/seller'} className="hover:text-primary transition-colors flex items-center gap-1 font-bold">
            <Store className="w-3 h-3" /> {user?.role === 'SELLER' ? 'Seller Center' : 'Become a Seller'}
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors">Help & Support</Link>
          
          {!user ? (
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

      {/* Main Navbar */}
      <nav className="bg-white border-b shadow-sm py-2 lg:py-4">
        <div className="container mx-auto px-4 space-y-3 lg:space-y-0">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="text-xl lg:text-3xl font-black text-primary tracking-tighter">TechShop BD</span>
            </Link>

            {/* Desktop Search */}
            <div className="flex-1 max-w-2xl relative hidden md:flex group">
              <Input 
                type="text" 
                placeholder="Search in TechShop BD" 
                className="w-full pl-4 pr-12 h-11 bg-[#eff0f5] border-none focus-visible:ring-0 placeholder:text-gray-500 rounded-sm"
              />
              <button className="absolute right-0 top-0 h-full w-12 bg-primary flex items-center justify-center rounded-r-sm hover:brightness-110">
                <Search className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3 lg:gap-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 lg:h-10 lg:w-10 rounded-full border border-primary/20 p-0 overflow-hidden">
                      <Avatar className="h-full w-full">
                        <AvatarImage src={`https://picsum.photos/seed/${user.email}/100/100`} />
                        <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    {user.role === 'SELLER' && (
                      <Link href="/seller/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          <Store className="mr-2 h-4 w-4" />
                          <span>Seller Center</span>
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login" className="hidden lg:block">
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <User className="w-7 h-7" />
                  </Button>
                </Link>
              )}

              {/* Cart (Hidden on mobile bottom nav, but kept here for desktop/tablet) */}
              <Link href="/cart" className="relative hidden lg:block">
                <ShoppingCart className="w-7 h-7 text-gray-700" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] flex items-center justify-center p-0.5 bg-primary text-white border-2 border-white rounded-full text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Link>

              {/* Language Switch for Mobile Header */}
              <button 
                onClick={toggleLanguage}
                className="lg:hidden text-primary font-bold text-sm"
              >
                {language === 'BN' ? 'EN' : 'বাং'}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Always Visible on Mobile) */}
          <div className="lg:hidden w-full relative group">
            <Input 
              type="text" 
              placeholder="Search in TechShop BD" 
              className="w-full pl-4 pr-12 h-10 bg-[#eff0f5] border-none focus-visible:ring-0 placeholder:text-gray-500 rounded-full"
            />
            <button className="absolute right-0 top-0 h-full w-11 bg-primary flex items-center justify-center rounded-r-full hover:brightness-110">
              <Search className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
