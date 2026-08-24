'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/95 backdrop-blur-xs border-b border-slate-200'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Compact Logo with Micro Interaction */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs group-hover:scale-105 transition-transform duration-200">
            P
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
            Pixel<span className="text-blue-600">Local</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200 relative group py-1">
            Tools
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full rounded-full" />
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors duration-200 relative group py-1">
            Privacy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full rounded-full" />
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors duration-200 relative group py-1">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full rounded-full" />
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/heic-to-jpg" className="btn-primary text-xs !min-h-[38px] !px-4">
            Start converting
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg animate-result-reveal">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600 transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2 border-b border-slate-100 hover:text-blue-600 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <div className="pt-2">
            <Link
              href="/heic-to-jpg"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Start converting
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
