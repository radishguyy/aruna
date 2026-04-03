"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, UserCircle, Building, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const [type, setType] = useState<'parent' | 'institution'>('parent');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'parent') {
      router.push('/auth/onboarding'); // Parents go to child setup
    } else {
      router.push('/teacher'); // Institutions go to dashboard
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-300 mix-blend-multiply blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] left-[-10%] w-[30%] h-[50%] rounded-full bg-teal-300 mix-blend-multiply blur-[120px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[40%] rounded-full bg-indigo-200 mix-blend-multiply blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl shadow-gray-200 flex items-center justify-center border border-gray-100">
             <Shield className="text-emerald-600 w-8 h-8" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-black text-gray-900 tracking-tight">
            Gabung Bersama Aruna
          </h2>
          <p className="text-center text-[15px] text-gray-500 font-medium">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-emerald-100/50 sm:rounded-[2.5rem] sm:px-12 border border-white">
          
          <div className="mb-8 p-1.5 grid grid-cols-2 gap-2 bg-gray-100/80 rounded-[1.2rem] border border-gray-200/50 relative">
             <div className="absolute inset-0 bg-white/50 rounded-[1.2rem] backdrop-blur-sm -z-10"></div>
             <button 
               onClick={() => setType('parent')} 
               className={`py-3 flex flex-col items-center justify-center gap-1.5 rounded-[1rem] text-[12px] font-bold transition-all ${type === 'parent' ? 'bg-white text-emerald-600 shadow-md shadow-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
             >
               <UserCircle className="w-5 h-5" /> Orang Tua
             </button>
             <button 
               onClick={() => setType('institution')} 
               className={`py-3 flex flex-col items-center justify-center gap-1.5 rounded-[1rem] text-[12px] font-bold transition-all ${type === 'institution' ? 'bg-white text-emerald-600 shadow-md shadow-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
             >
               <Building className="w-5 h-5" /> Guru / Instansi
             </button>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <AnimatePresence mode="wait">
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {type === 'parent' ? (
                  <>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" required placeholder="Masukkan nama Anda" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                        <input type="email" required placeholder="alamat@email.com" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Kata Sandi</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                        <input type="password" required placeholder="Buat kata sandi" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Nama Instansi / Sekolah</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Building className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" required placeholder="TK Tunas Bangsa" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Email Resmi</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                        <input type="email" required placeholder="info@sekolah.edu" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Kode Lisensi <span className="text-gray-400 normal-case font-medium">(Opsional)</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Shield className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" placeholder="XXXX-XXXX-XXXX" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900" />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-[1.2rem] shadow-xl shadow-emerald-500/20 text-[15px] font-black text-white bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
              >
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gray-50 text-[13px] text-gray-500 font-bold hover:bg-gray-100 hover:text-gray-900 transition flex items-center justify-center gap-2">
               Kembali ke Beranda
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
