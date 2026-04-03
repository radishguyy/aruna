"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, UserCircle, GraduationCap, Settings, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [role, setRole] = useState<'parent' | 'teacher' | 'admin'>('parent');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'parent') router.push('/parent');
    else if (role === 'teacher') router.push('/teacher');
    else router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FD] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300 mix-blend-multiply blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-300 mix-blend-multiply blur-[120px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-orange-200 mix-blend-multiply blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl shadow-gray-200 flex items-center justify-center border border-gray-100">
             <Shield className="text-indigo-600 w-8 h-8" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-black text-gray-900 tracking-tight">
            Selamat Datang!
          </h2>
          <p className="text-center text-[15px] text-gray-500 font-medium">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-indigo-100/50 sm:rounded-[2.5rem] sm:px-12 border border-white">
          
          <div className="mb-8 p-1.5 flex gap-2 bg-gray-100/80 rounded-[1.2rem] border border-gray-200/50 relative">
             <div className="absolute inset-0 bg-white/50 rounded-[1.2rem] backdrop-blur-sm -z-10"></div>
             <button 
               onClick={() => setRole('parent')} 
               className={`flex-1 py-3 flex flex-col items-center justify-center gap-1.5 rounded-[1rem] text-[11px] font-bold transition-all ${role === 'parent' ? 'bg-white text-indigo-600 shadow-md shadow-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
             >
               <UserCircle className="w-5 h-5" /> Orang Tua
             </button>
             <button 
               onClick={() => setRole('teacher')} 
               className={`flex-1 py-3 flex flex-col items-center justify-center gap-1.5 rounded-[1rem] text-[11px] font-bold transition-all ${role === 'teacher' ? 'bg-white text-indigo-600 shadow-md shadow-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
             >
               <GraduationCap className="w-5 h-5" /> Guru / PAUD
             </button>
             <button 
               onClick={() => setRole('admin')} 
               className={`flex-1 py-3 flex flex-col items-center justify-center gap-1.5 rounded-[1rem] text-[11px] font-bold transition-all ${role === 'admin' ? 'bg-white text-indigo-600 shadow-md shadow-gray-200/50' : 'text-gray-500 hover:text-gray-900'}`}
             >
               <Settings className="w-5 h-5" /> Admin
             </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email" name="email" type="email" required
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900"
                      placeholder="Masukkan email Anda"
                      defaultValue={role === 'parent' ? 'rara@example.com' : role === 'teacher' ? 'sari@mentari.edu' : 'admin@aruna.id'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password" name="password" type="password" required
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900"
                      placeholder="Masukkan kata sandi"
                      defaultValue="password123"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-600 cursor-pointer">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Lupa password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 text-[15px] font-black text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Masuk ke Dasbor <ArrowRight className="w-5 h-5" />
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
