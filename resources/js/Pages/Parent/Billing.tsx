import React from 'react';
import ParentLayout from '@/Layouts/ParentLayout';
import { Head } from '@inertiajs/react';
import { ShieldCheck, Calendar, CreditCard } from 'lucide-react';

export default function ParentBilling() {
  return (
    <ParentLayout>
      <Head title="Langganan Aruna" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-xl mx-auto h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-indigo-100"><ShieldCheck className="w-8 h-8" /></div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Status Berlangganan</h1>
          <p className="text-gray-500 font-medium">Pantau status berlangganan dan metode pembayaran paket Aruna Anda.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <span className="font-bold text-gray-800">Paket Aktif</span>
            <span className="bg-emerald-50 text-emerald-600 font-black px-4 py-1.5 rounded-full text-xs uppercase border border-emerald-100">Premium Bulanan</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-400">Pembayaran Berikutnya</div>
              <div className="font-bold text-gray-800">12 Agustus 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-400">Metode Pembayaran</div>
              <div className="font-bold text-gray-800">Bank Transfer (Gopay / E-Wallet)</div>
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
