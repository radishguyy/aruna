import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, Sparkles } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface SmartEModulProps {
  moduleId: string | null;
  module?: any;
  onBack: () => void;
  onComplete?: (score: number) => void;
}

export default function SmartEModul({ moduleId, module: moduleProp, onBack, onComplete }: SmartEModulProps) {
  const moduleData = moduleProp || mockData.modules.find(m => m.id === moduleId);
  const [currentPage, setCurrentPage] = useState(0);

  if (!moduleData) {
    return <div>Module not found</div>;
  }

  const contentData = moduleData.content_data || {};
  const description = contentData.description || moduleData.description || '';
  const pages: { text: string; image?: string }[] = (contentData.pages && contentData.pages.length > 0)
    ? contentData.pages
    : [
        { text: description || moduleData.title, image: '/api/placeholder/400/300' }
      ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 25 : -25,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 25 : -25,
    })
  };

  // Static direction for simplicty
  const swipeDirection = 1; 

  return (
    <div className="flex flex-col h-full min-h-[80vh] bg-emerald-50/50 font-sans rounded-3xl pb-24 md:pb-0 overflow-hidden relative">
      
      {/* Decorative Book Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, #a7f3d0 31px, #a7f3d0 32px)` }}>
      </div>

      <div className="p-4 md:p-6 flex items-center justify-between z-20 sticky top-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm font-bold transition-all hover:shadow-md"
        >
          <ChevronLeft className="w-5 h-5 border-2 border-current rounded-full" />
          <span>Kembali</span>
        </button>
        <div className="font-bold text-sm tracking-wide bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full shadow-inner hidden sm:block">
          Smart E-Modul : {moduleData.title}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Title area */}
        {currentPage === 0 && (
           <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} className="text-center mb-8 px-4">
               <div className="inline-flex bg-emerald-100 p-4 rounded-3xl mb-4 shadow-sm border border-emerald-200">
                 <BookOpen className="w-10 h-10 text-emerald-500" />
               </div>
               <h1 className="text-3xl md:text-5xl font-black text-emerald-900 font-grandstander leading-tight drop-shadow-sm">{moduleData.title}</h1>
               {description && <p className="mt-3 text-emerald-600 font-bold max-w-lg mx-auto bg-white/60 px-4 py-2 rounded-xl inline-block">{description}</p>}
           </motion.div>
        )}

        {/* Story Book Container */}
        <div className="w-full max-w-2xl aspect-[4/3] relative perspective-1000 mt-4 max-h-[500px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentPage}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={swipeDirection}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 flex flex-col justify-between overflow-hidden group"
            >
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none"></div>

              {/* Page Number Badge */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-emerald-50 text-emerald-600 font-black flex items-center justify-center rounded-full text-lg shadow-inner z-10">
                {currentPage + 1}
              </div>

              {/* Graphic Placeholder */}
              <div className="w-full flex-[1.5] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-8 flex flex-col items-center justify-center text-teal-600 relative overflow-hidden border-2 border-emerald-50">
                  <Sparkles className="w-16 h-16 opacity-50 mb-2" />
                  <span className="font-grandstander font-bold tracking-wider opacity-60">Ilustrasi Halaman {currentPage + 1}</span>
              </div>

              {/* Text Focus */}
              <div className="px-4 pb-2 flex-1 flex items-center justify-center">
                <p className="text-xl md:text-3xl font-black font-grandstander text-gray-800 leading-snug text-center line-clamp-3">
                  &quot;{pages[currentPage].text}&quot;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Smart Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 rounded-full shadow-sm border border-white">
          <button 
            onClick={handlePrev} 
            disabled={currentPage === 0}
            className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-emerald-600 disabled:opacity-40 disabled:shadow-sm disabled:bg-gray-100 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 ml-[-2px]" />
          </button>
          
          <div className="font-extrabold text-emerald-800 tracking-widest text-xs md:text-sm flex gap-2 w-28 md:w-32 justify-center">
            PAGES <span className="opacity-50">•</span> {currentPage + 1} / {pages.length}
          </div>
          
          {currentPage < pages.length - 1 ? (
             <button 
               onClick={handleNext} 
               className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-emerald-600 hover:scale-110 active:scale-95 transition-all outline-none"
             >
               <ChevronRight className="w-6 h-6 md:w-8 md:h-8 mr-[-2px]" />
             </button>
          ) : (
             <button 
               onClick={() => {
                 if (onComplete) {
                   onComplete(100);
                 } else {
                   onBack();
                 }
               }} 
               className="h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 text-white font-black gap-2 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
             >
               <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> SELESAI
             </button>
          )}
        </div>

      </div>
    </div>
  );
}
