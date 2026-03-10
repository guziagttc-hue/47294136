
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight, Filter, SortDesc } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const categoryProducts = products.filter(p => p.category === id);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Category not found.</h2>
            <Link href="/"><Button>Back to Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#eff0f5]">
      <Navbar />
      
      <main className="flex-grow py-4">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{category.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden md:block w-64 space-y-6 shrink-0">
              <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100">
                <h3 className="font-bold text-sm mb-4 border-b pb-2">Filter By Price</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full h-8 px-2 border text-xs rounded-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full h-8 px-2 border text-xs rounded-sm" />
                  </div>
                  <Button size="sm" className="w-full h-8 bg-primary rounded-sm text-xs">Apply</Button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100">
                <h3 className="font-bold text-sm mb-4 border-b pb-2">Brands</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded-sm border-gray-300" /> No Brand
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input type="checkbox" className="rounded-sm border-gray-300" /> Official Store
                  </label>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 space-y-4">
              <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-700">{categoryProducts.length} items found for "{category.name}"</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Sort By:</span>
                    <select className="bg-transparent font-bold text-gray-800 outline-none">
                      <option>Best Match</option>
                      <option>Price low to high</option>
                      <option>Price high to low</option>
                    </select>
                  </div>
                </div>
              </div>

              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-20 text-center rounded-sm shadow-sm">
                  <div className="text-gray-400 mb-4">No products found in this category.</div>
                  <Link href="/"><Button variant="outline">Browse All Products</Button></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
