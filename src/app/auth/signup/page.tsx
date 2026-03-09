
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-primary tracking-tighter">Create Account</h1>
            <p className="text-muted-foreground">Join TechShop BD community today!</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" placeholder="John Doe" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@email.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button className="w-full bg-primary text-white font-bold rounded-full h-12 mt-4">Create Account</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
