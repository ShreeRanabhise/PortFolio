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
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Matrix"
          badgeVariant="lavender"
          title="Skills & Engineering Principles"
          subtitle="A comprehensive overview of my core web, backend, cloud, and AI development toolkit."
        />

        {/* Tight, Space-Optimized Skills Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {skillCategories.map((catGroup, idx) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800/60 transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                  {catGroup.category}
                </h3>
                <Badge variant="lavender" className="px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0">
                  {catGroup.skills.length} skills
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
                {catGroup.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {catGroup.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/60 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact, Integrated "How I Work" Engineering Principles */}
        <div className="mt-12 pt-10 border-t border-stone-200/70 dark:border-stone-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              How I Work
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Core engineering methodology focused on code quality, security, and search visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howIWork.map((item, index) => {
              const IconComp = howIconMap[item.icon] || CheckCircle2;
              const accentStyles = [
                'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60',
                'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
                'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60',
                'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
              ];
              const accentStyle = accentStyles[index % accentStyles.length];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform ${accentStyle}`}>
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 mb-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
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
