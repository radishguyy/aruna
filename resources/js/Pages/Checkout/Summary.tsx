import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, CreditCard, Receipt, ArrowRight } from 'lucide-react';

interface CheckoutProps {
  order: {
    id: string;
    subtotal: string;
    tax_amount: string;
    total_amount: string;
    plan: {
      name: string;
      billing_cycle: string;
    }
  };
  paymentData: {
    token: string;
    redirect_url: string;
  };
}

export default function CheckoutSummary({ order, paymentData }: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // In a real Midtrans integration, you would open snap.pay(paymentData.token) here.
    // Since this is a mock flow, we just redirect to the mock payment route.
    window.location.href = paymentData.redirect_url;
  };

  return (
    <MainLayout>
      <Head title="Checkout - Aruna" />
      <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto font-sans">
        <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>Selesaikan Pembayaran</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <Receipt className="text-orange-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-800">Ringkasan Pesanan</h2>
            </div>
            
            <div>
              <div className="text-sm font-bold text-gray-500 mb-1">Paket Pilihan</div>
              <div className="text-lg font-black text-slate-800">{order.plan.name}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{order.plan.billing_cycle === 'annual' ? 'Tagihan Tahunan' : 'Tagihan Bulanan'}</div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold">{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pajak (11%)</span>
                <span className="font-bold">{formatRupiah(order.tax_amount)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-slate-800">Total Tagihan</span>
              <span className="text-2xl font-black text-indigo-600">{formatRupiah(order.total_amount)}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 text-indigo-800 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 shrink-0 text-indigo-600" />
              <p className="text-sm font-medium leading-relaxed">
                Pembayaran Anda diproses secara aman. Dengan melanjutkan pembayaran, Anda menyetujui Syarat dan Ketentuan langganan Aruna.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-6 h-6" />
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
