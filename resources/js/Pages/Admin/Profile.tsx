import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function AdminProfile() {
  const { auth } = usePage().props as any;
  const user = auth.user;

  return (
    <AdminLayout>
      <Head title="Profil Admin" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-xl mx-auto h-full">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Profil Administratur</h1>
          <p className="text-slate-500 font-medium">Informasi akun administrator Anda.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{user.role}</p>
            </div>
          </div>

          <div className="border-t border-slate-50 pt-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs font-bold text-gray-400">Alamat Email</div>
                <div className="font-bold text-gray-800">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs font-bold text-gray-400">Hak Akses</div>
                <div className="font-bold text-gray-800">Administrator Utama</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
