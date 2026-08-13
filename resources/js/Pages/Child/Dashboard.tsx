import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ShieldAlert, Sparkles, Video, BookText, Image as ImageIcon } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import ChildLayout from '@/Layouts/ChildLayout';

interface Module {
  id: string;
  category_id: number;
  title: string;
  type: 'digfo' | 'digvi' | 'e-modul';
  user_status: 'locked' | 'started' | 'completed';
  user_score: number;
  content_data: {
    description?: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  modules: Module[];
}

interface Child {
  id: string;
  nickname: string;
  total_points: number;
}

interface Props {
  child: Child;
  categories: Category[];
}

export default function ChildDashboard({ child, categories }: Props) {
  
  // Extract all modules from all categories for flat displays
  const allModules = categories.flatMap(cat => cat.modules);
  const digfoModules = allModules.filter(m => m.type === 'digfo');
  const digviModules = allModules.filter(m => m.type === 'digvi');
  const emodulModules = allModules.filter(m => m.type === 'e-modul');

  const ModuleCard = ({ mod, icon, bgClass, borderClass, textClass, badgeClass }: {
    mod: Module;
    icon: React.ReactNode;
    bgClass: string;
    borderClass: string;
    textClass: string;
    badgeClass: string;
  }) => {
    const category = categories.find(c => c.id === mod.category_id);
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 2 }}
        onClick={() => router.get(`/child/module/${mod.id}`)}
        className={`p-5 rounded-3xl cursor-pointer border-2 border-b-8 transition-transform duration-200 flex flex-col gap-4 ${bgClass} ${borderClass} ${textClass} h-full`}
      >
        <div className="flex justify-between items-start w-full">
          <div className="bg-white p-3 rounded-2xl shadow-sm">
            {icon}
          </div>
          <div className={`text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/70 ${badgeClass}`}>
            {category?.name || "Edukasi"}
          </div>
        </div>
        
        <div className="flex-1 mt-2">
          <h3 className="text-xl font-bold leading-tight mb-2">{mod.title}</h3>
          <p className="text-sm font-sans font-medium opacity-80 leading-relaxed line-clamp-2">
            {mod.content_data.description || "Mari berpetualang dan belajar bersama hari ini!"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-75">
            Status: {mod.user_status === 'completed' ? 'Selesai' : mod.user_status === 'started' ? 'Sedang Belajar' : 'Belum Mulai'}
          </span>
          <div className="bg-white/90 text-gray-800 font-bold text-xs py-2 px-4 rounded-full flex items-center gap-2 shadow-sm font-sans">
            Mulai <Play className="w-3 h-3 fill-current" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <ChildLayout>
      <Head title="Dashboard Anak" />
      <div className="p-6 md:p-10 pt-12 pb-32 space-y-12 font-grandstander max-w-[1400px] mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 md:w-2/3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-bold uppercase tracking-widest text-orange-100 font-sans">Area Bermain & Belajar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Halo Pahlawan {child.nickname}!</h1>
            <p className="text-orange-50 md:text-lg font-medium font-sans leading-relaxed">
              Siap untuk bertualang hari ini? Pilih misi belajarmu dan kumpulkan lencana pahlawan!
            </p>
          </div>
          
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-48 md:h-48 bg-orange-300 rounded-full opacity-50 flex items-center justify-center"></div>
        </motion.div>

        {/* Gamification Bar */}
        <motion.div 
          onClick={() => router.get('/child/hall-of-fame')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-gray-100 cursor-pointer"
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-sm text-gray-500 font-sans font-bold uppercase tracking-wider mb-1">Total Poin Pahlawan</div>
              <div className="text-3xl font-black text-orange-500 flex items-center gap-3">
                <Star className="w-8 h-8 fill-orange-500" />
                {child.total_points} <span className="text-base text-gray-400 font-sans font-medium">/ 500 Poin</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center border-2 border-indigo-100">
               <Star className="w-6 h-6 fill-indigo-500" />
            </div>
          </div>
          <div className="h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((child.total_points / 500) * 100, 100)}%` }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* 1. Smart Digfo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
             <div className="bg-rose-100 p-3 rounded-2xl border-2 border-rose-200">
               <ImageIcon className="text-rose-500 w-8 h-8"/>
             </div>
             <div>
               <h2 className="text-2xl font-black text-gray-800 leading-none mb-1">Smart Digfo</h2>
               <p className="text-sm text-gray-500 font-sans font-medium">Infografis visual interaktif untuk memahami konsep dasar.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {digfoModules.map((mod) => (
              <ModuleCard 
                key={mod.id} 
                mod={mod} 
                icon={<ShieldAlert className="w-8 h-8 text-rose-500" />}
                bgClass="bg-rose-50 hover:bg-rose-100"
                borderClass="border-rose-400 border-b-rose-500"
                textClass="text-rose-900"
                badgeClass="text-rose-600"
              />
            ))}
          </div>
        </motion.div>

        {/* 2. Smart Digvi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
             <div className="bg-blue-100 p-3 rounded-2xl border-2 border-blue-200">
               <Video className="text-blue-500 w-8 h-8"/>
             </div>
             <div>
               <h2 className="text-2xl font-black text-gray-800 leading-none mb-1">Smart Digvi</h2>
               <p className="text-sm text-gray-500 font-sans font-medium">Video animasi edukatif interaktif agar belajar semakin seru.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {digviModules.map((mod) => (
              <ModuleCard 
                key={mod.id} 
                mod={mod} 
                icon={<Play className="w-8 h-8 text-blue-500 fill-blue-500" />}
                bgClass="bg-blue-50 hover:bg-blue-100"
                borderClass="border-blue-400 border-b-blue-500"
                textClass="text-blue-900"
                badgeClass="text-blue-600"
              />
            ))}
          </div>
        </motion.div>

        {/* 3. Smart E-Modul */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
             <div className="bg-emerald-100 p-3 rounded-2xl border-2 border-emerald-200">
               <BookText className="text-emerald-500 w-8 h-8"/>
             </div>
             <div>
               <h2 className="text-2xl font-black text-gray-800 leading-none mb-1">Smart E-Modul</h2>
               <p className="text-sm text-gray-500 font-sans font-medium">Materi cerita interaktif untuk anak dan panduan terstruktur.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {emodulModules.map((mod) => (
              <ModuleCard 
                key={mod.id} 
                mod={mod} 
                icon={<BookText className="w-8 h-8 text-emerald-500" />}
                bgClass="bg-emerald-50 hover:bg-emerald-100"
                borderClass="border-emerald-400 border-b-emerald-500"
                textClass="text-emerald-900"
                badgeClass="text-emerald-600"
              />
            ))}
          </div>
        </motion.div>
        
      </div>
    </ChildLayout>
  );
}
