import React from 'react';
import { BookOpen, Video, Camera, ArrowRight } from 'lucide-react';

const Features = () => {
  return (
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
  );
};

export default Features;
