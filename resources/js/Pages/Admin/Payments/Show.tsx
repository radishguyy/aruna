import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  user: { name: string; email: string };
  plan: { name: string };
  subtotal: string;
  tax_amount: string;
  unique_code: number;
  total_amount: string;
  status: string;
  payment_method: string;
  payment_proof_path: string | null;
  created_at: string;
}

interface Props {
  order: Order;
}

export default function PaymentShow({ order }: Props) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const { data: approveData, setData: setApproveData, post: postApprove, processing: processingApprove } = useForm({
    duration_days: 30
  });

  const { data: rejectData, setData: setRejectData, post: postReject, processing: processingReject } = useForm({
    rejection_reason: ''
  });

  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    postApprove(route('admin.payments.approve', { order: order.id }), {
      onSuccess: () => setIsApproveModalOpen(false)
    });
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    postReject(route('admin.payments.reject', { order: order.id }), {
      onSuccess: () => setIsRejectModalOpen(false)
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-bold"><Clock className="w-4 h-4" /> Menunggu Persetujuan</span>;
      case 'paid':
        return <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold"><CheckCircle className="w-4 h-4" /> Disetujui / Lunas</span>;
      case 'waiting_for_payment':
        return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold"><Clock className="w-4 h-4" /> Menunggu Pembayaran</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-bold"><XCircle className="w-4 h-4" /> Ditolak</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="Detail Pembayaran - Admin" />
      <div className="p-6 md:p-12 space-y-6 font-sans max-w-5xl mx-auto h-full">
        
        <div>
          <Link href={route('admin.payments.index')} className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Detail Pembayaran</h1>
            {getStatusBadge(order.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Info Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Informasi Pelanggan</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-600 text-lg">
                  {order?.user?.name ? order.user.name.charAt(0) : 'U'}
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-800">{order?.user?.name || 'Pelanggan'}</div>
                  <div className="text-slate-500">{order?.user?.email || '-'}</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full"></div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Rincian Pembayaran</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Waktu Order</span>
                  <span className="font-bold text-slate-800">{new Date(order.created_at).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Pembayaran</span>
                  <span className="font-bold text-slate-800 uppercase">{order.payment_method || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Paket</span>
                  <span className="font-bold text-slate-800">{order?.plan?.name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800">{formatRupiah(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pajak (11%)</span>
                  <span className="font-bold text-slate-800">{formatRupiah(order.tax_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kode Unik</span>
                  <span className="font-bold text-green-600">+{order.unique_code}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total Tagihan</span>
                  <span className="font-black text-2xl text-indigo-600">{formatRupiah(order.total_amount)}</span>
                </div>
              </div>
            </div>

            {order.status === 'pending_approval' && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsApproveModalOpen(true)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Setujui
                </button>
                <button
                  onClick={() => setIsRejectModalOpen(true)}
                  className="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" /> Tolak
                </button>
              </div>
            )}
          </div>

          {/* Proof Image */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Bukti Transfer</h3>
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-4 overflow-hidden relative">
              {order.payment_proof_path ? (
                <a href={`/storage/${order.payment_proof_path}`} target="_blank" rel="noreferrer" className="block w-full h-full min-h-[300px]">
                  <img 
                    src={`/storage/${order.payment_proof_path}`} 
                    alt="Bukti Transfer" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                </a>
              ) : (
                <div className="text-center text-slate-400 flex flex-col items-center">
                  <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
                  <p className="font-bold">Belum ada bukti yang diunggah</p>
                </div>
              )}
            </div>
            {order.payment_proof_path && (
              <p className="text-xs text-center text-slate-400 mt-3">Klik gambar untuk melihat ukuran penuh</p>
            )}
          </div>

        </div>
      </div>

      {/* Modal Approve */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Setujui Pembayaran</h2>
            <p className="text-slate-500 mb-6 text-sm">Berapa lama durasi langganan untuk paket ini?</p>
            <form onSubmit={handleApprove} className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Durasi Aktif (Hari)</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={approveData.duration_days}
                  onChange={(e) => setApproveData('duration_days', parseInt(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:border-emerald-500 font-bold"
                />
                <p className="text-xs text-slate-400 mt-2">Standar: 30 hari untuk bulanan, 365 hari untuk tahunan.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsApproveModalOpen(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">Batal</button>
                <button type="submit" disabled={processingApprove} className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md">Setujui & Aktifkan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Reject */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Tolak Pembayaran</h2>
            <p className="text-slate-500 mb-6 text-sm">Berikan alasan penolakan agar pelanggan tahu.</p>
            <form onSubmit={handleReject} className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Alasan Penolakan (Opsional)</label>
                <textarea 
                  value={rejectData.rejection_reason}
                  onChange={(e) => setRejectData('rejection_reason', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:border-rose-500"
                  rows={3}
                  placeholder="Cth: Nominal transfer tidak sesuai"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsRejectModalOpen(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">Batal</button>
                <button type="submit" disabled={processingReject} className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-md">Tolak Pembayaran</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
