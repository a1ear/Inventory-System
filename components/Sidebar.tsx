import React from 'react';
import { ViewType } from '../types.ts';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'products', label: 'Products', icon: 'package_2' },
    { id: 'categories', label: 'Categories', icon: 'category' },
    { id: 'reports', label: 'Reports', icon: 'bar_chart' },
    { id: 'suppliers', label: 'Suppliers', icon: 'local_shipping' },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-slate-200 bg-white z-20 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg text-white">
          <span className="material-symbols-outlined block">inventory_2</span>
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight leading-none text-slate-900">StockFlow</h1>
          <p className="text-xs text-slate-500">Inventory Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ViewType)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeView === item.id 
                ? 'bg-primary text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${activeView === item.id ? 'material-symbols-fill' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-4">
        <button 
          onClick={() => setActiveView('products')}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span className="text-sm">Quick Add</span>
        </button>
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setActiveView('settings')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              activeView === 'settings' ? 'text-primary bg-primary/10' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-slate-100 pt-4">
            <div 
              className="size-9 rounded-full bg-cover bg-center border-2 border-primary/20" 
              style={{ backgroundImage: `url('https://picsum.photos/seed/alex/100/100')` }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">Alex Morgan</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Admin</span>
            </div>
            <button className="ml-auto text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;