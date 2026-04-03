"use client";
import React from 'react';
import { mockData } from '@/data/mockData';
import { UserPlus, Edit2, ShieldAlert } from 'lucide-react';

export default function ChildrenManagementPage() {
  const children = mockData.children;

  return (
    <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative z-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Manajemen Anak</h1>
          <p className="text-gray-500 font-medium">Kelola profil dan preferensi belajar anak Anda.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3.5 rounded-[1.2rem] text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all">
          <UserPlus className="w-4 h-4" /> Tambah Anak
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {children.map(child => (
          <div key={child.id} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col items-center text-center relative group hover:-translate-y-1 transition-transform">
            
            {/* Action Menu */}
            <button className="absolute top-6 right-6 text-gray-300 hover:text-indigo-600 bg-gray-50 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100">
              <Edit2 className="w-4 h-4" />
            </button>
            
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
               <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 flex flex-col items-center">
                  <ShieldAlert className="w-5 h-5 text-orange-500 mb-1" />
                  <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">Keamanan</span>
               </div>
               <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Laporan Aktif</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
