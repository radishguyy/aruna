"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Layers, Activity, LogOut, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#070B14] text-white font-sans overflow-hidden pattern-dots pattern-gray-900 pattern-bg-transparent pattern-opacity-40 pattern-size-4">
      
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-[#0A101C]/80 backdrop-blur-2xl border-r border-gray-800/50 flex flex-col hidden md:flex flex-shrink-0 relative z-20">
        <div className="p-8 border-b border-gray-800/50 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 shadow-inner">
            <Shield className="text-red-400 w-7 h-7" />
          </div>
          <div>
            <div className="font-black text-white text-xl tracking-wider">Aruna<span className="text-red-500">Admin</span></div>
            <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-0.5">SUPERUSER CONTROL</div>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
           <Link href="/admin" className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all font-bold group relative overflow-hidden ${pathname === '/admin' ? 'text-white bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               {pathname === '/admin' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
               <Activity className={`w-5 h-5 ${pathname === '/admin' ? 'text-red-400' : 'group-hover:text-red-400'} transition-colors`} /> Analytics
           </Link>
           <Link href="/admin/cms" className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all font-bold group relative overflow-hidden ${pathname.includes('/cms') ? 'text-white bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               {pathname.includes('/cms') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
               <Layers className={`w-5 h-5 ${pathname.includes('/cms') ? 'text-red-400' : 'group-hover:text-red-400'} transition-colors`} /> Content CMS
           </Link>
           <Link href="/admin/users" className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all font-bold group relative overflow-hidden ${pathname.includes('/users') ? 'text-white bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               {pathname.includes('/users') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
               <Users className={`w-5 h-5 ${pathname.includes('/users') ? 'text-red-400' : 'group-hover:text-red-400'} transition-colors`} /> User Audit
           </Link>
           <Link href="/admin/profile" className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all font-bold group relative overflow-hidden ${pathname.includes('/profile') ? 'text-white bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               {pathname.includes('/profile') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
               <User className={`w-5 h-5 ${pathname.includes('/profile') ? 'text-red-400' : 'group-hover:text-red-400'} transition-colors`} /> Profile
           </Link>
           <Link href="/admin/settings" className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all font-bold group relative overflow-hidden ${pathname.includes('/settings') ? 'text-white bg-white/5 border border-white/10 shadow-lg shadow-black/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               {pathname.includes('/settings') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>}
               <Settings className={`w-5 h-5 ${pathname.includes('/settings') ? 'text-red-400' : 'group-hover:text-red-400'} transition-colors`} /> Settings
           </Link>
        </div>

        <div className="p-6 border-t border-gray-800/50">
           <Link href="/" className="flex items-center justify-center gap-3 p-4 rounded-xl text-gray-400 hover:text-white bg-gray-900 border border-gray-800 hover:bg-gray-800 transition font-bold group">
               <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Safe Exit
           </Link>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-5 bg-[#0A101C]/90 backdrop-blur-md border-b border-gray-800/50 absolute top-0 w-full z-30">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
             <Shield className="text-red-400 w-5 h-5" />
          </div>
          <span className="font-black text-white tracking-widest uppercase text-sm">Aruna<span className="text-red-500">Admin</span></span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full pt-20 md:pt-0 relative z-10">
        {/* Glow backdrop */}
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 mix-blend-screen blur-[120px] pointer-events-none"></div>
        <AnimatePresence mode="wait">
          <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="p-6 md:p-12">
               {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 bg-[#0A101C]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl flex justify-around p-2 z-50 shadow-2xl shadow-black/50">
        <Link href="/admin" className={`p-3 rounded-xl transition ${pathname === '/admin' ? 'bg-white/10 text-red-400' : 'text-gray-500'}`}><Activity className="w-5 h-5" /></Link>
        <Link href="/admin/cms" className={`p-3 rounded-xl transition ${pathname.includes('/cms') ? 'bg-white/10 text-red-400' : 'text-gray-500'}`}><Layers className="w-5 h-5" /></Link>
        <Link href="/admin/users" className={`p-3 rounded-xl transition ${pathname.includes('/users') ? 'bg-white/10 text-red-400' : 'text-gray-500'}`}><Users className="w-5 h-5" /></Link>
        <Link href="/admin/profile" className={`p-3 rounded-xl transition ${pathname.includes('/profile') ? 'bg-white/10 text-red-400' : 'text-gray-500'}`}><User className="w-5 h-5" /></Link>
      </div>

    </div>
  );
}
