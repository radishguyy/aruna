import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { mockData } from '@/data/mockData';

const Blog = () => {
  const articles = mockData.articles.slice(0, 2); // Show only the first 2 on the landing page

  return (
    <section id="blog">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2" style={{ fontFamily: '"Grandstander", cursive' }}>
            Jurnal & Tips Parenting
          </h2>
          <p className="text-slate-500">Panduan untuk Ayah & Bunda.</p>
        </div>
        <Link 
          href="/blog"
          className="hidden md:flex items-center gap-2 bg-white border-2 border-gray-200 px-6 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:border-orange-300 hover:text-orange-500 transition-colors"
        >
          Lihat Semua <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.id}
            href={`/blog/${article.slug}`}
            className="bg-white border-2 border-gray-100 rounded-3xl p-4 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className={`w-full sm:w-1/3 h-40 sm:h-auto bg-${article.categoryColor}-100 rounded-2xl overflow-hidden relative`}>
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="w-full sm:w-2/3 py-2 flex flex-col justify-center">
              <span className={`text-[10px] font-bold text-${article.categoryColor}-500 bg-${article.categoryColor}-50 w-fit px-3 py-1 rounded-full tracking-widest uppercase mb-3 border border-${article.categoryColor}-100`}>
                {article.category}
              </span>
              <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-orange-500 transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
