"use client";
import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Blog from '@/components/sections/Blog';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden relative">
        <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-20">
          <Hero />
          <Features />
          <About />
          <Testimonials />
          <Pricing />
          <Blog />
        </main>

        {/* <Footer /> */}
      </div>
      <CTA />
    </>
  );
}