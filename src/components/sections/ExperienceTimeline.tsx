'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Search,
  Layout,
  Code,
  ShieldCheck,
  Zap,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { timelineData, howIWork } from '@/data/portfolioData';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function getStepIcon(iconName: string) {
  switch (iconName) {
    case 'Search': return <Search className="w-5 h-5 text-violet-400" />;
    case 'Layout': return <Layout className="w-5 h-5 text-violet-400" />;
    case 'Code': return <Code className="w-5 h-5 text-violet-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-violet-400" />;
    case 'Zap': return <Zap className="w-5 h-5 text-violet-400" />;
    default: return <Code className="w-5 h-5 text-violet-400" />;
  }
}

export function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');
  const [activeStep, setActiveStep] = useState<number>(0);

  const filteredTimeline = timelineData.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <section id="experience" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#090b10] text-white relative z-10 space-y-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-violet-600/10 via-indigo-600/5 to-transparent rounded-full blur-[80px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-violet-600/10 via-purple-600/5 to-transparent rounded-full blur-[80px] pointer-events-none transform-gpu" />

      {/* ═══════════════════════════════════════════
         PART 1: ENGINEERING METHODOLOGY (5-STEP PROCESS)
         ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold mx-auto">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>Engineering Process</span>
          </div>
          <h2
            className="font-extrabold tracking-[-0.03em] text-white leading-[1.1]"
            style={{ fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.75rem)' }}
          >
            How I Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-300">
              High-Impact Products
            </span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
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
                      ? 'bg-violet-600/10 border-violet-500/40 shadow-lg shadow-violet-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeStepHighlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-colors ${
                        isSelected ? 'bg-violet-600 text-white' : 'bg-white/[0.05] text-stone-500 group-hover:text-stone-300'
                      }`}
                    >
                      {item.step}
                    </span>
                    <div>
                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-stone-300 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  <div
                    className={`p-2 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-violet-500/20 border-violet-500/30 text-violet-300 scale-110'
                        : 'bg-white/[0.02] border-white/[0.06] text-stone-500 group-hover:text-stone-300'
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
                className="w-full rounded-3xl bg-white/[0.02] border border-white/[0.06] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full">
                      Step {howIWork[activeStep].step} of 05
                    </span>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                      {getStepIcon(howIWork[activeStep].icon)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {howIWork[activeStep].title}
                    </h3>
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                      {howIWork[activeStep].description}
                    </p>
                  </div>

                  {howIWork[activeStep].details && (
                    <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                      <h5 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                        Key Activities & Deliverables
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {howIWork[activeStep].details.map((detail, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-stone-300 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Control Strip */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/[0.06] relative z-10">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-colors"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center gap-1.5">
                    {howIWork.map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeStep ? 'w-6 bg-violet-500' : 'w-2 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={activeStep === howIWork.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(howIWork.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
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
         PART 2: CAREER & ACADEMIC TIMELINE
         ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold mx-auto">
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            <span>Career Journey</span>
          </div>
          <h2
            className="font-extrabold tracking-[-0.03em] text-white leading-[1.1]"
            style={{ fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.75rem)' }}
          >
            Experience &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-300">
              Education
            </span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A comprehensive record of my software engineering experience, academic distinction, and continuous technical growth.
          </p>
        </motion.div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {(['all', 'experience', 'education'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label = tab === 'all' ? 'All Milestones' : tab === 'experience' ? 'Work Experience' : 'Academic Credentials';
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTimelineTab"
                      className="absolute inset-0 rounded-full bg-violet-600 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Grid Stream */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent -translate-x-1/2 hidden sm:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10 relative"
          >
            {filteredTimeline.map((item, index) => {
              const isExperience = item.type === 'experience';
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Timeline Node Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-8 hidden sm:flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full border-4 border-[#090b10] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-125 bg-violet-600 text-white shadow-violet-600/30">
                      {isExperience ? <Briefcase className="w-4 h-4 text-white" /> : <GraduationCap className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="group relative rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-600/5">
                      {/* Top Badges & Period */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-4 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border bg-violet-500/10 border-violet-500/20 text-violet-300">
                          {item.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3 text-violet-400" />
                          {item.period}
                        </span>
                      </div>

                      {/* Header Title & Organization */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-violet-300 transition-colors">
                          {item.role}
                        </h3>
                        <div
                          className={`flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-400 ${
                            isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 text-stone-300">
                            <Building2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                            {item.organization}
                          </span>
                          {item.location && (
                            <span className="flex items-center gap-1 text-stone-500">
                              <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mt-4">
                        {item.summary}
                      </p>

                      {/* Achievements Bullet List */}
                      {item.keyAchievements && item.keyAchievements.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                          {item.keyAchievements.map((ach, i) => (
                            <div
                              key={i}
                              className={`flex items-start gap-2 text-xs text-stone-300 ${
                                isEven ? 'sm:flex-row-reverse sm:text-right' : ''
                              }`}
                            >
                              <span className="text-violet-400 font-bold shrink-0 mt-0.5">✦</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Grade / CGPA Highlight Badge */}
                      {item.gradeOrCgpa && (
                        <div className={`mt-4 pt-3 flex ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-bold text-violet-300">
                            <Award className="w-3.5 h-3.5 text-violet-400" />
                            {item.gradeOrCgpa}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
