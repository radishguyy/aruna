"use client";
import React, { useState } from 'react';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  MessageCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { mockData } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const contactInfo = mockData.contact_info;
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", contactInfo.web3forms_key);
    formData.append("subject", `Aruna Contact Form: ${(formData.get('contactSubject') as string) || 'New Message'}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setResultMessage(data.message || "Pesan Anda berhasil terkirim!");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
        setResultMessage(data.message || "Terjadi kesalahan saat mengirim pesan.");
      }
    } catch (err) {
      setFormStatus('error');
      setResultMessage("Gagal mengirim pesan. Periksa koneksi internet Anda.");
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            style={{ fontFamily: '"Grandstander", cursive' }}
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Punya pertanyaan atau ingin bekerjasama? Tim kami siap mendengarkan anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFF8F1] rounded-[3rem] p-8 md:p-12 border-2 border-orange-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Informasi Kontak</h2>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Resmi</p>
                  <p className="text-lg font-bold text-slate-700">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp / Telepon</p>
                  <p className="text-lg font-bold text-slate-700">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasi Kami</p>
                  <p className="text-lg font-bold text-slate-700">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white rounded-[2rem] border border-orange-100">
              <div className="flex items-center gap-3 text-orange-500 mb-4 font-bold uppercase tracking-widest text-xs">
                <MessageCircle size={18} /> Support Chat
              </div>
              <p className="text-slate-600 mb-6">Butuh respon cepat? Chat melalui WhatsApp untuk bantuan langsung.</p>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-8 md:p-12 border-2 border-gray-100 shadow-sm"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: '"Grandstander", cursive' }}>Kirim Pesan</h2>

            <AnimatePresence mode='wait'>
              {formStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] p-10 text-center"
                >
                  <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">Terkirim!</h3>
                  <p className="text-emerald-700">{resultMessage}</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-emerald-600 font-bold hover:underline"
                  >
                    Kirim pesan lain
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2 px-1" htmlFor="contactName">Nama Lengkap</label>
                      <input
                        id="contactName"
                        name="name"
                        required
                        type="text"
                        placeholder="Masukkan nama..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2 px-1" htmlFor="contactEmail">Alamat Email</label>
                      <input
                        id="contactEmail"
                        name="email"
                        required
                        type="email"
                        placeholder="Masukkan email..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2 px-1" htmlFor="contactSubject">Subjek</label>
                    <input
                      id="contactSubject"
                      name="contactSubject"
                      required
                      type="text"
                      placeholder="Apa tujuan anda?"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2 px-1" htmlFor="contactMessage">Pesan Anda</label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tuliskan pesan anda di sini..."
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {formStatus === 'error' && (
                    <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-medium">
                      {resultMessage}
                    </div>
                  )}

                  <button
                    disabled={formStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-orange-200 hover:scale-105 transition-transform disabled:opacity-50 disabled:grayscale disabled:scale-100"
                  >
                    {formStatus === 'loading' ? (
                      <><Loader2 className="animate-spin" /> Mengirim...</>
                    ) : (
                      <>Kirim Pesan <Send size={20} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </main>

    </div>
  );
}
