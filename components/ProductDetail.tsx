import React from 'react';
import { Product, ViewType } from '../types.ts';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onDelete: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onDelete }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="text-slate-500 text-sm hover:text-primary font-bold">Inventory</button>
        <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
        <span className="text-slate-900 text-sm font-extrabold">{product.name}</span>
      </nav>

      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{product.name}</h1>
            <span className={`px-3 py-1 ${
              product.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            } text-xs font-bold rounded-full uppercase tracking-wider`}>
              {product.status}
            </span>
          </div>
          <p className="text-slate-500 font-medium">SKU: {product.sku} • Last updated {product.lastUpdated}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-red-500 font-bold rounded-lg hover:bg-red-50 transition-all shadow-sm"
            onClick={onDelete}
          >
            <span className="material-symbols-outlined text-xl">delete</span>
            Delete Record
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl">edit</span>
            Edit Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6 text-center">
            <img src={product.images[0]} className="max-h-[400px] mx-auto rounded-lg object-contain" alt="" />
          </section>

          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Product Overview</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
             <div>
               <p className="text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-2">Live Inventory</p>
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-extrabold text-slate-900">{product.stock}</span>
                 <span className="text-slate-500 font-bold uppercase text-xs">units available</span>
               </div>
             </div>
             <div className="h-px bg-slate-100"></div>
             <div>
               <p className="text-slate-400 text-xs font-extrabold uppercase tracking-wider mb-2">Unit Price</p>
               <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
               </div>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
               <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Metadata</span>
             </div>
             <div className="divide-y divide-slate-100">
                <div className="p-4 flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Category</span>
                  <span className="text-slate-900 font-bold">{product.category}</span>
                </div>
                <div className="p-4 flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Brand</span>
                  <span className="text-slate-900 font-bold">{product.brand}</span>
                </div>
                <div className="p-4 flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Weight</span>
                  <span className="text-slate-900 font-bold">{product.weight}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;