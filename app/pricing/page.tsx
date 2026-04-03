"use client";
import React from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Star,
  Heart, 
  Mail, 
  Phone
} from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">

        {/* ================= PRICING ================= */}
        <section>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 drop-shadow-sm" style={{ fontFamily: '"Grandstander", cursive' }}>
              Pilihan Paket Belajar
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">Mulai dari akses gratis hingga sistem sekolah yang komprehensif, kami menyediakan opsi terbaik untuk pendidikan si kecil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Free */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 flex flex-col h-full justify-between shadow-sm hover:shadow-xl transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-2">Dasar</h3>
                <div className="text-4xl font-black text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Gratis</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500"/> Akses E-Modul Dasar</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500"/> Video Animasi Terbatas</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500"/> 1 Profil Anak</li>
                </ul>
              </div>
              <button className="w-full py-4 rounded-full font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors mt-auto">
                Buat Akun Gratis
              </button>
            </div>

            {/* Premium (Highlighted with Orange Gradient) */}
            <div className="bg-gradient-to-b from-orange-500 to-orange-600 rounded-[2.5rem] p-10 border-4 border-orange-200 text-white flex flex-col relative overflow-hidden shadow-2xl shadow-orange-500/30 transform scale-105 z-10">
              {/* Star doodle inside card */}
              <Star size={64} className="absolute -top-4 -right-4 text-orange-400 opacity-50" fill="currentColor" />
              
              <div className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                Super Aruna
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-orange-100 uppercase tracking-widest mb-2 mt-2">Premium</h3>
                <div className="text-5xl font-black text-white mb-8 drop-shadow-sm" style={{ fontFamily: '"Grandstander", cursive' }}>Rp 15k<span className="text-lg font-normal">/bln</span></div>
                <ul className="space-y-4 mb-10 relative z-10">
                  <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={24} className="text-yellow-300"/> Akses Penuh Semua Modul</li>
                  <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={24} className="text-yellow-300"/> Simulasi Safe Zone AR</li>
                  <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={24} className="text-yellow-300"/> Fitur Tanya EduGuide AI</li>
                  <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={24} className="text-yellow-300"/> Laporan Progres Detail</li>
                </ul>
              </div>
              <button className="w-full py-4 rounded-full font-bold text-sm md:text-base bg-white text-orange-600 hover:scale-105 transition-transform shadow-lg relative z-10 mt-auto">
                Berlangganan Sekarang
              </button>
            </div>

            {/* B2B / Institution */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 flex flex-col h-full justify-between shadow-sm hover:shadow-xl transition-all">
              <div>
                <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-2">Institusi</h3>
                <div className="text-4xl font-black text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Kustom</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500"/> Lisensi Ratusan Siswa</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500"/> Portal Dashboard Guru</li>
                  <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500"/> Integrasi Kurikulum PAUD</li>
                </ul>
              </div>
              <button className="w-full py-4 rounded-full font-bold text-sm bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors mt-auto">
                Hubungi Tim Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ================= CONTACT & FOOTER ================= */}
      {/* Newsletter / CTA Overlay */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-20 translate-y-1/2 mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-slate-800">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Siap melindungi si kecil?</h3>
            <p className="text-slate-400 text-sm">Dapatkan E-book panduan edukasi seksual anak secara gratis.</p>
          </div>
          <div className="flex w-full md:w-auto bg-white p-1.5 rounded-full border-4 border-slate-700 focus-within:border-orange-500 transition-colors">
            <input type="email" placeholder="Masukkan email..." className="px-4 py-2 text-sm outline-none w-full md:w-64 rounded-full"/>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">Kirim</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200 pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">
            
            <div className="text-center md:text-left">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 tracking-wide uppercase mb-4 block" style={{ fontFamily: '"Grandstander", cursive' }}>
                ARUNA
              </span>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed mb-6">
                Platform edukasi inovatif sebagai solusi preventif kekerasan seksual anak usia dini di era digital.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                  <Heart size={18} />
                </a>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 max-w-sm w-full">
              <h4 className="font-bold text-slate-800 mb-6 text-center md:text-left">Butuh Bantuan / Kemitraan?</h4>
              <div className="space-y-4">
                <a href="mailto:halo@aruna.id" className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Mail size={20}/></div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Resmi</div>
                    <div className="text-sm font-bold text-slate-700">ahmadfahr2004@gmail.com</div>
                  </div>
                </a>
                <a href="tel:089509922574" className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Phone size={20}/></div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp / Telepon</div>
                    <div className="text-sm font-bold text-slate-700">0895-0992-2574</div>
                  </div>
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <p>© 2026 Aruna Edu & Tim Pengusul UNNES.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Syarat Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
