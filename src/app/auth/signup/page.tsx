
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup and save to local storage
    const userData = {
      name: (e.target as any).fullname.value,
      email: (e.target as any).email.value,
      role: role,
      isLoggedIn: true
    };
    localStorage.setItem('techshop_user', JSON.stringify(userData));
    
    toast({
      title: "Account Created Successfully",
      description: `Welcome! You are registered as a ${role.toLowerCase()}.`,
    });
    
    router.push(role === 'SELLER' ? '/seller/dashboard' : '/profile');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-primary tracking-tighter">Create Account</h1>
            <p className="text-muted-foreground">Join TechShop BD community today!</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" name="fullname" placeholder="John Doe" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="name@email.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a password" required />
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-sm font-bold">I want to join as a:</Label>
              <RadioGroup defaultValue="BUYER" onValueChange={(val) => setRole(val as any)} className="flex gap-4">
                <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted border border-transparent has-[:checked]:border-primary transition-all">
                  <RadioGroupItem value="BUYER" id="role-buyer" />
                  <Label htmlFor="role-buyer" className="cursor-pointer font-bold">Buyer</Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-lg flex-1 cursor-pointer hover:bg-muted border border-transparent has-[:checked]:border-primary transition-all">
                  <RadioGroupItem value="SELLER" id="role-seller" />
                  <Label htmlFor="role-seller" className="cursor-pointer font-bold">Seller</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary text-white font-bold rounded-full h-12 mt-4">Create Account</Button>
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
