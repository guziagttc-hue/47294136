
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-black text-primary leading-tight">
                    Empowering Your <br />
                    <span className="text-accent">Digital Lifestyle</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Founded in 2018, TechShop BD started with a simple mission: to make premium technology accessible to everyone in Bangladesh at honest prices.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg">
                    We aren't just an e-commerce platform; we are a community of tech enthusiasts dedicated to finding the best gadgets from around the world and bringing them to your doorstep.
                  </p>
                  <p className="text-lg">
                    With over 50,000+ happy customers and growing, our commitment to quality and service remains our top priority. Every product we sell is 100% authentic and backed by our trusted warranty.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image 
                    src={PlaceHolderImages[1].imageUrl} 
                    alt="Our Office" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-accent p-10 rounded-3xl shadow-xl hidden md:block">
                  <div className="text-primary space-y-1">
                    <span className="text-5xl font-black">6+</span>
                    <p className="text-lg font-bold opacity-80 uppercase tracking-widest">Years of Trust</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl font-bold">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground">The core principles that drive everything we do at TechShop BD.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-10 rounded-3xl border-2 border-transparent hover:border-accent transition-all duration-300 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Authenticity</h3>
                <p className="text-muted-foreground">We source directly from official distributors to ensure 100% original products.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl border-2 border-transparent hover:border-accent transition-all duration-300 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Best Price</h3>
                <p className="text-muted-foreground">Competitive pricing strategy to give you the most value for your money.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl border-2 border-transparent hover:border-accent transition-all duration-300 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Support</h3>
                <p className="text-muted-foreground">Dedicated after-sales support team to help with any technical issues.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl border-2 border-transparent hover:border-accent transition-all duration-300 space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Reliability</h3>
                <p className="text-muted-foreground">Fast and secure delivery network spanning all across Bangladesh.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
