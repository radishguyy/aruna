"use client";
import React from 'react';
import { 
  Shield, 
  Users, 
  Heart, 
  Mail, 
  Phone, 
  ArrowRight,
  BookOpen,
  Target,
  Sparkles,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col gap-24 pb-24">

        {/* ================= HERO SECTION ================= */}
        <section className="pt-16 md:pt-24 text-center mt-20 relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-[80px] -z-10 mix-blend-multiply animate-pulse"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-200/40 rounded-full blur-[60px] -z-10 mix-blend-multiply"></div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-200 shadow-sm">
              <Sparkles size={14} className="text-orange-500" /> Tentang Aruna
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-[1.1] max-w-4xl mx-auto drop-shadow-sm" style={{ fontFamily: '"Grandstander", cursive' }}>
              Membentuk Generasi Pemberani, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Satu Cerita Sekali Waktu.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Kami percaya bahwa perlindungan anak dimulai dari edukasi yang menyenangkan, bukan menakutkan. Mari ciptakan ruang aman bersama Aruna.
            </p>
          </motion.div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-orange-200 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Misi Kami</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Memberikan akses edukasi pencegahan kekerasan anak yang interaktif, mudah dipahami, dan relevan dengan dunia anak, sehingga mereka tahu cara melindungi diri dengan percaya diri.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-pink-200 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200 mb-8 transform rotate-6 group-hover:rotate-0 transition-transform">
              <BookOpen size={32} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Visi Kami</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Menjadi pionir platform edutech di Indonesia yang secara efektif menekan angka kekerasan anak melalui kemitraan strategis dengan orang tua dan pendidik.
            </p>
          </motion.div>
        </section>

        {/* ================= THE STORY ================= */}
        <section className="bg-[#FFF8F1] rounded-[3rem] p-8 md:p-16 border-2 border-orange-100 flex flex-col md:flex-row gap-16 items-center relative overflow-hidden">
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/50 rounded-full blur-3xl mix-blend-multiply"></div>
          
          <div className="w-full md:w-1/2 relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
              Berawal Dari Kepedulian Kampus.
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Aruna (sebelumnya bernama E-VR) lahir dari keresahan kompetisi mahasiswa di UNNES ketika melihat tingginya angka kekerasan pada anak, dimana lebih dari 80% kasus ironisnya terjadi di lingkungan terdekat mereka.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Kami menggabungkan prinsip dasar psikologi anak prasekolah dengan teknologi digital harian (seperti Augmented Reality dan Animasi) untuk memastikan edukasi pengenalan tubuh tidak lagi dianggap tabu, melainkan sebuah petualangan yang asyik.
            </p>
            <div className="pt-4 flex gap-4">
               <div className="flex flex-col">
                 <span className="text-3xl font-black text-orange-500">2026</span>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tahun Berdiri</span>
               </div>
               <div className="w-px bg-orange-200 h-12 self-end"></div>
               <div className="flex flex-col">
                 <span className="text-3xl font-black text-orange-500">UNNES</span>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Inkubator</span>
               </div>
            </div>
          </div>
          
          {/* Colorful Team Cards Matrix */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative z-10">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-blue-100/50 border-b-4 border-blue-200">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-inner">🚀</div>
              <h4 className="font-black text-slate-800 text-lg">Fachri</h4>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Hustler / CEO</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-pink-100/50 border-b-4 border-pink-200 mt-8">
              <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-inner">🎨</div>
              <h4 className="font-black text-slate-800 text-lg">Vina</h4>
              <p className="text-[10px] text-pink-500 font-bold uppercase tracking-widest mt-1">Hipster / CMO</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-teal-100/50 border-b-4 border-teal-200 -mt-8">
              <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-inner">💻</div>
              <h4 className="font-black text-slate-800 text-lg">Andi</h4>
              <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest mt-1">Hacker / CTO</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-help">
              <Award className="text-gray-300 mb-3" size={40} />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Didukung Oleh</span>
              <span className="text-xs font-black text-slate-600 mt-1">Tim Ahli Psikologi</span>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ================= CONTACT & FOOTER ================= */}
      {/* Newsletter / CTA Overlay */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-20 translate-y-1/2">
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
