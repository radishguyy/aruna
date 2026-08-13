import React from 'react';
import Navigation from '@/Components/layout/Navigation';
import Footer from '@/Components/layout/Footer';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] min-h-screen selection:bg-orange-200 overflow-x-hidden flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
