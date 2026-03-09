
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
  specifications: Record<string, string>;
};

export const categories = [
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop' },
  { id: 'audio', name: 'Audio', icon: 'Headphones' },
  { id: 'accessories', name: 'Accessories', icon: 'Keyboard' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'smartphones',
    price: 154999,
    originalPrice: 164999,
    image: PlaceHolderImages.find(img => img.id === 'prod-iphone')?.imageUrl || '',
    description: 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.',
    isFeatured: true,
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main | Ultra Wide | Telephoto",
      "Battery": "Up to 29 hours video playback",
      "Weight": "221 grams"
    }
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    category: 'laptops',
    price: 124999,
    originalPrice: 134999,
    image: PlaceHolderImages.find(img => img.id === 'prod-macbook')?.imageUrl || '',
    description: 'Supercharged by the M3 chip, MacBook Air is surprisingly thin and incredibly fast.',
    isFeatured: true,
    specifications: {
      "Chip": "Apple M3 Chip",
      "Memory": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Display": "13.6-inch Liquid Retina",
      "Battery": "Up to 18 hours"
    }
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    category: 'audio',
    price: 34999,
    image: PlaceHolderImages.find(img => img.id === 'prod-sony')?.imageUrl || '',
    description: 'Industry-leading noise cancellation and magnificent sound quality.',
    isFeatured: true,
    specifications: {
      "Type": "Over-ear",
      "Connectivity": "Bluetooth 5.2",
      "Battery": "30 hours",
      "Weight": "250 grams"
    }
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    price: 139999,
    image: PlaceHolderImages.find(img => img.id === 'prod-samsung')?.imageUrl || '',
    description: 'The Galaxy S24 Ultra features a stunning titanium frame and epic AI capabilities.',
    isFeatured: false,
    specifications: {
      "Processor": "Snapdragon 8 Gen 3",
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Camera": "200MP Main Camera",
      "S-Pen": "Included"
    }
  },
  {
    id: '5',
    name: 'Keychron K2 V2',
    category: 'accessories',
    price: 8999,
    image: PlaceHolderImages.find(img => img.id === 'prod-keyboard')?.imageUrl || '',
    description: 'Keychron K2 is a wireless mechanical keyboard with all keys and function.',
    isFeatured: false,
    specifications: {
      "Layout": "75%",
      "Backlight": "RGB",
      "Connectivity": "Bluetooth/Wired",
      "Switches": "Gateron G Pro"
    }
  },
  {
    id: '6',
    name: 'Dell XPS 13 (2024)',
    category: 'laptops',
    price: 145999,
    image: PlaceHolderImages.find(img => img.id === 'prod-dell')?.imageUrl || '',
    description: 'The XPS 13 is our thinnest and lightest 13-inch laptop, built for a life on the go.',
    isFeatured: true,
    specifications: {
      "Processor": "Intel Core Ultra 7",
      "Memory": "16GB RAM",
      "Display": "13.4-inch FHD+",
      "OS": "Windows 11 Home"
    }
  }
];
