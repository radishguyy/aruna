"use client";
import React from 'react';
import { Crown, Zap, CheckCircle2 } from 'lucide-react';
import { mockData } from '@/data/mockData';

export default function BillingPage() {
  const user = mockData.users[0]; // Assuming first is parent

  return (
    <div className="p-6 md:p-12 space-y-10 font-sans max-w-5xl mx-auto h-full">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Langganan</h1>
        <p className="text-gray-500 font-medium">Kelola paket layanan dan tagihan Aruna Anda.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-[#312e81] to-purple-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/30 border border-indigo-800">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        
        <Crown className="absolute -top-16 -right-16 w-80 h-80 opacity-[0.05] -rotate-12" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 text-amber-300" />
              Paket Aktif
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">Aruna {user.subscription_status}</h2>
            <p className="text-indigo-200 text-sm md:text-base font-medium flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-emerald-400" />
               Valid dan aktif hingga <span className="font-bold text-white">31 Desember 2024</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <button className="w-full bg-white text-indigo-900 font-black px-8 py-4 rounded-[1.2rem] hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 border border-white">
              Perbarui Paket
            </button>
            <button className="w-full text-indigo-200/80 hover:text-white px-8 py-3 text-[13px] font-bold transition-colors hover:bg-white/5 rounded-xl">
              Batalkan Langganan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
