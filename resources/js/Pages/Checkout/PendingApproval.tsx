import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface CheckoutProps {
  order: {
    id: string;
    total_amount: string;
    plan: {
      name: string;
    }
  };
}

export default function PendingApproval({ order }: CheckoutProps) {
  return (
    <MainLayout>
      <Head title="Menunggu Verifikasi - Aruna" />
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto font-sans text-center">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>Bukti Pembayaran Terkirim!</h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Terima kasih! Bukti pembayaran Anda untuk paket <span className="font-bold text-slate-800">{order.plan.name}</span> telah berhasil kami terima.
          </p>

          <div className="bg-orange-50 text-orange-800 p-6 rounded-2xl border border-orange-100 w-full mb-8 text-left">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Proses Verifikasi
            </h3>
            <p className="text-sm leading-relaxed">
              Tim Admin kami sedang memverifikasi pembayaran Anda. Proses ini membutuhkan waktu maksimal <strong className="font-black">2 × 24 jam</strong> hari kerja. Anda akan mendapatkan akses ke fitur aplikasi setelah pembayaran disetujui.
            </p>
          </div>

          <Link
            href={route('dashboard')}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-bold transition-colors"
          >
            Kembali ke Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
