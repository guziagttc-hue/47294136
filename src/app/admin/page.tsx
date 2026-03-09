
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ArrowLeft,
  ChevronRight,
  Plus,
  Search,
  MoreVertical,
  Filter
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
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { products } from '@/lib/mock-data';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Ahmed", status: "Delivered", total: "৳1,250", date: "2 mins ago" },
  { id: "#ORD-002", customer: "Sumaiya Khan", status: "Processing", total: "৳4,500", date: "15 mins ago" },
  { id: "#ORD-003", customer: "Arif Hossein", status: "Shipped", total: "৳890", date: "1 hour ago" },
  { id: "#ORD-004", customer: "Mehedi Hasan", status: "Pending", total: "৳12,000", date: "3 hours ago" },
  { id: "#ORD-005", customer: "Nusrat Jahan", status: "Cancelled", total: "৳0", date: "5 hours ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            TechShop BD
          </Link>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Dashboard</p>
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
            variant={activeTab === "orders" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "orders" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </Button>
          <Button 
            variant={activeTab === "products" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "products" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-5 h-5" /> Products
          </Button>
          <Button 
            variant={activeTab === "customers" ? "secondary" : "ghost"} 
            className={`w-full justify-start gap-3 ${activeTab === "customers" ? "bg-primary/10 text-primary font-bold" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <Users className="w-5 h-5" /> Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <BarChart3 className="w-5 h-5" /> Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-5 h-5" /> Settings
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
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
                <ArrowLeft className="w-4 h-4" /> View Store
              </Button>
            </Link>
            <h1 className="text-xl font-bold capitalize">{activeTab} Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-white gap-2 font-bold rounded-full">
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new product here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-xs font-bold">Name</Label>
                    <Input id="name" placeholder="Product name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right text-xs font-bold">Price (৳)</Label>
                    <Input id="price" type="number" placeholder="0.00" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right text-xs font-bold">Category</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right text-xs font-bold">Image URL</Label>
                    <Input id="image" placeholder="https://..." className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary text-white font-bold w-full rounded-full">Save Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="w-10 h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center border-2 border-primary/20">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {activeTab === "dashboard" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-none bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">৳128,430</div>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +4.3% from last week
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Users className="w-4 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,420</div>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +180 since yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-none bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1">
                      Need immediate action
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart & Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 shadow-sm border-none">
                  <CardHeader>
                    <CardTitle>Sales Revenue</CardTitle>
                    <CardDescription>Visualizing performance over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-none">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest 5 transactions</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary gap-1" onClick={() => setActiveTab("orders")}>
                      View All <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Order</TableHead>
                          <TableHead className="text-xs">Total</TableHead>
                          <TableHead className="text-right text-xs">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <div className="font-bold text-sm">{order.id}</div>
                              <div className="text-[10px] text-muted-foreground">{order.customer}</div>
                            </TableCell>
                            <TableCell className="text-sm">{order.total}</TableCell>
                            <TableCell className="text-right">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <Card className="shadow-sm border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product Catalog</CardTitle>
                  <CardDescription>Manage your {products.length} products listed on the store.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-9 w-64 rounded-full" />
                  </div>
                  <Button variant="outline" className="rounded-full gap-2">
                    <Filter className="w-4 h-4" /> Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted relative overflow-hidden shrink-0">
                              <img src={product.image} alt="" className="object-cover w-full h-full" />
                            </div>
                            <div className="font-bold text-sm line-clamp-1 max-w-[200px]">{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize text-[10px]">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="font-bold text-sm text-primary">৳{product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="text-xs text-green-600 font-bold">In Stock</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card className="shadow-sm border-none">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and update the status of customer orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-bold">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="font-bold">{order.total}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          } hover:bg-transparent border-none text-[10px]`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="link" size="sm" className="text-primary font-bold">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "customers" && (
            <Card className="shadow-sm border-none">
              <CardHeader>
                <CardTitle>Customer Directory</CardTitle>
                <CardDescription>A list of all registered users on your platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentOrders.map((customer, idx) => (
                    <div key={idx} className="p-4 border rounded-2xl flex items-center gap-4 bg-white hover:border-primary transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                        {customer.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{customer.customer}</div>
                        <div className="text-xs text-muted-foreground">customer{idx + 1}@email.com</div>
                        <div className="text-[10px] mt-1 text-primary font-bold">{idx + 5} Orders placed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
}

