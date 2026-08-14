import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2, Star, Sparkles, Building2, ShieldCheck, Zap } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface PricingProps {
  isAnnual?: boolean;
}

const PricingSection: React.FC<PricingProps> = ({ isAnnual = false }) => {
  return (
    <section id="pricing" className="py-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-orange-200 shadow-sm">
          <Sparkles size={14} className="text-orange-500" /> Transparan & Tanpa Biaya Tersembunyi
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
          Pilihan Paket Belajar & Perlindungan
        </h2>
        <p className="text-slate-500 text-base md:text-lg">
          {mockData.promotion_strategy.goals} Pilih paket terbaik sesuai kebutuhan si kecil atau institusi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {mockData.pricing.map((plan) => {
          const isFree = plan.id === 'free';
          const isStandard = plan.id === 'standard';
          const isPremium = plan.id === 'premium';
          const isInstitution = plan.id === 'institution';

          // Calculate discounted price for annual
          let displayPrice = plan.price.split(' ')[1] || plan.price;
          if (isAnnual && !isFree) {
            const rawNum = parseInt(plan.price.replace(/\D/g, '')) || 0;
            const discounted = Math.round((rawNum * 0.8) / 1000) * 1000;
            displayPrice = `Rp ${discounted.toLocaleString('id-ID')}`;
          }

          return (
            <div
              key={plan.id}
              className={`rounded-[2.2rem] p-7 border-2 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isPremium
                  ? 'bg-gradient-to-b from-orange-500 to-orange-600 border-orange-400 text-white shadow-2xl shadow-orange-500/25 lg:-translate-y-3 z-10'
                  : isInstitution
                  ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
                  : isStandard
                  ? 'bg-white border-orange-200 shadow-sm hover:border-orange-300'
                  : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              {/* Top Badge Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      isPremium
                        ? 'bg-yellow-300 text-yellow-950'
                        : isInstitution
                        ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/30'
                        : isStandard
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isPremium
                      ? '⭐ Paling Populer'
                      : isInstitution
                      ? '🏫 Sekolah & Yayasan'
                      : isStandard
                      ? '🌱 Pilihan Orang Tua'
                      : '⚡ Akses Awal'}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold mb-2 ${
                    isPremium || isInstitution ? 'text-white' : 'text-slate-800'
                  }`}
                  style={{ fontFamily: '"Grandstander", cursive' }}
                >
                  {plan.name}
                </h3>

                <p
                  className={`text-xs mb-6 min-h-[36px] line-clamp-2 ${
                    isPremium
                      ? 'text-orange-100'
                      : isInstitution
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-gray-100/20">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-3xl lg:text-4xl font-black ${
                        isPremium || isInstitution ? 'text-white' : 'text-slate-900'
                      }`}
                      style={{ fontFamily: '"Grandstander", cursive' }}
                    >
                      {displayPrice}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-xs font-medium ${
                          isPremium
                            ? 'text-orange-100'
                            : isInstitution
                            ? 'text-slate-400'
                            : 'text-slate-400'
                        }`}
                      >
                        /{plan.period === 'bulan' ? 'bln' : 'thn'}
                      </span>
                    )}
                  </div>
                  {isAnnual && !isFree && (
                    <span className="text-[10px] font-bold text-emerald-400 mt-1 block">
                      ✓ Hemat 20% ditagih tahunan
                    </span>
                  )}
                </div>

                {/* Feature List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs font-medium leading-relaxed ${
                        isPremium
                          ? 'text-orange-50'
                          : isInstitution
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={`shrink-0 mt-0.5 ${
                          isPremium
                            ? 'text-yellow-300'
                            : isInstitution
                            ? 'text-indigo-400'
                            : isStandard
                            ? 'text-orange-500'
                            : 'text-emerald-500'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2 mt-auto">
                {isInstitution ? (
                  <a
                    href="#contact"
                    className="block text-center w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    Hubungi Sales
                  </a>
                ) : (
                  <Link
                    href="/register"
                    className={`block text-center w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                      isPremium
                        ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:scale-105 active:scale-95'
                        : isStandard
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:scale-105 active:scale-95'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95'
                    }`}
                  >
                    {isPremium
                      ? 'Mulai Premium'
                      : isStandard
                      ? 'Pilih Standar'
                      : 'Coba Gratis'}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingSection;
