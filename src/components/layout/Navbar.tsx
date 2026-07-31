'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { personalInfo } from '@/data/portfolioData';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Certificates', href: '#certificates', id: 'certificates' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf9f5]/85 dark:bg-[#0c0f16]/85 backdrop-blur-md border-b border-stone-200/40 dark:border-white/[0.07] shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex flex-col text-stone-900 dark:text-stone-100 font-medium tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="font-bold text-base sm:text-lg leading-none text-stone-900 dark:text-stone-100 tracking-tight whitespace-nowrap">
            Shree Ranabhise
          </span>
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium tracking-wide pt-0.5 whitespace-nowrap">
            {personalInfo.role}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-200/40 dark:bg-stone-800/40 p-1.5 rounded-full border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-xs shrink min-w-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-stone-950 dark:text-white font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-stone-200/90 dark:bg-stone-700/80 -z-10 shadow-2xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <ThemeToggle />
          <a
            href="/Shree_Ranabhise_Resume.pdf"
            download="Shree_Ranabhise_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2 text-xs font-semibold text-sky-950 dark:text-sky-200 bg-sky-100/90 hover:bg-sky-200/90 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 border border-sky-200/80 dark:border-sky-800/60 rounded-full transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
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
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/70 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Download className="w-4.5 h-4.5" />
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/70 hover:bg-stone-200/60 dark:hover:bg-stone-700 flex items-center justify-center active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#faf9f5]/95 dark:bg-[#0c0f16]/95 backdrop-blur-lg border-b border-stone-200/80 dark:border-white/[0.08] p-4 shadow-lg"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] px-4 py-3 text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-200/40 dark:hover:bg-stone-800/50 active:bg-stone-200/60 dark:active:bg-stone-800/80 rounded-xl transition-colors flex items-center"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-stone-200/60 dark:border-white/[0.08] flex items-center justify-center">
                <a
                  href="/Shree_Ranabhise_Resume.pdf"
                  download="Shree_Ranabhise_Resume.pdf"
                  className="w-full min-h-[44px] py-3 px-4 text-sm font-semibold text-sky-950 dark:text-sky-200 bg-sky-100 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800/80 rounded-xl flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
                >
                  <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Download Resume</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
