"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Smartphone, Laptop, Headphones, Keyboard, Gamepad, Zap, ShieldCheck, Truck } from 'lucide-react';
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
  const featuredProducts = products.filter(p => p.isFeatured);
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero'));

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-8 h-8" />;
      case 'Laptop': return <Laptop className="w-8 h-8" />;
      case 'Headphones': return <Headphones className="w-8 h-8" />;
      case 'Keyboard': return <Keyboard className="w-8 h-8" />;
      case 'Gamepad': return <Gamepad className="w-8 h-8" />;
      default: return <Zap className="w-8 h-8" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {heroImages.map((hero, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
                    <Image 
                      src={hero.imageUrl} 
                      alt={hero.description}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
                      <div className="container mx-auto px-4">
                        <div className="max-w-xl space-y-6 text-white">
                          <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                            {idx === 0 ? 'Latest Tech' : 'Premium Deals'} <br />
                            <span className="text-accent">Right at Your Fingertips</span>
                          </h1>
                          <p className="text-lg lg:text-xl text-white/80 max-w-lg">
                            Upgrade your digital life with our exclusive collection of smartphones, laptops, and more.
                          </p>
                          <div className="flex gap-4">
                            <Button size="lg" className="bg-accent text-primary font-bold hover:brightness-110 rounded-full">
                              Shop Now
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">
                              View Offers
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 border-none text-white hover:bg-white/40" />
            <CarouselNext className="right-4 bg-white/20 border-none text-white hover:bg-white/40" />
          </Carousel>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Fast Delivery</h4>
                  <p className="text-sm text-muted-foreground">Across Bangladesh in 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Official Warranty</h4>
                  <p className="text-sm text-muted-foreground">Original products with brand warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">EMI Facility</h4>
                  <p className="text-sm text-muted-foreground">Available on major credit cards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold">Shop by Category</h2>
              <Button variant="link" className="text-primary font-semibold gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`} className="group flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-border transition-all duration-300 hover:shadow-xl hover:border-accent">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="font-bold text-center">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground">Handpicked technology for you</p>
              </div>
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all">
                See All Products
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl space-y-6">
              <Badge className="bg-accent text-primary font-bold">Member Exclusive</Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Join our club & get <span className="text-accent">10% Off</span> on your first order
              </h2>
              <p className="text-white/70 text-lg">
                Be the first to know about new arrivals, price drops, and member-only sales events.
              </p>
              <Button size="lg" className="bg-white text-primary font-bold hover:bg-accent hover:text-primary transition-all rounded-full px-10">
                Register Now
              </Button>
            </div>
            <div className="relative z-10 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === 'prod-iphone')?.imageUrl || ''} 
                  alt="Special Offer" 
                  width={300} 
                  height={300} 
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
