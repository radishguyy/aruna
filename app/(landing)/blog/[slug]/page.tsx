"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function ArticleDetail() {
  const { slug } = useParams();
  const router = useRouter();

  // Find the exact article
  const article = mockData.articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <h1 className="text-4xl font-bold text-slate-800 mb-4" style={{ fontFamily: '"Grandstander", cursive' }}>Artikel Tidak Ditemukan</h1>
        <button onClick={() => router.push('/blog')} className="text-orange-500 hover:text-orange-600 font-bold flex items-center gap-2">
          <ArrowLeft size={18} /> Kembali ke Pojok Literasi
        </button>
      </div>
    );
  }

  // Format content to handle newlines
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-slate-600 leading-relaxed text-lg mb-6">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden">
      <main className="max-w-[800px] mx-auto px-4 md:px-6 py-12 flex flex-col gap-12 mt-20">
        
        {/* Navigation & Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 font-bold mb-8 transition-colors">
            <ArrowLeft size={20} /> Pojok Literasi
          </Link>
          <div className="mb-6">
            <span className={`inline-block text-[10px] font-bold text-${article.categoryColor}-500 bg-${article.categoryColor}-50 px-4 py-2 rounded-full tracking-widest uppercase mb-4 border border-${article.categoryColor}-100 shadow-sm`}>
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight" style={{ fontFamily: '"Grandstander", cursive' }}>
              {article.title}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
              {article.description}
            </p>
            <div className="flex items-center gap-6 text-sm font-bold text-slate-400 border-t border-b border-gray-100 py-4">
              <span className="flex items-center gap-2"><User size={16} className={`text-${article.categoryColor}-500`} /> {article.author}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {article.date}</span>
            </div>
          </div>
        </motion.section>

        {/* Featured Image */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-64 md:h-96 rounded-[2rem] overflow-hidden relative shadow-lg"
        >
          <div className={`absolute inset-0 bg-${article.categoryColor}-200/20 mix-blend-multiply z-10`}></div>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover relative z-0" 
          />
        </motion.section>

        {/* Content */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 border-2 border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
           {renderContent(article.content)}
           
           <div className={`mt-12 p-8 bg-${article.categoryColor}-50 rounded-3xl border border-${article.categoryColor}-100 flex gap-6 items-start`}>
             <div className={`w-12 h-12 rounded-full bg-${article.categoryColor}-100 flex items-center justify-center text-${article.categoryColor}-500 flex-shrink-0`}>
                <BookOpen size={24} />
             </div>
             <div>
               <h4 className="font-bold text-slate-800 mb-2">Tertarik dengan topik ini?</h4>
               <p className="text-sm text-slate-600 mb-4">Eksplorasi lebih jauh bagaimana platform ekosistem edukasi Aruna membantu memberdayakan keluarga dan institusi.</p>
               <button className={`bg-${article.categoryColor}-500 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-${article.categoryColor}-600 transition-colors`}>
                 Mulai Trial Aruna
               </button>
             </div>
           </div>
        </motion.article>

      </main>
    </div>
  );
}
