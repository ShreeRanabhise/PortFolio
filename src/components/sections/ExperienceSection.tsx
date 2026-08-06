'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Search,
  Layout,
  Code,
  ShieldCheck,
  Zap,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { timelineData, howIWork } from '@/data/portfolioData';

function getStepIcon(iconName: string) {
  switch (iconName) {
    case 'Search': return <Search className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    case 'Layout': return <Layout className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    case 'Code': return <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    case 'Zap': return <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
    default: return <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
  }
}

export function ExperienceSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const experiences = timelineData.filter((item) => item.type === 'experience');

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 space-y-20 sm:space-y-24 overflow-hidden transition-colors duration-300">
      {/* ═══════════════════════════════════════════
         PART 1: ENGINEERING METHODOLOGY (5-STEP PROCESS)
         ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <Zap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Engineering Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            How I Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              High-Impact Products
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A disciplined 5-step engineering methodology engineered for reliability, security, type safety, and sub-second performance.
          </p>
        </motion.div>

        {/* Process Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {howIWork.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-violet-50 dark:bg-violet-600/10 border-violet-300 dark:border-violet-500/40 shadow-sm dark:shadow-violet-500/10'
                      : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeStepPill"
                      className="absolute inset-0 rounded-2xl bg-violet-100/60 dark:bg-violet-600/15 border border-violet-300 dark:border-violet-500/40 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-colors ${
                        isSelected ? 'bg-violet-600 text-white' : 'bg-slate-200/80 dark:bg-white/[0.05] text-slate-700 dark:text-stone-500'
                      }`}
                    >
                      {item.step}
                    </span>
                    <div>
                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-stone-300'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-stone-500 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <div
                    className={`p-2 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-white dark:bg-violet-500/20 border-violet-300 dark:border-violet-500/30 text-violet-600 dark:text-violet-300 scale-110'
                        : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-stone-500'
                    }`}
                  >
                    {getStepIcon(item.icon)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Details Card */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-sm dark:shadow-none"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-3.5 py-1.5 rounded-full">
                      Step {howIWork[activeStep].step} of 05
                    </span>
                    <div className="p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                      {getStepIcon(howIWork[activeStep].icon)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {howIWork[activeStep].title}
                    </h3>
                    <p className="text-slate-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                      {howIWork[activeStep].description}
                    </p>
                  </div>

                  {howIWork[activeStep].details && (
                    <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
                      <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-stone-500 font-bold">
                        Key Activities & Deliverables
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {howIWork[activeStep].details.map((detail, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] text-xs font-semibold text-slate-800 dark:text-stone-300 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Control Strip */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200/80 dark:border-white/[0.06] relative z-10">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-semibold text-slate-700 dark:text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center gap-1.5">
                    {howIWork.map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeStep ? 'w-6 bg-violet-600 dark:bg-violet-500' : 'w-2 bg-slate-300 dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={activeStep === howIWork.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(howIWork.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
         PART 2: WORK EXPERIENCE SECTION
         ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <Briefcase className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              Experience
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hands-on professional experience executing structured software workflows, technical validation, and production application delivery.
          </p>
        </motion.div>

        {/* Experience List Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 space-y-6 relative overflow-hidden group shadow-sm dark:shadow-none"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/[0.06]">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border bg-violet-100 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300">
                    {exp.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors pt-1">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-stone-400 pt-0.5">
                    <span className="flex items-center gap-1.5 text-slate-800 dark:text-stone-300 font-bold">
                      <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                      {exp.organization}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-slate-500 dark:text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-stone-400 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-4 py-2 rounded-full font-bold">
                  <Calendar className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                {exp.summary}
              </p>

              {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-stone-500 font-bold tracking-wider">
                    Key Impact & Responsibilities
                  </h4>
                  <div className="space-y-2">
                    {exp.keyAchievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-stone-300 font-medium">
                        <span className="text-violet-600 dark:text-violet-400 font-bold shrink-0 mt-0.5">✦</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
