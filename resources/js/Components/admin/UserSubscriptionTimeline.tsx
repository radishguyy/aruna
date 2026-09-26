import React, { useState } from 'react';
import { AdminUserItem, SubscriptionHistoryItem } from '@/types/admin';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  History,
  X,
  Sparkles,
  Shield,
  Trash2,
  ChevronRight,
  User as UserIcon,
} from 'lucide-react';

interface UserSubscriptionTimelineProps {
  users: AdminUserItem[];
  title?: string;
  subtitle?: string;
  showAdminActions?: boolean;
  onUpdateRole?: (userId: number, role: string) => void;
  onDeleteUser?: (userId: number, name: string) => void;
  emptyMessage?: string;
}

export default function UserSubscriptionTimeline({
  users,
  title = 'Timeline Langganan Pengguna',
  subtitle = 'Daftar pengguna dengan status, paket aktif, dan sisa masa berlangganan.',
  showAdminActions = false,
  onUpdateRole,
  onDeleteUser,
  emptyMessage = 'Belum ada data pengguna.',
}: UserSubscriptionTimelineProps) {
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<AdminUserItem | null>(null);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-500" />
            Expired
          </span>
        );
      case 'never':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
            Never Subscribed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Aktif
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Expired
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300" /> Belum Langganan
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <th className="p-4">Pengguna</th>
              <th className="p-4">Paket Langganan</th>
              <th className="p-4">Status</th>
              <th className="p-4">Mulai Aktif</th>
              <th className="p-4">Berlaku Hingga</th>
              <th className="p-4">Sisa Waktu</th>
              <th className="p-4 text-center">Riwayat</th>
              {showAdminActions && <th className="p-4 text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
            {users.length > 0 ? (
              users.map((u) => {
                const sub = u.subscription;
                const historyCount = u.subscription_history?.length || 0;

                return (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* User Info */}
                    <td className="p-4 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-bold text-slate-800 text-sm">
                            {u.name}
                          </div>
                          <div className="truncate text-xs font-normal text-slate-400">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Subscription Plan */}
                    <td className="p-4">
                      {sub?.plan_name ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
                          <Sparkles className="w-3 h-3 text-orange-500" />
                          {sub.plan_name}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">-</span>
                      )}
                    </td>

                    {/* Subscription Status */}
                    <td className="p-4">
                      {getStatusBadge(sub?.status)}
                    </td>

                    {/* Active From */}
                    <td className="p-4 text-xs font-medium text-slate-600">
                      {sub?.active_from ? (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {sub.active_from}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    {/* Active Until */}
                    <td className="p-4 text-xs font-medium text-slate-600">
                      {sub?.active_until ? (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {sub.active_until}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    {/* Remaining Days */}
                    <td className="p-4">
                      {sub?.status === 'active' && sub.remaining_days !== null ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {sub.remaining_label || `${sub.remaining_days} hari lagi`}
                        </span>
                      ) : sub?.status === 'expired' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-500">
                          Kedaluwarsa
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">-</span>
                      )}
                    </td>

                    {/* Subscription History Button */}
                    <td className="p-4 text-center">
                      {historyCount > 0 ? (
                        <button
                          type="button"
                          id={`history-btn-${u.id}`}
                          onClick={() => setSelectedUserForHistory(u)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all active:scale-95"
                          title="Lihat riwayat langganan lengkap"
                        >
                          <History className="w-3.5 h-3.5" />
                          <span>{historyCount} Riwayat</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-300 font-medium">0</span>
                      )}
                    </td>

                    {/* Optional Admin Actions */}
                    {showAdminActions && (
                      <td className="p-4 text-right space-x-2">
                        {onUpdateRole && (
                          <select
                            value={u.role}
                            onChange={(e) => onUpdateRole(u.id, e.target.value)}
                            className={`text-xs font-bold px-2 py-1 rounded-xl border border-slate-200 focus:outline-none cursor-pointer ${
                              u.role === 'admin'
                                ? 'bg-purple-50 text-purple-700'
                                : u.role === 'teacher'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            <option value="parent">parent</option>
                            <option value="teacher">teacher</option>
                            <option value="admin">admin</option>
                          </select>
                        )}
                        {onDeleteUser && (
                          <button
                            type="button"
                            onClick={() => onDeleteUser(u.id, u.name)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={showAdminActions ? 8 : 7}
                  className="p-8 text-center text-slate-400 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Multi-purchase History Modal */}
      {selectedUserForHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-orange-500/20">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Riwayat Langganan
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedUserForHistory.name} ({selectedUserForHistory.email})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForHistory(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subscriptions Timeline List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {selectedUserForHistory.subscription_history &&
              selectedUserForHistory.subscription_history.length > 0 ? (
                selectedUserForHistory.subscription_history.map((hist, idx) => (
                  <div
                    key={hist.id || idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      hist.status === 'active'
                        ? 'bg-emerald-50/50 border-emerald-200/80 shadow-sm'
                        : 'bg-slate-50/80 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        {hist.plan_name}
                      </span>
                      {getStatusBadge(hist.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2">
                      <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Mulai Aktif
                        </span>
                        <span className="font-medium text-slate-700">
                          {hist.current_period_start || '-'}
                        </span>
                      </div>
                      <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Berlaku Hingga
                        </span>
                        <span className="font-medium text-slate-700">
                          {hist.current_period_end || '-'}
                        </span>
                      </div>
                    </div>
                    {hist.created_at && (
                      <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Transaksi pada: {hist.created_at}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-sm">
                  Tidak ada riwayat langganan yang ditemukan.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedUserForHistory(null)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
