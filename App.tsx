import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import ProductList from './components/ProductList.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import AddProductDrawer from './components/AddProductDrawer.tsx';
import { db } from './services/db.ts';
import { Product, ViewType } from './types.ts';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await db.getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await db.deleteProduct(id);
    await fetchProducts();
    if (selectedProduct?.id === id) {
      setActiveView('products');
      setSelectedProduct(null);
    }
  };

  const handleAdd = async (newProduct: Product) => {
    await db.saveProduct(newProduct);
    await fetchProducts();
    setIsDrawerOpen(false);
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} onSearch={setSearchTerm}>
      <div className="h-full relative">
        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            <p className="mt-4 text-slate-500 font-medium">Synchronizing records...</p>
          </div>
        ) : (
          <>
            {activeView === 'dashboard' && <Dashboard products={products} />}
            {activeView === 'products' && (
              <ProductList 
                products={filteredProducts} 
                onSelectProduct={handleSelectProduct} 
                onAddProduct={() => setIsDrawerOpen(true)}
                onDeleteProduct={handleDelete}
              />
            )}
            {activeView === 'product-detail' && selectedProduct && (
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => setActiveView('products')} 
                onDelete={() => handleDelete(selectedProduct.id)}
              />
            )}
            {['categories', 'reports', 'suppliers', 'settings'].includes(activeView) && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
                <h3 className="text-xl font-bold text-slate-900">Module Under Integration</h3>
                <p className="max-w-xs text-center mt-2">The {activeView} module is being connected to the new HelioHost database engine.</p>
                <button 
                  onClick={() => setActiveView('dashboard')}
                  className="mt-6 px-4 py-2 bg-primary text-white rounded-lg font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AddProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onAdd={handleAdd}
      />
    </Layout>
  );
};

export default App;