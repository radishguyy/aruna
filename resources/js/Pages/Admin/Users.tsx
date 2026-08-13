import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  subscription_status: string;
}

interface Props {
  users: UserItem[];
}

export default function AdminUsers({ users }: Props) {
  return (
    <AdminLayout>
      <Head title="Kelola Pengguna" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-5xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Manajemen Pengguna</h1>
          <p className="text-slate-500 font-medium">Kelola daftar akun terdaftar beserta perannya di platform.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                <th className="p-6">Nama</th>
                <th className="p-6">Email</th>
                <th className="p-6">Peran</th>
                <th className="p-6">Langganan</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                  <td className="p-6 font-bold text-slate-800">{u.name}</td>
                  <td className="p-6">{u.email}</td>
                  <td className="p-6 uppercase text-xs font-bold tracking-wider">{u.role}</td>
                  <td className="p-6 text-xs"><span className={`px-2 py-0.5 rounded-md font-bold ${u.subscription_status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{u.subscription_status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
