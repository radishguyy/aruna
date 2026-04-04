import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-20 translate-y-1/2">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-slate-800">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>
            Siap melindungi si kecil?
          </h3>
          <p className="text-slate-400 text-sm">
            Hubungi kami sekarang untuk tahu lebih lanjut cara kami membantu Anda.
          </p>
        </div>
        <div className="flex w-full md:w-auto mt-4 md:mt-0">
          <Link href="/contact">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors whitespace-nowrap w-full md:w-auto">
              Hubungi Kami
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
