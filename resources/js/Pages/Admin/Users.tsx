import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Search, UserPlus, Trash2, Edit3, Shield, CheckCircle, AlertCircle, X } from 'lucide-react';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription_status: string;
  institution?: string | null;
  children_count?: number;
  created_at?: string;
}

interface Props {
  users: UserItem[];
  filters?: {
    search?: string;
    role?: string;
  };
}

export default function AdminUsers({ users, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [roleFilter, setRoleFilter] = useState(filters?.role || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const { data, setData, post, patch, delete: destroy, processing, reset, errors, clearErrors } = useForm({
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

  const handleUpdateSubscription = (userId: number, newStatus: string) => {
    router.patch(`/admin/users/${userId}`, { subscription_status: newStatus }, { preserveScroll: true });
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna "${userName}"?`)) {
      router.delete(`/admin/users/${userId}`, { preserveScroll: true });
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pengguna" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-6xl mx-auto h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Manajemen Pengguna</h1>
            <p className="text-slate-500 font-medium">Kelola daftar akun terdaftar, ubah peran, dan status berlangganan.</p>
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
            <button type="submit" className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-sm font-bold transition-all">
              Cari
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 w-full md:w-auto">
            {['', 'admin', 'teacher', 'parent'].map((r) => (
              <button
                key={r}
                onClick={() => handleRoleFilterChange(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  roleFilter === r ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {r === '' ? 'Semua' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                  <th className="p-5">Nama & Email</th>
                  <th className="p-5">Peran (Role)</th>
                  <th className="p-5">Status Langganan</th>
                  <th className="p-5">Institusi / Anak</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                      <td className="p-5 font-bold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{u.name}</div>
                            <div className="text-xs font-normal text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-5">
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer ${
                            u.role === 'admin' ? 'bg-purple-50 text-purple-700' :
                            u.role === 'teacher' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          <option value="parent">parent</option>
                          <option value="teacher">teacher</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>

                      <td className="p-5">
                        <select
                          value={u.subscription_status}
                          onChange={(e) => handleUpdateSubscription(u.id, e.target.value)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none cursor-pointer"
                        >
                          <option value="free">free</option>
                          <option value="standard">standard</option>
                          <option value="premium">premium</option>
                          <option value="licensed">licensed</option>
                        </select>
                      </td>

                      <td className="p-5 text-xs">
                        {u.institution ? (
                          <span className="font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                            🏫 {u.institution}
                          </span>
                        ) : u.children_count ? (
                          <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                            👶 {u.children_count} Anak
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">
                      Tidak ada pengguna yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Nama Pengguna"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Kata Sandi</label>
                  <input
                    type="password"
                    required
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Minimal 6 karakter"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Peran (Role)</label>
                    <select
                      value={data.role}
                      onChange={(e) => setData('role', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="parent">Parent (Orang Tua)</option>
                      <option value="teacher">Teacher (Guru)</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Status Langganan</label>
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
