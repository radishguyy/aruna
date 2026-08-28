import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Shield, Sparkles, User, Calendar, Smile, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { data, setData, post, processing, errors } = useForm({
    role: 'parent',
    institution_code: '',
    children: [
      { nickname: '', gender: 'male', birth_date: '2020-01-01' }
    ]
  });

  const handleNext = () => {
    setStep(2);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('onboarding.save'));
  };

  return (
    <div className="min-h-screen bg-[#F4F7FD] flex flex-col items-center justify-center py-12 px-4 sm:px-6 font-sans relative overflow-hidden">
      <Head title="Mulai - Aruna" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-200 mix-blend-multiply blur-[100px] opacity-40"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 mix-blend-multiply blur-[120px] opacity-40"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <motion.div initial={{ width: 0 }} animate={{ width: '4rem' }} className="h-2 rounded-full bg-indigo-600 shadow-sm"></motion.div>
          <motion.div initial={{ width: 0 }} animate={{ width: step === 2 ? '4rem' : '1rem' }} className={`h-2 rounded-full transition-all duration-500 ${step === 2 ? 'bg-indigo-600 shadow-sm' : 'bg-gray-200'}`}></motion.div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: -50, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white"
            >
              <div className="w-20 h-20 bg-indigo-50/50 shadow-inner rounded-[1.5rem] flex items-center justify-center mb-8 border border-white relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] opacity-20 blur-sm"></div>
                <Shield className="w-10 h-10 text-indigo-600 relative z-10" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Pilih Peran Anda</h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 text-[15px]">
                Platform edukasi interaktif untuk perlindungan anak. Silakan pilih apakah Anda mendaftar sebagai Orang Tua atau Guru PAUD.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setData('role', 'parent')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${data.role === 'parent' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <Smile className={`w-8 h-8 mb-2 ${data.role === 'parent' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="font-bold text-gray-900 block text-sm">Orang Tua</span>
                  <span className="text-xs text-gray-500">Buat profil untuk anak Anda.</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setData('role', 'teacher')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${data.role === 'teacher' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <BookOpen className={`w-8 h-8 mb-2 ${data.role === 'teacher' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="font-bold text-gray-900 block text-sm">Guru PAUD</span>
                  <span className="text-xs text-gray-500">Gunakan lisensi sekolah.</span>
                </button>
              </div>

              {data.role === 'teacher' && (
                <div className="mb-8">
                  <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Kode Lisensi Institusi</label>
                  <input
                    type="text"
                    value={data.institution_code}
                    onChange={e => setData('institution_code', e.target.value)}
                    placeholder="MENTARI-2024"
                    className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-bold text-gray-900"
                  />
                  {errors.institution_code && (
                    <span className="text-xs text-red-500 font-medium mt-1 block">{errors.institution_code}</span>
                  )}
                </div>
              )}

              <button 
                onClick={handleNext}
                className="w-full bg-indigo-600 text-white font-black text-[15px] py-4 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white"
            >
              {data.role === 'parent' ? (
                <>
                  <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>Profil Si Kecil</h2>
                  
                  <form onSubmit={handleFinish} className="space-y-6">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Nama Panggilan</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                        <input
                          type="text"
                          required
                          placeholder="Fachri"
                          value={data.children[0].nickname}
                          onChange={e => {
                            const newKids = [...data.children];
                            newKids[0].nickname = e.target.value;
                            setData('children', newKids);
                          }}
                          className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-bold text-gray-900"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Tanggal Lahir</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={data.children[0].birth_date}
                            onChange={e => {
                              const newKids = [...data.children];
                              newKids[0].birth_date = e.target.value;
                              setData('children', newKids);
                            }}
                            className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900 font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Gender</label>
                        <div className="relative">
                          <select
                            value={data.children[0].gender}
                            onChange={e => {
                              const newKids = [...data.children];
                              newKids[0].gender = e.target.value as 'male' | 'female';
                              setData('children', newKids);
                            }}
                            className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[1.2rem] text-[15px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-900 font-medium"
                          >
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white font-black text-[15px] py-4 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all outline-none"
                      >
                        {processing ? 'Menyimpan...' : 'Selesai & Masuk Dashboard'}
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
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight" style={{ fontFamily: '"Grandstander", cursive' }}>Konfirmasi Guru</h2>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8 text-[15px]">
                    Anda mendaftar sebagai Guru dengan kode institusi. Tekan tombol selesai di bawah untuk mengaktifkan akun Anda.
                  </p>

                  <form onSubmit={handleFinish} className="space-y-6">
                    <div className="pt-6">
                      <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white font-black text-[15px] py-4 rounded-[1.2rem] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all outline-none"
                      >
                        {processing ? 'Menyimpan...' : 'Konfirmasi & Masuk'}
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
