import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#BDE0D0] pt-16 sm:pt-20 pb-8 sm:pb-10 border-t-[16px] border-[#006A50]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 sm:mb-16 border border-[#006A50]/20 bg-white">
          {/* Left Image / Mascot area */}
          <div className="bg-[#F9D308] relative min-h-[250px] sm:min-h-[300px] flex items-center justify-center p-8 sm:p-12 overflow-hidden border-b md:border-b-0 md:border-r border-[#006A50]/20">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#DD6B66] rounded-bl-full mix-blend-multiply opacity-50"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#006A50] relative z-10 leading-tight">
              Memberdayakan <br /> generasi <br /> masa depan.
            </h2>
          </div>

          {/* Right Form & Links */}
          <div className="flex flex-col justify-center p-8 sm:p-12 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mb-4">
              <div>
                <h4 className="font-bold text-[#006A50] mb-3 sm:mb-4 text-sm">Tautan</h4>
                <ul className="space-y-2 sm:space-y-3 text-sm text-[#006A50]/80">
                  <li><a href="#" className="hover:text-[#DD6B66]">Syarat & Ketentuan</a></li>
                  <li><a href="#" className="hover:text-[#DD6B66]">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-[#DD6B66]">Keamanan</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#006A50] mb-3 sm:mb-4 text-sm">Berlangganan</h4>
                <div className="flex flex-col xl:flex-row bg-white rounded-xl xl:rounded-full p-1 border border-[#006A50]/30 focus-within:border-[#006A50] gap-2 xl:gap-0">
                  <input
                    type="email"
                    placeholder="Alamat email"
                    className="w-full bg-transparent px-4 py-2 text-sm outline-none text-[#006A50] placeholder-[#006A50]/50"
                  />
                  <button className="bg-[#006A50] text-white px-6 py-2.5 xl:py-2 rounded-full xl:rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#004f3c] transition-colors w-full xl:w-auto">
                    Kirim
                  </button>
                </div>
                <div className="flex gap-4 mt-6 sm:mt-8 text-[#006A50]">
                  {/* Social icons removed for fix */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-[#006A50]/20 text-xs text-[#006A50]/60">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield size={16} />
            <span className="font-serif font-bold tracking-wider">ARUNA EDU</span>
          </div>
          <p className="text-center md:text-left">© 2026 Universitas Negeri Semarang. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
