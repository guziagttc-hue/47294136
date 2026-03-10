
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
  Settings
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
      title: "Product Submitted",
      description: "Your product has been added to your catalog."
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
        <div className="p-6 border-b">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            TechShop BD
          </Link>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Seller Center</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "dashboard" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Button>
          <Button 
            variant={activeTab === "products" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "products" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-5 h-5" /> My Products
          </Button>
          <Button 
            variant={activeTab === "orders" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "orders" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" /> Sales Orders
          </Button>
          <Button 
            variant={activeTab === "settings" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "settings" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-5 h-5" /> Store Info
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10" onClick={handleLogout}>
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
              <Button variant="outline" size="sm" className="gap-2 rounded-full">
                <ArrowLeft className="w-4 h-4" /> Go to Store
              </Button>
            </Link>
            <h1 className="text-xl font-bold capitalize">Seller Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-white gap-2 font-bold rounded-full">
                  <Plus className="w-4 h-4" /> Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <DialogHeader className="p-6 bg-muted/30">
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" /> Create Listing
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details to list your item in TechShop BD.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh]">
                  <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 md:col-span-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-bold flex items-center gap-2">
                            <Tag className="w-4 h-4 text-primary" /> Product Name
                          </Label>
                          <Input id="name" placeholder="Enter product name" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-bold flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" /> Category
                        </Label>
                        <Select required>
                          <SelectTrigger>
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
                          <DollarSign className="w-4 h-4 text-primary" /> Price (৳)
                        </Label>
                        <Input id="price" type="number" placeholder="0.00" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm font-bold">Initial Stock</Label>
                        <Input id="stock" type="number" placeholder="10" defaultValue="1" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image" className="text-sm font-bold">Image URL</Label>
                        <Input id="image" placeholder="https://picsum.photos/..." required />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description" className="text-sm font-bold">Description</Label>
                        <Textarea id="description" placeholder="Describe your product..." className="min-h-[100px]" required />
                      </div>
                    </div>

                    <DialogFooter className="pt-4">
                      <Button variant="outline" type="button" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
                      <Button type="submit" className="bg-primary text-white font-bold px-8">List Product</Button>
                    </DialogFooter>
                  </form>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <div className="w-10 h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center border-2 border-primary/20">
              {user.name?.[0] || 'S'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">My Sales</CardTitle>
                  <DollarSign className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৳0</div>
                  <p className="text-xs text-muted-foreground mt-1">Start selling to see revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">My Products</CardTitle>
                  <Package className="w-4 h-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sellerProducts.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Items listed by you</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Store Status</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground mt-1">Visible to buyers</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>My Product Inventory</CardTitle>
                <CardDescription>You have {sellerProducts.length} items in your store.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellerProducts.length > 0 ? (
                      sellerProducts.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell className="capitalize">{p.category}</TableCell>
                          <TableCell>৳{p.price.toLocaleString()}</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Live</Badge></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                          No products found. Add your first product!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
