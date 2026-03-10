
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
      {/* Top Bar */}
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
      <nav className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl lg:text-3xl font-black text-primary tracking-tighter">TechShop BD</span>
          </Link>

          {/* Search */}
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

          {/* Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 rounded-full border border-primary/20 p-0 overflow-hidden">
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

            <Link href="/cart" className="relative">
              <ShoppingCart className="w-7 h-7 text-gray-700" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] flex items-center justify-center p-0.5 bg-primary text-white border-2 border-white rounded-full text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-black/50" onClick={() => setIsMenuOpen(false)}>
            <div 
              className="absolute left-0 top-0 h-full w-[280px] bg-white p-6 space-y-6 shadow-2xl animate-in slide-in-from-left duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-2xl font-black text-primary tracking-tighter">TechShop BD</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></Button>
              </div>

              <div className="flex flex-col gap-4 font-bold text-gray-800">
                <Link href="/" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  <HomeIcon className="w-5 h-5 text-primary" /> Home
                </Link>
                <Link href={user ? "/profile" : "/auth/login"} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-5 h-5 text-primary" /> {user ? "My Profile" : "Login / Signup"}
                </Link>
                {user?.role === 'SELLER' && (
                  <Link href="/seller/dashboard" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                    <Store className="w-5 h-5 text-primary" /> Seller Center
                  </Link>
                )}
                <Link href="/seller" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  <Smartphone className="w-5 h-5 text-primary" /> Become a Seller
                </Link>
                <Link href="/help" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>
                  <Globe className="w-5 h-5 text-primary" /> Help & Support
                </Link>
                <button 
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-primary"
                >
                  <Globe className="w-5 h-5" /> {language === 'BN' ? 'Switch to English' : 'বাংলা ভার্সন'}
                </button>
                {user && (
                  <button 
                    className="flex items-center gap-3 p-2 text-destructive hover:bg-destructive/5 rounded-lg mt-4 border-t pt-4" 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
