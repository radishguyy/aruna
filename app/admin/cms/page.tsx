"use client";
import React from 'react';
import { Plus, Edit2, Search, Trash2, Filter, Layers, Database } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function AdminCMSPage() {
  const categories = mockData.module_categories;
  const modules = mockData.modules;

  return (
    <div className="font-sans text-gray-100 flex flex-col gap-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0A101C]/80 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-xl shadow-black/20 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20"><Database className="w-6 h-6 text-red-500" /></div> Content CMS
          </h1>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Manage Modules & Categories</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="w-full md:w-auto bg-red-600 text-white px-6 py-3.5 rounded-[1.2rem] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-red-500 transition shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add Module
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <div className="flex-1 bg-[#0A101C]/80 backdrop-blur-md border border-white/5 rounded-[1.2rem] px-5 py-4 flex items-center gap-3 shadow-inner group focus-within:border-white/20 transition-all">
          <Search className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
          <input type="text" placeholder="Search modules via titles or unique IDs..." className="bg-transparent border-none text-white text-[15px] focus:outline-none w-full placeholder:text-gray-600" />
        </div>
        <button className="bg-[#0A101C] border border-white/5 px-5 py-4 rounded-[1.2rem] text-gray-400 hover:text-white hover:bg-white/5 shadow-xl transition flex items-center justify-center">
           <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Modules List */}
        <div className="lg:col-span-8 space-y-4">
           <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">Active Modules</h2>
           <div className="space-y-4">
             {modules.map((mod, i) => (
               <motion.div
                 key={mod.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-5 flex items-center gap-5 hover:border-red-500/30 hover:bg-white/5 transition-all group shadow-xl shadow-black/10"
               >
                 <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-2xl shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <span className="relative z-10">{mod.type === 'digvi' ? '🎥' : mod.type === 'digfo' ? '📸' : '📖'}</span>
                 </div>
                 <div className="flex-1">
                   <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">
                     {categories.find(c => c.id === mod.category_id)?.name}
                   </div>
                   <h3 className="text-white text-[16px] font-bold tracking-tight">{mod.title}</h3>
                   <div className="text-[10px] text-gray-500 font-bold uppercase mt-1 flex gap-3">
                     <span>ID: <span className="text-gray-400">{mod.id}</span></span>
                     <span>Order: <span className="text-gray-400">{mod.order}</span></span>
                   </div>
                 </div>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all px-2">
                   <button className="p-2 text-gray-400 hover:text-white bg-white/0 hover:bg-white/10 rounded-xl transition"><Edit2 className="w-4 h-4" /></button>
                   <button className="p-2 text-gray-400 hover:text-red-400 bg-white/0 hover:bg-red-500/10 rounded-xl transition"><Trash2 className="w-4 h-4" /></button>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-4 bg-[#0A101C]/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 lg:p-8 h-fit sticky top-6 shadow-2xl shadow-black/30">
           <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
             <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
               <Layers className="w-4 h-4" /> Categories
             </h2>
             <button className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:text-white hover:bg-white/10 transition">New</button>
           </div>
           
           <div className="space-y-4">
             {categories.map((cat, i) => (
               <div key={cat.id} className="flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-[1.2rem] group hover:border-white/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-sm shadow-inner group-hover:scale-105 transition-transform">📁</div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">{cat.name}</div>
                  </div>
                  <button className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-lg transition opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5" /></button>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
