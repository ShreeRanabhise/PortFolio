'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { CommandMenu } from './CommandMenu';
import { AnnouncementStrip } from './AnnouncementStrip';
import {
  User,
  Code,
  Layout,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Menu,
  X,
  Download,
} from 'lucide-react';

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
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterTab = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredTab(id);
  };

  const handleMouseLeaveTab = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredTab(null);
    }, 150);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCommandMenuOpen(false);
        setHoveredTab(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40">
        <AnnouncementStrip />
        <header
          className={`w-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 dark:bg-[#090b10]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.06] shadow-xl py-3'
              : 'bg-transparent py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Brand Monogram & Name */}
            <Link
              href="/"
              className="group flex items-center gap-3 text-slate-900 dark:text-white font-medium tracking-tight shrink-0"
            >
              <div className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-violet-600/20 group-hover:scale-105 transition-transform duration-200">
                SR
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                  Shree Ranabhise
                </span>
                <span className="text-[10px] text-slate-500 dark:text-stone-400 font-mono tracking-wider pt-0.5 uppercase">
                  {personalInfo.role}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden xl:flex items-center gap-1 bg-slate-200/60 dark:bg-white/[0.03] p-1.5 rounded-full border border-slate-300/60 dark:border-white/[0.06] backdrop-blur-md"
              onMouseLeave={handleMouseLeaveTab}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isHovered = hoveredTab === link.id;

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnterTab(link.id)}
                    onMouseLeave={handleMouseLeaveTab}
                  >
                    <Link
                      href={link.href}
                      className={`relative block px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-slate-700 hover:text-slate-950 dark:text-stone-300 dark:hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-full bg-violet-600 -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.name}
                    </Link>

                    {/* Popover Preview */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 p-3 rounded-2xl bg-white/95 dark:bg-[#0d1017]/95 border border-slate-200/80 dark:border-white/[0.08] shadow-2xl backdrop-blur-xl z-50 text-left overflow-hidden"
                        >
                          {link.id === 'about' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <User className="w-3.5 h-3.5" /> About Shree
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300 leading-relaxed">
                                {personalInfo.bio.slice(0, 90)}...
                              </p>
                            </div>
                          )}
                          {link.id === 'skills' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Code className="w-3.5 h-3.5" /> Toolkit & Tech
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">
                                Next.js App Router, TypeScript, PostgreSQL, Prisma, Supabase.
                              </p>
                            </div>
                          )}
                          {link.id === 'projects' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Layout className="w-3.5 h-3.5" /> Case Studies
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">
                                Pixelink, Sangliceramica, Suvarna-ERP.
                              </p>
                            </div>
                          )}
                          {link.id === 'experience' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Briefcase className="w-3.5 h-3.5" /> Experience
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">
                                IGT Solutions Process Associate (Dec 2023 - Jan 2026).
                              </p>
                            </div>
                          )}
                          {link.id === 'education' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <GraduationCap className="w-3.5 h-3.5" /> Education
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">
                                MCA Postgraduate & BSc Computer Science (Distinction).
                              </p>
                            </div>
                          )}
                          {link.id === 'certificates' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Award className="w-3.5 h-3.5" /> Certifications
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">
                                Bolt IoT Web Development & Anudip Data Analytics.
                              </p>
                            </div>
                          )}
                          {link.id === 'contact' && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Mail className="w-3.5 h-3.5" /> Direct Contact
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-stone-300">{personalInfo.email}</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Action CTAs: Theme Toggle & Resume */}
            <div className="hidden md:flex items-center gap-2.5">
              <ThemeToggle />

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-violet-600/10 dark:bg-transparent border border-violet-500/40 text-violet-700 dark:text-violet-300 hover:text-white hover:bg-violet-600 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile Menu Controls */}
            <div className="flex xl:hidden items-center gap-2">
              <ThemeToggle />

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2.5 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center bg-slate-200/80 dark:bg-white/[0.03] border border-slate-300/60 dark:border-white/[0.06] text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white transition-colors duration-200"
                aria-label="Toggle Mobile Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[100px] z-30 bg-white/95 dark:bg-[#090b10]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.08] shadow-2xl p-6 xl:hidden"
          >
            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 min-h-[44px] rounded-md text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-700 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] space-y-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[44px] rounded-md bg-violet-600 text-white font-bold text-xs shadow-lg shadow-violet-600/25 active:scale-[0.98] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandMenu isOpen={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
    </>
  );
}
