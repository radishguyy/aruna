"use client";
import React from 'react';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6" style={{ fontFamily: '"Grandstander", cursive' }}>
            Hubungi Kami
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">Punya pertanyaan atau ingin bekerjasama? Tim kami siap mendengarkan anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="bg-[#FFF8F1] rounded-[3rem] p-8 md:p-12 border-2 border-orange-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Informasi Kontak</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Resmi</p>
                  <p className="text-lg font-bold text-slate-700">ahmadfahr2004@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp / Telepon</p>
                  <p className="text-lg font-bold text-slate-700">0895-0992-2574</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasi Kami</p>
                  <p className="text-lg font-bold text-slate-700">Semarang, Jawa Tengah (UNNES)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white rounded-[2rem] border border-orange-100">
              <div className="flex items-center gap-3 text-orange-500 mb-4 font-bold uppercase tracking-widest text-xs">
                <MessageCircle size={18} /> Support Chat
              </div>
              <p className="text-slate-600 mb-6">Butuh respon cepat? Chat melalui WhatsApp untuk bantuan langsung.</p>
              <a href="https://wa.me/6289509922574" className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                Hubungi via WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 border-2 border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Kirim Pesan</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 px-1">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 px-1">Alamat Email</label>
                  <input type="email" placeholder="Masukkan email..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2 px-1">Subjek</label>
                <input type="text" placeholder="Apa tujuan anda?" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2 px-1">Pesan Anda</label>
                <textarea rows={5} placeholder="Tuliskan pesan anda di sini..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-orange-200 hover:scale-105 transition-transform">
                Kirim Pesan <Send size={20} />
              </button>
            </form>
          </div>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 pt-32 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
            <div>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 tracking-wide uppercase mb-4 block" style={{ fontFamily: '"Grandstander", cursive' }}>
                ARUNA
              </span>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                Platform edukasi inovatif sebagai solusi preventif kekerasan seksual anak usia dini di era digital.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                 <Heart size={20} />
               </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <p>© 2026 Aruna Edu & Tim Pengusul UNNES.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">Syarat Ketentuan</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
