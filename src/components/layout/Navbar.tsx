'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, User, Code, Layout, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { personalInfo, projects } from '@/data/portfolioData';

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setHoveredTab(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf9f5]/90 dark:bg-[#0c0f16]/90 backdrop-blur-md border-b border-stone-200/40 dark:border-white/[0.07] shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex flex-col text-stone-900 dark:text-stone-100 font-medium tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="font-bold text-base sm:text-lg leading-none text-stone-900 dark:text-stone-100 tracking-tight whitespace-nowrap">
            Shree Ranabhise
          </span>
          <span className="text-[11px] text-stone-600 dark:text-stone-300 font-medium tracking-wide pt-0.5 whitespace-nowrap">
            {personalInfo.role}
          </span>
        </Link>

        {/* Desktop Navigation Links with Popover Triggers */}
        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-200/50 dark:bg-stone-800/50 p-1.5 rounded-full border border-stone-300/50 dark:border-white/[0.1] backdrop-blur-xs shrink min-w-0"
          onMouseLeave={handleMouseLeaveTab}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => handleMouseEnterTab(link.id)}
                className={`relative px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-stone-950 dark:text-white font-bold'
                    : 'text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-stone-700 shadow-2xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Floating Header Tab Elements Popover Window */}
        <AnimatePresence>
          {hoveredTab && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeaveTab}
              className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-md p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 border border-stone-200/80 dark:border-white/10 shadow-xl backdrop-blur-lg z-50 text-left pointer-events-auto"
            >
              {hoveredTab === 'about' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      About Shree Ranabhise
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    AI Web Developer & Cloud Architecture Engineer with MCA & BSc CS. Specialized in building clean, resilient, cloud-ready software.
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
                    <span className="flex items-center gap-1 font-semibold text-stone-900 dark:text-stone-100">
                      <MapPin className="w-3 h-3 text-sky-500" /> Pune, MH, India
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">● Active & Available</span>
                  </div>
                </div>
              )}

              {hoveredTab === 'skills' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <Code className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Core Engineering Toolkit
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase', 'Vercel', 'Tailwind CSS', 'Power BI'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[11px] font-bold rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200/60 dark:border-stone-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hoveredTab === 'projects' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <Layout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Featured Solutions ({projects.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {projects.map((proj) => (
                      <Link
                        key={proj.slug}
                        href={`/projects/${proj.slug}`}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-stone-200/40 dark:border-stone-700/40 transition-colors group"
                      >
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-0.5">
                          View ↗
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {hoveredTab === 'experience' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Current Work Experience
                    </h4>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Associate Tech Specialist @ IGT Solutions
                    </h5>
                    <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 block">
                      Dec 2023 - Jan 2026 (2+ Years)
                    </span>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 font-medium pt-0.5">
                      Operational excellence, tech workflows, data QA, and web system maintenance.
                    </p>
                  </div>
                </div>
              )}

              {hoveredTab === 'education' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Academic Background
                    </h4>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 dark:text-stone-100">MCA (Aug 2023 - Apr 2026)</span>
                      <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">CGPA 6.45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 dark:text-stone-100">BSc CS (Jul 2020 - May 2023)</span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">CGPA 9.34</span>
                    </div>
                  </div>
                </div>
              )}

              {hoveredTab === 'certificates' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Verified Certifications
                    </h4>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/50">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Bolt IoT — Web Development</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">PHP, React, Node.JS, SQL, TypeScript, Express</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/50">
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">Anudip — Power BI & Data Analytics</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">MS Excel, Power BI, SQL, Python, SEO</span>
                    </div>
                  </div>
                </div>
              )}

              {hoveredTab === 'contact' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                      Direct Contact Channels
                    </h4>
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200 font-semibold">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Phone:</span>
                      <a href={`tel:${personalInfo.phone}`} className="text-stone-900 dark:text-stone-100 hover:text-sky-600">{personalInfo.phone}</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Email:</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-stone-900 dark:text-stone-100 hover:text-sky-600">{personalInfo.email}</a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right CTA Actions with Task-Scoped Motion */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <ThemeToggle />
          <a
            href="/Shree_Ranabhise_Resume.pdf"
            download="Shree_Ranabhise_Resume.pdf"
            className="group inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2 text-xs font-bold text-sky-950 dark:text-sky-100 bg-sky-100/90 hover:bg-sky-200/90 dark:bg-sky-950/70 dark:hover:bg-sky-900/70 border border-sky-300/80 dark:border-sky-800/80 rounded-full transition-all duration-200 shadow-2xs hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 group-hover:translate-y-0.5 transition-transform duration-200" />
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
