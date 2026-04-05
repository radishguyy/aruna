import React from 'react';
import { Mail, Phone, Heart } from 'lucide-react';
import { mockData } from '@/data/mockData';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 pt-32 pb-8 relative -z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">

          <div className="text-center md:text-left">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 tracking-wide uppercase mb-4 block" style={{ fontFamily: '"Grandstander", cursive' }}>
              ARUNA
            </span>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed mb-6">
              Platform edukasi inovatif sebagai solusi preventif kekerasan seksual anak usia dini di era digital.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Heart size={18} />
              </a>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 max-w-sm w-full">
            <h4 className="font-bold text-slate-800 mb-6 text-center md:text-left">Butuh Bantuan / Kemitraan?</h4>
            <div className="space-y-4">
              <a href={`mailto:${mockData.contact_info.email}`} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Mail size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Resmi</div>
                  <div className="text-sm font-bold text-slate-700">{mockData.contact_info.email}</div>
                </div>
              </a>
              <a href={`https://wa.me/${mockData.contact_info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group">
                <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"><Phone size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp / Telepon</div>
                  <div className="text-sm font-bold text-slate-700">{mockData.contact_info.phone}</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Aruna Edu & Tim Pengusul UNNES.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Syarat Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
