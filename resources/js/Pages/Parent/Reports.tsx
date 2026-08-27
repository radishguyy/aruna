import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, CheckCircle2, CircleDashed, BookOpen, TrendingUp, Award, ChevronDown, BarChart3, Sparkles, Calendar, User as UserIcon } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import ParentLayout from '@/Layouts/ParentLayout';

interface Module {
  id: string;
  title: string;
  category_id: number;
  difficulty_level: number;
}

interface ProgressItem {
  id: number;
  module_id: string;
  status: 'started' | 'completed';
  score: number;
  completed_at?: string;
  module?: Module;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  image_url: string;
  requirement_type: string;
  requirement_value: number;
  pivot?: {
    earned_at: string;
  };
}

interface Child {
  id: string;
  nickname: string;
  gender: string;
  birth_date: string;
  total_points: number;
  progress: ProgressItem[];
  badges: Badge[];
}

interface Props {
  children: Child[] | { data: Child[] };
}

export default function Reports({ children: childrenProp }: Props) {
  const childrenList: Child[] = Array.isArray(childrenProp)
    ? childrenProp
    : ((childrenProp as any)?.data || []);

  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const activeChild = childrenList[selectedChildIndex] || null;
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  if (!activeChild) {
    return (
      <ParentLayout>
        <Head title="Rapor Belajar" />
        <div className="p-6 md:p-12 text-center max-w-md mx-auto">
          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada data rapor</h3>
          <p className="text-gray-500 mb-6">Tambahkan profil anak Anda di menu Manajemen Anak untuk memantau laporannya.</p>
          <Link href="/parent/children" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors">
            Kelola Anak
          </Link>
        </div>
      </ParentLayout>
    );
  }

  const progressData = activeChild.progress || [];
  const completedCount = progressData.filter(p => p.status === 'completed').length;
  const totalCount = 13;
  const overallPercent = Math.round((completedCount / totalCount) * 100);
  
  const scoredProgress = progressData.filter(p => p.score > 0);
  const avgScore = scoredProgress.length > 0 
    ? scoredProgress.reduce((sum, p) => sum + p.score, 0) / scoredProgress.length 
    : 0;

  const childBadges = activeChild.badges || [];

  const categories = [
    { id: 1, name: 'Mengenal Tubuh', slug: 'mengenal-tubuh' },
    { id: 2, name: 'Batasan Diri', slug: 'batasan-diri' },
  ];

  const getCategoryProgress = (categoryId: number) => {
    const isCat1 = categoryId === 1;
    // Map module IDs to category
    const catModuleIds = isCat1 
      ? ['m-1', 'm-4', 'm-7', 'm-11'] 
      : ['m-2', 'm-3', 'm-5', 'm-6', 'm-8', 'm-9', 'm-10', 'm-12', 'm-13'];
    
    const completed = progressData.filter(p => catModuleIds.includes(p.module_id) && p.status === 'completed').length;
    return {
      completed,
      total: catModuleIds.length,
      percent: Math.round((completed / catModuleIds.length) * 100),
      moduleIds: catModuleIds
    };
  };

  return (
    <ParentLayout>
      <Head title="Rapor Belajar" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Rapor Belajar</h1>
            <p className="text-gray-500 font-medium relative z-10">Laporan perkembangan <span className="font-bold text-indigo-600">{activeChild.nickname}</span> di platform Aruna.</p>
          </div>
          
          {childrenList.length > 1 && (
            <div className="flex bg-gray-100 p-1.5 rounded-2xl relative z-10">
              {childrenList.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChildIndex(i);
                    setExpandedCategory(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedChildIndex === i ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {c.nickname}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[1.5rem] p-5 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/4"></div>
            <BarChart3 className="w-6 h-6 mb-3 opacity-80" />
            <div className="text-3xl font-black">{overallPercent}%</div>
            <div className="text-xs text-indigo-100 font-medium mt-0.5">Progres Keseluruhan</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-[1.5rem] p-5 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-3 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-900">{completedCount}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Modul Selesai</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[1.5rem] p-5 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-3 border border-amber-100">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-900">{Math.round(avgScore)}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Rata-rata Skor</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-[1.5rem] p-5 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-3 border border-rose-100">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-900">{childBadges.length}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Lencana Diraih</div>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[1rem] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-none">Progres per Kategori</h2>
              <div className="text-xs text-gray-400 font-medium mt-1">Klik untuk melihat detail modul</div>
            </div>
          </div>

          <div className="space-y-4">
            {categories.map(cat => {
              const progress = getCategoryProgress(cat.id);
              const isExpanded = expandedCategory === cat.id;

              return (
                <div key={cat.id} className="rounded-2xl border border-gray-100 overflow-hidden">
                  <div
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800 text-sm">{cat.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-medium">{progress.completed}/{progress.total}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${progress.percent === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>{progress.percent}%</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.percent}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${progress.percent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        />
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
                          {progress.moduleIds.map(moduleId => {
                            const prog = progressData.find(p => p.module_id === moduleId);
                            const status = prog?.status || 'not_started';
                            return (
                              <div key={moduleId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                                {status === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                ) : status === 'started' ? (
                                  <CircleDashed className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                ) : (
                                  <CircleDashed className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                )}
                                <span className={`flex-1 font-medium ${status === 'not_started' ? 'text-gray-400' : 'text-gray-700'}`}>Misi ID: {moduleId}</span>
                                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                                  status === 'completed' ? 'bg-emerald-50 text-emerald-600' : status === 'started' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                  {status === 'completed' ? `Selesai (${prog?.score})` : status === 'started' ? 'Berlangsung' : 'Belum Mulai'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges Section */}
        {childBadges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-[1rem] flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 leading-none">Koleksi Lencana Diraih</h2>
                <div className="text-xs text-gray-400 font-medium mt-1">{childBadges.length} Lencana telah diraih</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {childBadges.map(badge => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 rounded-2xl text-center flex flex-col items-center gap-2 shadow-sm"
                >
                  <div className="text-3xl">🏅</div>
                  <span className="text-xs font-bold leading-tight text-gray-800">{badge.name}</span>
                  {badge.pivot?.earned_at && (
                    <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(badge.pivot.earned_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Insight */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-[2rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg mb-2">Insight EduGuide AI</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                {activeChild.nickname} menunjukkan kemajuan yang bagus dalam pengenalan tubuh! Selanjutnya, fokuskan pada modul &ldquo;Batasan Diri&rdquo; untuk memperkuat pemahaman tentang sentuhan aman. 
                Kami sarankan untuk mendiskusikan materi ini bersama {activeChild.nickname} menggunakan teknik bercerita di waktu santai.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </ParentLayout>
  );
}
