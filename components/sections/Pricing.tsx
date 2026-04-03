import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="bg-[#F9FAFB] py-16 sm:py-24 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#006A50] mb-4">
            Pilihan <span className="text-[#DD6B66]">Program</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">Edukasi yang dapat diakses oleh setiap keluarga dan institusi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 shadow-sm bg-white">
          {/* Free */}
          <div className="p-8 sm:p-12 border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="text-xl sm:text-2xl font-serif text-[#006A50] mb-2">Gratis</h3>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Rp 0</div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600">
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#006A50] shrink-0 mt-0.5" /> Akses E-Modul Dasar</li>
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#006A50] shrink-0 mt-0.5" /> Video Animasi Terbatas</li>
            </ul>
          </div>
          {/* Premium */}
          <div className="p-8 sm:p-12 border-b md:border-b-0 md:border-r border-gray-200 bg-[#006A50] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#F9D308] rounded-bl-full"></div>
            <h3 className="text-xl sm:text-2xl font-serif mb-2 relative z-10">Premium</h3>
            <div className="text-2xl sm:text-3xl font-bold mb-6 relative z-10">Rp 15.000<span className="text-sm font-normal">/bln</span></div>
            <ul className="space-y-4 mb-8 text-sm text-gray-200 relative z-10">
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#F9D308] shrink-0 mt-0.5" /> Akses Semua E-Modul</li>
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#F9D308] shrink-0 mt-0.5" /> Simulasi Safe Zone AR</li>
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#F9D308] shrink-0 mt-0.5" /> Asisten EduGuide AI</li>
            </ul>
          </div>
          {/* B2B */}
          <div className="p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#BDE0D0] rounded-tl-full opacity-50"></div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#006A50] mb-2">Institusi</h3>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Custom</div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 relative z-10">
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#006A50] shrink-0 mt-0.5" /> Dashboard Guru/Sekolah</li>
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#006A50] shrink-0 mt-0.5" /> Lisensi Multi-Siswa</li>
              <li className="flex gap-3 items-start"><Check size={18} className="text-[#006A50] shrink-0 mt-0.5" /> Kurikulum Kustom</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
