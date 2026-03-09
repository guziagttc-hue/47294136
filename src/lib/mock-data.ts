
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
  { id: 'watches', name: 'Watches & Accessories', icon: 'Watch' },
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingBasket' },
  { id: 'sports', name: 'Sports & Outdoors', icon: 'Dribbble' },
  { id: 'kitchen', name: 'Kitchen Fittings', icon: 'Utensils' },
  { id: 'pets', name: 'Pet Supplies', icon: 'Dog' },
  { id: 'health', name: 'Health & Beauty', icon: 'HeartPulse' }
];

export const products: Product[] = [
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
  },
  {
    id: 'j4',
    name: 'Bamboo Stakes 10 Pcs for gardening (2 Ft Long)',
    category: 'home',
    price: 77,
    originalPrice: 140,
    image: PlaceHolderImages.find(img => img.id === 'prod-stak')?.imageUrl || '',
    description: 'Durable bamboo stakes for plant support in gardens.',
    rating: 4.4,
    reviewsCount: 11,
    specifications: { "Count": "10 Pcs", "Length": "2 Ft" }
  },
  {
    id: 'j5',
    name: 'Lanbena Teeth Whitening Essence - 10ml',
    category: 'beauty',
    price: 161,
    originalPrice: 550,
    image: PlaceHolderImages.find(img => img.id === 'prod-teeth')?.imageUrl || '',
    description: 'Effective teeth whitening essence for a brighter smile.',
    rating: 4.6,
    reviewsCount: 700,
    specifications: { "Volume": "10ml" }
  },
  {
    id: 'j6',
    name: 'Japan Anime Full Sleeve Jersey 2025/26 Thai Premium',
    category: 'sports',
    price: 351,
    originalPrice: 370,
    image: PlaceHolderImages.find(img => img.id === 'prod-jersey')?.imageUrl || '',
    description: 'Premium quality football jersey with anime theme.',
    rating: 4.3,
    reviewsCount: 40,
    specifications: { "Type": "Full Sleeve", "Quality": "Thai Premium" }
  },
  {
    id: 'j7',
    name: 'Apple Logo Label Sticker Badge Silver chrome',
    category: 'electronics',
    price: 65,
    originalPrice: 250,
    image: PlaceHolderImages.find(img => img.id === 'prod-sticker')?.imageUrl || '',
    description: 'Stylish chrome decal for your tech devices.',
    rating: 4.7,
    reviewsCount: 27,
    specifications: { "Color": "Silver Chrome", "Material": "Metal Decal" }
  },
  {
    id: 'j8',
    name: 'Pet Home/House For Dog Cat Rabbit',
    category: 'pets',
    price: 590,
    originalPrice: 900,
    image: PlaceHolderImages.find(img => img.id === 'prod-pethouse')?.imageUrl || '',
    description: 'Comfortable indoor house for your small pets.',
    rating: 4.5,
    reviewsCount: 117,
    specifications: { "Material": "Soft Fabric", "Size": "Small/Medium" }
  }
];
