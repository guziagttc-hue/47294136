
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TechShop BD</h3>
            <p className="text-white/70 leading-relaxed">
              Your trusted digital partner since 2018. We provide the latest technology at the best competitive prices in Bangladesh.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Youtube className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Store Locator</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Level 5, Shop 22, Multiplan Center, Elephant Road, Dhaka</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>support@techshopbd.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Newsletter</h4>
            <p className="text-sm text-white/70 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
              />
              <button className="bg-accent text-primary px-4 py-2 rounded-r-md font-bold hover:brightness-110 transition-all">Join</button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} TechShop BD. All rights reserved.
          </p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
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
