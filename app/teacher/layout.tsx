"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Building, BookOpen, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Shield className="text-[#006A50] w-8 h-8" />
          <div>
            <div className="font-serif font-black text-[#006A50] leading-none text-xl">ARUNA</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#DD6B66]">Edukator</div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-2">
           <Link href="/teacher" className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${pathname === '/teacher' ? 'bg-[#006A50] text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-[#006A50]'}`}>
               <LayoutDashboard className="w-5 h-5" /> Overview
           </Link>
           <Link href="/teacher/students" className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${pathname.includes('/students') ? 'bg-[#006A50] text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-[#006A50]'}`}>
               <Users className="w-5 h-5" /> Kelola Murid
           </Link>
           <Link href="/teacher/resources" className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${pathname.includes('/resources') ? 'bg-[#006A50] text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-[#006A50]'}`}>
               <BookOpen className="w-5 h-5" /> Materi Ajar
           </Link>
           <Link href="/teacher/license" className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${pathname.includes('/license') ? 'bg-[#006A50] text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-[#006A50]'}`}>
               <Building className="w-5 h-5" /> Info Instansi
           </Link>
        </div>

        <div className="p-4 border-t border-gray-100">
           <Link href="/" className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition font-bold">
               <LogOut className="w-5 h-5" /> Keluar
           </Link>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 absolute top-0 w-full z-10">
        <div className="flex items-center gap-2">
          <Shield className="text-[#006A50] w-6 h-6" />
          <span className="font-serif font-black text-[#006A50]">ARUNA Edukator</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div key={pathname} initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50">
        <Link href="/teacher" className={`p-2 ${pathname === '/teacher' ? 'text-[#006A50]' : 'text-gray-400'}`}><LayoutDashboard className="w-6 h-6" /></Link>
        <Link href="/teacher/students" className={`p-2 ${pathname.includes('/students') ? 'text-[#006A50]' : 'text-gray-400'}`}><Users className="w-6 h-6" /></Link>
        <Link href="/teacher/resources" className={`p-2 ${pathname.includes('/resources') ? 'text-[#006A50]' : 'text-gray-400'}`}><BookOpen className="w-6 h-6" /></Link>
        <Link href="/teacher/license" className={`p-2 ${pathname.includes('/license') ? 'text-[#006A50]' : 'text-gray-400'}`}><Building className="w-6 h-6" /></Link>
      </div>

    </div>
  );
}
