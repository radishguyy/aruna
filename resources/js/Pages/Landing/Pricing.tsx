import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import PricingSection from '@/Components/sections/Pricing';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, ShieldCheck, HelpCircle, ChevronDown, Check, Zap, HeartHandshake, PhoneCall } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Apakah Paket Gratis berlaku selamanya?",
    answer: "Ya! Paket Free Version dapat digunakan selamanya tanpa batas waktu untuk mengakses modul edukasi dasar dan pengenalan fitur AR."
  },
  {
    question: "Bagaimana cara kerja lisensi untuk Sekolah / PAUD?",
    answer: "Paket Institusi memberikan kode lisensi khusus yang dapat digunakan oleh seluruh guru dan kelas di PAUD/TK Anda, lengkap dengan dashboard pemantauan perkembangan murid secara kolektif."
  },
  {
    question: "Apakah saya bisa membatalkan langganan kapan saja?",
    answer: "Tentu saja. Anda memiliki kendali penuh atas akun Anda dan dapat membatalkan atau mengubah paket langganan kapan saja dari dashboard orang tua."
  },
  {
    question: "Apakah aplikasi ini aman dari iklan dan konten tidak pantas?",
    answer: "100% Aman. ARUNA dirancang khusus sebagai ruang aman anak usia dini (3-6 tahun) tanpa ada iklan pihak ketiga, tanpa pelacakan komersial, dan seluruh materi diawasi oleh tim psikolog anak."
  }
];

export default function PricingPage({ plans }: { plans?: any[] }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <MainLayout>
      <Head title="Paket Langganan & Biaya - Aruna" />

      <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 pb-20">
        
        {/* ================= 1. PAGE HERO ================= */}
        <section className="pt-28 pb-12 px-4 md:px-6 max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-orange-200 shadow-sm">
            <Sparkles size={14} className="text-orange-500" /> Investasi Terbaik Untuk Si Kecil
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight max-w-4xl mx-auto" style={{ fontFamily: '"Grandstander", cursive' }}>
            Perlindungan Maksimal, Harga Terjangkau Untuk Semua
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Pilih paket yang paling sesuai untuk keluarga Anda atau sekolah. Tanpa biaya tersembunyi, dapat dibatalkan kapan saja.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-full border border-gray-200 shadow-md mb-12">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                !isAnnual
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-600 hover:text-orange-500'
              }`}
            >
              Bulanan
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${
                isAnnual
                  ? 'bg-orange-500 text-white shadow'
                  : 'text-slate-600 hover:text-orange-500'
              }`}
            >
              Tahunan <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-black px-2 py-0.5 rounded-full">Hemat 20%</span>
            </button>
          </div>
        </section>

        {/* ================= 2. PRICING GRID ================= */}
        <section className="max-w-[1240px] mx-auto px-4 md:px-6 mb-20">
          <PricingSection isAnnual={isAnnual} plans={plans} />
        </section>

        {/* ================= 3. TRUST HIGHLIGHTS ================= */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 mb-24">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>100% Bebas Iklan</h4>
                <p className="text-slate-500 text-xs">Lingkungan bermain yang aman tanpa gangguan promosi luar.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>Interaktif AR</h4>
                <p className="text-slate-500 text-xs">Pengalaman Augmented Reality membuat si kecil paham dengan seru.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>Tim Pendidik & Psikolog</h4>
                <p className="text-slate-500 text-xs">Kurikulum divalidasi langsung oleh pakar psikologi anak.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1" style={{ fontFamily: '"Grandstander", cursive' }}>Batal Kapan Saja</h4>
                <p className="text-slate-500 text-xs">Bebas ubah atau hentikan paket tanpa komitmen terikat.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. FAQ ACCORDION ================= */}
        <section className="max-w-[800px] mx-auto px-4 md:px-6 mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-slate-200">
              <HelpCircle size={14} /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3" style={{ fontFamily: '"Grandstander", cursive' }}>
              Pertanyaan Sering Diajukan
            </h2>
            <p className="text-slate-500 text-sm">Punya pertanyaan seputar pembayaran dan langganan?</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 font-bold text-slate-800 text-base hover:text-orange-500 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 text-slate-400 ${
                        isOpen ? 'rotate-180 text-orange-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-gray-50 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 5. B2B / SPECIAL CONTACT CTA ================= */}
        <section className="max-w-[1000px] mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800 text-white">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20 mb-3 inline-block">
                Kemitraan Khusus
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>
                Butuh Lisensi Sekolah atau Program Komunitas?
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Kami siap memberikan penawaran khusus dan pendampingan implementasi langsung untuk sekolah dan dinas terkait.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-orange-500/30 whitespace-nowrap"
            >
              Hubungi Tim Kemitraan
            </Link>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
