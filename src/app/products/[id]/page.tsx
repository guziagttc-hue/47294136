
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/mock-data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield, 
  MapPin, 
  MessageSquare,
  Store,
  ChevronRight,
  Info
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Product not found.</h2>
            <Link href="/"><Button>Back to Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      
      <main className="flex-grow py-4">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 line-clamp-1">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            
            {/* Main Product Info Card */}
            <div className="lg:col-span-3 bg-white p-4 rounded-sm shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-square bg-white rounded-sm overflow-hidden border">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`relative aspect-square rounded-sm overflow-hidden border cursor-pointer hover:border-primary ${i === 0 ? 'border-primary' : ''}`}>
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h1 className="text-xl font-medium text-gray-800 leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[#faca11]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 fill-current ${product.rating && i < Math.floor(product.rating) ? '' : 'text-gray-200'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <Link href="#" className="text-blue-500 hover:underline">
                        {product.reviewsCount === 0 ? 'No Ratings' : `${product.reviewsCount} Ratings`}
                      </Link>
                    </div>
                    <div className="flex gap-4">
                      <button className="text-gray-400 hover:text-primary"><Share2 className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-primary"><Heart className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="text-[13px] text-gray-500">
                    Brand: <Link href="#" className="text-blue-500 hover:underline">{product.brand || 'No Brand'}</Link> | 
                    <Link href="#" className="text-blue-500 hover:underline ml-1">More Accessories from {product.brand || 'No Brand'}</Link>
                  </div>

                  <div className="py-4 border-y border-gray-100">
                    <div className="text-2xl font-bold text-primary">
                      ৳ {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 line-through">৳ {product.originalPrice.toLocaleString()}</span>
                        <span className="text-gray-700">-{discount}%</span>
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500 w-16">Variation</span>
                      <Badge variant="outline" className="border-primary text-primary px-3 py-1 rounded-sm">Standard</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500 w-16">Quantity</span>
                      <div className="flex items-center border rounded-sm">
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          disabled={quantity <= 1}
                        >-</button>
                        <span className="px-6 py-1 font-medium">{quantity}</span>
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600"
                          onClick={() => setQuantity(prev => prev + 1)}
                        >+</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button 
                      className="flex-1 bg-[#2abbe8] hover:bg-[#1f93b8] text-white rounded-sm h-11 font-medium uppercase text-xs"
                    >
                      Buy Now
                    </Button>
                    <Button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-primary hover:brightness-110 text-white rounded-sm h-11 font-medium uppercase text-xs"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Tabs/Content */}
              <div className="mt-12">
                <div className="bg-[#fafafa] border-b p-3">
                  <h3 className="text-sm font-bold text-gray-700">Product details of {product.name}</h3>
                </div>
                <div className="p-4 text-sm text-gray-600 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>

            {/* Sidebar (Delivery & Seller) */}
            <div className="space-y-4">
              {/* Delivery Info */}
              <div className="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[12px] font-bold text-gray-500 uppercase">Delivery Options</h4>
                  <Info className="w-3 h-3 text-gray-300" />
                </div>
                <div className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div className="text-[13px]">
                    <p className="text-gray-700 font-medium">Dhaka, Dhaka North, Banani Road No. 12 - 19</p>
                    <button className="text-blue-500 uppercase text-[10px] font-bold mt-1">Change</button>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-4">
                  <div className="flex gap-3">
                    <Truck className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-[13px]">
                      <div className="flex justify-between font-medium">
                        <span>Standard Delivery</span>
                        <span>Free</span>
                      </div>
                      <p className="text-gray-400 text-[11px]">Guaranteed by 27-30 Mar</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-[13px] text-gray-700">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>Cash on Delivery Available</span>
                  </div>
                </div>
              </div>

              {/* Service/Returns */}
              <div className="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <h4 className="text-[12px] font-bold text-gray-500 uppercase">Return & Warranty</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <RefreshCw className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-[13px]">
                      <p className="text-gray-700">14 days easy return</p>
                      <p className="text-gray-400 text-[11px]">Change of Mind</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-[13px]">
                      <p className="text-gray-700">1 Month Warranty</p>
                      <p className="text-gray-400 text-[11px]">International Seller Warranty</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Info Updated with Profile Image */}
              <div className="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Sold by</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-primary/20">
                      <AvatarImage src={`https://picsum.photos/seed/${product.sellerId}/100/100`} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {product.sellerId[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-700 capitalize">{product.sellerId}'s Store</span>
                      <div className="flex items-center gap-1">
                        <Badge className="bg-green-500 h-3 text-[8px] font-bold px-1 py-0">Verified</Badge>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-500 text-[11px] font-bold uppercase hover:underline">Chat Now</button>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t pt-4 text-center">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Ratings</div>
                    <div className="text-base font-bold text-gray-700">86%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Shipping</div>
                    <div className="text-base font-bold text-gray-700">100%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Response</div>
                    <div className="text-base font-bold text-gray-700">98%</div>
                  </div>
                </div>
                <Link href={`/shop/${product.sellerId}`} className="block text-center text-blue-500 font-bold uppercase text-[12px] py-2 border rounded-sm hover:bg-blue-50 transition-colors">
                  GO TO STORE
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4 text-gray-700">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
