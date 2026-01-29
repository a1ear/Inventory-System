import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ACTIVITIES } from '../constants.tsx';
import { Product } from '../types.ts';
import { db } from '../services/db.ts';

interface DashboardProps {
  products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  const stats = React.useMemo(() => {
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.status === 'Low Stock' || (p.stock > 0 && p.stock < 20)).length;
    const categories = new Set(products.map(p => p.category)).size;
    const warehouseValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
    
    const catMap: Record<string, number> = {};
    products.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + p.stock;
    });
    const chartData = Object.entries(catMap).map(([name, value]) => ({ name, value }));

    return { totalProducts, lowStockItems, categories, warehouseValue, chartData };
  }, [products]);

  const mode = db.getMode();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Summary</h2>
         {/* Fix: Changed 'LIVE DB' to 'LIVE' to overlap with the actual string values returned by db.getMode() */}
         <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-colors ${
           mode === 'LIVE' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-amber-50 border-amber-200 text-amber-600'
         }`}>
           {/* Fix: Changed 'LIVE DB' to 'LIVE' to fix comparison error with incompatible types */}
           <span className={`size-2 rounded-full ${mode === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
           {mode === 'LIVE' ? 'LIVE DB' : mode}
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">inventory</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">Total Products</p>
          <h3 className="text-2xl font-extrabold mt-1 text-slate-900">{stats.totalProducts}</h3>
        </div>

        <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow border-l-4 ${stats.lowStockItems > 0 ? 'border-l-red-500' : 'border-l-green-500'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 ${stats.lowStockItems > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} rounded-lg`}>
              <span className="material-symbols-outlined">{stats.lowStockItems > 0 ? 'warning' : 'check_circle'}</span>
            </div>
            {stats.lowStockItems > 0 && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Action Needed</span>}
          </div>
          <p className="text-sm font-medium text-slate-500">Low Stock Items</p>
          <h3 className={`text-2xl font-extrabold mt-1 ${stats.lowStockItems > 0 ? 'text-red-600' : 'text-slate-900'}`}>{stats.lowStockItems}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <span className="material-symbols-outlined">category</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">Categories</p>
          <h3 className="text-2xl font-extrabold mt-1 text-slate-900">{stats.categories}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">Warehouse Value</p>
          <h3 className="text-2xl font-extrabold mt-1 text-slate-900">${stats.warehouseValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Stock Distribution</h4>
              <p className="text-sm text-slate-500">Items per category from database</p>
            </div>
          </div>
          
          <div className="flex-1 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#137fec" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-slate-900">System Logs</h4>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
            {MOCK_ACTIVITIES.map((activity, idx) => (
              <div key={activity.id} className="flex gap-4 relative">
                {idx < MOCK_ACTIVITIES.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-slate-100"></div>
                )}
                <div className={`size-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  activity.type === 'stock_added' ? 'bg-green-100 text-green-600' :
                  activity.type === 'adjustment' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {activity.type === 'stock_added' ? 'add' : activity.type === 'adjustment' ? 'edit' : 'warning'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{activity.message}</p>
                  <span className="text-[10px] text-slate-400 font-bold uppercase mt-2 block">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;