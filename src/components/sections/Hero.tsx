'use client';

import { useRef, useEffect, Suspense } from 'react';
import { motion, Variants, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, CheckCircle2, Code, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { personalInfo } from '@/data/portfolioData';
import { WebGLErrorBoundary } from '@/components/webgl/WebGLErrorBoundary';

// Dynamically import isolated 3D HeroCanvas layer to prevent SSR hydration penalty
const HeroCanvas = dynamic(() => import('@/components/webgl/HeroCanvas'), {
  ssr: false,
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth springs for card parallax without triggering React component re-renders
  const cardX = useSpring(rawX, { damping: 30, stiffness: 200 });
  const cardY = useSpring(rawY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            rawX.set((e.clientX - cx) / 45);
            rawY.set((e.clientY - cy) / 45);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rawX, rawY]);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] dark:bg-[#090b10] text-slate-900 dark:text-[#f8fafc] overflow-hidden">
      {/* WebGL Ambient Flow Layer with Error Boundary and Suspense Fallback */}
      <WebGLErrorBoundary
        fallback={
          <div
            className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-indigo-600/5 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        }
      >
        <Suspense
          fallback={
            <div
              className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-indigo-600/5 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          }
        >
          <HeroCanvas />
        </Suspense>
      </WebGLErrorBoundary>

      {/* Background glow blooms with GPU acceleration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/10 to-transparent dark:from-violet-600/15 dark:via-indigo-600/10 rounded-full blur-[90px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-20 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-violet-600/10 via-purple-600/8 to-transparent rounded-full blur-[80px] pointer-events-none transform-gpu" />

      {/* Main hero grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center my-auto relative z-10"
      >
        {/* Left column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* Eyebrow badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
              </span>
              <span>{personalInfo.availability}</span>
            </div>
            <span className="text-xs font-mono text-stone-400 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span>{personalInfo.location}</span>
            </span>
          </motion.div>

          {/* Oversized headline */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="text-slate-600 dark:text-stone-500 text-sm sm:text-base font-medium block tracking-wide uppercase">
              Hi, I&apos;m <strong className="text-slate-900 dark:text-stone-200 font-semibold normal-case">{personalInfo.name}</strong>
            </span>
            <h1
              className="font-extrabold tracking-[-0.03em] leading-[1.05] text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)' }}
            >
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
                Intelligent
              </span>{' '}
              Web Applications.
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-stone-400 text-base sm:text-lg font-normal max-w-xl leading-relaxed"
          >
            {personalInfo.outcomesStatement} Specialized in Next.js, React, TypeScript, PostgreSQL, and AI-assisted experience design.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <Link
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-md bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 transition-all duration-200 hover:shadow-violet-500/40 active:scale-[0.97]"
            >
              <span>View projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-md bg-white/80 dark:bg-transparent border border-slate-300/80 dark:border-white/10 hover:border-violet-500/50 text-slate-800 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white font-semibold text-sm transition-all duration-200 group shadow-sm dark:shadow-none"
            >
              <span>Contact me</span>
              <ArrowRight className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Right column: Refined Medium Profile Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
          ref={cardRef}
          style={{
            x: cardX,
            y: cardY,
          }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-indigo-600/10 to-transparent rounded-3xl blur-[50px] pointer-events-none transform-gpu" />

          {/* Card Frame */}
          <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] p-4 shadow-2xl backdrop-blur-md overflow-hidden group">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06] mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500/30" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-stone-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                shree-dev.ts
              </span>
            </div>

            {/* Medium Portrait Container */}
            <div className="relative aspect-[4/4.5] w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d1017]">
              <Image
                src="/images/shree-profile.jpg"
                alt="Shree Ranabhise"
                fill
                priority
                sizes="340px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10]/90 via-transparent to-transparent pointer-events-none" />

              {/* Glass Badge Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#090b10]/80 border border-white/[0.08] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{personalInfo.name}</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                  </span>
                </div>
                <span className="text-[11px] font-mono text-violet-300 font-semibold block mt-0.5">{personalInfo.role}</span>
              </div>
            </div>

            {/* Bottom Quick Stack Badges */}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
                <div className="p-1.5 rounded bg-violet-500/10 text-violet-400">
                  <Code className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-white truncate">Full-Stack</div>
                  <div className="text-[8.5px] text-stone-500 font-mono truncate">Next.js · TS</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
                <div className="p-1.5 rounded bg-violet-500/10 text-violet-400">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-white truncate">AI Architect</div>
                  <div className="text-[8.5px] text-stone-500 font-mono truncate">UI Workflows</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Specialty ticker rail */}
      <div className="w-full mt-16 py-3 border-y border-white/[0.06] bg-white/[0.01] overflow-hidden relative z-10">
        <div className="animate-marquee space-x-8 text-stone-500 text-xs font-mono tracking-widest uppercase font-medium">
          {personalInfo.specialties.concat(personalInfo.specialties).map((spec, i) => (
            <span key={i} className="inline-flex items-center gap-4">
              <span>{spec}</span>
              <span className="text-violet-500/60">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
