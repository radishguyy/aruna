import React from 'react';
import { Award, Trophy, Star, ShieldCheck, Heart, MessageCircle, BookOpen, Video } from 'lucide-react';
import { mockData } from '@/data/mockData';

const ICONS: Record<string, React.ElementType> = {
  Award, Trophy, Star, ShieldCheck, Heart, MessageCircle, BookOpen, Video
};

export default function HallOfFamePage() {
  const child = mockData.children[0];
  const badges = mockData.badges;
  const childBadges = mockData.child_badges.filter(cb => cb.child_id === child.id);

  return (
    <div className="p-6 md:p-10 pt-12 pb-32 space-y-10 font-grandstander w-full max-w-5xl mx-auto min-h-full">
      <div className="text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-black text-amber-500 tracking-wide mb-2 drop-shadow-sm">Hall of Fame</h1>
        <p className="text-amber-700/80 font-sans font-bold uppercase tracking-widest text-sm">Koleksi Lencana Pahlawan</p>
      </div>

      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-orange-500/20 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/30 rounded-full blur-2xl"></div>

        <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
           <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border-2 border-white/40 shadow-inner flex-shrink-0">
             <Trophy className="w-10 h-10 md:w-12 md:h-12 text-yellow-200 drop-shadow-sm" />
           </div>
           <div>
             <div className="text-5xl md:text-6xl font-black">{child.total_points}</div>
             <div className="text-orange-100 font-sans font-bold tracking-widest text-[10px] md:text-xs uppercase mt-1">Total Poin Terkumpul</div>
           </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-3xl w-full md:w-auto text-center relative z-10">
           <div className="text-3xl font-black text-yellow-200">{childBadges.length} <span className="text-xl text-white/80 font-bold">/ {badges.length}</span></div>
           <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-orange-100 mt-2">Lencana Diraih</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge) => {
          const earned = childBadges.find(cb => cb.badge_id === badge.id);
          const IconComponent = ICONS[badge.image_url] || Award;
          
          return (
            <div 
              key={badge.id} 
              className={`p-5 md:p-6 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all duration-500 relative overflow-hidden group
                ${earned 
                  ? 'border-amber-200 bg-gradient-to-b from-white to-amber-50/50 shadow-lg shadow-amber-100/50 hover:-translate-y-1' 
                  : 'border-gray-200 bg-gray-50 opacity-80 grayscale hover:grayscale-[0.5]'
                }`}
            >
              {earned && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
              
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-4 relative z-10
                ${earned ? 'bg-gradient-to-br from-yellow-300 to-amber-500 shadow-inner border border-yellow-200/50 shadow-amber-300/50' : 'bg-gray-200 shadow-inner'}
              `}>
                 <IconComponent className={`w-10 h-10 md:w-12 md:h-12 ${earned ? 'text-white drop-shadow-md' : 'text-gray-400'}`} />
                 
                 {earned && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-amber-100">
                       <Star className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                    </div>
                 )}
              </div>
              <h3 className={`font-black text-lg md:text-xl leading-tight mb-2 relative z-10 ${earned ? 'text-amber-900' : 'text-gray-500'}`}>{badge.name}</h3>
              <p className={`text-xs md:text-sm font-sans font-medium leading-relaxed relative z-10 ${earned ? 'text-amber-700/70' : 'text-gray-400'}`}>{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
