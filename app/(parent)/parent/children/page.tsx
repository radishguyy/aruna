"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/data/mockData';
import { UserPlus, Edit2, ShieldAlert, X, CheckCircle, Save, Trash2 } from 'lucide-react';

interface ChildForm {
  nickname: string;
  gender: string;
  birth_date: string;
}

export default function ChildrenManagementPage() {
  const [children, setChildren] = useState(mockData.children.map(c => ({ ...c })));
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ChildForm>({ nickname: '', gender: 'male', birth_date: '2020-01-01' });

  const openAddModal = () => {
    setFormData({ nickname: '', gender: 'male', birth_date: '2020-01-01' });
    setShowAddModal(true);
  };

  const openEditModal = (child: typeof children[0]) => {
    setFormData({ nickname: child.nickname, gender: child.gender, birth_date: child.birth_date });
    setEditingId(child.id);
  };

  const handleAdd = () => {
    if (!formData.nickname.trim()) return;
    const newChild = {
      id: `c-${Date.now()}`,
      user_id: "u-1",
      nickname: formData.nickname,
      gender: formData.gender,
      birth_date: formData.birth_date,
      avatar_url: "/api/placeholder/150/150",
      total_points: 0,
    };
    setChildren(prev => [...prev, newChild]);
    setShowAddModal(false);
    triggerSuccess('Profil anak berhasil ditambahkan!');
  };

  const handleEdit = () => {
    if (!formData.nickname.trim() || !editingId) return;
    setChildren(prev => prev.map(c => c.id === editingId ? { ...c, nickname: formData.nickname, gender: formData.gender, birth_date: formData.birth_date } : c));
    setEditingId(null);
    triggerSuccess('Profil anak berhasil diperbarui!');
  };

  const handleDelete = (id: string) => {
    setChildren(prev => prev.filter(c => c.id !== id));
    setDeleteConfirmId(null);
    triggerSuccess('Profil anak telah dihapus.');
  };

  const triggerSuccess = (msg: string) => {
    setShowSuccess(msg);
    setTimeout(() => setShowSuccess(null), 2500);
  };

  return (
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
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col items-center text-center relative group hover:-translate-y-1 transition-transform"
            >
              {/* Action Menu */}
              <div className="absolute top-6 right-6 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(child)}
                  className="text-gray-400 hover:text-indigo-600 bg-gray-50 p-2 rounded-full transition-colors cursor-pointer"
                  title="Edit profil"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(child.id)}
                  className="text-gray-400 hover:text-red-600 bg-gray-50 p-2 rounded-full transition-colors cursor-pointer"
                  title="Hapus profil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
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
                 Usia {new Date().getFullYear() - parseInt(child.birth_date.split('-')[0])} Tahun
              </p>
              
              {/* Stats Block */}
              <div className="w-full bg-gray-50/80 p-5 rounded-[1.2rem] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full translate-x-1/2 -translate-y-1/2 blur-xl opacity-50"></div>
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Poin Belajar</div>
                <div className="text-3xl font-black text-indigo-600">{child.total_points}</div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-4">
                 <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 flex flex-col items-center cursor-pointer hover:bg-orange-100 transition-colors">
                    <ShieldAlert className="w-5 h-5 text-orange-500 mb-1" />
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">Keamanan</span>
                 </div>
                 <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100 transition-colors">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Laporan Aktif</span>
                 </div>
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
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="addNickname">Nama Panggilan</label>
                  <input
                    id="addNickname"
                    name="addNickname"
                    type="text"
                    autoComplete="off"
                    value={formData.nickname}
                    onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                    placeholder="Masukkan nama panggilan..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Jenis Kelamin</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${formData.gender === 'male' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      👦 Laki-laki
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${formData.gender === 'female' ? 'bg-pink-50 border-pink-200 text-pink-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      👧 Perempuan
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="addDate">Tanggal Lahir</label>
                  <input
                    id="addDate"
                    name="addDate"
                    type="date"
                    autoComplete="off"
                    value={formData.birth_date}
                    onChange={e => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Batal</button>
                <button
                  onClick={handleAdd}
                  disabled={!formData.nickname.trim()}
                  className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> Tambahkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Child Modal */}
      <AnimatePresence>
        {editingId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setEditingId(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">Edit Profil Anak</h3>
                <button onClick={() => setEditingId(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="editNickname">Nama Panggilan</label>
                  <input
                    id="editNickname"
                    name="editNickname"
                    type="text"
                    autoComplete="off"
                    value={formData.nickname}
                    onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Jenis Kelamin</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${formData.gender === 'male' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      👦 Laki-laki
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${formData.gender === 'female' ? 'bg-pink-50 border-pink-200 text-pink-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                      👧 Perempuan
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block" htmlFor="editDate">Tanggal Lahir</label>
                  <input
                    id="editDate"
                    name="editDate"
                    type="date"
                    autoComplete="off"
                    value={formData.birth_date}
                    onChange={e => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setEditingId(null)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Batal</button>
                <button
                  onClick={handleEdit}
                  disabled={!formData.nickname.trim()}
                  className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Hapus Profil Anak?</h3>
              <p className="text-sm text-gray-500 mb-8">Tindakan ini tidak dapat dibatalkan. Semua data progres anak akan dihapus.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer">Batal</button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-3.5 bg-red-600 text-white rounded-2xl text-sm font-bold hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
