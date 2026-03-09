
"use client";

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Apple, Smartphone, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-gray-800">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">How to Buy</Link></li>
              <li><Link href="#" className="hover:text-primary">Returns & Refunds</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-primary">CCMS - Central Complain Management System</Link></li>
            </ul>
          </div>

          {/* TechShop BD */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-gray-800">TechShop BD</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Digital Payments</Link></li>
              <li><Link href="#" className="hover:text-primary">TechShop Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Sell on TechShop BD</Link></li>
              <li><Link href="#" className="hover:text-primary">Join the Affiliate Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-gray-800">Contact Info</h4>
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

          {/* App Download */}
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-wider text-gray-800">Download App</h4>
            <div className="space-y-4">
              <Link href="#" className="flex items-center gap-3 bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors">
                <Apple className="w-6 h-6" />
                <div className="text-[10px] leading-tight">Download on the<br/><span className="text-sm font-bold">App Store</span></div>
              </Link>
              <Link href="#" className="flex items-center gap-3 bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors">
                <Smartphone className="w-6 h-6" />
                <div className="text-[10px] leading-tight">Get it on<br/><span className="text-sm font-bold">Google Play</span></div>
              </Link>
              <div className="flex gap-4 pt-4">
                <Link href="#" className="text-gray-400 hover:text-primary"><Facebook className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-400 hover:text-primary"><Twitter className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-400 hover:text-primary"><Instagram className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-400 hover:text-primary"><Youtube className="w-5 h-5" /></Link>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section like Daraz */}
        <div className="border-t pt-12 pb-12 text-[12px] text-gray-500 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Experience Personalized Online Shopping in Bangladesh with TechShop BD</h3>
          <p>
            Online Shopping BD has never been easier. TechShop BD is the best online shopping store in Bangladesh that features 10+ million products at affordable prices. As Bangladesh's online shopping landscape is expanding every year, online shopping in Dhaka, Chittagong, Khulna, Sylhet and other big cities are also gaining momentum. TechShop BD is among the best websites for online shopping in Bangladesh that promises fast, reliable and convenient delivery of products to your doorstep.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div>
              <h5 className="font-bold text-gray-700">MOBILE PHONES</h5>
              <p>Xiaomi, Samsung, Huawei, Symphony, Nokia, OnePlus, realme, Infinix, Oppo, Vivo</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-700">LAPTOPS</h5>
              <p>HP, Dell, Asus, Lenovo, Graphics Cards</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-700">HOME APPLIANCES</h5>
              <p>ACs, Refrigerators, Deep Freezers, Generators, UPS, Washing Machines</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-700">FANS</h5>
              <p>Click, Mira, Baseus, BRB, Defender, National, Sony, Sunca</p>
            </div>
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
