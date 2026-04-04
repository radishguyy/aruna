"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const { articles } = mockData;

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200">
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 flex flex-col gap-12 mt-20">
        
        {/* Header Section */}
        <section className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-purple-200">
            <BookOpen size={16} /> Pojok Literasi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" style={{ fontFamily: '"Grandstander", cursive' }}>
            Jurnal & Tips Parenting
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Kumpulan panduan, tips, dan wawasan terbaru seputar pendidikan anak usia dini dan perlindungan diri dari tim ahli Aruna.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                href={`/blog/${article.slug}`}
                className="bg-white border-2 border-gray-100 rounded-[2rem] flex flex-col h-full hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all cursor-pointer overflow-hidden group"
              >
                <div className={`w-full h-56 bg-${article.categoryColor}-100 overflow-hidden relative`}>
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-${article.categoryColor}-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border border-${article.categoryColor}-100`}>
                    {article.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold text-slate-700">{article.author}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

      </main>
    </div>
  );
}
