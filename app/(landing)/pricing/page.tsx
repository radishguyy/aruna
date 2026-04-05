"use client";
import React from 'react';
import {
  CheckCircle2,
  Star,
  Zap,
  Building2,
  Rocket
} from 'lucide-react';
import { mockData } from '@/data/mockData';

export default function PricingPage() {
  const { pricing } = mockData;

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-24">

        {/* ================= HEADER ================= */}
        <section className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-200">
            <Zap size={14} className="fill-current" /> Paket Berlangganan
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-800 mb-6 drop-shadow-sm tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
            Pilihan Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 text-glow">Belajar</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Investasi terbaik untuk perlindungan dan masa depan si kecil. Pilih paket yang sesuai dengan kebutuhan keluarga atau institusi Anda.
          </p>
        </section>

        {/* ================= PRICING GRID ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricing.map((plan) => {
            const isPremium = plan.id === 'premium';
            const isFree = plan.id === 'free';
            const isInstitution = plan.id === 'institution';

            return (
              <div
                key={plan.id}
                className={`
                  relative rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-500
                  ${isPremium
                    ? 'bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-2xl shadow-orange-500/30 scale-105 z-10 border-4 border-orange-200'
                    : 'bg-white border-2 border-slate-100 text-slate-800 hover:shadow-xl hover:-translate-y-1'
                  }
                `}
              >
                {isPremium && (
                  <>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                      Paling Populer
                    </div>
                    <Star size={80} className="absolute -top-6 -right-6 text-white/20 rotate-12" fill="currentColor" />
                  </>
                )}

                <div className="mb-8">
                  <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                    ${isPremium ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}
                  `}>
                    {isFree && <Zap size={24} />}
                    {plan.id === 'standard' && <Rocket size={24} />}
                    {isPremium && <Star size={24} className="fill-current" />}
                    {isInstitution && <Building2 size={24} />}
                  </div>

                  <h3 className={`text-sm font-black uppercase tracking-[0.2em] mb-2 ${isPremium ? 'text-orange-100' : 'text-slate-400'}`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-sm font-bold ${isPremium ? 'text-orange-100' : 'text-slate-400'}`}>
                        /{plan.period}
                      </span>
                    )}
                  </div>

                  <p className={`text-sm leading-relaxed mb-8 font-medium ${isPremium ? 'text-orange-50' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>

                  <div className={`h-px w-full mb-8 ${isPremium ? 'bg-white/20' : 'bg-slate-100'}`} />

                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-bold">
                        <CheckCircle2
                          size={18}
                          className={`shrink-0 mt-0.5 ${isPremium ? 'text-yellow-300' : 'text-orange-500'}`}
                        />
                        <span className={isPremium ? 'text-white' : 'text-slate-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`
                  w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all mt-auto
                  ${isPremium
                    ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-xl'
                    : isInstitution
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}>
                  {isFree ? 'Mulai Gratis' : isInstitution ? 'Hubungi Kami' : 'Pilih Paket'}
                </button>
              </div>
            );
          })}
        </section>

        {/* ================= FAQ SHORT ================= */}
        <section className="mt-32 text-center">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Masih Ragu?</p>
          <h2 className="text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>
            Pertanyaan Umum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Apakah bisa upgrade paket kapan saja?</h4>
              <p className="text-slate-500 text-sm">Tentu! Anda dapat mengupgrade paket Anda kapan saja dan sisa masa aktif paket sebelumnya akan dikonversi secara otomatis.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Bagaimana sistem lisensi institusi?</h4>
              <p className="text-slate-500 text-sm">Untuk paket institusi, kami memberikan kode unik yang dapat digunakan oleh seluruh guru dan siswa di bawah naungan sekolah Anda.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
