'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, Mail, MapPin, Code2, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo } from '@/data/portfolioData';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Soft Abstract Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-sky-200/40 dark:bg-sky-950/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-purple-200/35 dark:bg-purple-950/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-emerald-100/40 dark:bg-emerald-950/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start gap-6"
          >
            {/* Status chip */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </div>

            {/* Greeting & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
                Hi, I’m{' '}
                <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-emerald-600 dark:from-sky-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Shree Ranabhise
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-normal text-stone-800 dark:text-stone-200">
                {personalInfo.role}
              </p>
            </div>

            {/* Outcome-focused statement */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-2xl">
              {personalInfo.outcomesStatement}
            </p>

            {/* Quick location tag */}
            <div className="flex items-center gap-5 text-sm sm:text-base font-medium text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400" />
                {personalInfo.location}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700"></span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-stone-400" />
                Frontend, Backend & API
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-900 bg-stone-100 dark:bg-stone-100 hover:bg-stone-200 dark:hover:bg-stone-200 rounded-2xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View projects</span>
                <ArrowDownRight className="w-5 h-5 text-stone-700 dark:text-stone-700" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base sm:text-lg font-semibold text-stone-700 dark:text-stone-200 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-5 h-5 text-stone-500" />
                <span>Contact me</span>
              </Link>
            </div>
          </motion.div>

          {/* Profile Card preserving uploaded photo 3:4 aspect ratio (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 backdrop-blur-md shadow-md flex flex-col gap-4">
              
              {/* Natural Aspect Ratio Photo Container with NO black shadow */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200/70 dark:border-stone-700/80 group">
                <Image
                  src="/images/shree-profile.jpg"
                  alt="Shree Ranabhise Profile Photo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Clean Profile Badge Below Image */}
              <div className="flex flex-col text-left px-1">
                {/* 5-Star Rating Row */}
                <div className="flex items-center gap-1 text-amber-400 dark:text-amber-300 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 tracking-wide uppercase">
                    AI Web Developer
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                  Web Designer & Database Architect
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-around text-center">
                <div>
                  <span className="block text-base font-bold text-stone-900 dark:text-stone-100">
                    10+
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Major Projects
                  </span>
                </div>
                <div className="w-px bg-stone-200 dark:bg-stone-800" />
                <div>
                  <span className="block text-base font-bold text-stone-900 dark:text-stone-100">
                    2+ Yrs
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                    Experience
                  </span>
                </div>
                <div className="w-px bg-stone-200 dark:bg-stone-800" />
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
