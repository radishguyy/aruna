import React from 'react';
import { Shield, Users, BookOpen, Settings, LogOut, LayoutDashboard, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { url: pathname } = usePage();

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-slate-900 text-slate-300 fixed inset-y-0 left-0 z-50">
        <div className="flex flex-col h-full relative">
          <div className="p-8 flex justify-center border-b border-slate-800 items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-xl shadow-lg">
               <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">Admin<span className="text-orange-500 font-normal">Hub</span></span>
          </div>
          
          <nav className="flex-1 space-y-2 p-6 overflow-y-auto">
            <Link href="/admin" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname === '/admin' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Overview</span>
            </Link>
            <Link href="/admin/users" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/users') ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Users className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Kelola Pengguna</span>
            </Link>
            <Link href="/admin/cms" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/cms') ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <BookOpen className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Kelola CMS/Blog</span>
            </Link>
            <Link href="/admin/settings" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/settings') ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Settings className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Pengaturan</span>
            </Link>
            <Link href="/admin/profile" className={`flex items-center gap-4 p-4 rounded-xl transition-all font-bold ${pathname.includes('/profile') ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <User className="w-5 h-5" />
              <span className="text-[15px] tracking-wide">Profil</span>
            </Link>
          </nav>
          
          <div className="p-6 border-t border-slate-800 flex flex-col gap-4">
            <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-slate-400 hover:bg-red-900/30 hover:text-red-400 group text-left">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[15px] tracking-wide">Keluar Log</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-72 relative min-h-screen w-full">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-slate-900 text-slate-300 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
             <Shield className="w-6 h-6 text-orange-500" />
             <span>AdminHub</span>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-grow w-full max-w-5xl mx-auto md:p-8">
          <div className="md:bg-white md:rounded-[2.5rem] md:shadow-xl md:border border-slate-200 min-h-full pb-32 md:pb-12 relative md:overflow-hidden">
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
      </main>
    </div>
  );
}
