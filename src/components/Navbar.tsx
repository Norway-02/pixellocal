'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Compact Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
            P
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Pixel<span className="text-blue-600">Local</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Tools
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
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
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            Tools
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2 border-b border-slate-100"
          >
            Privacy
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-2"
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
