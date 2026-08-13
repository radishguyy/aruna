import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, School, ShieldCheck, Heart } from 'lucide-react';

interface Props {
  usersCount: number;
  institutionsCount: number;
  childrenCount: number;
  activeSubscriptionsCount: number;
}

export default function AdminDashboard({ usersCount, institutionsCount, childrenCount, activeSubscriptionsCount }: Props) {
  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Overview Aruna</h1>
          <p className="text-slate-500 font-medium">Dashboard panel administratur untuk monitoring ekosistem Aruna.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-100"><Users className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-black text-slate-800">{usersCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pengguna</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center border border-teal-100"><School className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-black text-slate-800">{institutionsCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Institusi</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-100"><Heart className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-black text-slate-800">{childrenCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Profil Anak</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center border border-indigo-100"><ShieldCheck className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-black text-slate-800">{activeSubscriptionsCount}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Premium Aktif</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
