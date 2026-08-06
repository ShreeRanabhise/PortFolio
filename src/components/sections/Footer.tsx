'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f1f5f9] dark:bg-[#07090e] text-slate-700 dark:text-stone-400 border-t border-slate-200 dark:border-white/[0.06] relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-200 dark:border-white/[0.06]">
          {/* Brand */}
          <div className="space-y-3 max-w-md">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-violet-600/20 group-hover:scale-105 transition-transform duration-200">
                SR
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-stone-400 font-mono tracking-wider pt-0.5">
                  {personalInfo.role} • {personalInfo.location}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed font-medium">
              Building scalable, AI-infused web applications and resilient cloud systems that solve real-world business challenges.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/40 transition-all duration-200 shadow-sm dark:shadow-none"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/40 transition-all duration-200 shadow-sm dark:shadow-none"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-2xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/40 transition-all duration-200 shadow-sm dark:shadow-none"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="p-3 rounded-2xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/40 transition-all duration-200 shadow-sm dark:shadow-none"
              aria-label="Call Phone"
            >
              <Phone className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-stone-400 font-semibold">
          <div>
            © {new Date().getFullYear()} Shree Ranabhise. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Built with Next.js, React & Tailwind CSS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-800 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/40 transition-all duration-200 shadow-sm dark:shadow-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
