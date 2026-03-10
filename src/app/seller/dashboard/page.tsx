
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
  Save,
  User,
  ShieldCheck
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      phone: target.shopPhone.value,
      name: target.sellerName.value
    };
    setUser(updatedUser);
    localStorage.setItem('techshop_user', JSON.stringify(updatedUser));
    toast({
      title: "Seller Identity Updated",
      description: "Your business and personal details have been saved."
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
            <Store className="w-5 h-5" /> My Profile & Shop
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
            <div className="flex items-center gap-3 bg-muted/50 px-3 py-1.5 rounded-full border">
              <span className="text-xs font-bold text-gray-600 hidden sm:block">{user.name}</span>
              <Avatar className="w-8 h-8 border-2 border-primary/20">
                <AvatarImage src={`https://picsum.photos/seed/${user.email}/100/100`} />
                <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {activeTab === "dashboard" && (
            <>
              {/* Seller Welcome Card */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-3 border-none shadow-sm bg-primary text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Store className="w-40 h-40" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <Store className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-black">Welcome back, {user.name}!</CardTitle>
                        <CardDescription className="text-white/80 font-medium">
                          Manage your store <span className="underline">{user.shopName || 'Marketplace Shop'}</span> and track your growth.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4 mt-2">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-[10px] uppercase font-bold opacity-70">Store Level</p>
                      <p className="text-lg font-bold">Standard Seller</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-[10px] uppercase font-bold opacity-70">Verification</p>
                      <p className="text-lg font-bold flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Verified</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <p className="text-[10px] uppercase font-bold opacity-70">Join Date</p>
                      <p className="text-lg font-bold">March 2024</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20 p-1">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={`https://picsum.photos/seed/${user.email}/200/200`} />
                      <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full rounded-full" onClick={() => setActiveTab("settings")}>
                    Edit Identity
                  </Button>
                </Card>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">My Gross Sales</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-lg"><DollarSign className="w-4 h-4 text-primary" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-800">৳ 0</div>
                    <p className="text-xs text-muted-foreground mt-2">Total earnings from your shop</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">My Posted Items</CardTitle>
                    <div className="p-2 bg-blue-50 rounded-lg"><Package className="w-4 h-4 text-blue-600" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-800">{sellerProducts.length}</div>
                    <p className="text-xs text-muted-foreground mt-2">Active listings in catalog</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white overflow-hidden group">
                  <div className="h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-300" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Store Rating</CardTitle>
                    <div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="w-4 h-4 text-green-600" /></div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-green-600">N/A</div>
                    <p className="text-xs text-muted-foreground mt-2">Based on customer feedback</p>
                  </CardContent>
                </Card>
              </div>

              {/* Identity & Address Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Business Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-dashed border-primary/20">
                      <p className="text-sm font-bold text-gray-700">Pickup & Warehouse Address:</p>
                      <p className="text-sm text-gray-500 mt-1">{user.address || 'Address not set. Please update in settings.'}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 p-3 rounded-xl border bg-white flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold">Phone</p>
                          <p className="text-xs font-bold">{user.phone || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex-1 p-3 rounded-xl border bg-white flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold">Business Email</p>
                          <p className="text-xs font-bold">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Info className="w-5 h-5 text-primary" /> Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-800">Post More Products</h4>
                        <p className="text-xs text-blue-600 mt-1">Sellers with more than 5 products get 30% more visibility.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-green-800">Improve Store Name</h4>
                        <p className="text-xs text-green-600 mt-1">A catchy shop name helps buyers remember your brand.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Personal Catalog</CardTitle>
                  <CardDescription>Manage your {sellerProducts.length} items listed under your ID.</CardDescription>
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
                          <TableCell className="font-medium text-gray-800">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded border overflow-hidden shrink-0">
                                <img src={p.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="line-clamp-1">{p.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize text-gray-500">{p.category}</TableCell>
                          <TableCell className="font-bold">৳ {p.price.toLocaleString()}</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold text-[10px] rounded-full px-3">LIVE</Badge></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-20 text-muted-foreground bg-gray-50/30">
                          <div className="flex flex-col items-center gap-2">
                            <Box className="w-12 h-12 text-gray-300" />
                            <p className="font-medium">No products posted by your ID yet.</p>
                            <Button variant="link" className="text-primary font-bold" onClick={() => setIsAddingProduct(true)}>Post your first item</Button>
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
                  <CardTitle>My Identity & Store Settings</CardTitle>
                  <CardDescription>Update how you and your shop look to the marketplace.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveStoreInfo} className="space-y-6">
                    <div className="space-y-4">
                      {/* Personal Section */}
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-primary"><User className="w-4 h-4" /> Personal Identity</h3>
                        <div className="space-y-2">
                          <Label htmlFor="sellerName" className="font-bold">Full Name (Seller)</Label>
                          <Input id="sellerName" name="sellerName" defaultValue={user.name} required className="rounded-xl border-gray-200 h-11 bg-white" />
                        </div>
                      </div>

                      {/* Store Section */}
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-primary"><Store className="w-4 h-4" /> Business Profile</h3>
                        <div className="space-y-2">
                          <Label htmlFor="shopName" className="font-bold">Shop Display Name</Label>
                          <Input id="shopName" name="shopName" defaultValue={user.shopName || `${user.name}'s Store`} required className="rounded-xl border-gray-200 h-11 bg-white" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shopAddress" className="font-bold">Business Pickup Address</Label>
                          <Input id="shopAddress" name="shopAddress" defaultValue={user.address} placeholder="Enter full office/warehouse address" className="rounded-xl border-gray-200 h-11 bg-white" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="shopPhone" className="font-bold">Contact Phone</Label>
                            <Input id="shopPhone" name="shopPhone" defaultValue={user.phone} placeholder="+880..." className="rounded-xl border-gray-200 h-11 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="shopEmail" className="font-bold">Official Email (Private)</Label>
                            <Input id="shopEmail" type="email" defaultValue={user.email} disabled className="rounded-xl border-gray-100 bg-gray-50 h-11" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white font-bold rounded-full h-12 shadow-lg shadow-primary/20 hover:brightness-110 gap-2">
                      <Save className="w-5 h-5" /> Save My Details
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
