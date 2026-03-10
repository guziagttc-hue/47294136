
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
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Keyboard': return <Keyboard className="w-5 h-5" />;
      case 'Home': return <HomeIcon className="w-5 h-5" />;
      case 'Shirt': return <Shirt className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      case 'ShoppingBasket': return <ShoppingBasket className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Dog': return <Dog className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Dribbble': return <Dribbble className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />

      <main className="flex-grow pb-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:mt-4">
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
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 group-hover:text-primary transition-colors">
                          {getCategoryIcon(cat.icon)}
                        </span>
                        <span>{cat.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Main Carousel */}
            <div className="flex-1 overflow-hidden">
              <Carousel className="w-full lg:rounded-sm overflow-hidden group shadow-sm" opts={{ loop: true }}>
                <CarouselContent>
                  {heroImages.map((hero, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
                        <Image 
                          src={hero.imageUrl} 
                          alt={hero.description}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 border-none text-gray-800" />
                <CarouselNext className="hidden lg:flex right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 border-none text-gray-800" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="container mx-auto px-4 mt-6">
          <div className="bg-white p-4 rounded-sm shadow-sm">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-bold text-primary">Flash Sale</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Ending in</span>
                  <div className="flex gap-1">
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-xs font-bold">08</span>
                    <span className="text-primary font-bold">:</span>
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-xs font-bold">45</span>
                    <span className="text-primary font-bold">:</span>
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-xs font-bold">12</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5 rounded-sm font-bold uppercase text-xs">
                SHOP ALL
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Just For You */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold mb-4 text-[#424242]">Just For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {regularProducts.map((product) => (
              <ProductCard key={`${product.id}-dup`} product={product} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button className="w-full max-w-xs bg-white text-primary border border-primary font-bold hover:bg-primary/5 rounded-sm h-11 uppercase text-sm">
              LOAD MORE
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
