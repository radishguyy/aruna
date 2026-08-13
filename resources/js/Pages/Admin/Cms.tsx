import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
}

interface Props {
  articles: ArticleItem[];
}

export default function AdminCms({ articles }: Props) {
  return (
    <AdminLayout>
      <Head title="Kelola Jurnal/Blog" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-5xl mx-auto h-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Manajemen Konten (CMS)</h1>
          <p className="text-slate-500 font-medium">Kelola artikel jurnal literasi dan tips parenting.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                <th className="p-6">Judul Artikel</th>
                <th className="p-6">Kategori</th>
                <th className="p-6">Penulis</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                  <td className="p-6 font-bold text-slate-800">{a.title}</td>
                  <td className="p-6 text-xs font-bold text-orange-600">{a.category}</td>
                  <td className="p-6">{a.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
