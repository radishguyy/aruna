import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Users,
  School,
  ShieldCheck,
  Heart,
  BookOpen,
  FileText,
  UserPlus,
  PlusCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import RevenueAnalytics from '@/Components/admin/RevenueAnalytics';
import UserSubscriptionTimeline from '@/Components/admin/UserSubscriptionTimeline';
import { AdminUserItem, RevenueAnalyticsPayload } from '@/types/admin';

interface Props {
  usersCount?: number;
  institutionsCount?: number;
  childrenCount?: number;
  activeSubscriptionsCount?: number;
  modulesCount?: number;
  articlesCount?: number;
  recentUsers?: AdminUserItem[] | { data: AdminUserItem[] };
  arpu?: number;
  revenueAnalytics?: RevenueAnalyticsPayload;
}

export default function AdminDashboard({
  usersCount = 0,
  institutionsCount = 0,
  childrenCount = 0,
  activeSubscriptionsCount = 0,
  modulesCount = 0,
  articlesCount = 0,
  recentUsers,
  arpu = 0,
  revenueAnalytics,
}: Props) {
  const safeRecentUsers: AdminUserItem[] = Array.isArray(recentUsers)
    ? recentUsers
    : ((recentUsers as any)?.data || []);

  const formattedArpu = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(arpu || 0);

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <div className="p-6 md:p-10 space-y-10 font-sans w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
              Overview Aruna
            </h1>
            <p className="text-slate-500 font-medium">
              Dashboard panel administratur untuk monitoring ekosistem platform.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/users"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all"
            >
              <UserPlus className="w-4 h-4" /> Kelola Pengguna
            </Link>
            <Link
              href="/admin/cms"
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Kelola Konten
            </Link>
          </div>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{usersCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Total Pengguna
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-100 shadow-sm">
              <School className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{institutionsCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Institusi/Sekolah
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100 shadow-sm">
              <Heart className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{childrenCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Profil Anak
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">
                {activeSubscriptionsCount}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Premium Aktif
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{modulesCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Modul Edukasi
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow text-white">
            <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center border border-white/30 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black tracking-tight">
                {formattedArpu}
              </div>
              <div className="text-xs text-indigo-100 font-bold uppercase tracking-wider">
                ARPU (Average Revenue Per User)
              </div>
            </div>
          </div>
        </div>

        {/* Revenue / Sales Analytics Section - TEMPORARILY DISABLED */}
        {/* <RevenueAnalytics initialData={revenueAnalytics} /> */}

        {/* User Subscription Timeline for Recent Users */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                Timeline Langganan Pengguna
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Monitoring status langganan dan sisa durasi akun pendaftar terbaru.
              </p>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition-all"
            >
              Lihat Semua Pengguna <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <UserSubscriptionTimeline
            users={safeRecentUsers}
            title="Pengguna Terbaru"
            subtitle="Daftar 8 pengguna terdaftar terbaru lengkap dengan status dan riwayat langganan."
            emptyMessage="Belum ada data pengguna yang terdaftar."
          />
        </div>
      </div>
    </AdminLayout>
  );
}
