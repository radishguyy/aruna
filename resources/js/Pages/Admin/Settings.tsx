import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Settings, ShieldCheck, CheckCircle2, Server, Key, Cpu } from 'lucide-react';

interface Props {
  settings?: {
    app_name: string;
    ai_enabled: boolean;
    maintenance_mode: boolean;
    institution_count: number;
  };
}

export default function AdminSettings({ settings }: Props) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, setData, post, processing } = useForm({
    app_name: settings?.app_name || 'Aruna Ecosystem',
    ai_enabled: settings?.ai_enabled ?? true,
    maintenance_mode: settings?.maintenance_mode ?? false,
    default_license_prefix: 'MENTARI-2026',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/settings', {
      onSuccess: () => {
        setSuccessMessage('Konfigurasi platform berhasil disimpan!');
        setTimeout(() => setSuccessMessage(null), 4000);
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Pengaturan Platform" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-2xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Pengaturan Platform</h1>
          <p className="text-slate-500 font-medium">Konfigurasi variabel global dan status layanan platform Aruna.</p>
        </div>

        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-2">
              <Server className="w-4 h-4 text-orange-500" /> Nama Platform / Aplikasi
            </label>
            <input
              type="text"
              value={data.app_name}
              onChange={(e) => setData('app_name', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" /> Status Asisten AI (EduGuide AI)
            </label>
            <select
              value={data.ai_enabled ? 'enabled' : 'disabled'}
              onChange={(e) => setData('ai_enabled', e.target.value === 'enabled')}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="enabled">Aktif (AI Respon Otomatis Enabled)</option>
              <option value="disabled">Nonaktif (AI Maintenance)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-2">
              <Key className="w-4 h-4 text-teal-500" /> Prefix Kode Lisensi Default
            </label>
            <input
              type="text"
              value={data.default_license_prefix}
              onChange={(e) => setData('default_license_prefix', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-800">Mode Pemeliharaan (Maintenance)</div>
              <div className="text-xs text-slate-400">Nonaktifkan akses sementara untuk pengguna biasa</div>
            </div>
            <input
              type="checkbox"
              checked={data.maintenance_mode}
              onChange={(e) => setData('maintenance_mode', e.target.checked)}
              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            Simpan Konfigurasi Platform
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
