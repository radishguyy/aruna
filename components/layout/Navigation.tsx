"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navigation on app portals (like auth, admin, parent, child)
  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/parent') ||
    pathname.startsWith('/child')
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 tracking-wide uppercase" style={{ fontFamily: '"Grandstander", cursive' }}>
            ARUNA
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-bold text-sm text-slate-500">
          <Link href="/" className={`hover:text-orange-500 transition-colors ${pathname === '/' ? 'text-orange-500' : ''}`}>Beranda</Link>
          <Link href="/about" className={`hover:text-orange-500 transition-colors ${pathname === '/about' ? 'text-orange-500' : ''}`}>Tentang</Link>
          <Link href="/#testimonials" className="hover:text-orange-500 transition-colors">Testimoni</Link>
          <Link href="/pricing" className={`hover:text-orange-500 transition-colors ${pathname === '/pricing' ? 'text-orange-500' : ''}`}>Paket</Link>
          <Link href="/contact" className={`hover:text-orange-500 transition-colors ${pathname === '/contact' ? 'text-orange-500' : ''}`}>Kontak</Link>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hidden md:flex bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-500/30">
            Masuk Platform
          </Link>
          <button className="md:hidden text-orange-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-4 z-40">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`py-3 px-4 text-sm font-bold border-b border-gray-50 ${pathname === '/' ? 'text-orange-500' : 'text-slate-600'}`}>Beranda</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`py-3 px-4 text-sm font-bold border-b border-gray-50 ${pathname === '/about' ? 'text-orange-500' : 'text-slate-600'}`}>Tentang Kami</Link>
          <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-sm font-bold text-slate-600 border-b border-gray-50">Fasilitas</Link>
          <Link href="/#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-sm font-bold text-slate-600 border-b border-gray-50">Testimoni</Link>
          <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`py-3 px-4 text-sm font-bold border-b border-gray-50 ${pathname === '/pricing' ? 'text-orange-500' : 'text-slate-600'}`}>Paket</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`py-3 px-4 text-sm font-bold ${pathname === '/contact' ? 'text-orange-500' : 'text-slate-600'}`}>Kontak</Link>
        </div>
      )}
    </nav>
  );
}
