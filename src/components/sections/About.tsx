'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { personalInfo } from '@/data/portfolioData';
import { Server, Cpu, Zap, Users, MapPin, Compass, Briefcase, Code, Cloud, Rocket } from 'lucide-react';

const iconMap: Record<string, any> = {
  Server,
  Cpu,
  Zap,
  Users,
};

export function About() {
  return (
    <section id="about" className="py-10 sm:py-14 bg-stone-100/30 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          badgeVariant="mist"
          title="Building clean, resilient, cloud-ready software"
          subtitle="A passionate developer driven by problem-solving, modern web craftsmanship, and intelligent AI user experiences."
        />

        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Story & Profile Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-xs"
          >
            {/* Header Profile Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-200/40 dark:border-white/[0.06]">
              {/* Natural 3:4 Aspect Ratio Portrait Container */}
              <div className="relative w-24 sm:w-28 aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200/50 dark:border-white/[0.08] shrink-0 group">
                <Image
                  src="/images/shree-profile.jpg"
                  alt="Shree Ranabhise Profile Photo"
                  fill
                  sizes="(max-width: 768px) 100vw, 112px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-600 dark:text-emerald-400">
                    Active & Available
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  {personalInfo.role}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Background & Goal Section */}
            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-500" />
                  <span>My Background & Goal</span>
                </h4>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  Full-Stack & AI
                </span>
              </div>

              {/* Story Paragraph 1: Full-Stack Expertise */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/50 dark:bg-stone-800/30 border border-stone-200/40 dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                  <Code className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Full-Stack Web Engineering</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  Passionate software developer with hands-on experience building AI-enhanced full-stack web applications using <strong className="font-semibold text-stone-900 dark:text-stone-100">Next.js, React, TypeScript, PostgreSQL, Prisma, Supabase, and Generative AI tools</strong>.
                </p>
              </div>

              {/* Story Paragraph 2: Cloud & Production Deployment */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/50 dark:bg-stone-800/30 border border-stone-200/40 dark:border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                  <Cloud className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Cloud Architecture & Database Design</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  Through real-world projects, I have gained practical experience in cloud-based application development, secure authentication, database schemas, continuous deployment on platforms like <strong className="font-semibold text-stone-900 dark:text-stone-100">Vercel</strong>, and leveraging <strong className="font-semibold text-stone-900 dark:text-stone-100">AI development workflows & prompt engineering</strong> for rapid iteration.
                </p>
              </div>

              {/* Featured Goal & Aspiration Callout Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-200/50 dark:border-sky-800/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                    Career Vision & Mission
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    Driven to solve real-world problems, continuously learn cutting-edge AI & web technologies, and collaborate with forward-thinking engineering teams to build impactful digital experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Status Pill grid */}
            <div className="pt-4 border-t border-stone-200/40 dark:border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-100/50 dark:bg-stone-800/40 border border-stone-200/40 dark:border-white/[0.06]">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <div>
                  <span className="block text-stone-400 dark:text-stone-500 font-medium text-[11px]">Location</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 text-xs">Pune, MH</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-100/50 dark:bg-stone-800/40 border border-stone-200/40 dark:border-white/[0.06]">
                <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <span className="block text-stone-400 dark:text-stone-500 font-medium text-[11px]">Focus</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 text-xs">AI & Web design</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-stone-100/50 dark:bg-stone-800/40 border border-stone-200/40 dark:border-white/[0.06]">
                <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-stone-400 dark:text-stone-500 font-medium text-[11px]">Goal</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 text-xs">AI Web Expert</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Values Grid (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4 justify-between"
          >
            {personalInfo.keyValues.map((val) => {
              const IconComponent = iconMap[val.iconName] || Server;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:-translate-y-0.5 hover:border-sky-300 dark:hover:border-sky-800/60 transition-all duration-200 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
