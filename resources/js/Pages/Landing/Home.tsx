import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/sections/Hero';
import Features from '@/Components/sections/Features';
import About from '@/Components/sections/About';
import Testimonials from '@/Components/sections/Testimonials';
import Pricing from '@/Components/sections/Pricing';
import Blog from '@/Components/sections/Blog';
import CTA from '@/Components/sections/CTA';

export default function Home({ articles }: { articles?: any }) {
  return (
    <MainLayout>
      <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden relative">
        <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-20">
          <Hero />
          <Features />
          <About />
          <Testimonials />
          <Pricing />
          <Blog articles={articles} />
        </main>
      </div>
      <CTA />
    </MainLayout>
  );
}
