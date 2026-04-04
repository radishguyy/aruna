import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockData } from '@/data/mockData';

const About = () => {
  const { team, aboutSection } = mockData;

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'shadow-blue-100/50 border-blue-200 bg-blue-100 text-blue-500',
      teal: 'shadow-teal-100/50 border-teal-200 bg-teal-100 text-teal-500',
      pink: 'shadow-pink-100/50 border-pink-200 bg-pink-100 text-pink-500',
      orange: 'shadow-orange-100/50 border-orange-200 bg-orange-100 text-orange-500',
      green: 'shadow-green-100/50 border-green-200 bg-green-100 text-green-500',
      rose: 'text-rose-500',
      purple: 'text-purple-500',
    };
    return colors[color] || '';
  };

  return (
    <section id="about" className="flex flex-col gap-20">
      {/* ================= MISSION & PURPOSE (NOBLE PURPOSE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-orange-200 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
            {aboutSection.noblePurpose.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            {aboutSection.noblePurpose.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {aboutSection.noblePurpose.sdgs.map((sdg, index) => (
              <div key={index} className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                {sdg}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-10 md:p-14 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-pink-200 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>
            {aboutSection.marketPotential.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            {aboutSection.marketPotential.description}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {aboutSection.marketPotential.stats.map((stat, index) => (
              <div key={index} className="bg-slate-50 p-3 rounded-2xl text-center">
                <div className={`font-black ${getColorClasses(stat.color).split(' ').pop()}`}>{stat.value}</div>
                <div className="text-[10px] text-slate-400 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= THE STORY & TEAM ================= */}
      <div className="bg-[#FFF8F1] rounded-[3rem] p-8 md:p-16 border-2 border-orange-100 flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/50 rounded-full blur-3xl mix-blend-multiply"></div>
        
        <div className="w-full lg:w-5/12 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
            {aboutSection.story.title}
          </h2>
          {aboutSection.story.paragraphs.map((p, index) => (
            <p key={index} className="text-slate-600 leading-relaxed text-lg">
              {p}
            </p>
          ))}
          <div className="pt-4 flex gap-6">
            {aboutSection.story.milestones.map((ms, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-orange-500">{ms.year}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{ms.label}</span>
                </div>
                {index === 0 && <div className="w-px bg-orange-200 h-12 self-end"></div>}
              </React.Fragment>
            ))}
          </div>
          <button className="flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600 transition-colors">
            Baca Cerita Lengkap Kami <ArrowRight size={18} />
          </button>
        </div>
        
        {/* Colorful Team Cards Matrix */}
        <div className="w-full lg:w-7/12 grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {team.map((member, index) => {
            const colorClasses = getColorClasses(member.color);
            return (
              <motion.div 
                key={index} 
                whileHover={{ y: -5 }} 
                className={`bg-white rounded-3xl p-5 text-center shadow-lg border-b-4 ${colorClasses.split(' ')[1]} ${index === 1 || index === 4 ? 'md:mt-4' : ''}`}
              >
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-xl mb-3 border-4 border-white shadow-inner ${colorClasses.split(' ').slice(2).join(' ')}`}>
                  {member.icon}
                </div>
                <h4 className="font-black text-slate-800 text-sm">{member.name.split(' ')[0]}</h4>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${colorClasses.split(' ').pop()}`}>
                  {member.role}
                </p>
              </motion.div>
            );
          })}

          <motion.div whileHover={{ y: -5 }} className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-help">
            <Shield className="text-gray-300 mb-2" size={32} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Didukung Oleh</span>
            <span className="text-[10px] font-black text-slate-600 mt-1">Tim Ahli Psikologi</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
