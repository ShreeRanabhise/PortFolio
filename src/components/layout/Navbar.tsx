'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, User, Code, Layout, Briefcase, GraduationCap, Award, Mail, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
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

  const handleLinkClick = () => {
    setHoveredTab(null);
    setMobileMenuOpen(false);
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

        {/* Desktop Navigation Links with Popovers Positioned Exactly Below Each Tab */}
        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-200/50 dark:bg-stone-800/50 p-1.5 rounded-full border border-stone-300/50 dark:border-white/[0.1] backdrop-blur-xs shrink min-w-0"
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
                  className={`relative block px-2.5 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
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

                {/* Modern Minimalist Popover Window Positioned Exactly Below Hovered Tab */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-3xl bg-white/95 dark:bg-stone-900/95 border border-stone-200/80 dark:border-white/10 shadow-2xl shadow-stone-900/10 dark:shadow-black/60 backdrop-blur-xl z-50 text-left pointer-events-auto overflow-hidden ring-1 ring-stone-900/5 dark:ring-white/10"
                    >
                      {/* ABOUT POPOVER */}
                      {link.id === 'about' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                                <User className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                                Overview
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                              Available
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                              Shree Ranabhise
                            </h4>
                            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                              AI Web Developer & Cloud Architecture Engineer with MCA & BSc CS degrees.
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                            <MapPin className="w-3 h-3 text-sky-500" />
                            <span>Pune, MH, India</span>
                          </div>

                          <Link
                            href="#about"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-950 transition-all duration-200 font-bold text-xs"
                          >
                            <span>Explore Profile & Background</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* SKILLS POPOVER */}
                      {link.id === 'skills' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="w-7 h-7 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                              <Code className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                              Core Engineering Stack
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase', 'Vercel'].map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 text-[11px] font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <Link
                            href="#skills"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>Explore Full Skill Matrix</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* PROJECTS POPOVER */}
                      {link.id === 'projects' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Layout className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                                Featured Works
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400">
                              3 Apps
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {projects.map((proj) => (
                              <Link
                                key={proj.slug}
                                href={`/projects/${proj.slug}`}
                                onClick={handleLinkClick}
                                className="group flex items-center justify-between p-2 rounded-xl hover:bg-stone-100/80 dark:hover:bg-stone-800/80 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {proj.title}
                                  </span>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </Link>
                            ))}
                          </div>

                          <Link
                            href="#projects"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>Browse All Portfolio Projects</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* EXPERIENCE POPOVER */}
                      {link.id === 'experience' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="w-7 h-7 rounded-xl bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
                              <Briefcase className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                              Current Role
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-stone-900 dark:text-white">
                              Associate Tech Specialist
                            </h4>
                            <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 block">
                              IGT Solutions • Dec 2023 - Jan 2026
                            </span>
                          </div>

                          <Link
                            href="#experience"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>View Work Experience Timeline</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* EDUCATION POPOVER */}
                      {link.id === 'education' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                              <GraduationCap className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                              Academic Degrees
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-stone-800 dark:text-stone-200">MCA (ASM IMCOST)</span>
                              <span className="font-bold text-sky-600 dark:text-sky-400">CGPA 6.45</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-stone-800 dark:text-stone-200">BSc CS (Model College)</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">CGPA 9.34</span>
                            </div>
                          </div>

                          <Link
                            href="#education"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>View Academic Background</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* CERTIFICATES POPOVER */}
                      {link.id === 'certificates' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                              <Award className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                              Certifications
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>Bolt IoT — Web Development</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                              <span>Anudip — Power BI & Data Analytics</span>
                            </div>
                          </div>

                          <Link
                            href="#certificates"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>View Verified Certificates</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {/* CONTACT POPOVER */}
                      {link.id === 'contact' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-stone-200/50 dark:border-stone-800/80 pb-2.5">
                            <div className="w-7 h-7 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                              <Mail className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-300 font-bold">
                              Direct Contact
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs font-semibold">
                            <a href={`tel:${personalInfo.phone}`} className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors">
                              <span className="text-stone-500 font-normal">Phone:</span>
                              <span>{personalInfo.phone}</span>
                            </a>
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 transition-colors">
                              <span className="text-stone-500 font-normal">Email:</span>
                              <span className="text-sky-600 dark:text-sky-400">{personalInfo.email}</span>
                            </a>
                          </div>

                          <Link
                            href="#contact"
                            onClick={handleLinkClick}
                            className="group flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-200 font-bold text-xs"
                          >
                            <span>Open Direct Contact Form</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

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
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-stone-700 dark:text-stone-300 bg-[#faf9f5] dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/70 hover:bg-stone-200/60 dark:hover:bg-stone-700 flex items-center justify-center active:scale-95 transition-transform"
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
                    onClick={handleLinkClick}
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
