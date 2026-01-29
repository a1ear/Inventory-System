import { Product } from '../types.ts';
import { MOCK_PRODUCTS } from '../constants.tsx';

// Change this to your actual HelioHost API endpoint
const API_URL = 'https://antm.helioho.st/api.php';
const DB_STORAGE_KEY = 'stockflow_local_db';

let isRemoteMode = false;

export const db = {
  getMode: () => (isRemoteMode ? 'LIVE' : 'LOCAL'),

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Backend Offline');
      const data = await response.json();
      isRemoteMode = true;
      return data;
    } catch (error) {
      console.warn('Backend unavailable, using local storage:', error);
      isRemoteMode = false;
      const local = localStorage.getItem(DB_STORAGE_KEY);
      if (!local) {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
        return MOCK_PRODUCTS;
      }
      return JSON.parse(local);
    }
  },

  async saveProduct(product: Product): Promise<Product> {
    if (isRemoteMode) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        });
        if (response.ok) return product;
      } catch (e) {
        console.error('Remote save failed:', e);
      }
    }

    // Local Fallback
    const products = JSON.parse(localStorage.getItem(DB_STORAGE_KEY) || '[]');
    const index = products.findIndex((p: Product) => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(products));
    return product;
  },

  async deleteProduct(id: string): Promise<void> {
    if (isRemoteMode) {
      try {
        await fetch(`${API_URL}?id=${id}`, { method: 'DELETE', mode: 'cors' });
      } catch (e) {
        console.error('Remote delete failed:', e);
      }
    }

    const products = JSON.parse(localStorage.getItem(DB_STORAGE_KEY) || '[]');
    const filtered = products.filter((p: Product) => p.id !== id);
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(filtered));
  }
};