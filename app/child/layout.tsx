"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Award, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F4F7FD] font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-50">
        <div className="flex flex-col h-full bg-white relative">
          <div className="p-8 flex justify-center border-b border-gray-100">
            <span className="text-3xl font-black text-orange-500 font-grandstander tracking-widest">ARUNA</span>
          </div>
          
          <nav className="flex-1 space-y-3 p-6 overflow-y-auto">
            <Link href="/child" className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${pathname === '/child' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105' : 'text-gray-400 hover:bg-orange-50 hover:text-orange-500'}`}>
              <Home className="w-6 h-6" />
              <span className="text-base tracking-wide">Beranda</span>
            </Link>
            <Link href="/child/hall-of-fame" className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${pathname.includes('hall-of-fame') ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105' : 'text-gray-400 hover:bg-orange-50 hover:text-orange-500'}`}>
              <Award className="w-6 h-6" />
              <span className="text-base tracking-wide">Lencana</span>
            </Link>
          </nav>
          
          <div className="p-6 border-t border-gray-100">
            <Link href="/parent" className="flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-gray-400 hover:bg-indigo-50 hover:text-indigo-600">
              <User className="w-6 h-6" />
              <span className="text-base tracking-wide">Ruang Orang Tua</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-72 relative min-h-screen w-full">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-white p-4 flex justify-center border-b border-gray-100 sticky top-0 z-40 shadow-sm">
          <span className="text-2xl font-black text-orange-500 font-grandstander tracking-widest">ARUNA</span>
        </div>

        {/* Content Wrapper */}
        <div className="flex-grow w-full max-w-6xl mx-auto md:p-8">
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
            <Link href="/child" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname === '/child' ? 'text-white bg-orange-500 shadow-md' : 'text-gray-400 hover:text-orange-500'}`}>
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-bold">Beranda</span>
            </Link>
            <Link href="/child/hall-of-fame" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all ${pathname.includes('hall-of-fame') ? 'text-white bg-orange-500 shadow-md' : 'text-gray-400 hover:text-orange-500'}`}>
              <Award className="w-6 h-6" />
              <span className="text-[10px] font-bold">Lencana</span>
            </Link>
            <Link href="/parent" className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all text-gray-400 hover:text-indigo-600`}>
              <User className="w-6 h-6" />
              <span className="text-[10px] font-bold">Parent</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
