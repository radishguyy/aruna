"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, LineChart, CreditCard, LogOut, LayoutDashboard, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F4F7FD] font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-50">
        <div className="flex flex-col h-full bg-white relative">
          <div className="p-8 flex justify-center border-b border-gray-100 items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
               <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black text-indigo-900 tracking-tight">Parent<span className="text-indigo-500 font-normal">Hub</span></span>
          </div>
          
          <nav className="flex-1 space-y-2 p-6 overflow-y-auto">
            <Link href="/parent" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname === '/parent' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Overview</span>
            </Link>
            <Link href="/parent/children" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/children') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <Users className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Profil Anak</span>
            </Link>
            <Link href="/parent/reports" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/reports') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <LineChart className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Rapor Belajar</span>
            </Link>
            <Link href="/parent/billing" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/billing') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <CreditCard className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Langganan</span>
            </Link>
            <Link href="/parent/profile" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/profile') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <User className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Profil Anda</span>
            </Link>
          </nav>
          
          <div className="p-6 border-t border-gray-100 flex flex-col gap-4">
            <Link href="/child" className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200">
              <span className="text-[14px]">Tampilan Edukasi</span> <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-gray-400 hover:bg-red-50 hover:text-red-600 group">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[15px] tracking-wide">Keluar Log</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-72 relative min-h-screen w-full">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xl">
             <Shield className="w-6 h-6 text-indigo-600" />
             <span>ParentHub</span>
          </div>
          <Link href="/child" className="text-xs bg-orange-50 text-orange-700 font-bold px-4 py-2 rounded-full border border-orange-200">
             Mode Anak
          </Link>
        </div>

        {/* Content Wrapper */}
        <div className="flex-grow w-full max-w-5xl mx-auto md:p-8">
          <div className="md:bg-white md:rounded-[2.5rem] md:shadow-xl md:border border-gray-100 min-h-full pb-32 md:pb-12 relative md:overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Navigation Component */}
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex justify-between items-center border border-gray-100"
          >
            <Link href="/parent" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname === '/parent' ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-indigo-500'}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-bold">Ringkasan</span>
            </Link>
            <Link href="/parent/children" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname.includes('children') ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-indigo-500'}`}>
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-bold">Anak</span>
            </Link>
            <Link href="/parent/reports" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname.includes('reports') ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-indigo-500'}`}>
              <LineChart className="w-5 h-5" />
              <span className="text-[10px] font-bold">Rapor</span>
            </Link>
            <Link href="/parent/billing" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname.includes('billing') ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-indigo-500'}`}>
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-bold">Billing</span>
            </Link>
            <Link href="/parent/profile" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname.includes('profile') ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-indigo-500'}`}>
              <User className="w-5 h-5" />
              <span className="text-[10px] font-bold">Profil</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
