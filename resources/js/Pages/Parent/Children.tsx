import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Edit2, ShieldAlert, X, CheckCircle, Save, Trash2 } from 'lucide-react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import ParentLayout from '@/Layouts/ParentLayout';

interface Child {
  id: string;
  nickname: string;
  gender: string;
  birth_date: string;
  total_points: number;
}

interface Props {
  children: Child[];
}

export default function ChildrenManagement({ children }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    nickname: '',
    gender: 'male',
    birth_date: '2020-01-01',
  });

  const openAddModal = () => {
    reset();
    setShowAddModal(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('parent.children.store'), {
      onSuccess: () => {
        setShowAddModal(false);
        triggerSuccess('Profil anak berhasil ditambahkan!');
      }
    });
  };

  const triggerSuccess = (msg: string) => {
    setShowSuccess(msg);
    setTimeout(() => setShowSuccess(null), 2500);
  };

  return (
    <ParentLayout>
      <Head title="Manajemen Anak" />
      <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
        
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center gap-2 text-sm font-bold"
            >
              <CheckCircle className="w-5 h-5" />
              {showSuccess}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative z-10">
          <div className="relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight relative z-10">Manajemen Anak</h1>
            <p className="text-gray-500 font-medium relative z-10">Kelola profil dan preferensi belajar anak Anda.</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-6 py-3.5 rounded-[1.2rem] text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Tambah Anak
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence mode="popLayout">
            {children.map(child => (
              <motion.div
                key={child.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col items-center text-center relative group hover:-translate-y-1 transition-transform"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-[1.5rem] flex items-center justify-center border border-indigo-100 shadow-inner">
                     <div className="w-20 h-20 bg-indigo-200 rounded-[1.2rem] overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${child.nickname}`} alt={child.nickname} className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900">{child.nickname}</h3>
                <p className="text-sm font-bold text-gray-400 mt-1 mb-6 flex items-center gap-2">
                   {child.gender === 'male' ? 'Laki-laki' : 'Perempuan'} 
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> 
                   Usia {new Date().getFullYear() - new Date(child.birth_date).getFullYear()} Tahun
                </p>
                
                {/* Stats Block */}
                <div className="w-full bg-gray-50/80 p-5 rounded-[1.2rem] border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-xl opacity-50"></div>
                  <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Poin Belajar</div>
                  <div className="text-3xl font-black text-indigo-600">{child.total_points}</div>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 mt-4">
                   <Link href={`/parent/select-child/${child.id}`} className="bg-orange-50 rounded-xl p-3 border border-orange-100 flex flex-col items-center cursor-pointer hover:bg-orange-100 transition-colors">
                      <ShieldAlert className="w-5 h-5 text-orange-500 mb-1" />
                      <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">Bermain</span>
                   </Link>
                   <Link href="/parent/reports" className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Rapor Aktif</span>
                   </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Child Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-gray-900">Tambah Profil Anak</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleAdd} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="addNickname">Nama Panggilan</label>
                    <input
                      id="addNickname"
                      type="text"
                      required
                      value={data.nickname}
                      onChange={e => setData('nickname', e.target.value)}
                      placeholder="Masukkan nama panggilan..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      autoFocus
                    />
                    {errors.nickname && <span className="text-xs text-red-500 mt-1">{errors.nickname}</span>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Jenis Kelamin</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setData('gender', 'male')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${data.gender === 'male' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        👦 Laki-laki
                      </button>
                      <button
                        type="button"
                        onClick={() => setData('gender', 'female')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${data.gender === 'female' ? 'bg-pink-50 border-pink-200 text-pink-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        👧 Perempuan
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="addDate">Tanggal Lahir</label>
                    <input
                      id="addDate"
                      type="date"
                      required
                      value={data.birth_date}
                      onChange={e => setData('birth_date', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                    {errors.birth_date && <span className="text-xs text-red-500 mt-1">{errors.birth_date}</span>}
                  </div>
                  
                  <div className="flex gap-3 mt-8">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Batal</button>
                    <button
                      type="submit"
                      disabled={processing || !data.nickname.trim()}
                      className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" /> {processing ? 'Menambahkan...' : 'Tambahkan'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ParentLayout>
  );
}
