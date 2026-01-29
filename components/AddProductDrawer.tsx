import React, { useState } from 'react';
import { generateProductDescription } from '../services/geminiService.ts';

interface AddProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateDescription = async () => {
    if (!name || !category) {
      alert("Please provide a product name and category first.");
      return;
    }
    setIsGenerating(true);
    const aiDesc = await generateProductDescription(name, category);
    setDescription(aiDesc || '');
    setIsGenerating(false);
  };

  const handleSubmit = () => {
    onAdd({
      id: Math.random().toString(),
      name,
      sku,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      description,
      lastUpdated: 'Just now',
      status: 'In Stock',
      brand: 'New Brand',
      weight: 'N/A',
      leadTime: 'N/A',
      minOrderQty: 1,
      images: ['https://picsum.photos/seed/newproduct/800/450']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Add New Product</h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">Enter details manually or use AI generation.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Product Image</label>
            <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">cloud_upload</span>
              <p className="text-xs font-bold">Drop image or click to upload</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Product Name</label>
            <input 
              className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20" 
              placeholder="e.g. Wireless Headphones" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">SKU</label>
              <input 
                className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20" 
                placeholder="SKU-123" 
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Category</label>
              <select 
                className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Price ($)</label>
              <input 
                className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20" 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Stock</label>
              <input 
                className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20" 
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-900">Description</label>
              <button 
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="text-[10px] font-extrabold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                {isGenerating ? 'GENERATING...' : 'AI GENERATE'}
              </button>
            </div>
            <textarea 
              className="w-full rounded-lg border-slate-200 text-sm focus:border-primary focus:ring-primary/20" 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the product..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductDrawer;