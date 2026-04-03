"use client";
import React from 'react';

export default function ReportsPage() {
  return (
    <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full flex flex-col">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Rapor Belajar</h1>
        <p className="text-gray-500 font-medium">Analisa mendalam perkembangan anak berbasis AI.</p>
      </div>

      <div className="flex-1 bg-white p-8 md:p-16 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100/50 text-center text-gray-500 flex flex-col items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-1000"></div>
         <div className="text-8xl md:text-9xl mb-8 filter drop-shadow-md grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-110">📊</div>
         <h3 className="text-2xl font-black text-gray-900 mb-3 relative z-10 w-full">Belum ada cukup data</h3>
         <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed relative z-10 font-medium">
           Si Kecil perlu menyelesaikan minimal <span className="font-bold text-indigo-600">3 Modul</span> agar EduGuide AI dapat membuat laporan komprehensif.
         </p>
      </div>
    </div>
  );
}
