import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import {
  Search,
  UserPlus,
  Trash2,
  Edit3,
  Shield,
  CheckCircle,
  AlertCircle,
  X,
  History,
  Calendar,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { AdminUserItem, SubscriptionHistoryItem } from '@/types/admin';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  users: AdminUserItem[] | { data: AdminUserItem[]; links?: PaginationLink[]; meta?: { links?: PaginationLink[] } };
  filters?: {
    search?: string;
    role?: string;
  };
}

export default function AdminUsers({ users: usersProp, filters }: Props) {
  const userList: AdminUserItem[] = Array.isArray(usersProp)
    ? usersProp
    : ((usersProp as any)?.data || []);

  const paginationLinks: PaginationLink[] =
    (usersProp as any)?.links || (usersProp as any)?.meta?.links || [];

  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [roleFilter, setRoleFilter] = useState(filters?.role || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState<AdminUserItem | null>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'parent',
    subscription_status: 'free',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/users', { search: searchTerm, role: roleFilter }, { preserveState: true });
  };

  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
    router.get('/admin/users', { search: searchTerm, role: role }, { preserveState: true });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/users', {
      onSuccess: () => {
        setIsAddModalOpen(false);
        reset();
      },
    });
  };

  const handleUpdateRole = (userId: number, newRole: string) => {
    router.patch(`/admin/users/${userId}`, { role: newRole }, { preserveScroll: true });
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna "${userName}"?`)) {
      router.delete(`/admin/users/${userId}`, { preserveScroll: true });
    }
  };

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
    <AdminLayout>
      <Head title="Kelola Pengguna" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-7xl mx-auto h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">
              Manajemen Pengguna & Langganan
            </h1>
            <p className="text-slate-500 font-medium">
              Kelola daftar akun terdaftar, status langganan aktif, dan audit riwayat transaksi.
            </p>
          </div>
          <button
            onClick={() => {
              clearErrors();
              reset();
              setIsAddModalOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-orange-600/20 flex items-center gap-2 transition-all active:scale-95 self-start md:self-auto"
          >
            <UserPlus className="w-5 h-5" /> Tambah Pengguna
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-sm font-bold transition-all"
            >
              Cari
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 w-full md:w-auto overflow-x-auto">
            {['', 'admin', 'teacher', 'parent'].map((r) => (
              <button
                key={r}
                onClick={() => handleRoleFilterChange(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  roleFilter === r
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {r === '' ? 'Semua Peran' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Subscription Timeline Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                Timeline Langganan Pengguna
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Menampilkan paket langganan aktif, tanggal berlaku, sisa hari, dan audit riwayat pembelian.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Expired
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> Never Subscribed
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Pengguna</th>
                  <th className="p-4">Paket (Plan)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Mulai Aktif (Active From)</th>
                  <th className="p-4">Berlaku Hingga (Active Until)</th>
                  <th className="p-4">Sisa Hari (Remaining)</th>
                  <th className="p-4 text-center">Riwayat</th>
                  <th className="p-4">Peran</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
                {userList.length > 0 ? (
                  userList.map((u) => {
                    const sub = u.subscription;
                    const historyCount = u.subscription_history?.length || 0;

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* User Column */}
                        <td className="p-4 font-bold text-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                              {u.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-bold text-slate-800 text-sm">{u.name}</div>
                              <div className="truncate text-xs font-normal text-slate-400">{u.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Plan */}
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

                        {/* Status */}
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

                        {/* Multi-purchase History Trigger */}
                        <td className="p-4 text-center">
                          {historyCount > 0 ? (
                            <button
                              type="button"
                              id={`history-btn-${u.id}`}
                              onClick={() => setSelectedUserForHistory(u)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all active:scale-95"
                              title="Lihat riwayat pembelian & langganan masa lalu"
                            >
                              <History className="w-3.5 h-3.5" />
                              <span>{historyCount} Riwayat</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-300 font-medium">0</span>
                          )}
                        </td>

                        {/* Role Select */}
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer ${
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
                        </td>

                        {/* Delete Button */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400 text-sm">
                      Tidak ada pengguna yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {paginationLinks && paginationLinks.length > 3 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
              <div className="text-xs text-slate-400 font-medium">
                Menampilkan pengguna terdaftar
              </div>
              <div className="flex gap-1">
                {paginationLinks.map((link, idx) => {
                  if (!link.url) {
                    return (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs text-slate-300 rounded-xl select-none"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    );
                  }
                  return (
                    <Link
                      key={idx}
                      href={link.url}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                        link.active
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                })}
              </div>
            </div>
          )}
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
                          <span>Tanggal Transaksi: {hist.created_at}</span>
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

        {/* Modal Tambah Pengguna */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-black text-slate-800 mb-1">Tambah Pengguna Baru</h2>
              <p className="text-slate-500 text-sm mb-6">Buat akun baru untuk platform Aruna.</p>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    required
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                      Peran
                    </label>
                    <select
                      value={data.role}
                      onChange={(e) => setData('role', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="parent">Orang Tua (Parent)</option>
                      <option value="teacher">Guru (Teacher)</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                      Status Langganan
                    </label>
                    <select
                      value={data.subscription_status}
                      onChange={(e) => setData('subscription_status', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="free">Free</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="licensed">Licensed</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-1/2 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors disabled:opacity-50"
                  >
                    Simpan Akun
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
