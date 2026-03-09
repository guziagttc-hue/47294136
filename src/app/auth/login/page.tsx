
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Facebook, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-primary tracking-tighter">Login to TechShop BD</h1>
            <p className="text-muted-foreground">Welcome back! Please enter your details.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button className="w-full bg-primary text-white font-bold rounded-full h-12">Login</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-full gap-2">
              <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
              <Mail className="w-4 h-4 text-[#DB4437]" /> Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
