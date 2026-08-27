import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, School, ShieldCheck, Heart, BookOpen, FileText, UserPlus, PlusCircle, ChevronRight, Sparkles } from 'lucide-react';

interface RecentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription_status: string;
}

interface Props {
  usersCount?: number;
  institutionsCount?: number;
  childrenCount?: number;
  activeSubscriptionsCount?: number;
  modulesCount?: number;
  articlesCount?: number;
  recentUsers?: RecentUser[] | { data: RecentUser[] };
}

export default function AdminDashboard({
  usersCount = 0,
  institutionsCount = 0,
  childrenCount = 0,
  activeSubscriptionsCount = 0,
  modulesCount = 0,
  articlesCount = 0,
  recentUsers,
}: Props) {
  const safeRecentUsers: RecentUser[] = Array.isArray(recentUsers)
    ? recentUsers
    : ((recentUsers as any)?.data || []);
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-6xl mx-auto h-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Overview Aruna</h1>
            <p className="text-slate-500 font-medium">Dashboard panel administratur untuk monitoring ekosistem platform.</p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{usersCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pengguna</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-100 shadow-sm">
              <School className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{institutionsCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Institusi/Sekolah</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100 shadow-sm">
              <Heart className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{childrenCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Profil Anak</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{activeSubscriptionsCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Premium Aktif</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{modulesCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Modul Edukasi</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 shadow-sm">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800">{articlesCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Artikel Jurnal</div>
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Pengguna Terbaru</h3>
              <p className="text-xs text-slate-400 font-medium">Akun yang baru saja mendaftar di platform</p>
            </div>
            <Link href="/admin/users" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                  <th className="p-4">Nama</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Peran</th>
                  <th className="p-4">Status Langganan</th>
                </tr>
              </thead>
              <tbody>
                {safeRecentUsers.length > 0 ? (
                  safeRecentUsers.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                      <td className="p-4 font-bold text-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        {u.name}
                      </td>
                      <td className="p-4">{u.email}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          u.role === 'teacher' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded-md font-bold uppercase ${
                          u.subscription_status === 'premium' || u.subscription_status === 'licensed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {u.subscription_status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-400 text-sm">Belum ada data pengguna.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
