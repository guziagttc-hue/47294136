
import { PlaceHolderImages } from './placeholder-images';

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  rating?: number;
  reviewsCount?: number;
  brand?: string;
  sellerId: string; // Added to identify which user owns the product
  specifications: Record<string, string>;
};

export const categories = [
  { id: 'fashion', name: "Women's Fashion", shortName: "Women's", icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics', shortName: 'Electronics', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Living', shortName: 'Home', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', shortName: 'Beauty', icon: 'Sparkles' },
  { id: 'watches', name: 'Watches & Accessories', shortName: 'Watches', icon: 'Watch' },
  { id: 'groceries', name: 'Groceries', shortName: 'Groceries', icon: 'ShoppingBasket' },
  { id: 'sports', name: 'Sports & Outdoors', shortName: 'Sports', icon: 'Dribbble' },
  { id: 'kitchen', name: 'Kitchen Fittings', shortName: 'Kitchen', icon: 'Utensils' },
  { id: 'pets', name: 'Pet Supplies', shortName: 'Pet', icon: 'Dog' },
  { id: 'health', name: 'Health & Beauty', shortName: 'Health', icon: 'HeartPulse' }
];

export const products: Product[] = [
  {
    id: 'dji-neo-bumper',
    name: '【Innovative】 Gimbal Bumper for DJI Neo Guard Bar 3D Printing ABS Anti-Collision Camera Lens Protector',
    category: 'electronics',
    price: 1142,
    originalPrice: 1604,
    brand: 'No Brand',
    sellerId: 'seller123',
    image: 'https://picsum.photos/seed/dji1/600/600',
    description: '3D printed ABS engineering material molded in one piece Structure optimization, ultra-lightweight design Snap installation, no need to disassemble the fuselage screws. Does not affect the palm takeoff and landing. Easy to install, quick release design, snap-on fixation.',
    rating: 0,
    reviewsCount: 0,
    specifications: { 
      "Brand": "No Brand", 
      "SKU": "550724462_BD-2583417821", 
      "Model": "Boost", 
      "Material": "ABS Engineering Plastic",
      "Weight": "3.5g",
      "Compatible Model": "DJI Neo"
    }
  },
  {
    id: 'f1',
    name: 'Loafer for Men Rubber Shoes V Waterproofed shoe',
    category: 'fashion',
    price: 156,
    originalPrice: 588,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-loafer')?.imageUrl || '',
    description: 'Comfortable loafers for men, waterproof and stylish.',
    isFlashSale: true,
    rating: 4.2,
    reviewsCount: 45,
    specifications: { "Material": "Rubber", "Waterproof": "Yes" }
  },
  {
    id: 'f2',
    name: 'Surf Excel Liquid Top Load 1L',
    category: 'groceries',
    price: 255,
    originalPrice: 400,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-surf')?.imageUrl || '',
    description: 'Effective liquid detergent for top load washing machines.',
    isFlashSale: true,
    rating: 4.8,
    reviewsCount: 890,
    specifications: { "Volume": "1L", "Type": "Liquid" }
  },
  {
    id: 'f3',
    name: 'Buniyadi Laccha 500gm (Dalda)',
    category: 'groceries',
    price: 99,
    originalPrice: 150,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-laccha')?.imageUrl || '',
    description: 'Premium quality laccha semai for your festive moments.',
    isFlashSale: true,
    rating: 4.5,
    reviewsCount: 230,
    specifications: { "Weight": "500gm" }
  },
  {
    id: 'f4',
    name: '6 PCS COMBO SINJIN SYRUP 50 ML BOTTLE',
    category: 'health',
    price: 147,
    originalPrice: 420,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-syrup')?.imageUrl || '',
    description: 'Health syrup combo pack for daily wellness.',
    isFlashSale: true,
    rating: 4.0,
    reviewsCount: 12,
    specifications: { "Count": "6 Pcs", "Volume": "50ml each" }
  },
  {
    id: 'f5',
    name: 'Sunsilk Shampoo Lusciously Thick & Long 650ml',
    category: 'beauty',
    price: 526,
    originalPrice: 700,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-shampoo')?.imageUrl || '',
    description: 'Get thick and long hair with Sunsilk lusciously thick & long.',
    isFlashSale: true,
    rating: 4.7,
    reviewsCount: 1500,
    specifications: { "Volume": "650ml" }
  },
  {
    id: 'f6',
    name: 'Lifebuoy Handwash (Soap) Total Refill 170ml',
    category: 'beauty',
    price: 69,
    originalPrice: 90,
    sellerId: 'admin',
    image: PlaceHolderImages.find(img => img.id === 'prod-handwash')?.imageUrl || '',
    description: 'Germ protection handwash refill from Lifebuoy.',
    isFlashSale: true,
    rating: 4.9,
    reviewsCount: 3400,
    specifications: { "Volume": "170ml" }
  }
];
