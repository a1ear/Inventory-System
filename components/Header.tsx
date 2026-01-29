import React from 'react';
import { ViewType } from '../types.ts';

interface HeaderProps {
  activeView: ViewType;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onSearch }) => {
  const getTitle = () => {
    switch(activeView) {
      case 'dashboard': return 'Dashboard Overview';
      case 'products': return 'Manage Inventory';
      case 'product-detail': return 'Product Details';
      case 'categories': return 'Categories';
      case 'reports': return 'Inventory Reports';
      case 'suppliers': return 'Supply Chain';
      case 'settings': return 'System Settings';
      default: return 'Overview';
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{getTitle()}</h2>
        <div className="relative w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400" 
            placeholder="Search inventory, SKUs, or orders..." 
            type="text"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
          Last updated: 2 mins ago
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-all">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
  );
};

export default Header;