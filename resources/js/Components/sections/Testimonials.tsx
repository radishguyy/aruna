import React from 'react';
import { MessageCircle, Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="pt-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-purple-200">
          <MessageCircle size={16} /> Apa Kata Mereka
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
          Dipercaya Oleh Orang Tua & Guru
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Testi 1 */}
        <div className="bg-white rounded-3xl p-8 border-2 border-purple-100 shadow-sm relative pt-12">
          <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg">
            <Quote size={20} fill="currentColor" />
          </div>
          <p className="text-slate-600 font-medium mb-6 italic">
            "Anak saya awalnya sangat susah diajak bicara soal privasi tubuh. Lewat animasi Aruna, dia jadi lebih paham dan berani bilang 'TIDAK' kalau ada yang sentuh sembarangan."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">B</div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Bunda Risa</h4>
              <span className="text-xs text-slate-400 font-bold">Orang Tua Anak Usia 5 Thn</span>
            </div>
          </div>
        </div>

        {/* Testi 2 */}
        <div className="bg-white rounded-3xl p-8 border-2 border-orange-100 shadow-sm relative pt-12 transform md:-translate-y-4">
          <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg">
            <Quote size={20} fill="currentColor" />
          </div>
          <p className="text-slate-600 font-medium mb-6 italic">
            "Sebagai pendidik, aplikasi ini sangat membantu kami di kelas. Modulnya terstruktur rapi dan fitur EduGuide AI bantu saya menjawab pertanyaan kritis anak-anak."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">D</div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Ibu Dina</h4>
              <span className="text-xs text-slate-400 font-bold">Guru PAUD, Demak</span>
            </div>
          </div>
        </div>

        {/* Testi 3 */}
        <div className="bg-white rounded-3xl p-8 border-2 border-teal-100 shadow-sm relative pt-12">
          <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg">
            <Quote size={20} fill="currentColor" />
          </div>
          <p className="text-slate-600 font-medium mb-6 italic">
            "Pendekatan 'Learning by Doing' lewat simulasi AR ini luar biasa. Memori spasial anak jadi aktif, sehingga edukasinya jauh lebih membekas dibanding ceramah."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-600">A</div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Andini, M.Psi</h4>
              <span className="text-xs text-slate-400 font-bold">Psikolog Anak</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
