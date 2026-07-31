'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { skillCategories, howIWork } from '@/data/portfolioData';
import { Badge } from '@/components/ui/Badge';
import { Layers, ShieldCheck, Activity, Search, CheckCircle2 } from 'lucide-react';

const howIconMap: Record<string, any> = {
  Layers,
  ShieldCheck,
  Search,
  Activity,
};

export function Skills() {
  return (
    <section id="skills" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Matrix"
          badgeVariant="lavender"
          title="Skills & Engineering Principles"
          subtitle="A comprehensive overview of my core web, backend, cloud, and AI development toolkit."
        />

        {/* Tight, Space-Optimized Skills Cards Grid with Aligned Heights */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {skillCategories.map((catGroup, idx) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:border-purple-300/80 dark:hover:border-purple-800/60 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                    {catGroup.category}
                  </h3>
                  <Badge variant="lavender" className="px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap shrink-0">
                    {catGroup.skills.length} skills
                  </Badge>
                </div>

                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed font-normal">
                  {catGroup.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {catGroup.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100/60 dark:bg-stone-800/50 border border-stone-200/50 dark:border-white/[0.06] text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-purple-500 shrink-0" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact "How I Work" Engineering Principles */}
        <div className="mt-14 pt-10 border-t border-stone-200/40 dark:border-white/[0.06] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              How I Work
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-normal">
              Core engineering methodology focused on code quality, security, and search visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howIWork.map((item, index) => {
              const IconComp = howIconMap[item.icon] || CheckCircle2;
              const accentStyles = [
                'bg-purple-100/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60',
                'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
                'bg-sky-100/80 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60',
                'bg-amber-100/80 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
              ];
              const accentStyle = accentStyles[index % accentStyles.length];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-2 group"
                >
                  <div>
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center mb-2.5 shadow-2xs ${accentStyle}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
