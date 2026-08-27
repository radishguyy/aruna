import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Eye, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  id: string;
  user: { name: string; email: string };
  plan: { name: string };
  total_amount: string;
  status: string;
  payment_method: string;
  created_at: string;
}

interface Props {
  orders: {
    data: Order[];
    current_page: number;
    last_page: number;
  };
}

export default function PaymentsIndex({ orders }: Props) {
  const formatRupiah = (val: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(val));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-bold"><Clock className="w-3 h-3" /> Menunggu Persetujuan</span>;
      case 'paid':
        return <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold"><CheckCircle className="w-3 h-3" /> Lunas / Disetujui</span>;
      case 'waiting_for_payment':
        return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold"><Clock className="w-3 h-3" /> Menunggu Pembayaran</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold"><XCircle className="w-3 h-3" /> Ditolak</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-bold">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="Manajemen Pembayaran - Admin" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-6xl mx-auto h-full">
        
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Manajemen Pembayaran</h1>
          <p className="text-slate-500 font-medium">Tinjau dan setujui bukti pembayaran manual dari pelanggan.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                  <th className="p-5">Waktu</th>
                  <th className="p-5">Pelanggan</th>
                  <th className="p-5">Paket</th>
                  <th className="p-5">Nominal & Metode</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.data && orders.data.length > 0 ? (
                  orders.data.map((o) => (
                    <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                      <td className="p-5">
                        {new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-5 font-bold text-slate-800">
                        {o.user.name}
                        <div className="text-xs font-normal text-slate-400">{o.user.email}</div>
                      </td>
                      <td className="p-5 font-bold text-slate-700">{o.plan.name}</td>
                      <td className="p-5">
                        <div className="font-bold text-slate-800">{formatRupiah(o.total_amount)}</div>
                        <div className="text-xs uppercase text-slate-400 font-bold">{o.payment_method || '-'}</div>
                      </td>
                      <td className="p-5">
                        {getStatusBadge(o.status)}
                      </td>
                      <td className="p-5 text-right">
                        <Link 
                          href={route('admin.payments.show', { order: o.id })}
                          className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Eye className="w-4 h-4" /> Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 text-sm">
                      Belum ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
