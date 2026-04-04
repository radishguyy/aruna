"use client";
import React from 'react';
import { BarChart3, Users, Globe, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  return (
    <div className="font-sans text-gray-100 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative z-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">Platform Analytics</h1>
          <p className="text-gray-400 text-[15px] font-medium tracking-wide">Global metric overview & system health parameters.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/5 px-6 py-3 rounded-[1rem] text-[13px] font-bold border border-white/10 shadow-lg shadow-black/20 backdrop-blur-md flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Live Last 30 Days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '842', change: '+18%', icon: <Users className="w-5 h-5 text-red-400" /> },
          { label: 'Active Children', value: '342', change: '+24%', icon: <TrendingUp className="w-5 h-5 text-indigo-400" /> },
          { label: 'Institutions', value: '12', change: '+2', icon: <Globe className="w-5 h-5 text-emerald-400" /> },
          { label: 'Modules Completed', value: '1,482', change: '+32%', icon: <BarChart3 className="w-5 h-5 text-amber-400" /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-black/20 hover:border-white/10 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4 group-hover:bg-white/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                {stat.icon}
              </div>
              <div className="flex items-center text-[11px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">{stat.label}</div>
              <div className="text-4xl font-black text-white tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg"><BarChart3 className="w-5 h-5 text-red-500" /></div> Tracker Pertumbuhan
          </h2>
          <div className="h-64 flex items-end gap-3 px-2">
            {[140, 180, 165, 210, 245, 302, 342].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(h/400)*100}%` }}
                  transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                  className="w-full bg-gradient-to-t from-red-500/10 to-red-500/40 border-t-[3px] border-red-500 rounded-t-xl relative group shadow-[0_-5px_20px_rgba(239,68,68,0.2)]"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl scale-90 group-hover:scale-100 origin-bottom pointer-events-none">
                    {h}
                  </div>
                </motion.div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">W{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A101C]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-black/20">
          <h2 className="text-xl font-bold mb-8">Kategori Terpopuler</h2>
          <div className="space-y-8">
            {[
              { label: 'Batasan Diri', percentage: 75, color: 'from-red-600 to-red-400', shadow: 'shadow-red-500/50' },
              { label: 'Mengenal Tubuh', percentage: 60, color: 'from-indigo-600 to-indigo-400', shadow: 'shadow-indigo-500/50' },
              { label: 'Situasi Berbahaya', percentage: 45, color: 'from-amber-600 to-amber-400', shadow: 'shadow-amber-500/50' },
            ].map((cat, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.15em]">
                  <span className="text-gray-400">{cat.label}</span>
                  <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">{cat.percentage}%</span>
                </div>
                <div className="h-3.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
