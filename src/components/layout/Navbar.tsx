'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, FileText, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ResumeModal } from '@/components/resume/ResumeModal';
import { personalInfo } from '@/data/portfolioData';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fcfbf9]/85 dark:bg-[#0f1218]/85 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/60 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex flex-col text-stone-900 dark:text-stone-100 font-medium tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="font-bold text-base sm:text-lg leading-none text-stone-900 dark:text-stone-100">
            Shree Ranabhise
          </span>
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium tracking-wide pt-0.5">
            {personalInfo.role}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 dark:bg-stone-800/50 p-1.5 rounded-full border border-stone-200/60 dark:border-stone-700/50 backdrop-blur-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-full hover:bg-stone-200/50 dark:hover:bg-stone-700/60 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/Shree_Ranabhise_Resume.pdf"
            download="Shree_Ranabhise_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-sky-900 dark:text-sky-200 bg-sky-100/90 hover:bg-sky-200 dark:bg-sky-950/70 dark:hover:bg-sky-900/70 border border-sky-200 dark:border-sky-800/80 rounded-full transition-all shadow-2xs hover:scale-105 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu trigger & instant actions */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/Shree_Ranabhise_Resume.pdf"
            download="Shree_Ranabhise_Resume.pdf"
            aria-label="Download Resume"
            title="Download Resume"
            className="p-2 rounded-xl text-sky-700 dark:text-sky-300 bg-sky-100/90 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 flex items-center justify-center"
          >
            <Download className="w-4.5 h-4.5" />
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2 rounded-xl text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:bg-stone-200/60 dark:hover:bg-stone-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#fcfbf9]/95 dark:bg-[#0f1218]/95 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 p-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-center">
              <a
                href="/Shree_Ranabhise_Resume.pdf"
                download="Shree_Ranabhise_Resume.pdf"
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-sky-900 dark:text-sky-200 bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-xl flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Download Resume</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
