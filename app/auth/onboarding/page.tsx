"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Image as ImageIcon, ArrowRight, User, Calendar, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/parent');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FD] flex flex-col items-center justify-center py-12 px-4 sm:px-6 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-200 mix-blend-multiply blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 mix-blend-multiply blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <motion.div initial={{ width: 0 }} animate={{ width: '4rem' }} className="h-2 rounded-full bg-indigo-600 shadow-sm shadow-indigo-500/50"></motion.div>
          <motion.div initial={{ width: 0 }} animate={{ width: step === 2 ? '4rem' : '1rem' }} className={`h-2 rounded-full transition-all duration-500 ${step === 2 ? 'bg-indigo-600 shadow-sm shadow-indigo-500/50' : 'bg-gray-200'}`}></motion.div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: -50, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white"
            >
              <div className="w-20 h-20 bg-indigo-50/50 shadow-inner rounded-[1.5rem] flex items-center justify-center mb-8 border border-white relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] opacity-20 blur-sm"></div>
                <Shield className="w-10 h-10 text-indigo-600 relative z-10" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">Selamat datang!</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 text-[15px]">
                Platform edukasi interaktif untuk perlindungan anak. Sebelum Anak Anda menjelajah misi Aruna, mari kita atur profil mereka.
              </p>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-[1.5rem] mb-10 border border-orange-100 flex gap-4 items-start shadow-inner">
                <div className="p-2 bg-orange-100 rounded-xl flex-shrink-0">
                   <Sparkles className="text-orange-500 w-5 h-5" />
                </div>
                <p className="text-[13px] text-gray-700 font-medium leading-relaxed">
                  Data serta profil anak dijaga privasinya dalam basis ruang lokal Anda. Kami tidak membagikan data tersebut ke pihak ketiga secara publik.
                </p>
              </div>

              <button 
                onClick={handleNext}
                className="w-full bg-indigo-600 text-white font-black text-[15px] py-4 md:py-5 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Mulai Pengaturan <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: -50, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white"
            >
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Profil Si Kecil</h2>
              
              <form onSubmit={handleFinish} className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="w-28 h-28 bg-gray-50 rounded-[2rem] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 cursor-pointer hover:bg-gray-100 hover:border-indigo-300 hover:text-indigo-500 transition-all group overflow-hidden relative">
                    <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600">Pilih Avatar</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Nama Panggilan</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                    <input type="text" required placeholder="Cth: Fachri" className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-bold text-gray-900" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Usia</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                      <select className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900 font-medium appearance-none">
                        <option>3 Tahun</option>
                        <option>4 Tahun</option>
                        <option>5 Tahun</option>
                        <option>6 Tahun</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Gender</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Smile className="h-5 w-5 text-gray-400" /></div>
                      <select className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900 font-medium appearance-none">
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-black text-[15px] py-4 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all outline-none"
                  >
                    Selesai & Masuk Dashboard
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-center mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Kembali
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
