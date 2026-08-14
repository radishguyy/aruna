import React, { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import {
  Target,
  BookOpen,
  Sparkles,
  Shield,
  Heart,
  Users,
  ArrowRight,
  Quote,
  Home,
  GraduationCap,
  Building2,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { mockData } from '@/data/mockData';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

export default function AboutPage() {
  const { aboutSection, team } = mockData;

  useEffect(() => {
    const glide = new Glide('.team-glide', {
      type: 'carousel',
      autoplay: 3000,
      hoverpause: true,
      perView: 3,
      gap: 32,
      breakpoints: {
        1024: {
          perView: 2
        },
        768: {
          perView: 1
        }
      }
    });

    glide.mount();

    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <MainLayout>
      <div className="font-sans text-slate-800 bg-[#FAFCFF] min-h-screen selection:bg-orange-200 pb-24 overflow-x-hidden pt-12">

        {/* ================= 1. HERO SECTION ================= */}
        <section className="pt-20 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-200 shadow-sm">
                <Sparkles size={14} className="text-orange-500" /> {aboutSection.hero.tag}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-[1.1]" style={{ fontFamily: '"Grandstander", cursive' }}>
                {aboutSection.hero.title.split(',')[0]}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">{aboutSection.hero.title.split(',')[1] || 'Bukan Korban.'}</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                {aboutSection.hero.description}
              </p>
            </motion.div>
          </div>

          {/* Bento Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
              {/* Top Wide */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2rem] p-8 flex items-center overflow-hidden relative border border-blue-100/50">
                <div className="relative z-10 max-w-[70%]">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-4"><Sparkles size={14} /> Teknologi Pintar</div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Modul Edukasi AI</h3>
                  <p className="text-slate-500">Materi yang menyesuaikan dengan pemahaman dan usia anak lewat bantuan EduGuide AI.</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-200/30 blur-2xl"></div>
              </div>

              {/* Top Right Tall */}
              <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 bg-gradient-to-b from-pink-100 to-pink-200 rounded-[2rem] p-8 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[250px] border border-pink-200/50">
                <div className="bg-white p-4 rounded-full shadow-sm text-pink-500 mb-6 mt-4 rotate-12 group-hover:rotate-0 transition-transform"><Shield size={48} /></div>
                <div className="relative z-10 w-full bg-white/60 backdrop-blur-md p-5 rounded-3xl">
                  <span className="font-bold text-pink-700 block mb-1 text-xl" style={{ fontFamily: '"Grandstander", cursive' }}>Safe Zone AR</span>
                  <span className="text-sm text-pink-600 font-medium text-balance">Simulasi area aman yang interaktif untuk si kecil mengenali privasi.</span>
                </div>
              </div>

              {/* Bottom Left Square */}
              <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-orange-400 to-orange-500 rounded-[2rem] p-8 text-white flex flex-col justify-center border border-orange-300">
                <div className="text-6xl font-black mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>80%</div>
                <div className="font-medium text-orange-50 text-sm">Pelaku kekerasan dari lingkungan terdekat.</div>
              </div>

              {/* Bottom Mid Square */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
                <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400" style={{ fontFamily: '"Grandstander", cursive' }}>2.848+</div>
                <div className="font-medium text-slate-400 text-sm">Kasus anak tercatat oleh Komnas PA.</div>
              </div>

              {/* Bottom Full Wide Image */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-orange-50 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between border-2 border-orange-100 gap-6">
                <div className="flex -space-x-4">
                  <div className="w-16 h-16 rounded-full border-4 border-orange-50 bg-pink-200 flex items-center justify-center text-2xl z-30">👧</div>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-50 bg-blue-200 flex items-center justify-center text-2xl z-20">🧒</div>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-50 bg-teal-200 flex items-center justify-center text-2xl z-10">📚</div>
                </div>
                <div className="text-center md:text-right">
                  <h4 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Lebih dari Sekadar Bermain</h4>
                  <p className="text-slate-500 font-medium">Membangun generasi sadar privasi sejak dini.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= 2. STATS & MISSION SECTION ================= */}
        <section className="py-20 border-b border-slate-100">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 justify-between mb-20 items-start">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 md:max-w-md leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
                {aboutSection.noblePurpose.title}
              </h2>
              <div className="md:max-w-xl text-slate-500 space-y-6 text-lg">
                <p>
                  {aboutSection.noblePurpose.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {aboutSection.noblePurpose.sdgs.map((sdg) => (
                    <span key={sdg} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-200">
              {aboutSection.marketPotential.stats.map((stat) => (
                <div key={stat.label} className="md:px-8 first:pl-0">
                  <div className="text-5xl font-black text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-slate-500 font-medium text-sm">
                    {stat.label === 'TAM' && 'Total Potensi Pasar (TAM) di Indonesia.'}
                    {stat.label === 'SAM' && 'Pasar yang Dapat Dilayani (SAM).'}
                    {stat.label === 'SOM' && 'Target Pasar Awal (SOM) kami.'}
                  </div>
                </div>
              ))}
              <div className="md:px-8">
                <div className="text-5xl font-black text-slate-800 mb-2">4+</div>
                <div className="text-slate-500 font-medium text-sm">SDGs utama yang kami dukung penuh.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. CORE VALUES SECTION ================= */}
        <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6 text-center border-b border-slate-100">
          <h2 className="text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Nilai Inti Kami</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
            Kami percaya pada pembangunan pondasi perlindungan berbasis empati, interaktivitas, dan kesesuaian usia anak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center shadow-inner"><Users size={24} /></div>
              <h4 className="text-xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Kolaborasi</h4>
              <p className="text-slate-500 text-sm leading-relaxed text-balance">Menghubungkan orang tua, guru, dan ahli psikologi untuk menciptakan ekosistem perlindungan yang solid.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-2xl flex items-center justify-center shadow-inner"><BookOpen size={24} /></div>
              <h4 className="text-xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Edukasi Adaptif</h4>
              <p className="text-slate-500 text-sm leading-relaxed text-balance">Modul pembelajaran yang dirancang khusus menyesuaikan gaya tangkap anak usia 3-6 tahun.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner"><Shield size={24} /></div>
              <h4 className="text-xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Ruang Aman</h4>
              <p className="text-slate-500 text-sm leading-relaxed text-balance">Berkomitmen menjaga standar keamanan tertinggi dalam setiap cerita dan materi yang disajikan.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-100 text-teal-500 rounded-2xl flex items-center justify-center shadow-inner"><Heart size={24} /></div>
              <h4 className="text-xl font-bold text-slate-800" style={{ fontFamily: '"Grandstander", cursive' }}>Pendekatan Empati</h4>
              <p className="text-slate-500 text-sm leading-relaxed text-balance">Menyampaikan isu sensitif kekerasan seksual tanpa menimbulkan rasa takut atau trauma pada anak.</p>
            </div>
          </div>
        </section>

        {/* ================= 4. BACKED BY SECTION ================= */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 md:px-6 text-center border-b border-slate-100">
          <h3 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Didukung oleh yang terbaik</h3>
          <p className="text-slate-500 mb-12">Bangga didukung oleh institusi dan ahli yang sevisi dengan kami.</p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-black text-xl text-slate-700 tracking-wider">
              <span className="bg-slate-800 text-white w-8 h-8 flex items-center justify-center rounded-lg">U</span> UNNES
            </div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-700 tracking-wider">
              <Target className="text-slate-800" /> P2MW
            </div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-700 tracking-wider">
              <Sparkles className="text-slate-800" /> INKUBATOR
            </div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-700 tracking-wider">
              <Heart className="text-slate-800" /> TIM PSIKOLOGI
            </div>
          </div>
        </section>

        {/* ================= 5. TEAM SECTION ================= */}
        <section className="pt-24 pb-32 max-w-[1200px] mx-auto px-4 md:px-6 border-b border-slate-100 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Tim Cemerlang <span className="text-blue-600">Aruna</span></h2>
          <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">
            Orang-orang di balik layar yang bekerja keras menjadikan produk kami yang terbaik.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="w-full">
            <div className="team-glide glide relative pt-4 pb-16">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                  {team.map((member, i) => (
                    <li key={i} className="glide__slide pb-20 px-2">
                      <div className="relative group py-2">
                        {/* Big Image Container */}
                        <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 border border-slate-200">
                          <img
                            src={member.image_url || `https://api.placeholder/600/800?text=${member.name}`}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        {/* Overlapping White Card styling */}
                        <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center border border-slate-50 group-hover:border-blue-100 transition-colors">
                          <h4 className="font-bold text-slate-800 text-lg mb-1">{member.name}</h4>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{member.role}</p>
                          <p className="text-slate-400 text-[9px] mt-1 font-medium italic">{member.expertise}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dots/Bullets Indicators */}
              <div className="glide__bullets flex justify-center gap-3 mt-12" data-glide-el="controls[nav]">
                {team.map((_, i) => (
                  <button
                    key={i}
                    className="glide__bullet h-2.5 rounded-full bg-slate-200 transition-all duration-300 hover:bg-orange-300 focus:outline-none w-2.5 [&.glide__bullet--active]:bg-orange-500 [&.glide__bullet--active]:w-10 shadow-sm"
                    data-glide-dir={`=${i}`}
                  ></button>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= 6. TESTIMONIALS (Masonry) ================= */}
        <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6 border-b border-slate-100 text-center bg-slate-50 rounded-[4rem] mt-12 mb-12 border-2 border-white shadow-inner">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 border border-slate-200 mb-6 uppercase tracking-widest">
            <Quote size={14} className="text-orange-500" /> Apa Kata Mereka
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Dipercaya oleh orang tua & guru</h2>
          <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">
            Cari tahu mengapa platform edukasi AR kami menjadi pilihan utama untuk melindungi si kecil.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto items-start">
            {/* Testimonial Cards */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative hover:border-orange-200 transition-colors">
              <Quote size={32} className="text-orange-100 absolute top-6 right-6" />
              <p className="text-slate-600 mb-8 relative z-10 font-medium italic leading-relaxed">"Anak saya awalnya sangat susah diajak bicara soal privasi tubuh. Lewat animasi Aruna, dia jadi lebih paham dan berani bilang 'TIDAK'."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">B</div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">Bunda Risa</div>
                  <div className="text-slate-400 text-xs">Orang Tua, Anak Usia 5 Thn</div>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative hover:border-pink-200 transition-colors">
              <Quote size={32} className="text-pink-100 absolute top-6 right-6" />
              <p className="text-slate-600 mb-8 relative z-10 font-medium italic leading-relaxed">"Sebagai pendidik, aplikasi ini sangat membantu kami di kelas. Modulnya terstruktur rapi dan fitur EduGuide AI bantu saya menjawab pertanyaan kritis."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">I</div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">Ibu Dina</div>
                  <div className="text-slate-400 text-xs">Guru PAUD, Demak</div>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative hover:border-blue-200 transition-colors">
              <Quote size={32} className="text-blue-100 absolute top-6 right-6" />
              <p className="text-slate-600 mb-8 relative z-10 font-medium italic leading-relaxed">"Pendekatan 'Learning by Doing' lewat simulasi AR ini luar biasa. Memori spasial anak jadi aktif, sehingga edukasinya jauh lebih membekas dibanding ceramah."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold">A</div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">Andini, M.Psi</div>
                  <div className="text-slate-400 text-xs">Psikolog Anak</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 7. FOCUS AREAS ================= */}
        <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Implementasi Edukasi</h2>
          <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">
            Materi kami dapat diakses dan diadaptasi untuk menciptakan lingkungan yang inklusif di mana saja.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Item 1 */}
            <div className="group">
              <div className="h-64 rounded-3xl mb-6 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-orange-200 transition-colors">
                <Home size={64} className="text-orange-300 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Keluarga & Rumah</h4>
              <p className="text-slate-500 text-sm">Penggunaan personal bagi orang tua untuk mengajarkan batasan privasi di lingkungan keluarga.</p>
            </div>
            {/* Item 2 */}
            <div className="group">
              <div className="h-64 rounded-3xl mb-6 bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-pink-200 transition-colors">
                <GraduationCap size={64} className="text-pink-300 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Sekolah PAUD</h4>
              <p className="text-slate-500 text-sm">Integrasi dengan kurikulum guru, dilengkapi dashboard pemantauan kolektif.</p>
            </div>
            {/* Item 3 */}
            <div className="group">
              <div className="h-64 rounded-3xl mb-6 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-blue-200 transition-colors">
                <Building2 size={64} className="text-blue-300 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>Ruang Publik</h4>
              <p className="text-slate-500 text-sm">Kerjasama dengan lembaga masyarakat dan posyandu untuk sosialisasi massal.</p>
            </div>
          </div>
        </section>

        {/* ================= 8. CTA / CONTACT SECTION ================= */}
        <section className="py-12 max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative border border-slate-800 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>

            <div className="w-full md:w-5/12 relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-orange-400 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-white/10 tracking-widest uppercase">
                <MessageSquare size={14} /> Mari Berbincang
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
                Punya ide atau pertanyaan?
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                Tim Aruna siap berkolaborasi untuk menciptakan lingkungan belajar dan bermain yang lebih aman bagi anak Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 shadow-xl shadow-orange-500/20 active:scale-95">
                  Hubungi Tim Kami <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Simulated Contact Interface */}
            <div className="w-full md:w-7/12 relative z-10 flex justify-end">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="w-full md:w-[110%] bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:translate-x-12 flex flex-col gap-4 border border-white/20"
              >
                {/* Chat Bubbles Mockup */}
                <div className="flex items-start gap-3 w-[85%]">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">👧</div>
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-600 shadow-sm border border-slate-50">
                    Halo Aruna! Kami dari PAUD Melati ingin berkolaborasi untuk menggunakan modul edukasinya.
                  </div>
                </div>
                <div className="flex items-start gap-3 w-[85%] self-end flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20"><Sparkles size={16} /></div>
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-2xl rounded-tr-sm text-sm text-white shadow-lg shadow-orange-500/20">
                    Halo! Tentu saja, tim kami akan segera memandu Anda. Jadwalkan pertemuan yuk!
                  </div>
                </div>
                {/* Input Mockup */}
                <div className="mt-4 border border-slate-200 rounded-full p-2 flex items-center gap-3 text-slate-400 bg-slate-50 shadow-inner">
                  <span className="pl-4 text-sm font-medium">Ketik pesan Anda...</span>
                  <div className="ml-auto w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-slate-700 cursor-pointer transition-colors"><Send size={14} /></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
