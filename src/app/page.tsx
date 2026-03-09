
"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Keyboard, 
  Gamepad, 
  Zap, 
  Home as HomeIcon, 
  Shirt, 
  Sparkles, 
  Watch, 
  ShoppingBasket, 
  Gamepad2,
  Trophy
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
      case 'Smartphone': return <Smartphone className="w-8 h-8" />;
      case 'Laptop': return <Laptop className="w-8 h-8" />;
      case 'Headphones': return <Headphones className="w-8 h-8" />;
      case 'Keyboard': return <Keyboard className="w-8 h-8" />;
      case 'Home': return <HomeIcon className="w-8 h-8" />;
      case 'Shirt': return <Shirt className="w-8 h-8" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Watch': return <Watch className="w-8 h-8" />;
      case 'ShoppingBasket': return <ShoppingBasket className="w-8 h-8" />;
      case 'Gamepad2': return <Gamepad2 className="w-8 h-8" />;
      default: return <Zap className="w-8 h-8" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />

      <main className="flex-grow pb-20">
        {/* Hero Banner */}
        <section className="container mx-auto px-4 mt-4">
          <Carousel className="w-full rounded-sm overflow-hidden" opts={{ loop: true }}>
            <CarouselContent>
              {heroImages.map((hero, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative aspect-[3/1] w-full">
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
            <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        </section>

        {/* Flash Sale */}
        <section className="container mx-auto px-4 mt-8">
          <div className="bg-white p-4 rounded-sm">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-8">
                <h2 className="text-xl font-bold text-primary">Flash Sale</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">On Sale Now</span>
                  <div className="flex gap-1">
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-sm font-bold">08</span>
                    <span>:</span>
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-sm font-bold">45</span>
                    <span>:</span>
                    <span className="bg-primary text-white px-1.5 py-0.5 rounded-sm text-sm font-bold">12</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5 rounded-sm font-bold">
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

        {/* Categories Grid */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-white border rounded-sm overflow-hidden">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/category/${cat.id}`} 
                className="flex flex-col items-center gap-2 p-6 border-r border-b hover:shadow-inner transition-all hover:text-primary group"
              >
                <div className="text-gray-600 transition-colors group-hover:text-primary">
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs text-center font-medium line-clamp-2">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Just For You */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Just For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button className="w-full max-w-xs bg-white text-primary border border-primary font-bold hover:bg-primary/5 rounded-sm h-12">
              LOAD MORE
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
