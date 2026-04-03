"use client";
import React from 'react';
import { mockData } from '@/data/mockData';
import { Users, GraduationCap, CheckCircle } from 'lucide-react';

export default function TeacherOverview() {
  const user = mockData.users.find(u => u.role === 'teacher') || mockData.users[1];
  const institution = mockData.institutions[0];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Halo, {user.name}</h1>
        <p className="text-gray-500">Ringkasan aktivitas murid di {institution.name} hari ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#006A50] text-white p-6 rounded-2xl shadow-md">
           <Users className="w-8 h-8 mb-4 opacity-80" />
           <div className="text-4xl font-black mb-1">24</div>
           <div className="text-sm text-green-100 font-medium">Total Murid Terdaftar</div>
        </div>
        <div className="bg-[#DD6B66] text-white p-6 rounded-2xl shadow-md">
           <GraduationCap className="w-8 h-8 mb-4 opacity-80" />
           <div className="text-4xl font-black mb-1">12</div>
           <div className="text-sm text-rose-100 font-medium">Murid Aktif Hari Ini</div>
        </div>
        <div className="bg-[#F9D308] text-gray-900 p-6 rounded-2xl shadow-md">
           <CheckCircle className="w-8 h-8 mb-4 opacity-80" />
           <div className="text-4xl font-black mb-1">85%</div>
           <div className="text-sm text-gray-800 font-medium">Rata-rata Penyelesaian Modul</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6">Aktivitas Terakhir</h2>
        <div className="space-y-4">
           {/* Dummy List */}
           {[1,2,3].map(i => (
             <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition cursor-pointer border border-transparent hover:border-gray-100">
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">M</div>
               <div className="flex-1">
                 <div className="font-bold text-gray-900">Murid Dummy {i}</div>
                 <div className="text-xs text-gray-500">Mengerjakan modul "Batasan Diri"</div>
               </div>
               <div className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Selesai</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
