
"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent!",
      description: "We'll get back to you within 24 hours."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black">Get in Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our products or services? Our team of tech experts is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info & Form */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-2xl border space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold">Call Us</h3>
                  <p className="text-muted-foreground">+880 1700-000000<br />+880 1800-000000</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold">Email Us</h3>
                  <p className="text-muted-foreground">info@techshopbd.com<br />support@techshopbd.com</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-3xl border shadow-sm">
                <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Full Name</label>
                      <Input placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Email Address</label>
                      <Input type="email" placeholder="name@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Subject</label>
                    <Input placeholder="What's your inquiry about?" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Message</label>
                    <Textarea placeholder="Type your message here..." className="min-h-[150px]" required />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary text-white font-bold h-14 text-lg rounded-full gap-2">
                    <Send className="w-5 h-5" /> Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & Location */}
            <div className="space-y-8">
              <div className="bg-muted rounded-3xl overflow-hidden h-[500px] relative border group">
                {/* Simulated Google Map */}
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <MapPin className="w-16 h-16 text-accent mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-primary">Our Showroom</h3>
                    <p className="text-muted-foreground">Multiplan Center, Level 5, Shop 22<br />Elephant Road, Dhaka 1205</p>
                    <Button variant="outline" className="border-primary text-primary rounded-full px-8">
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-8 rounded-3xl border-2 border-accent/20">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="font-semibold">Saturday - Thursday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-destructive">
                    <span className="font-semibold">Friday</span>
                    <span className="font-bold">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
