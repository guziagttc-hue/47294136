
"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Package, MapPin, CreditCard, Bell, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Rahman Ahmed",
    email: "rahman@example.com",
    phone: "+880 1700-000000",
    address: "House 24, Road 5, Dhanmondi, Dhaka"
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully."
    });
  };

  const orders = [
    { id: "#ORD-9921", date: "12 Oct 2023", status: "Delivered", total: "৳4,500" },
    { id: "#ORD-8812", date: "05 Sep 2023", status: "Shipped", total: "৳1,250" },
    { id: "#ORD-7754", date: "20 Aug 2023", status: "Processing", total: "৳890" },
  ];

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
                  <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-xl shadow-sm border p-2">
              <Tabs orientation="vertical" defaultValue="profile" className="w-full">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" className="w-full justify-start gap-3 text-primary bg-primary/5 font-bold">
                    <User className="w-4 h-4" /> Personal Info
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Package className="w-4 h-4" /> My Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <MapPin className="w-4 h-4" /> Shipping Addresses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <CreditCard className="w-4 h-4" /> Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Bell className="w-4 h-4" /> Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <ShieldCheck className="w-4 h-4" /> Security
                  </Button>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsContent value="profile" className="m-0 space-y-8">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your profile details and contact info.</CardDescription>
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
                            value={profile.phone} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Default Address</Label>
                          <Input 
                            id="address" 
                            value={profile.address} 
                            onChange={(e) => setProfile({...profile, address: e.target.value})} 
                          />
                        </div>
                      </div>
                      <Button type="submit" className="bg-primary text-white font-bold rounded-full px-8">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your last 3 transactions on TechShop BD.</CardDescription>
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
                      <Button variant="link" className="text-primary font-bold p-0">View All Orders</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
