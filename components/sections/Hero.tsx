import React from 'react';
import Link from 'next/link';
import { Star, Sparkles, Heart, Play, Users, BookOpen, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col gap-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
        {/* Colorful Decorative Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-pink-500/30 rounded-full translate-y-1/2 blur-2xl"></div>
        <div className="absolute top-10 left-1/2 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl"></div>

        {/* Floating Doodles */}
        <Star size={32} className="absolute top-12 right-24 text-yellow-300 fill-yellow-300 animate-pulse" />
        <Sparkles size={28} className="absolute bottom-16 left-12 text-pink-300" />
        <Heart size={24} className="absolute top-20 left-10 text-rose-300 fill-rose-300 rotate-12" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/30 shadow-sm">
            <Star size={14} fill="currentColor" className="text-yellow-300" /> Misi Mulia Aruna
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-sm" style={{ fontFamily: '"Grandstander", cursive' }}>
            Masa Depan yang Lebih Aman untuk Si Kecil!
          </h1>
          <p className="text-orange-50 text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-xl">
            Edukasi perlindungan diri usia dini (3-6 tahun) berbasis cerita dan simulasi interaktif. Cegah kekerasan seksual dengan cara yang seru dan tanpa rasa takut.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/register" className="bg-white text-orange-600 px-8 py-4 rounded-full font-black text-sm md:text-base shadow-xl hover:scale-105 hover:shadow-orange-900/20 transition-all flex items-center gap-2">
              <Play size={20} fill="currentColor" /> Mulai Petualangan
            </Link>
            <Link href="#features" className="bg-orange-600/30 backdrop-blur-sm border border-orange-200/50 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-orange-600/50 transition-colors">
              Lihat Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transform md:-translate-y-12 px-4 md:px-12 relative z-20">
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center"><Users size={28} /></div>
          <div>
            <div className="text-2xl font-black text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>276K+</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Pengguna</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center"><BookOpen size={28} /></div>
          <div>
            <div className="text-2xl font-black text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>50+</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modul Edukatif</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center"><Shield size={28} /></div>
          <div>
            <div className="text-2xl font-black text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>100%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aman & Interaktif</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
