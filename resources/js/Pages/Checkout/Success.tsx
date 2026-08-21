import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutSuccess({ order }: { order: any }) {
  return (
    <MainLayout>
      <Head title="Pembayaran Berhasil - Aruna" />
      <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-xl text-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Pembayaran Berhasil!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Terima kasih! Langganan <strong>{order.plan.name}</strong> Anda telah aktif. Anda sekarang memiliki akses penuh ke fitur perlindungan anak Aruna.
          </p>

          <Link
            href="/parent/dashboard"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            Masuk ke Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
