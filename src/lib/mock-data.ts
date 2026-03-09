
import { PlaceHolderImages } from './placeholder-images';

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
  specifications: Record<string, string>;
};

export const categories = [
  { id: 'fashion', name: "Women's Fashion", icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Living', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'watches', name: 'Watches & Accessories', icon: 'Watch' },
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingBasket' },
  { id: 'sports', name: 'Sports & Outdoors', icon: 'Dribbble' },
  { id: 'kitchen', name: 'Kitchen Fittings', icon: 'Utensils' },
  { id: 'pets', name: 'Pet Supplies', icon: 'Dog' },
  { id: 'health', name: 'Health & Beauty', icon: 'HeartPulse' }
];

export const products: Product[] = [
  // New DJI Product requested
  {
    id: 'dji-neo-bumper',
    name: '【Innovative】 Gimbal Bumper for DJI Neo Guard Bar 3D Printing ABS Anti-Collision Camera Lens Protector',
    category: 'electronics',
    price: 1142,
    originalPrice: 1604,
    brand: 'No Brand',
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
  // Flash Sale Items
  {
    id: 'f1',
    name: 'Loafer for Men Rubber Shoes V Waterproofed shoe',
    category: 'fashion',
    price: 156,
    originalPrice: 588,
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
    image: PlaceHolderImages.find(img => img.id === 'prod-handwash')?.imageUrl || '',
    description: 'Germ protection handwash refill from Lifebuoy.',
    isFlashSale: true,
    rating: 4.9,
    reviewsCount: 3400,
    specifications: { "Volume": "170ml" }
  },
  // Just For You Items
  {
    id: 'j1',
    name: 'Portable Mini Rechargeable Travel Fan 3 Gear Speed',
    category: 'electronics',
    price: 288,
    originalPrice: 1300,
    image: PlaceHolderImages.find(img => img.id === 'prod-fan')?.imageUrl || '',
    description: 'Compact and powerful travel fan with 3 speed modes.',
    rating: 4.8,
    reviewsCount: 2,
    specifications: { "Battery": "Rechargeable", "Speeds": "3" }
  },
  {
    id: 'j2',
    name: 'New designed Gown 1 piece long kurti For Women',
    category: 'fashion',
    price: 420,
    originalPrice: 1200,
    image: PlaceHolderImages.find(img => img.id === 'prod-gown')?.imageUrl || '',
    description: 'Elegant long kurti gown for stylish women.',
    rating: 4.5,
    reviewsCount: 141,
    specifications: { "Fabric": "Cotton", "Style": "Gown" }
  },
  {
    id: 'j3',
    name: '18 Colors Eyeshadow Palette Glitter Makeup Matte',
    category: 'beauty',
    price: 180,
    originalPrice: 500,
    image: PlaceHolderImages.find(img => img.id === 'prod-makeup')?.imageUrl || '',
    description: 'Professional makeup palette with 18 vibrant colors.',
    rating: 4.9,
    reviewsCount: 359,
    specifications: { "Colors": "18", "Finish": "Matte & Glitter" }
  }
];
