import React from 'react';

const Blog = () => {
  return (
    <section id="blog" className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 border-t border-gray-100">
      <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#006A50] mb-4 sm:mb-6">
          Wawasan <span className="text-[#DD6B66]">Parenting.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600">Temukan tips dan panduan mendiskusikan batasan tubuh dan keamanan digital dengan anak Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
        {/* Article 1 */}
        <div className="group cursor-pointer flex flex-col md:flex-row border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-auto bg-gray-200 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&q=80" alt="Membaca" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#006A50]">01.</div>
          </div>
          <div className="w-full md:w-1/2 bg-[#DD6B66] p-8 md:p-10 lg:p-12 text-white flex flex-col justify-center">
            <h4 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">Membahas Batasan Tubuh</h4>
            <p className="text-sm text-rose-100 leading-relaxed">Pelajari metode praktis untuk mengajarkan anak tentang sentuhan aman tanpa menimbulkan trauma.</p>
          </div>
        </div>

        {/* Article 2 */}
        <div className="group cursor-pointer flex flex-col md:flex-row">
          {/* Image ordered to right on desktop, top on mobile automatically via flex-col order */}
          <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-auto bg-gray-200 overflow-hidden relative order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80" alt="Belajar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#006A50]">02.</div>
          </div>
          <div className="w-full md:w-1/2 bg-[#F9D308] p-8 md:p-10 lg:p-12 text-[#006A50] flex flex-col justify-center order-2 md:order-1">
            <h4 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">Peran Edukasi Visual</h4>
            <p className="text-sm text-[#006A50]/80 leading-relaxed">Bagaimana penyampaian cerita melalui modul digital dapat meningkatkan pemahaman aturan keamanan anak.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
