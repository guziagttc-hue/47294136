
"use client";

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-primary">TechShop BD</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              The leading e-commerce platform in Bangladesh. We bring you millions of products at the best prices.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-primary"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-primary"><Youtube className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">How to Buy</Link></li>
              <li><Link href="#" className="hover:text-primary">Returns & Refunds</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Daraz Column */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider">TechShop BD</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Digital Payments</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Sell on TechShop BD</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500">Multiplan Center, Level 5, Elephant Road, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500">+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500">support@techshopbd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} TechShop BD. All rights reserved. Registration ID: 304903094
          </p>
          <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="https://placehold.co/40x25?text=VISA" alt="Visa" />
            <img src="https://placehold.co/40x25?text=MC" alt="Mastercard" />
            <img src="https://placehold.co/40x25?text=BKASH" alt="bKash" />
            <img src="https://placehold.co/40x25?text=NAGAD" alt="Nagad" />
          </div>
        </div>
      </div>
    </footer>
  );
}
