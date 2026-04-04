import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Star } from 'lucide-react';
import { mockData } from '@/data/mockData';

const Pricing = () => {
  return (
    <section id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
          Pilihan Paket Belajar
        </h2>
        <p className="text-slate-500">
          Mulai dari akses gratis hingga sistem sekolah yang komprehensif. {mockData.promotion_strategy.goals}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockData.pricing.map((plan) => {
          const isPremium = plan.id === 'premium';
          const isInstitution = plan.id === 'institution';

          return (
            <div
              key={plan.id}
              className={`rounded-[2.5rem] p-8 border-2 flex flex-col relative overflow-hidden transition-all duration-300 ${isPremium
                  ? 'bg-gradient-to-b from-orange-500 to-orange-600 border-orange-200 text-white shadow-2xl shadow-orange-500/30 transform md:-translate-y-6'
                  : 'bg-white border-gray-100 shadow-sm'
                }`}
            >
              {/* Decorative Stars for Premium */}
              {isPremium && (
                <>
                  <Star size={64} className="absolute -top-4 -right-4 text-orange-400 opacity-50" fill="currentColor" />
                  <div className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                    Super Aruna
                  </div>
                </>
              )}

              <h3 className={`text-lg font-bold uppercase tracking-widest mb-2 ${isPremium ? 'text-orange-100 mt-2' : 'text-slate-500'}`}>
                {plan.name}
              </h3>

              <div className={`text-4xl font-black mb-8 drop-shadow-sm ${isPremium ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: '"Grandstander", cursive' }}>
                {plan.price.split(' ')[1] || plan.price}
                {plan.period && <span className={`text-lg font-normal ${isPremium ? 'text-white/80' : 'text-slate-400'}`}>/{plan.period === 'bulan' ? 'bln' : 'thn'}</span>}
              </div>

              {plan.description && (
                <p className={`text-sm mb-6 italic ${isPremium ? 'text-orange-50' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              )}

              <ul className="space-y-4 mb-8 flex-grow relative z-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-center gap-3 text-sm font-medium ${isPremium ? 'text-white' : 'text-slate-600'}`}>
                    <CheckCircle2
                      size={isPremium ? 20 : 18}
                      className={isPremium ? 'text-yellow-300' : isInstitution ? 'text-indigo-500' : 'text-green-500'}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={isInstitution ? "#contact" : "/auth/register"}
                className={`block text-center w-full py-4 rounded-full font-bold text-sm transition-all duration-300 ${isPremium
                    ? 'bg-white text-orange-600 hover:scale-105 shadow-lg'
                    : isInstitution
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {isPremium ? 'Berlangganan Sekarang' : isInstitution ? 'Hubungi Tim Sales' : 'Buat Akun Gratis'}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
