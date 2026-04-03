"use client";
import React from 'react';
import {
  Shield,
  Play,
  BookOpen,
  Video,
  Camera,
  Star,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Heart,
  Sparkles,
  Zap,
  MessageCircle,
  Quote
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-20">

        {/* ================= 1. HOME (Hero & Stats) ================= */}
        <section id="home" className="flex flex-col gap-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
            {/* Colorful Decorative Background Shapes (More Colorful!) */}
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
                <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-black text-sm md:text-base shadow-xl hover:scale-105 hover:shadow-orange-900/20 transition-all flex items-center gap-2">
                  <Play size={20} fill="currentColor" /> Mulai Petualangan
                </button>
                <button className="bg-orange-600/30 backdrop-blur-sm border border-orange-200/50 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-orange-600/50 transition-colors">
                  Lihat Demo
                </button>
              </div>
            </div>
          </div>

          {/* New Element: Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transform md:-translate-y-12 px-4 md:px-12 relative z-20">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center"><Users size={28} /></div>
              <div>
                <div className="text-2xl font-black text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>2.8k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Anak Terlindungi</div>
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

        {/* ================= 2. FEATURES (More Colorful Cards) ================= */}
        <section id="features">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>
                Tiga Cara Seru Belajar!
              </h2>
              <span className="text-sm font-bold text-slate-500">Edukasi adaptif sesuai gaya belajar anak.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Blue Theme */}
            <div className="bg-white border-2 border-blue-100 rounded-[2rem] p-8 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase bg-blue-100 px-3 py-1.5 rounded-full">Smart Digfo</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: '"Grandstander", cursive' }}>Buku Pintar Interaktif</h3>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">Belajar mengenal anggota tubuh dan batasan privasi lewat infografis visual yang bisa ditekan dan mengeluarkan suara.</p>
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>

            {/* Card 2: Pink/Rose Theme */}
            <div className="bg-white border-2 border-rose-100 rounded-[2rem] p-8 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-100/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                  <Video size={28} />
                </div>
                <span className="text-[10px] font-black text-rose-600 tracking-widest uppercase bg-rose-100 px-3 py-1.5 rounded-full">Smart Digvi</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: '"Grandstander", cursive' }}>Kartun Edukasi Aman</h3>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">Tonton petualangan pahlawan Aruna melawan situasi tidak nyaman. Format playlist yang 100% bebas dari iklan pengganggu.</p>
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>

            {/* Card 3: Teal/Green Theme */}
            <div className="bg-white border-2 border-teal-100 rounded-[2rem] p-8 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-100/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform">
                  <Camera size={28} />
                </div>
                <span className="text-[10px] font-black text-teal-600 tracking-widest uppercase bg-teal-100 px-3 py-1.5 rounded-full">Safe Zone AR</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: '"Grandstander", cursive' }}>Simulasi Realitas AR</h3>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">Gunakan kamera HP untuk memunculkan karakter 3D di dunia nyata dan berlatih cara menolak sentuhan yang tidak aman.</p>
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. ABOUT US ================= */}
        <section id="about" className="bg-[#FFF8F1] rounded-[3rem] p-8 md:p-16 border-2 border-orange-100 shadow-sm flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>

          <div className="w-full md:w-1/2 relative z-10">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-orange-200">
              Tim Di Balik Aruna
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
              Berawal Dari Kepedulian Kampus.
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed text-lg">
              Aruna (sebelumnya E-VR) lahir dari keresahan melihat tingginya angka kekerasan pada anak, dimana 80% terjadi di lingkungan terdekat.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              Kami menggabungkan ilmu psikologi anak dengan teknologi modern agar edukasi seksual menjadi petualangan yang menyenangkan dan mudah dipahami, tanpa rasa tabu.
            </p>
            <button className="flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600 transition-colors">
              Baca Cerita Lengkap Kami <ArrowRight size={18} />
            </button>
          </div>

          {/* Colorful Team Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative z-10">
            <div className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-blue-100/50 border-b-4 border-blue-200 hover:-translate-y-2 transition-transform">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-2 border-white shadow-inner">🚀</div>
              <h4 className="font-black text-slate-800 text-lg">Fachri</h4>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">CEO & Vision</p>
            </div>
            <div className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-pink-100/50 border-b-4 border-pink-200 mt-8 hover:-translate-y-2 transition-transform">
              <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-2 border-white shadow-inner">🎨</div>
              <h4 className="font-black text-slate-800 text-lg">Vina</h4>
              <p className="text-[10px] text-pink-500 font-bold uppercase tracking-widest mt-1">CMO / Design</p>
            </div>
            <div className="bg-white rounded-[2rem] p-6 text-center shadow-lg shadow-teal-100/50 border-b-4 border-teal-200 -mt-8 hover:-translate-y-2 transition-transform">
              <div className="w-20 h-20 bg-teal-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 border-2 border-white shadow-inner">💻</div>
              <h4 className="font-black text-slate-800 text-lg">Andi</h4>
              <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest mt-1">CTO / Tech</p>
            </div>
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center">
              <Users className="text-gray-300 mb-3" size={40} />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">UNNES Team</span>
            </div>
          </div>
        </section>

        {/* ================= NEW: TESTIMONIALS ================= */}
        <section id="testimonials" className="pt-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-purple-200">
              <MessageCircle size={16} /> Apa Kata Mereka
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
              Dipercaya Oleh Orang Tua & Guru
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testi 1 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-sm relative pt-12">
              <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <Quote size={20} fill="currentColor" />
              </div>
              <p className="text-slate-600 font-medium mb-6 italic">
                "Anak saya awalnya sangat susah diajak bicara soal privasi tubuh. Lewat animasi Aruna, dia jadi lebih paham dan berani bilang 'TIDAK' kalau ada yang sentuh sembarangan."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">B</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Bunda Risa</h4>
                  <span className="text-xs text-slate-400 font-bold">Orang Tua Anak Usia 5 Thn</span>
                </div>
              </div>
            </div>

            {/* Testi 2 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-orange-100 shadow-sm relative pt-12 transform md:-translate-y-4">
              <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <Quote size={20} fill="currentColor" />
              </div>
              <p className="text-slate-600 font-medium mb-6 italic">
                "Sebagai pendidik, aplikasi ini sangat membantu kami di kelas. Modulnya terstruktur rapi dan fitur EduGuide AI bantu saya menjawab pertanyaan kritis anak-anak."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">D</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Ibu Dina</h4>
                  <span className="text-xs text-slate-400 font-bold">Guru PAUD, Demak</span>
                </div>
              </div>
            </div>

            {/* Testi 3 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-teal-100 shadow-sm relative pt-12">
              <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <Quote size={20} fill="currentColor" />
              </div>
              <p className="text-slate-600 font-medium mb-6 italic">
                "Pendekatan 'Learning by Doing' lewat simulasi AR ini luar biasa. Memori spasial anak jadi aktif, sehingga edukasinya jauh lebih membekas dibanding ceramah."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">A</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Andini, M.Psi</h4>
                  <span className="text-xs text-slate-400 font-bold">Psikolog Anak</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. PRICING ================= */}
        <section id="pricing">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
              Pilihan Paket Belajar
            </h2>
            <p className="text-slate-500">Mulai dari akses gratis hingga sistem sekolah yang komprehensif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 flex flex-col">
              <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-2">Dasar</h3>
              <div className="text-4xl font-black text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Gratis</div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500" /> Akses E-Modul Dasar</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500" /> Video Animasi Terbatas</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-green-500" /> 1 Profil Anak</li>
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                Buat Akun Gratis
              </button>
            </div>

            {/* Premium (Highlighted with Orange Gradient) */}
            <div className="bg-gradient-to-b from-orange-500 to-orange-600 rounded-[2.5rem] p-8 border-4 border-orange-200 text-white flex flex-col relative overflow-hidden shadow-2xl shadow-orange-500/30 transform md:-translate-y-6">
              {/* Star doodle inside card */}
              <Star size={64} className="absolute -top-4 -right-4 text-orange-400 opacity-50" fill="currentColor" />

              <div className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                Super Aruna
              </div>
              <h3 className="text-lg font-bold text-orange-100 uppercase tracking-widest mb-2 mt-2">Premium</h3>
              <div className="text-4xl font-black text-white mb-8 drop-shadow-sm" style={{ fontFamily: '"Grandstander", cursive' }}>Rp 15k<span className="text-lg font-normal">/bln</span></div>
              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={20} className="text-yellow-300" /> Akses Penuh Semua Modul</li>
                <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={20} className="text-yellow-300" /> Simulasi Safe Zone AR</li>
                <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={20} className="text-yellow-300" /> Fitur Tanya EduGuide AI</li>
                <li className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={20} className="text-yellow-300" /> Laporan Progres Detail</li>
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm md:text-base bg-white text-orange-600 hover:scale-105 transition-transform shadow-lg relative z-10">
                Berlangganan Sekarang
              </button>
            </div>

            {/* B2B / Institution */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-gray-100 flex flex-col">
              <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-2">Institusi</h3>
              <div className="text-4xl font-black text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Kustom</div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500" /> Lisensi Ratusan Siswa</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500" /> Portal Dashboard Guru</li>
                <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={18} className="text-indigo-500" /> Integrasi Kurikulum PAUD</li>
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors">
                Hubungi Tim Sales
              </button>
            </div>
          </div>
        </section>

        {/* ================= 5. BLOG / ARTICLES ================= */}
        <section id="blog">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>
                Jurnal & Tips Parenting
              </h2>
              <p className="text-slate-500">Panduan untuk Ayah & Bunda.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:border-orange-300 hover:text-orange-500 transition-colors">
              Lihat Semua <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-4 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-full sm:w-1/3 h-40 sm:h-auto bg-orange-100 rounded-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80" alt="Blog 1" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
              </div>
              <div className="w-full sm:w-2/3 py-2 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 w-fit px-3 py-1 rounded-full tracking-widest uppercase mb-3 border border-orange-100">PANDUAN ORANG TUA</span>
                <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">Cara Membahas Batasan Tubuh Tanpa Canggung</h4>
                <p className="text-sm text-slate-500 line-clamp-2">Pelajari metode praktis untuk mengajarkan anak tentang sentuhan aman dan tidak aman di rumah.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-3xl p-4 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-full sm:w-1/3 h-40 sm:h-auto bg-blue-100 rounded-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80" alt="Blog 2" className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
              </div>
              <div className="w-full sm:w-2/3 py-2 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 w-fit px-3 py-1 rounded-full tracking-widest uppercase mb-3 border border-blue-100">EDUTECH</span>
                <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">Meningkatkan Daya Ingat Anak Lewat Animasi</h4>
                <p className="text-sm text-slate-500 line-clamp-2">Evaluasi kami tentang bagaimana penceritaan digital dapat meningkatkan pemahaman aturan keamanan.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ================= 6. CONTACT & FOOTER ================= */}
      {/* Newsletter / CTA Overlay */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-20 translate-y-1/2">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-slate-800">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Siap melindungi si kecil?</h3>
            <p className="text-slate-400 text-sm">Dapatkan E-book panduan edukasi seksual anak secara gratis.</p>
          </div>
          <div className="flex w-full md:w-auto bg-white p-1.5 rounded-full border-4 border-slate-700 focus-within:border-orange-500 transition-colors">
            <input type="email" placeholder="Masukkan email..." className="px-4 py-2 text-sm outline-none w-full md:w-64 rounded-full" />
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
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Mail size={20} /></div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Resmi</div>
                    <div className="text-sm font-bold text-slate-700">ahmadfahr2004@gmail.com</div>
                  </div>
                </a>
                <a href="tel:089509922574" className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Phone size={20} /></div>
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