import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Mail, ShieldCheck, User, Lock, CheckCircle2 } from 'lucide-react';

export default function AdminProfile() {
  const { auth } = usePage().props as any;
  const user = auth.user;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, setData, patch, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch('/admin/profile', {
      onSuccess: () => {
        setSuccessMessage('Profil administrator berhasil diperbarui!');
        setData('password', '');
        setTimeout(() => setSuccessMessage(null), 4000);
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Profil Admin" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-2xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Profil Administratur</h1>
          <p className="text-slate-500 font-medium">Kelola informasi kredensial akun administrator Anda.</p>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{user.name}</h3>
              <div className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md mt-1">
                {user.role} Utama
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Nama Administrator</label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Administrator</label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Ubah Kata Sandi (Opsional)</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Kosongkan jika tidak ingin mengubah kata sandi"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            Simpan Perubahan Profil
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
