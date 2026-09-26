import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, ShieldAlert, Sparkles, Video, BookText, Image as ImageIcon, LogOut, Lock, CheckCircle2, ArrowRight, ShieldCheck, X, Box, ScanLine, Smartphone, QrCode } from 'lucide-react';
import { Link, router, Head } from '@inertiajs/react';
import ChildLayout from '@/Layouts/ChildLayout';
import Modal from '@/Components/Modal';
import { QRCodeSVG } from 'qrcode.react';

interface Module {
  id: string;
  category_id: number;
  title: string;
  type: 'digfo' | 'digvi' | 'e-modul';
  user_status: 'locked' | 'unstarted' | 'started' | 'completed';
  user_score: number;
  is_free_module?: boolean;
  is_locked?: boolean;
  content_data?: {
    description?: string;
  };
}

interface ARObject {
  id: string;
  title: string;
  description: string;
  file_path: string;
  format: string;
  formats?: string[];
  glb_path?: string | null;
  usdz_path?: string | null;
  qr_url?: string;
  is_locked?: boolean;
  is_free_module?: boolean;
  educational_content?: {
    facts?: string[];
    labels?: { name: string; description: string }[];
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
  child: Child | { data: Child };
  categories: Category[] | { data: Category[] };
  has_active_subscription?: boolean;
  free_module_id?: string;
  locked_prompt?: {
    id: string;
    title: string;
    message?: string;
  } | null;
  ar_objects?: ARObject[];
}

export default function ChildDashboard({
  child: childProp,
  categories: categoriesProp,
  has_active_subscription = false,
  free_module_id = 'm-1',
  locked_prompt,
  ar_objects = [],
}: Props) {
  const activeChild: Child = (childProp as any)?.data || childProp || { id: '', nickname: 'Cilik', total_points: 0 };
  const categoriesList: Category[] = Array.isArray(categoriesProp) ? categoriesProp : ((categoriesProp as any)?.data || []);
  
  // Extract all modules from all categories for flat displays
  const allModules: Module[] = categoriesList.flatMap((cat: Category) => cat?.modules || []);
  const digfoModules: Module[] = allModules.filter((m: Module) => m.type === 'digfo');
  const digviModules: Module[] = allModules.filter((m: Module) => m.type === 'digvi');
  const emodulModules: Module[] = allModules.filter((m: Module) => m.type === 'e-modul');

  const [selectedLockedModule, setSelectedLockedModule] = useState<Module | null>(null);
  const [selectedArForScan, setSelectedArForScan] = useState<ARObject | null>(null);
  const [qrCopied, setQrCopied] = useState(false);

  // If redirected from backend due to accessing a locked module directly, trigger the prompt
  useEffect(() => {
    if (locked_prompt) {
      const targetMod = allModules.find(m => m.id === locked_prompt.id) || {
        id: locked_prompt.id,
        category_id: 1,
        title: locked_prompt.title,
        type: 'digfo',
        user_status: 'locked',
        user_score: 0,
        is_locked: true,
      };
      setSelectedLockedModule(targetMod as Module);
    }
  }, [locked_prompt]);

  const handleModuleClick = (mod: Module) => {
    if (mod.is_locked) {
      setSelectedLockedModule(mod);
    } else {
      router.get(`/child/module/${mod.id}`);
    }
  };

  const handleArClick = (arObj: ARObject) => {
    if (arObj.is_locked) {
      setSelectedLockedModule({
        id: arObj.id,
        category_id: 1,
        title: arObj.title,
        type: 'digfo',
        user_status: 'locked',
        user_score: 0,
        is_locked: true,
        content_data: { description: arObj.description },
      } as Module);
    } else {
      router.get(`/ar/${arObj.id}/prepare`);
    }
  };

  const ModuleCard = ({ mod, icon, bgClass, borderClass, textClass, badgeClass }: {
    mod: Module;
    icon: React.ReactNode;
    bgClass: string;
    borderClass: string;
    textClass: string;
    badgeClass: string;
  }) => {
    const category = categoriesList.find((c: Category) => c.id === mod.category_id);
    const isLocked = mod.is_locked;
    const isFreeModule = mod.is_free_module || (!has_active_subscription && mod.id === free_module_id);

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 2 }}
        onClick={() => handleModuleClick(mod)}
        className={`p-5 rounded-3xl cursor-pointer border-2 border-b-8 transition-all duration-200 flex flex-col gap-4 relative overflow-hidden ${
          isLocked
            ? 'bg-slate-50/90 border-slate-200 border-b-slate-300 text-slate-700 shadow-sm opacity-90 hover:opacity-100 hover:border-orange-300 hover:border-b-orange-400'
            : `${bgClass} ${borderClass} ${textClass}`
        } h-full`}
      >
        {/* Top Badges */}
        <div className="flex justify-between items-start w-full gap-2">
          <div className="bg-white p-3 rounded-2xl shadow-sm relative">
            {icon}
            {isLocked && (
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md border-2 border-white">
                <Lock className="w-3 h-3 text-yellow-300" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {/* Visual distinction: Free vs Premium */}
            {isFreeModule && (
              <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-xs">
                <span>✓</span> Free Module
              </span>
            )}

            {isLocked && (
              <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1 shadow-xs">
                <Lock className="w-2.5 h-2.5" /> Premium Module
              </span>
            )}

            <div className={`text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/80 ${badgeClass}`}>
              {category?.name || "Edukasi"}
            </div>
          </div>
        </div>
        
        {/* Title & Desc */}
        <div className="flex-1 mt-2">
          <h3 className="text-xl font-bold leading-tight mb-2 flex items-center gap-2">
            {mod.title}
          </h3>
          <p className="text-sm font-sans font-medium opacity-80 leading-relaxed line-clamp-2">
            {mod?.content_data?.description || "Mari berpetualang dan belajar bersama hari ini!"}
          </p>
        </div>

        {/* Bottom CTA / Status */}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-black/5">
          {isLocked ? (
            <>
              <span className="text-[10px] font-bold tracking-wider uppercase text-orange-600 flex items-center gap-1 font-sans">
                <Lock className="w-3 h-3" /> Subscribe to unlock
              </span>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-sm font-sans hover:shadow">
                Buka Akses <ArrowRight className="w-3 h-3" />
              </div>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-75 font-sans">
                {mod.user_status === 'completed'
                  ? '✓ Selesai'
                  : mod.user_status === 'started'
                  ? 'Sedang Belajar'
                  : 'Tersedia'}
              </span>
              <div className="bg-white/90 text-gray-800 font-bold text-xs py-2 px-4 rounded-full flex items-center gap-2 shadow-sm font-sans hover:bg-white">
                Mulai <Play className="w-3 h-3 fill-current" />
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <ChildLayout>
      <Head title="Dashboard Anak" />
      <div className="p-6 md:p-10 pt-12 pb-32 space-y-10 font-grandstander max-w-[1400px] mx-auto">
        
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
            <h1 className="text-4xl md:text-5xl font-black mb-4">Halo Pahlawan {activeChild?.nickname || 'Cilik'}!</h1>
            <p className="text-orange-50 md:text-lg font-medium font-sans leading-relaxed">
              Siap untuk bertualang hari ini? Pilih misi belajarmu dan kumpulkan lencana pahlawan!
            </p>
          </div>
          
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="absolute top-6 right-6 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-2xl px-4 py-2 flex items-center gap-2 font-bold font-sans transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Keluar</span>
          </Link>

          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-48 md:h-48 bg-orange-300 rounded-full opacity-50 flex items-center justify-center"></div>
        </motion.div>

        {/* Subscription Recommendation Banner (Proactive Encouragement for Non-Subscribers) */}
        {!has_active_subscription && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-400/30"
          >
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-400/30 font-bold">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-yellow-300 mb-1 font-sans">
                  Akses Free Version • 1 Modul Gratis Aktif
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-2 text-white">
                  Buka Pengalaman Belajar Penuh
                </h2>
                <p className="text-indigo-100 text-sm md:text-base font-medium font-sans max-w-2xl leading-relaxed">
                  Dapatkan akses ke seluruh modul pembelajaran dan tambah profil anak tambahan dengan berlangganan Aruna.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <Link
                href="/pricing"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-sans font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
              >
                <span>Lihat Paket Langganan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        )}

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
                {activeChild?.total_points || 0} <span className="text-base text-gray-400 font-sans font-medium">/ 500 Poin</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center border-2 border-indigo-100">
               <Star className="w-6 h-6 fill-indigo-500" />
            </div>
          </div>
          <div className="h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((activeChild?.total_points || 0) / 500) * 100, 100)}%` }}
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
            {digfoModules.map((mod: Module) => (
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
            {digviModules.map((mod: Module) => (
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
            {emodulModules.map((mod: Module) => (
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

        {/* 4. Digfo AR (Augmented Reality) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
               <div className="bg-purple-100 p-3 rounded-2xl border-2 border-purple-200 shadow-xs">
                 <Box className="text-purple-600 w-8 h-8"/>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <h2 className="text-2xl font-black text-gray-800 leading-none">Digfo AR</h2>
                   <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-600 text-white shadow-xs">
                     3D & AR
                   </span>
                 </div>
                 <p className="text-sm text-gray-500 font-sans font-medium">
                   Eksplorasi objek 3D interaktif dalam dunia nyata dengan Augmented Reality di smartphone.
                 </p>
               </div>
             </div>
             
             <Link
               href="/ar"
               className="inline-flex items-center self-start sm:self-auto gap-2 text-xs font-bold font-sans text-purple-700 hover:text-purple-800 bg-purple-100/70 hover:bg-purple-100 px-4 py-2.5 rounded-2xl border border-purple-200 transition-all hover:scale-105"
             >
               <span>Buka Portal AR</span>
               <ArrowRight className="w-3.5 h-3.5" />
             </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ar_objects.map((arObj: ARObject) => {
              const isLocked = arObj.is_locked;
              const isFreeModule = arObj.is_free_module;

              return (
                <motion.div
                  key={arObj.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 2 }}
                  onClick={() => handleArClick(arObj)}
                  className={`p-5 rounded-3xl cursor-pointer border-2 border-b-8 transition-all duration-200 flex flex-col gap-4 relative overflow-hidden ${
                    isLocked
                      ? 'bg-slate-50/90 border-slate-200 border-b-slate-300 text-slate-700 shadow-sm opacity-90 hover:opacity-100 hover:border-purple-300 hover:border-b-purple-400'
                      : 'bg-purple-50 hover:bg-purple-100/90 border-purple-400 border-b-purple-500 text-purple-950'
                  } h-full`}
                >
                  {/* Top Badges */}
                  <div className="flex justify-between items-start w-full gap-2">
                    <div className="bg-white p-3 rounded-2xl shadow-sm relative">
                      <Box className="w-8 h-8 text-purple-600" />
                      {isLocked && (
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md border-2 border-white">
                          <Lock className="w-3 h-3 text-yellow-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {isFreeModule && (
                        <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-xs">
                          <span>✓</span> Free AR
                        </span>
                      )}

                      {isLocked && (
                        <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1 shadow-xs">
                          <Lock className="w-2.5 h-2.5" /> Premium AR
                        </span>
                      )}

                      <div className="text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/80 text-purple-600">
                        {arObj.formats && arObj.formats.length > 1 ? arObj.formats.map(f => f.toUpperCase()).join(' • ') : arObj.format.toUpperCase()} • 3D AR
                      </div>
                    </div>
                  </div>
                  
                  {/* Title & Desc */}
                  <div className="flex-1 mt-2">
                    <h3 className="text-xl font-bold leading-tight mb-2 flex items-center gap-2">
                      {arObj.title}
                    </h3>
                    <p className="text-sm font-sans font-medium opacity-80 leading-relaxed line-clamp-2">
                      {arObj.description || "Lihat dan tempatkan objek 3D ini di ruangan belajarmu!"}
                    </p>
                    
                    {arObj.educational_content?.facts && arObj.educational_content.facts.length > 0 && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-purple-700 bg-white/70 px-2.5 py-1 rounded-xl">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        <span>{arObj.educational_content.facts.length} Fakta Edukasi Interaktif</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom CTA / Status */}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-black/5">
                    {isLocked ? (
                      <>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-orange-600 flex items-center gap-1 font-sans">
                          <Lock className="w-3 h-3" /> Subscribe to unlock
                        </span>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-sm font-sans hover:shadow">
                          Buka Akses <ArrowRight className="w-3 h-3" />
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold tracking-wider uppercase opacity-75 font-sans">
                          Tersedia di AR
                        </span>
                        <div className="flex items-center gap-2">
                          {arObj.qr_url && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArForScan(arObj);
                              }}
                              className="bg-white/80 hover:bg-white text-purple-700 font-bold text-xs py-2 px-3 rounded-full flex items-center gap-1 shadow-sm font-sans transition-colors cursor-pointer"
                              title="Tampilkan QR Code langsung"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">QR</span>
                            </button>
                          )}
                          <div className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 px-4 rounded-full flex items-center gap-2 shadow-sm font-sans transition-colors">
                            Mulai AR <ScanLine className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {ar_objects.length === 0 && (
              <div className="col-span-full p-8 rounded-3xl bg-purple-50/50 border-2 border-dashed border-purple-200 text-center flex flex-col items-center justify-center">
                <Box className="w-12 h-12 text-purple-300 mb-3" />
                <h3 className="text-lg font-bold text-purple-900 mb-1">Modul AR Siap Digunakan</h3>
                <p className="text-sm font-sans text-purple-700/80 max-w-md mb-4">
                  Objek pembelajaran 3D dapat dijelajahi dengan Augmented Reality. Klik tombol di bawah untuk melihat portal AR.
                </p>
                <Link
                  href="/ar"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 px-5 rounded-2xl inline-flex items-center gap-2 shadow-sm font-sans"
                >
                  Jelajahi Digfo AR <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
        
      </div>

      {/* Clear Locked Module Subscription Prompt Modal */}
      <Modal show={!!selectedLockedModule} onClose={() => setSelectedLockedModule(null)} maxWidth="md">
        {selectedLockedModule && (
          <div className="p-6 md:p-8 bg-white rounded-[2.5rem] font-sans">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Lock size={13} className="text-orange-600" /> Premium Module
              </div>
              <button
                onClick={() => setSelectedLockedModule(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Target Module Preview */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight font-grandstander">
                {selectedLockedModule.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Subscribe to unlock this learning module and access the full learning library.
              </p>
            </div>

            {/* Subscription Value Highlights */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 space-y-2.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Keuntungan Berlangganan:
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Akses penuh ke semua 13 modul edukasi & animasi</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Simulasi AR Immersive & Smart Digvi interaktif</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Tambah banyak akun profil anak tanpa batas paket</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Panduan orang tua & konsultasi EduGuide AI 24/7</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/pricing"
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Plans / Subscribe Now</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedLockedModule(null)}
                className="w-full py-3 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Quick AR QR Code Scan Modal */}
      <Modal show={!!selectedArForScan} onClose={() => setSelectedArForScan(null)} maxWidth="md">
        {selectedArForScan && (
          <div className="p-6 md:p-8 bg-white rounded-[2.5rem] font-sans">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <ScanLine size={13} className="text-purple-600" /> Scan Digfo AR
              </div>
              <button
                onClick={() => setSelectedArForScan(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-slate-900 mb-2 font-grandstander">
                {selectedArForScan.title}
              </h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                Scan QR Code ini menggunakan kamera smartphone untuk melihat objek 3D langsung di ruanganmu!
              </p>
            </div>

            {/* QR Code Container */}
            <div className="bg-slate-900 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center mb-6 relative overflow-hidden">
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-lg border-4 border-purple-500/20">
                <QRCodeSVG
                  value={selectedArForScan.qr_url || (typeof window !== 'undefined' ? window.location.origin + '/ar/' + selectedArForScan.id : '')}
                  size={190}
                  level="H"
                  includeMargin={true}
                  fgColor="#0f172a"
                />
              </div>
              <span className="text-[11px] font-bold text-purple-200 mt-4 tracking-wider uppercase flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Kamera Smartphone Siap Scan
              </span>
            </div>

            {/* Instructions */}
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-6 space-y-2 text-xs text-purple-900 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0">1</span>
                <span>Buka aplikasi Kamera di smartphone kamu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0">2</span>
                <span>Arahkan ke QR Code di atas dan klik tautan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0">3</span>
                <span>Arahkan kamera ke lantai atau meja untuk meletakkan 3D</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Link
                href={`/ar/${selectedArForScan.id}/prepare`}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Buka Halaman Persiapan Lengkap</span>
                <ArrowRight size={14} />
              </Link>
              
              <button
                type="button"
                onClick={() => {
                  if (selectedArForScan.qr_url) {
                    navigator.clipboard.writeText(selectedArForScan.qr_url);
                    setQrCopied(true);
                    setTimeout(() => setQrCopied(false), 2000);
                  }
                }}
                className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {qrCopied ? '✓ Tautan Disalin!' : 'Salin Tautan AR (Testing)'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </ChildLayout>
  );
}
