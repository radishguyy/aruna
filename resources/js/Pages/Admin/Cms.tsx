import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, FileText, BookOpen, Layers, Star, X, CheckCircle, Sparkles } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  description: string;
}

interface ModuleItem {
  id: string;
  title: string;
  type: string;
  difficulty_level: number;
  is_premium: boolean;
  order: number;
}

interface Props {
  articles: ArticleItem[];
  modules: ModuleItem[];
}

export default function AdminCms({ articles, modules }: Props) {
  const [activeTab, setActiveTab] = useState<'articles' | 'modules'>('articles');
  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);

  const articleForm = useForm({
    title: '',
    category: 'PANDUAN ORANG TUA',
    author: 'Tim Aruna',
    description: '',
    content: '',
  });

  const moduleForm = useForm({
    title: '',
    type: 'digfo',
    difficulty_level: 1,
    is_premium: false,
    description: '',
  });

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    articleForm.post('/admin/cms/articles', {
      onSuccess: () => {
        setIsAddArticleOpen(false);
        articleForm.reset();
      },
    });
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      router.delete(`/admin/cms/articles/${id}`, { preserveScroll: true });
    }
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    moduleForm.post('/admin/cms/modules', {
      onSuccess: () => {
        setIsAddModuleOpen(false);
        moduleForm.reset();
      },
    });
  };

  const handleDeleteModule = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus modul "${title}"?`)) {
      router.delete(`/admin/cms/modules/${id}`, { preserveScroll: true });
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Jurnal & Modul (CMS)" />
      <div className="p-6 md:p-12 space-y-8 font-sans max-w-6xl mx-auto h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Manajemen Konten (CMS)</h1>
            <p className="text-slate-500 font-medium">Kelola artikel jurnal literasi parenting dan modul edukasi anak.</p>
          </div>

          <div className="flex gap-3">
            {activeTab === 'articles' ? (
              <button
                onClick={() => {
                  articleForm.reset();
                  setIsAddArticleOpen(true);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-orange-600/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus className="w-5 h-5" /> Tambah Artikel
              </button>
            ) : (
              <button
                onClick={() => {
                  moduleForm.reset();
                  setIsAddModuleOpen(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Plus className="w-5 h-5" /> Tambah Modul
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'articles' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> Artikel & Jurnal ({articles?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'modules' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Modul Edukasi ({modules?.length || 0})
          </button>
        </div>

        {/* Articles Section */}
        {activeTab === 'articles' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                    <th className="p-5">Judul Artikel</th>
                    <th className="p-5">Kategori</th>
                    <th className="p-5">Penulis</th>
                    <th className="p-5">Tanggal</th>
                    <th className="p-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {articles && articles.length > 0 ? (
                    articles.map((a) => (
                      <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                        <td className="p-5">
                          <div className="font-bold text-slate-800">{a.title}</div>
                          <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{a.description}</div>
                        </td>
                        <td className="p-5 text-xs font-bold">
                          <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg border border-orange-100">
                            {a.category}
                          </span>
                        </td>
                        <td className="p-5 text-slate-700 font-medium">{a.author}</td>
                        <td className="p-5 text-slate-400 text-xs">{a.date}</td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDeleteArticle(a.id, a.title)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">
                        Belum ada artikel jurnal. Silakan tambahkan artikel baru.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modules Section */}
        {activeTab === 'modules' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                    <th className="p-5">Urutan & Judul Modul</th>
                    <th className="p-5">Tipe Modul</th>
                    <th className="p-5">Kesulitan</th>
                    <th className="p-5">Akses</th>
                    <th className="p-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {modules && modules.length > 0 ? (
                    modules.map((m) => (
                      <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-sm text-slate-600">
                        <td className="p-5 font-bold text-slate-800">
                          <span className="inline-block w-6 text-slate-400 font-mono">#{m.order}</span>
                          {m.title}
                        </td>
                        <td className="p-5">
                          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold uppercase px-2.5 py-1 rounded-lg border border-indigo-100">
                            {m.type}
                          </span>
                        </td>
                        <td className="p-5 text-xs font-bold text-slate-500">
                          Level {m.difficulty_level}
                        </td>
                        <td className="p-5">
                          {m.is_premium ? (
                            <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-100 flex items-center gap-1 w-max">
                              <Star className="w-3 h-3 fill-amber-500" /> Premium
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-100">
                              Gratis
                            </span>
                          )}
                        </td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDeleteModule(m.id, m.title)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            title="Hapus Modul"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 text-sm">
                        Belum ada modul edukasi. Silakan tambahkan modul baru.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Tambah Artikel */}
        {isAddArticleOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsAddArticleOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-black text-slate-800 mb-1">Tambah Artikel Jurnal Baru</h2>
              <p className="text-slate-500 text-sm mb-6">Terbitkan artikel tips parenting dan edukasi.</p>

              <form onSubmit={handleCreateArticle} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={articleForm.data.title}
                    onChange={(e) => articleForm.setData('title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Contoh: Cara Membahas Batasan Tubuh Tanpa Canggung"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Kategori</label>
                    <select
                      value={articleForm.data.category}
                      onChange={(e) => articleForm.setData('category', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="PANDUAN ORANG TUA">PANDUAN ORANG TUA</option>
                      <option value="EDUTECH">EDUTECH</option>
                      <option value="PSIKOLOGI ANAK">PSIKOLOGI ANAK</option>
                      <option value="KEAMANAN DIGITAL">KEAMANAN DIGITAL</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Penulis</label>
                    <input
                      type="text"
                      required
                      value={articleForm.data.author}
                      onChange={(e) => articleForm.setData('author', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                      placeholder="Tim Psikologi Aruna"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Ringkasan / Deskripsi</label>
                  <textarea
                    required
                    rows={2}
                    value={articleForm.data.description}
                    onChange={(e) => articleForm.setData('description', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Ringkasan singkat artikel..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Isi Konten Artikel</label>
                  <textarea
                    required
                    rows={4}
                    value={articleForm.data.content}
                    onChange={(e) => articleForm.setData('content', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Tulis lengkap isi artikel di sini..."
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddArticleOpen(false)}
                    className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={articleForm.processing}
                    className="w-1/2 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors disabled:opacity-50"
                  >
                    Terbitkan Artikel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Tambah Modul */}
        {isAddModuleOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsAddModuleOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-black text-slate-800 mb-1">Tambah Modul Edukasi Baru</h2>
              <p className="text-slate-500 text-sm mb-6">Tambahkan materi pembelajaran interaktif anak.</p>

              <form onSubmit={handleCreateModule} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Judul Modul</label>
                  <input
                    type="text"
                    required
                    value={moduleForm.data.title}
                    onChange={(e) => moduleForm.setData('title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Contoh: Ini Tubuhku & Area Pribadi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Tipe Modul</label>
                    <select
                      value={moduleForm.data.type}
                      onChange={(e) => moduleForm.setData('type', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="digfo">Digfo (Digital Infografis)</option>
                      <option value="digvi">Digvi (Digital Video)</option>
                      <option value="e-modul">E-Modul Interaktif</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Tingkat Kesulitan</label>
                    <select
                      value={moduleForm.data.difficulty_level}
                      onChange={(e) => moduleForm.setData('difficulty_level', parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value={1}>Level 1 (Mudah / Pemula)</option>
                      <option value={2}>Level 2 (Menengah)</option>
                      <option value={3}>Level 3 (Lanjutan)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="is_premium"
                    checked={moduleForm.data.is_premium}
                    onChange={(e) => moduleForm.setData('is_premium', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="is_premium" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Khusus Pengguna Premium / Terlisensi
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Deskripsi Singkat</label>
                  <textarea
                    required
                    rows={3}
                    value={moduleForm.data.description}
                    onChange={(e) => moduleForm.setData('description', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Penjelasan ringkas isi modul ini..."
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModuleOpen(false)}
                    className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={moduleForm.processing}
                    className="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors disabled:opacity-50"
                  >
                    Simpan Modul
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
