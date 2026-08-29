import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router } from '@inertiajs/react';
import { Receipt, QrCode, Landmark, Copy, Download } from 'lucide-react';

interface CheckoutProps {
  order: {
    id: string;
    subtotal: string;
    tax_amount: string;
    unique_code: number;
    total_amount: string;
    plan: {
      name: string;
      billing_cycle: string;
    }
  };
}

export default function CheckoutInstructions({ order }: CheckoutProps) {
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bank_transfer' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('006850147849');
    alert('Nomor rekening berhasil disalin!');
  };

  const handleProceed = () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    
    router.post(route('checkout.confirm-method', { order: order.id }), {
      payment_method: selectedMethod
    }, {
      onFinish: () => setIsProcessing(false)
    });
  };

  return (
    <MainLayout>
      <Head title="Checkout - Aruna" />
      <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto font-sans">
        <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>Instruksi Pembayaran</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 h-fit">
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
              <div className="flex justify-between text-slate-600">
                <span>Kode Unik</span>
                <span className="font-bold text-green-600">+{order.unique_code}</span>
              </div>
            </div>

            <div className="flex flex-col items-end pt-4 border-t border-gray-100">
              <span className="text-sm font-bold text-slate-500 mb-1">Total yang harus dibayar</span>
              <span className="text-3xl font-black text-indigo-600">{formatRupiah(order.total_amount)}</span>
              <span className="text-xs text-rose-500 font-bold mt-1 bg-rose-50 px-2 py-1 rounded">Pastikan nominal transfer tepat hingga 3 digit terakhir!</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Pilih Metode Pembayaran</h2>
            
            {/* QRIS */}
            <div 
              className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer ${selectedMethod === 'qris' ? 'border-indigo-500 shadow-md ring-4 ring-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
              onClick={() => setSelectedMethod('qris')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">QRIS</h3>
                  <p className="text-sm text-gray-500">Scan melalui aplikasi e-wallet / m-banking</p>
                </div>
              </div>
              
              {selectedMethod === 'qris' && (
                <div className="mt-6 flex flex-col items-center p-4 bg-slate-50 rounded-2xl">
                  <img src="/images/payments/qris1.jpeg" alt="QRIS Aruna" className="w-48 h-48 object-contain rounded-xl bg-white shadow-sm mb-4" />
                  <a href="/images/payments/qris1.jpeg" download="QRIS-Aruna.jpeg" className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                    Simpan Gambar QRIS
                  </a>
                </div>
              )}
            </div>

            {/* Bank Transfer */}
            <div 
              className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer ${selectedMethod === 'bank_transfer' ? 'border-indigo-500 shadow-md ring-4 ring-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
              onClick={() => setSelectedMethod('bank_transfer')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Transfer Bank BCA BLU</h3>
                  <p className="text-sm text-gray-500">Transfer manual ke rekening BCA BLU kami</p>
                </div>
              </div>
              
              {selectedMethod === 'bank_transfer' && (
                <div className="mt-6 p-5 bg-slate-50 rounded-2xl space-y-4">
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Bank</div>
                    <div className="font-black text-slate-800">BCA BLU</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Atas Nama</div>
                    <div className="font-black text-slate-800">Muhamad Nur Iman</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Nomor Rekening</div>
                    <div className="flex items-center justify-between bg-white px-3 py-2 border border-gray-200 rounded-xl">
                      <span className="font-black text-xl text-slate-800 tracking-wider">006850147849</span>
                      <button onClick={handleCopy} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Salin nomor rekening">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleProceed}
              disabled={!selectedMethod || isProcessing}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                !selectedMethod || isProcessing 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30'
              }`}
            >
              {isProcessing ? 'Memproses...' : 'Saya Sudah Bayar'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
