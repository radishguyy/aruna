import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, CheckCircle, ChevronRight, BookOpen, Clock, Activity, Bell, X, Eye } from 'lucide-react';
import { Link, Head, usePage } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface ActivityItem {
  id: number;
  studentName: string;
  avatar: string;
  moduleName: string;
  status: string;
  timestamp: string;
  score: number | null;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: string;
}

interface Institution {
  name: string;
}

interface Props {
  institution: Institution | null;
  studentsCount: number;
  recentActivities: ActivityItem[];
  notifications: NotificationItem[];
}

export default function TeacherDashboard({ institution, studentsCount, recentActivities, notifications: initialNotifs }: Props) {
  const { auth } = usePage().props as any;
  const user = auth.user;

  const [notifications, setNotifications] = useState(initialNotifs);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  const notifStyles: Record<string, { bg: string; border: string; title: string; text: string; blur: string }> = {
    warning: { bg: 'bg-amber-50', border: 'border-amber-100', title: 'text-amber-900', text: 'text-amber-700', blur: 'bg-amber-200/30' },
    info: { bg: 'bg-teal-50', border: 'border-teal-100', title: 'text-teal-900', text: 'text-teal-700', blur: 'bg-teal-200/30' },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-100', title: 'text-emerald-900', text: 'text-emerald-700', blur: 'bg-emerald-200/30' },
  };

  return (
    <TeacherLayout>
      <Head title="Teacher Dashboard" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
        
        {/* Overview Head */}
        <div className="relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-32 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 relative z-10 tracking-tight">Halo, {user.name}</h1>
          <p className="text-gray-500 font-medium relative z-10">
            Berikut merupakan ringkasan aktivitas murid di <span className="font-bold text-teal-600">{institution ? institution.name : 'Institusi Anda'}</span> hari ini.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          <Link href="/teacher/students">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-[2rem] p-6 shadow-xl shadow-teal-500/30 flex flex-col relative overflow-hidden cursor-pointer group h-full"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
              <Users className="w-8 h-8 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <div className="text-4xl font-black mb-1">{studentsCount}</div>
                <div className="text-sm text-teal-50 font-medium">Total Murid Terdaftar</div>
              </div>
              <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          </Link>

          <Link href="/teacher/students">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col cursor-pointer group h-full"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 border border-rose-100 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-4xl font-black mb-1 text-gray-900">{studentsCount > 0 ? studentsCount : 0}</div>
                <div className="text-sm text-gray-500 font-medium">Murid Aktif Hari Ini</div>
              </div>
            </motion.div>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col"
          >
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4 border border-amber-100">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-4xl font-black mb-1 text-gray-900">85%</div>
              <div className="text-sm text-gray-500 font-medium">Rata-rata Penyelesaian</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Recent Activity Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[1rem] flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 leading-none">Aktivitas Terakhir</h2>
                  <div className="text-xs text-gray-400 font-medium mt-1">Live tracking murid</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {recentActivities.length > 0 ? (
                recentActivities.map(act => (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(selectedActivity === act.id ? null : act.id)}
                    className="group cursor-pointer flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition border border-transparent hover:border-gray-100"
                  >
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xs shadow-sm ring-1 ring-teal-200">
                      {act.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm">{act.studentName}</div>
                      <div className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1"><BookOpen className="w-3 h-3"/> {act.moduleName}</span>
                        <span className="text-gray-300">•</span>
                        <span className="inline-flex items-center gap-1 text-teal-600 font-medium"><Clock className="w-3 h-3"/> {getTimeAgo(act.timestamp)}</span>
                      </div>
                      
                      <AnimatePresence>
                        {selectedActivity === act.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-3 text-xs">
                              <span className={`px-2 py-1 rounded-full font-bold ${act.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {act.status === 'completed' ? 'Selesai' : 'Sedang Mengerjakan'}
                              </span>
                              {act.score !== null && (
                                <span className="text-gray-500">Skor: <span className="font-bold text-gray-800">{act.score}</span></span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="text-gray-300 group-hover:text-teal-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Belum ada aktivitas murid saat ini.
                </div>
              )}
            </div>
            
            <Link href="/teacher/students">
              <button className="w-full mt-6 py-4 bg-teal-50 rounded-[1.2rem] text-sm text-teal-600 font-bold flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors border border-teal-100/50 cursor-pointer">
                Lihat Semua Aktivitas <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Notifications Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-[1rem] flex items-center justify-center shadow-lg shadow-amber-500/30 relative">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 leading-none">Pemberitahuan</h2>
                  <div className="text-xs text-gray-400 font-medium mt-1">Sistem & Akademik</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <AnimatePresence mode="popLayout">
                {notifications.length > 0 ? notifications.map(notif => {
                  const style = notifStyles[notif.type] || notifStyles.info;
                  return (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 ${style.bg} border ${style.border} rounded-2xl relative overflow-hidden ${notif.read ? 'opacity-60' : ''}`}
                    >
                      <div className={`absolute top-0 right-0 w-16 h-16 ${style.blur} rounded-full blur-xl`}></div>
                      <div className="flex items-start justify-between gap-2 relative z-10">
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold ${style.title} text-sm mb-1 flex items-center gap-2`}>
                            {notif.title}
                            {!notif.read && <span className="w-2 h-2 bg-red-400 rounded-full inline-block flex-shrink-0"></span>}
                          </div>
                          <div className={`${style.text} text-[13px]`}>{notif.message}</div>
                          <div className="text-[11px] text-gray-400 mt-2">{getTimeAgo(notif.timestamp)}</div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="p-1.5 rounded-lg hover:bg-white/60 transition-colors text-gray-400 hover:text-teal-600"
                              title="Tandai dibaca"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => dismissNotification(notif.id)}
                            className="p-1.5 rounded-lg hover:bg-white/60 transition-colors text-gray-400 hover:text-red-500"
                            title="Hapus"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                }) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-gray-400"
                  >
                    <Bell className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-sm font-medium">Tidak ada pemberitahuan</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </TeacherLayout>
  );
}
