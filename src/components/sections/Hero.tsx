'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, Mail, MapPin, Code2, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo } from '@/data/portfolioData';

export function Hero() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-10 flex items-center justify-center overflow-hidden">
      {/* Imperceptible Ambient Color Blooms with slow drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute -top-28 -left-20 w-[26rem] h-[26rem] rounded-full bg-sky-200/30 dark:bg-sky-900/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute top-1/4 -right-28 w-[30rem] h-[30rem] rounded-full bg-purple-200/25 dark:bg-purple-900/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="absolute -bottom-24 left-1/3 w-[24rem] h-[24rem] rounded-full bg-emerald-100/30 dark:bg-emerald-950/15 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Text (7 cols on md+) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="md:col-span-7 flex flex-col items-start gap-5 lg:gap-6"
          >
            {/* Status chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-200/50 dark:bg-stone-800/40 border border-stone-300/40 dark:border-white/[0.08] text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 shadow-2xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Greeting & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.15]">
                Hi, I’m{' '}
                <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-emerald-600 dark:from-sky-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Shree Ranabhise
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-stone-700 dark:text-stone-300">
                {personalInfo.role}
              </p>
            </div>

            {/* Outcome statement */}
            <p className="text-sm sm:text-base md:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl">
              {personalInfo.outcomesStatement}
            </p>

            {/* Quick location tag */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {personalInfo.location}
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700"></span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-stone-400" />
                Frontend, Backend & API
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1 sm:pt-2">
              <Link
                href="#projects"
                className="group w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 rounded-2xl shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <span>View projects</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200" />
              </Link>

              <Link
                href="#contact"
                className="group w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-stone-900 dark:text-stone-100 bg-stone-200/60 dark:bg-stone-800/60 hover:bg-stone-200/90 dark:hover:bg-stone-700/90 border border-stone-300/50 dark:border-white/[0.1] rounded-2xl transition-all duration-200 active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-stone-600 dark:text-stone-300 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-200" />
                <span>Contact me</span>
              </Link>
            </div>
          </motion.div>

          {/* Profile Card preserving uploaded photo 3:4 aspect ratio (5 cols on md+) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-sm p-4 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-xs flex flex-col gap-4">
              
              {/* Natural Aspect Ratio Photo Container */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200/50 dark:border-white/[0.08] group">
                <Image
                  src="/images/shree-profile.jpg"
                  alt="Shree Ranabhise Profile Photo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Profile details */}
              <div className="flex flex-col text-left px-1">
                <div className="flex items-center gap-1 text-amber-400 dark:text-amber-300 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 tracking-wide uppercase">
                    AI Web Developer
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                  Web Designer & Database Architect
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="pt-2 border-t border-stone-200/40 dark:border-white/[0.06] flex justify-around text-center">
                <div>
                  <span className="block text-base font-bold text-stone-900 dark:text-stone-100">
                    10+
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Major Projects
                  </span>
                </div>
                <div className="w-px bg-stone-200/60 dark:bg-white/[0.08]" />
                <div>
                  <span className="block text-base font-bold text-stone-900 dark:text-stone-100">
                    2+ Yrs
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Experience
                  </span>
                </div>
                <div className="w-px bg-stone-200/60 dark:bg-white/[0.08]" />
                <div>
                  <span className="block text-base font-bold text-emerald-600 dark:text-emerald-400">
                    48 Hrs
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Project Delivery
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
