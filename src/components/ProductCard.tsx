
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mock-data';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group bg-white flex flex-col hover:shadow-lg transition-shadow duration-300 rounded-sm overflow-hidden border border-transparent hover:border-gray-200"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount && (
          <Badge className="absolute top-0 left-0 bg-primary text-white font-bold rounded-none rounded-br-lg text-[10px] px-1.5">
            -{discount}%
          </Badge>
        )}
      </div>

      <div className="p-3 flex flex-col flex-grow gap-1.5">
        <h3 className="text-sm font-medium line-clamp-2 leading-snug h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="text-lg font-bold text-primary">
            ৳{product.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            {discount && (
              <span className="text-[10px] font-bold text-gray-600">-{discount}%</span>
            )}
          </div>
        </div>

        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 fill-current ${i < Math.floor(product.rating || 0) ? '' : 'text-gray-200'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-gray-500">({product.reviewsCount})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
