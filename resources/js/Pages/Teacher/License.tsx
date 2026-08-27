import React from 'react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { Head } from '@inertiajs/react';
import { ShieldCheck, Calendar, Key, Copy } from 'lucide-react';

interface Props {
  institution?: {
    id?: number;
    name?: string;
    license_code?: string;
    license_expires_at?: string;
  } | null;
}

export default function TeacherLicense({ institution: institutionProp }: Props) {
  const institution = (institutionProp as any)?.data || institutionProp;
  const [copied, setCopied] = React.useState(false);

  const licenseCode = institution?.license_code || 'BELUM TERDAFTAR';
  const expiresAt = institution?.license_expires_at
    ? new Date(institution.license_expires_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Aktif Sepanjang Tahun';

  const handleCopy = () => {
    if (licenseCode && licenseCode !== 'BELUM TERDAFTAR') {
      navigator.clipboard.writeText(licenseCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TeacherLayout>
      <Head title="Lisensi Institusi" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-xl mx-auto h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-teal-100"><ShieldCheck className="w-8 h-8" /></div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Lisensi Institusi</h1>
          <p className="text-gray-500 font-medium">
            {institution?.name ? `Status berlangganan dan aktivasi lisensi untuk ${institution.name}.` : 'Pantau status berlangganan dan aktivasi lisensi sekolah Anda.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <span className="font-bold text-gray-800">Status Langganan</span>
            <span className="bg-emerald-50 text-emerald-600 font-black px-4 py-1.5 rounded-full text-xs uppercase border border-emerald-100">
              {institution ? 'Aktif Terverifikasi' : 'Institusi Mandiri'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-400">Masa Berlaku</div>
              <div className="font-bold text-gray-800">{expiresAt}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Key className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-400">Kunci Lisensi</div>
              <div className="font-bold text-gray-800 font-mono">{licenseCode}</div>
            </div>
            {licenseCode !== 'BELUM TERDAFTAR' && (
              <button 
                onClick={handleCopy}
                className="text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> {copied ? 'Tersalin!' : 'Salin'}
              </button>
            )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
