import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Filter, ChevronDown, BookOpen, Clock, CheckCircle, AlertCircle, X, ChevronRight } from 'lucide-react';
import { Head } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface Student {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  class: string;
  modulesCompleted: number;
  totalModules: number;
  lastActive: string;
  status: string;
  avatar: string;
}

interface Props {
  students: Student[];
}

export default function TeacherStudents({ students }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const classes = useMemo(() => [...new Set(students.map(s => s.class))], [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchClass = filterClass === 'all' || s.class === filterClass;
      const matchStatus = filterStatus === 'all' || s.status === filterStatus;
      return matchSearch && matchClass && matchStatus;
    });
  }, [students, searchQuery, filterClass, filterStatus]);

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j lalu`;
    const days = Math.floor(hours / 24);
    return `${days}h lalu`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return { label: 'Aktif', className: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'completed': return { label: 'Selesai', className: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'inactive': return { label: 'Tidak Aktif', className: 'bg-gray-100 text-gray-500 border-gray-200' };
      default: return { label: status, className: 'bg-gray-100 text-gray-500 border-gray-200' };
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterClass('all');
    setFilterStatus('all');
  };

  const hasActiveFilters = searchQuery || filterClass !== 'all' || filterStatus !== 'all';

  return (
    <TeacherLayout>
      <Head title="Direktori Murid" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-5xl mx-auto h-full">

        {/* Header */}
        <div className="relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Direktori Murid</h1>
          <p className="text-gray-500 font-medium relative z-10">Kelola dan pantau progress {students.length} murid terdaftar.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama murid..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all ${showFilters ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <Filter className="w-4 h-4" />
              Filter
              {hasActiveFilters && <span className="w-2 h-2 bg-teal-500 rounded-full"></span>}
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-wrap gap-4 items-end shadow-sm">
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Kelas</label>
                    <div className="relative">
                      <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                      >
                        <option value="all">Semua Kelas</option>
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Status</label>
                    <div className="relative">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                      >
                        <option value="all">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="completed">Selesai</option>
                        <option value="inactive">Tidak Aktif</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:text-red-600 py-2.5 cursor-pointer">
                      Reset Filter
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Info */}
        <div className="text-sm text-gray-400 font-medium">
          Menampilkan {filteredStudents.length} dari {students.length} murid
        </div>

        {/* Student List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredStudents.length > 0 ? filteredStudents.map((student) => {
              const badge = getStatusBadge(student.status);
              const progressPercent = Math.round((student.modulesCompleted / student.totalModules) * 100);
              const isExpanded = selectedStudent === student.id;

              return (
                <motion.div
                  key={student.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div
                    onClick={() => setSelectedStudent(isExpanded ? null : student.id)}
                    className="flex items-center gap-4 p-5 cursor-pointer group"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-teal-500/20 flex-shrink-0">
                      {student.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-sm">{student.name}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${badge.className}`}>{badge.label}</span>
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{student.class}</span>
                        <span className="text-gray-300">•</span>
                        <span>Usia {student.age} tahun</span>
                        <span className="text-gray-300">•</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {getTimeAgo(student.lastActive)}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-xs font-bold text-gray-600">{student.modulesCompleted}/{student.totalModules} Modul</span>
                      <div className="h-2 w-28 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${progressPercent === 100 ? 'bg-emerald-500' : progressPercent > 50 ? 'bg-teal-500' : 'bg-amber-500'}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Expand Arrow */}
                    <ChevronRight className={`w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-all flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 border-t border-gray-50">
                          {/* Mobile Progress */}
                          <div className="sm:hidden mb-4 pt-4">
                            <div className="flex justify-between text-xs font-bold mb-1.5">
                              <span className="text-gray-500">Progress Modul</span>
                              <span className="text-gray-800">{progressPercent}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div
                                  className={`h-full rounded-full ${progressPercent === 100 ? 'bg-emerald-500' : progressPercent > 50 ? 'bg-teal-500' : 'bg-amber-500'}`}
                                  style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>

                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pt-4 sm:pt-3">Status Detail</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm">
                              <BookOpen className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              <span className="flex-1 text-gray-700 font-medium">Progress Penyelesaian</span>
                              <span className="font-bold text-gray-900">{student.modulesCompleted} / {student.totalModules} Modul</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-gray-400"
              >
                <AlertCircle className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-bold">Tidak ada murid ditemukan</p>
                <p className="text-xs mt-1">Coba ubah kata kunci atau filter pencarian.</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-teal-600 text-xs font-bold hover:underline cursor-pointer">Reset semua filter</button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TeacherLayout>
  );
}
