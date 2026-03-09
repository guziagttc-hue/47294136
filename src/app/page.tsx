
"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Keyboard, 
  Zap, 
  Home as HomeIcon, 
  Shirt, 
  Sparkles, 
  Watch, 
  ShoppingBasket, 
  Gamepad2,
  Utensils,
  Dog,
  HeartPulse,
  Dribbble,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

export default function Home() {
  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const regularProducts = products.filter(p => !p.isFlashSale);
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero'));

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Headphones': return <Headphones className="w-4 h-4" />;
      case 'Keyboard': return <Keyboard className="w-4 h-4" />;
      case 'Home': return <HomeIcon className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Watch': return <Watch className="w-4 h-4" />;
      case 'ShoppingBasket': return <ShoppingBasket className="w-4 h-4" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Dog': return <Dog className="w-4 h-4" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
      case 'Dribbble': return <Dribbble className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />

      <main className="flex-grow pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mt-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar Categories (Desktop) */}
            <div className="hidden lg:block w-64 bg-white rounded-sm py-2 shadow-sm border border-gray-100 shrink-0">
              <ul className="flex flex-col">
                {categories.map((cat) => (
                  <li key={cat.id} className="group">
                    <Link 
                      href={`/category/${cat.id}`} 
                      className="flex items-center justify-between px-4 py-2 text-[13px] text-[#424242] hover:bg-[#f5f5f5] hover:text-primary transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(cat.icon)}
                        <span>{cat.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Main Carousel & Right Banner */}
            <div className="flex-1 flex flex-col gap-4">
              <Carousel className="w-full rounded-sm overflow-hidden group shadow-sm" opts={{ loop: true }}>
                <CarouselContent>
                  {heroImages.map((hero, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-[12/4.5] w-full">
                        <Image 
                          src={hero.imageUrl} 
                          alt={hero.description}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                          data-ai-hint="shopping banner"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 border-none text-gray-800" />
                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 border-none text-gray-800" />
              </Carousel>
              
              {/* Optional Membership Banner */}
              <div className="bg-primary/5 border border-primary/10 rounded-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Save More on App</h3>
                    <p className="text-xs text-gray-600">Download the app for exclusive deals and faster checkout</p>
                  </div>
                </div>
                <Link href="#">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 rounded-full font-bold">
                    DOWNLOAD APP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="container mx-auto px-4 mt-8">
          <div className="bg-white p-4 rounded-sm shadow-sm">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-8">
                <h2 className="text-xl font-bold text-primary">Flash Sale</h2>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-bold text-gray-600">On Sale Now</span>
                  <div className="flex gap-2">
                    <span className="bg-[#424242] text-white px-1.5 py-0.5 rounded-sm text-sm font-bold min-w-[24px] text-center">08</span>
                    <span className="text-[#424242] font-bold">:</span>
                    <span className="bg-[#424242] text-white px-1.5 py-0.5 rounded-sm text-sm font-bold min-w-[24px] text-center">45</span>
                    <span className="text-[#424242] font-bold">:</span>
                    <span className="bg-[#424242] text-white px-1.5 py-0.5 rounded-sm text-sm font-bold min-w-[24px] text-center">12</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 rounded-sm font-bold uppercase text-xs h-9">
                SHOP ALL PRODUCTS
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Just For You */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold mb-4 text-[#424242]">Just For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button className="w-full max-w-xs bg-white text-primary border border-primary font-bold hover:bg-primary/5 rounded-sm h-12 uppercase tracking-wide">
              LOAD MORE
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
