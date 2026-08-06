'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  Building2,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { timelineData } from '@/data/portfolioData';

export function EducationSection() {
  const educationEntries = timelineData.filter((item) => item.type === 'education');

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <GraduationCap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Education &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              Qualifications
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A strong computer science foundation specializing in software engineering, algorithms, database systems, and full-stack development.
          </p>
        </motion.div>

        {/* Education Timeline Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {educationEntries.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 space-y-6 relative overflow-hidden group shadow-sm dark:shadow-none"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/[0.06]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                      <span>{edu.badge}</span>
                    </span>
                    {edu.gradeOrCgpa && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                        {edu.gradeOrCgpa}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors pt-2">
                    {edu.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-stone-400 pt-0.5">
                    <span className="flex items-center gap-1.5 text-slate-800 dark:text-stone-300 font-bold">
                      <Building2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                      {edu.organization}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1 text-slate-500 dark:text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-stone-400 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-4 py-2 rounded-full font-bold">
                  <Calendar className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-slate-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                {edu.summary}
              </p>

              {/* Key Achievements */}
              {edu.keyAchievements && edu.keyAchievements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
                  {edu.keyAchievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-stone-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
