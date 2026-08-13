import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <Head title="Pengaturan Platform" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-xl mx-auto h-full">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Pengaturan Platform</h1>
          <p className="text-slate-500 font-medium">Konfigurasi variabel global platform Aruna.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Nama Aplikasi</label>
            <input type="text" defaultValue="Aruna Ecosystem" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Fitur AI Status</label>
            <select defaultValue="enabled" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
              <option value="enabled">Aktif (Enabled)</option>
              <option value="disabled">Nonaktif (Disabled)</option>
            </select>
          </div>

          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors">
            Simpan Konfigurasi
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
