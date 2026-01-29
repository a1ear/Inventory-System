import { Product, Activity } from './types.ts';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    sku: 'WH-700-BLK',
    category: 'Electronics',
    price: 299.00,
    stock: 422,
    lastUpdated: '2 hours ago',
    status: 'In Stock',
    description: 'Premium over-ear wireless headphones designed for studio-quality audio and all-day comfort. Featuring active noise cancellation (ANC), 40-hour battery life, and spatial audio support.',
    brand: 'SoundMaster',
    weight: '285g',
    leadTime: '14 Days',
    minOrderQty: 50,
    images: [
      'https://picsum.photos/seed/headphones1/800/450',
      'https://picsum.photos/seed/headphones2/400/400',
      'https://picsum.photos/seed/headphones3/400/400',
      'https://picsum.photos/seed/headphones4/400/400'
    ]
  },
  {
    id: '2',
    name: 'Mechanical RGB Keyboard',
    sku: 'EL-042',
    category: 'Electronics',
    price: 89.00,
    stock: 12,
    lastUpdated: '5 hours ago',
    status: 'Low Stock',
    description: 'Ultra-responsive mechanical switches with full RGB backlighting.',
    brand: 'LogiTech',
    weight: '1200g',
    leadTime: '7 Days',
    minOrderQty: 20,
    images: ['https://picsum.photos/seed/keyboard/800/450']
  },
  {
    id: '3',
    name: 'Pro Ergonomic Office Chair',
    sku: 'OF-99',
    category: 'Furniture',
    price: 250.00,
    stock: 45,
    lastUpdated: '1 day ago',
    status: 'In Stock',
    description: 'High-back ergonomic chair with lumbar support.',
    brand: 'Steelcase',
    weight: '15kg',
    leadTime: '21 Days',
    minOrderQty: 5,
    images: ['https://picsum.photos/seed/chair/800/450']
  },
  {
    id: '4',
    name: 'Multiport USB-C Hub',
    sku: 'ACC-12',
    category: 'Accessories',
    price: 45.00,
    stock: 0,
    lastUpdated: '3 days ago',
    status: 'Out of Stock',
    description: '7-in-1 USB-C data and charging hub.',
    brand: 'Anker',
    weight: '150g',
    leadTime: '3 Days',
    minOrderQty: 100,
    images: ['https://picsum.photos/seed/hub/800/450']
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'stock_added',
    title: 'Stock Added',
    message: '50 units of "Ergonomic Desk Chair" received from Global Logistics.',
    timestamp: '12:45 PM'
  },
  {
    id: '2',
    type: 'adjustment',
    title: 'Inventory Adjustment',
    message: 'SKU-9902 price updated to $249.99 across all regions.',
    timestamp: '10:20 AM'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Alert Triggered',
    message: '"Wireless Keyboard G-Pro" reached critical stock level (2 units).',
    timestamp: 'Yesterday'
  }
];