'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { personalInfo } from '@/data/portfolioData';
import { Server, Cpu, Zap, Users, MapPin, Compass, Code, Cloud, Rocket, Heart, User } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Cpu,
  Zap,
  Users,
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <User className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Engineering &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              Product Mission
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A passionate software developer driven by real-world problem solving, clean component architecture, and intelligent AI user experiences.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Profile & Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-none"
          >
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200/80 dark:border-white/[0.06]">
              <div className="relative w-24 sm:w-28 aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shrink-0 group">
                <Image
                  src="/images/shree-profile.jpg"
                  alt="Shree Ranabhise Profile Photo"
                  fill
                  sizes="(max-width: 768px) 100vw, 112px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-violet-600 dark:text-violet-400">
                    Active & Available
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{personalInfo.name}</h3>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-300">{personalInfo.role}</p>
                <p className="text-xs font-mono text-slate-500 dark:text-stone-500">{personalInfo.location}</p>
              </div>
            </div>

            {/* Background Story Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-300">
                  <Code className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Full-Stack Web Engineering</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-stone-300 leading-relaxed">
                  Experienced software developer with hands-on expertise building full-stack web applications using <strong className="text-slate-950 dark:text-white">Next.js, React, TypeScript, PostgreSQL, Prisma, Supabase, and AI tools</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-300">
                  <Cloud className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Cloud Architecture & Database Schemas</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-stone-300 leading-relaxed">
                  Practical experience in cloud-based application development on <strong className="text-slate-950 dark:text-white">Vercel</strong>, secure authentication, technical SEO optimization, and structured database schema design.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-violet-50/70 dark:bg-violet-500/[0.06] border border-violet-200 dark:border-violet-500/[0.12] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-mono uppercase text-violet-700 dark:text-violet-400 font-bold tracking-wider">Career Mission</h5>
                  <p className="text-sm text-slate-800 dark:text-stone-300 leading-relaxed font-medium">
                    Dedicated to continuous learning, building production-ready applications, and joining collaborative teams in Cloud Architecture and Full-Stack Engineering.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Details Strip */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 dark:text-stone-500 font-mono">Location</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Pune, MH</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 dark:text-stone-500 font-mono">Focus</span>
                  <span className="font-semibold text-slate-900 dark:text-white">AI & Web Design</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500 dark:text-stone-500 font-mono">Interests</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Sports & Design</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Key Values */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4 flex flex-col justify-between"
          >
            {personalInfo.keyValues.map((val) => {
              const IconComp = iconMap[val.iconName] || Server;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeUp}
                  className="p-6 rounded-3xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 shadow-sm dark:shadow-none transition-all duration-300 space-y-2 group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-200">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed pl-1">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
