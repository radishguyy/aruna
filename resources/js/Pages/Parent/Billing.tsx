import React from 'react';
import ParentLayout from '@/Layouts/ParentLayout';
import { Head, Link } from '@inertiajs/react';
import { ShieldCheck, Calendar, CreditCard, Clock, CheckCircle2 } from 'lucide-react';

export default function ParentBilling({ subscription_status, subscription, orders: ordersProp }: any) {
  const isFree = subscription_status === 'free';
  const orderList = Array.isArray(ordersProp) ? ordersProp : (ordersProp?.data || []);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  return (
    <ParentLayout>
      <Head title="Langganan Aruna" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-4xl mx-auto h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-indigo-100"><ShieldCheck className="w-8 h-8" /></div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Status Berlangganan</h1>
          <p className="text-gray-500 font-medium">Pantau status berlangganan dan riwayat pembayaran paket Aruna Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Subscription Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 self-start">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <span className="font-bold text-gray-800">Paket Aktif</span>
              <span className={`font-black px-4 py-1.5 rounded-full text-xs uppercase border ${
                isFree ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                {isFree ? 'Free Version' : (subscription?.plan?.name || subscription_status)}
              </span>
            </div>

            {isFree ? (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Tingkatkan paket Anda untuk membuka seluruh modul pembelajaran dan perlindungan interaktif untuk si kecil.
                </p>
                <Link
                  href="/pricing"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-orange-500/30"
                >
                  Lihat Paket & Harga
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-400">Periode Berakhir / Perpanjangan</div>
                    <div className="font-bold text-gray-800">
                      {subscription?.current_period_end ? formatDate(subscription.current_period_end) : '-'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-400">Status Layanan</div>
                    <div className="font-bold text-gray-800">
                      {subscription?.status === 'active' ? 'Aktif - Perpanjangan Otomatis' : 'Menunggu Pembayaran'}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Riwayat Pembayaran</h3>
            
            {orderList.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Belum ada transaksi.
              </div>
            ) : (
              <div className="space-y-4">
                {orderList.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      {order.status === 'paid' ? (
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-gray-800">{order.plan?.name}</div>
                        <div className="text-xs text-gray-400">{formatDate(order.created_at)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{formatRupiah(order.total_amount)}</div>
                      <div className={`text-[10px] font-black uppercase tracking-wider ${
                        order.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'
                      }`}>
                        {order.status === 'paid' ? 'LUNAS' : 'PENDING'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ParentLayout>
  );
}
