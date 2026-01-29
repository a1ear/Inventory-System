
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  brand: string;
  weight: string;
  leadTime: string;
  minOrderQty: number;
  images: string[];
}

export interface Activity {
  id: string;
  type: 'stock_added' | 'adjustment' | 'alert';
  title: string;
  message: string;
  timestamp: string;
}

export type ViewType = 'dashboard' | 'products' | 'product-detail' | 'categories' | 'reports' | 'suppliers' | 'settings';
