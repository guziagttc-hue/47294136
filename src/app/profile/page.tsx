
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('techshop_user');
    if (savedUser) {
      setProfile(JSON.parse(savedUser));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('techshop_user', JSON.stringify(profile));
    toast({ title: "Profile Updated", description: "Saved successfully." });
  };

  const handleLogout = () => {
    localStorage.removeItem('techshop_user');
    router.push('/');
  };

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden text-center p-6">
              <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-md">
                <AvatarImage src={`https://picsum.photos/seed/${profile.email}/200/200`} />
                <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="mt-4">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </Card>

            <div className="bg-white rounded-xl shadow-sm border p-2">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="w-full justify-start gap-3 text-primary bg-primary/5 font-bold"><User className="w-4 h-4" /> My Account</Button>
                <Button variant="ghost" className="w-full justify-start gap-3"><Package className="w-4 h-4" /> My Orders</Button>
                <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}><LogOut className="w-4 h-4" /> Logout</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-none shadow-sm">
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={profile.email} disabled className="bg-muted" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-primary text-white font-bold rounded-full px-8">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
