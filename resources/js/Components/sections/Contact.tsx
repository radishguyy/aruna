import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="bg-[#006A50] rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
        
        {/* Decorative Graphic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9D308] rounded-bl-full opacity-20 -mr-16 -mt-16 pointer-events-none"></div>

        <div className="w-full md:w-1/2 text-white z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
            Mari <span className="text-[#F9D308]">Bekerjasama</span>
          </h2>
          <p className="text-[#BDE0D0] mb-8 leading-relaxed">
            Apakah Anda orang tua yang butuh panduan, atau sekolah yang ingin mengintegrasikan Aruna? Tim kami siap membantu!
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full font-bold">@</div>
              <span>halo@arunaplatform.id</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-full font-bold">📍</div>
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 z-10">
          <form className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block" htmlFor="contactName">Nama</label>
              <input id="contactName" name="contactName" autoComplete="off" type="text" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-[#DD6B66] bg-transparent" placeholder="Ketik nama Anda..." />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block" htmlFor="contactMessage">Pesan</label>
              <textarea id="contactMessage" name="contactMessage" autoComplete="off" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-[#DD6B66] bg-transparent resize-none" rows={3} placeholder="Apa yang ingin Anda tanyakan?"></textarea>
            </div>
            <button type="button" className="mt-4 bg-[#DD6B66] text-white font-bold py-4 rounded-xl hover:bg-rose-500 transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
