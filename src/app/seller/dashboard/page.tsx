
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Plus, 
  Search, 
  Package, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Box,
  Tag,
  Info,
  LogOut,
  Settings,
  Store,
  MapPin,
  Phone,
  Mail,
  Save
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { products, categories } from '@/lib/mock-data';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('techshop_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.role !== 'SELLER') {
        router.push('/');
        return;
      }
      setUser(parsedUser);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  // Filter products for this specific seller
  // In a real app, this would be a Firestore query based on user.email
  const sellerProducts = products.filter(p => p.sellerId === 'admin' || p.sellerId === user?.email);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingProduct(false);
    toast({
      title: "Product Listing Created",
      description: "Your item is now live on TechShop BD."
    });
  };

  const handleSaveStoreInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const updatedUser = { 
      ...user, 
      shopName: target.shopName.value,
      address: target.shopAddress.value,
      phone: target.shopPhone.value
    };
    setUser(updatedUser);
    localStorage.setItem('techshop_user', JSON.stringify(updatedUser));
    toast({
      title: "Store Profile Updated",
      description: "Your business details have been saved to your account."
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('techshop_user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b bg-primary/5">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            TechShop BD
          </Link>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Seller Center</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 rounded-xl ${activeTab === "dashboard" ? "bg-primary text-white" : "hover:bg-primary/5 text-gray-600"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 rounded-xl ${activeTab === "products" ? "bg-primary text-white" : "hover:bg-primary/5 text-gray-600"}`}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-5 h-5" /> My Products
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 rounded-xl ${activeTab === "orders" ? "bg-primary text-white" : "hover:bg-primary/5 text-gray-600"}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" /> Sales Orders
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 rounded-xl ${activeTab === "settings" ? "bg-primary text-white" : "hover:bg-primary/5 text-gray-600"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Store className="w-5 h-5" /> Store Settings
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 rounded-xl" onClick={handleLogout}>
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary text-primary hover:bg-primary/5">
                <ArrowLeft className="w-4 h-4" /> View Store
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">{user.shopName || 'My Store'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-white gap-2 font-bold rounded-full px-6 shadow-lg shadow-primary/20 hover:brightness-110">
                  <Plus className="w-4 h-4" /> Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <DialogHeader className="p-6 bg-primary text-white">
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <Package className="w-6 h-6" /> Create New Listing
                  </DialogTitle>
                  <DialogDescription className="text-white/80">
                    List your product on the TechShop BD marketplace.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                  <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 md:col-span-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-bold flex items-center gap-2">
                            <Tag className="w-4 h-4 text-primary" /> Product Name
                          </Label>
                          <Input id="name" placeholder="Enter product title" required className="rounded-xl border-gray-200" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-bold flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" /> Category
                        </Label>
                        <Select required>
                          <SelectTrigger className="rounded-xl border-gray-200">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-bold flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" /> Listing Price (৳)
                        </Label>
                        <Input id="price" type="number" placeholder="0.00" required className="rounded-xl border-gray-200" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm font-bold">Initial Inventory</Label>
                        <Input id="stock" type="number" placeholder="10" defaultValue="1" className="rounded-xl border-gray-200" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image" className="text-sm font-bold">Product Image URL</Label>
                        <Input id="image" placeholder="https://..." required className="rounded-xl border-gray-200" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description" className="text-sm font-bold">Product Details</Label>
                        <Textarea id="description" placeholder="Write about your product..." className="min-h-[120px] rounded-xl border-gray-200" required />
                      </div>
                    </div>

                    <DialogFooter className="pt-4">
                      <Button variant="outline" type="button" onClick={() => setIsAddingProduct(false)} className="rounded-full">Discard</Button>
                      <Button type="submit" className="bg-primary text-white font-bold px-10 rounded-full hover:brightness-110">Publish Now</Button>
                    </DialogFooter>
                  </form>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center border-2 border-primary/20 text-sm shadow-inner">
              {user.name?.[0].toUpperCase() || 'S'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">My Gross Sales</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-lg"><DollarSign className="w-4 h-4 text-primary" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-800">৳0</div>
                    <p className="text-xs text-muted-foreground mt-2">Start your sales journey today</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">My Active Inventory</CardTitle>
                    <div className="p-2 bg-blue-50 rounded-lg"><Package className="w-4 h-4 text-blue-600" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-800">{sellerProducts.length}</div>
                    <p className="text-xs text-muted-foreground mt-2">Products posted by you</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Store Status</CardTitle>
                    <div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="w-4 h-4 text-green-600" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-green-600">Active</div>
                    <p className="text-xs text-muted-foreground mt-2">Visible to all buyers</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Shop Insights</CardTitle>
                  <CardDescription>Tips to grow your business on TechShop BD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Info className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">New Campaign: Mega Sale 2025</h4>
                      <p className="text-sm text-gray-500 mt-1">Register your products now to get up to 2x more visibility during the upcoming sale event.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "products" && (
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Posted Products</CardTitle>
                  <CardDescription>Manage your personal listings and stock levels.</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search my items..." className="pl-10 w-64 rounded-full bg-gray-50 border-none" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-bold">Product</TableHead>
                      <TableHead className="font-bold">Category</TableHead>
                      <TableHead className="font-bold">Price</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellerProducts.length > 0 ? (
                      sellerProducts.map((p) => (
                        <TableRow key={p.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="font-medium text-gray-800">{p.name}</TableCell>
                          <TableCell className="capitalize text-gray-500">{p.category}</TableCell>
                          <TableCell className="font-bold">৳{p.price.toLocaleString()}</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold text-[10px] rounded-full px-3">LIVE</Badge></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-20 text-muted-foreground bg-gray-50/30">
                          <div className="flex flex-col items-center gap-2">
                            <Box className="w-12 h-12 text-gray-300" />
                            <p className="font-medium">You haven't posted any products yet.</p>
                            <Button variant="link" className="text-primary font-bold" onClick={() => setIsAddingProduct(true)}>Add your first item</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>My Store Profile</CardTitle>
                  <CardDescription>Manage your business identity and pickup location.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveStoreInfo} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="shopName" className="font-bold flex items-center gap-2">
                          <Store className="w-4 h-4 text-primary" /> My Shop Name
                        </Label>
                        <Input 
                          id="shopName" 
                          name="shopName"
                          defaultValue={user.shopName || `${user.name}'s Store`}
                          required 
                          className="rounded-xl border-gray-200 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shopAddress" className="font-bold flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" /> Warehouse / Pickup Address
                        </Label>
                        <Input 
                          id="shopAddress" 
                          name="shopAddress"
                          defaultValue={user.address}
                          placeholder="Your business pickup location"
                          className="rounded-xl border-gray-200 h-11"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shopPhone" className="font-bold flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" /> Contact Phone
                          </Label>
                          <Input 
                            id="shopPhone" 
                            name="shopPhone"
                            defaultValue={user.phone}
                            placeholder="+880..."
                            className="rounded-xl border-gray-200 h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shopEmail" className="font-bold flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" /> Support Email
                          </Label>
                          <Input 
                            id="shopEmail" 
                            type="email"
                            defaultValue={user.email}
                            disabled
                            className="rounded-xl border-gray-100 bg-gray-50 h-11"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white font-bold rounded-full h-12 shadow-lg shadow-primary/20 hover:brightness-110 gap-2">
                      <Save className="w-5 h-5" /> Save Shop Identity
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
