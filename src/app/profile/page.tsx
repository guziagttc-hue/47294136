
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Package, MapPin, CreditCard, Bell, ShieldCheck, LogOut } from 'lucide-react';
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
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully."
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('techshop_user');
    router.push('/');
  };

  const orders = [
    { id: "#ORD-9921", date: "12 Oct 2023", status: "Delivered", total: "৳4,500" },
    { id: "#ORD-8812", date: "05 Sep 2023", status: "Shipped", total: "৳1,250" },
    { id: "#ORD-7754", date: "20 Aug 2023", status: "Processing", total: "৳890" },
  ];

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="h-24 bg-primary" />
              <CardContent className="pt-0 -mt-12 text-center">
                <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-md">
                  <AvatarImage src={`https://picsum.photos/seed/${profile.email}/200/200`} />
                  <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Badge className="mt-2 bg-primary/10 text-primary border-none text-[10px]">{profile.role}</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-xl shadow-sm border p-2">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="w-full justify-start gap-3 text-primary bg-primary/5 font-bold">
                  <User className="w-4 h-4" /> My Account
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Package className="w-4 h-4" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <MapPin className="w-4 h-4" /> My Address
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 mt-4" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>My Personal Information</CardTitle>
                <CardDescription>Update your personal identity and contact info.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email} 
                        disabled 
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone || ''} 
                        onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Default Address</Label>
                      <Input 
                        id="address" 
                        value={profile.address || ''} 
                        onChange={(e) => setProfile({...profile, address: e.target.value})} 
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-primary text-white font-bold rounded-full px-8 hover:brightness-110">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-8 border-none shadow-sm">
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Your recent shopping history on TechShop BD.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-primary">{order.total}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-center py-10 text-muted-foreground">No orders found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Small helper for Badge if not available
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
