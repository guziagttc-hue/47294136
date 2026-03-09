
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
  specifications: Record<string, string>;
};

export const categories = [
  { id: 'fashion', name: "Women's Fashion", icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Living', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'watches', name: 'Watches', icon: 'Watch' },
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingBasket' },
  { id: 'sports', name: 'Sports', icon: 'Dribbble' },
  { id: 'toys', name: 'Toys', icon: 'Gamepad2' }
];

export const products: Product[] = [
  {
    id: 'f1',
    name: 'Portable Mini Rechargeable Travel Fan 3 Gear Speed',
    category: 'electronics',
    price: 288,
    originalPrice: 1200,
    image: PlaceHolderImages.find(img => img.id === 'prod-fan')?.imageUrl || '',
    description: 'Mini Fan Body, USB Charging, Perfect for Outdoor & Indoor Use.',
    isFlashSale: true,
    rating: 4.8,
    reviewsCount: 2,
    specifications: { "Power": "USB Rechargeable", "Speed": "3 Gears", "Material": "ABS" }
  },
  {
    id: 'f2',
    name: 'New Designed Gown 1 Piece Long Kurti For Women',
    category: 'fashion',
    price: 420,
    originalPrice: 1200,
    image: PlaceHolderImages.find(img => img.id === 'prod-gown')?.imageUrl || '',
    description: 'Elegant gown long kurti for stylish women and girls.',
    isFlashSale: true,
    rating: 4.5,
    reviewsCount: 141,
    specifications: { "Fabric": "Cotton Blend", "Length": "Long", "Type": "1 Piece" }
  },
  {
    id: 'f3',
    name: '18 Colors Eyeshadow Palette Glitter Makeup Matte',
    category: 'beauty',
    price: 180,
    originalPrice: 500,
    image: PlaceHolderImages.find(img => img.id === 'prod-makeup')?.imageUrl || '',
    description: 'Professional 18 colors palette for stunning eye makeup.',
    isFlashSale: true,
    rating: 4.9,
    reviewsCount: 359,
    specifications: { "Colors": "18", "Finish": "Matte & Glitter" }
  },
  {
    id: '1',
    name: 'iPhone 15 Pro Max - Titanium Case',
    category: 'electronics',
    price: 154999,
    originalPrice: 164999,
    image: PlaceHolderImages.find(img => img.id === 'prod-iphone')?.imageUrl || '',
    description: 'The ultimate iPhone with titanium design and A17 Pro chip.',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 48,
    specifications: { "Display": "6.7-inch", "Chip": "A17 Pro", "Weight": "221g" }
  },
  {
    id: 'c1',
    name: '33W Fast Type-C Charger for Xiaomi, Vivo, Samsung',
    category: 'electronics',
    price: 358,
    originalPrice: 1350,
    image: PlaceHolderImages.find(img => img.id === 'prod-charger')?.imageUrl || '',
    description: 'High speed 33W wall charger with Type-C output.',
    rating: 4.4,
    reviewsCount: 232,
    specifications: { "Output": "33W", "Connector": "Type-C" }
  },
  {
    id: 'w1',
    name: 'Smart Watch Series 8 Ultra - 2024 Model',
    category: 'watches',
    price: 1250,
    originalPrice: 3500,
    image: PlaceHolderImages.find(img => img.id === 'prod-watch')?.imageUrl || '',
    description: 'Advanced health tracking and notification system.',
    rating: 4.2,
    reviewsCount: 85,
    specifications: { "Display": "OLED", "Connectivity": "Bluetooth" }
  }
];
