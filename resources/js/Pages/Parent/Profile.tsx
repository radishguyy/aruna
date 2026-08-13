import React from 'react';
import ParentLayout from '@/Layouts/ParentLayout';
import { Head, usePage } from '@inertiajs/react';
import { Mail, ShieldAlert } from 'lucide-react';

export default function ParentProfile() {
  const { auth } = usePage().props as any;
  const user = auth.user;

  return (
    <ParentLayout>
      <Head title="Profil Bunda / Ayah" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-xl mx-auto h-full">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Profil Orang Tua</h1>
          <p className="text-gray-500 font-medium">Informasi akun orang tua Anda di Aruna.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{user.role}</p>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs font-bold text-gray-400">Alamat Email</div>
                <div className="font-bold text-gray-800">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <ShieldAlert className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs font-bold text-gray-400">Hak Akses</div>
                <div className="font-bold text-gray-800">Orang Tua / Wali Murid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
