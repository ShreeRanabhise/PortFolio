'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Code, Terminal, Layers, Cpu, Server, Zap } from 'lucide-react';
import { skillCategories } from '@/data/portfolioData';

const Skills3DCanvas = dynamic(() => import('@/components/webgl/Skills3DCanvas'), {
  ssr: false,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].category);
  const [showStackDrawer, setShowStackDrawer] = useState(false);

  const activeCategoryObj = skillCategories.find((c) => c.category === selectedCategory) || skillCategories[0];

  const getCategoryIcon = (catName: string) => {
    if (catName.includes('Frontend')) return <Code className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
    if (catName.includes('Backend')) return <Server className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
    if (catName.includes('Design')) return <Layers className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
    if (catName.includes('Tools')) return <Terminal className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
    if (catName.includes('SEO')) return <Zap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
    return <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
  };

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 overflow-hidden transition-colors duration-300">
      {/* 3D WebGL Background Wireframe Sphere */}
      <Skills3DCanvas />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Technical Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Core Competencies &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              Stack
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Engineered with modern, production-tested technologies. No arbitrary percentage bars—just practical engineering depth and verified capabilities.
          </p>
        </motion.div>

        {/* Segmented category switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto p-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]"
        >
          {skillCategories.map((catObj) => {
            const isActive = selectedCategory === catObj.category;
            return (
              <button
                key={catObj.category}
                onClick={() => setSelectedCategory(catObj.category)}
                className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 rounded-full bg-violet-600 dark:bg-violet-600 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{catObj.category}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active category card grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                {getCategoryIcon(activeCategoryObj.category)}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeCategoryObj.category}</h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-stone-500">
                {activeCategoryObj.skills.length} core technologies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategoryObj.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 shadow-sm dark:shadow-none transition-all duration-300 space-y-3 group hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      {skill.name}
                    </h4>
                    {skill.level && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-white dark:bg-white/[0.03] text-slate-700 dark:text-stone-400 border border-slate-200 dark:border-white/[0.06]">
                        {skill.level}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed font-medium">
                    Production experience delivering responsive components, API integration, and clean code.
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Collapsible stack drawer trigger */}
        <div className="text-center pt-4">
          <button
            onClick={() => setShowStackDrawer((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-violet-500/30 text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white text-xs font-semibold transition-all duration-200"
          >
            <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>{showStackDrawer ? 'Hide environment details' : 'What I use to build daily'}</span>
          </button>

          <AnimatePresence>
            {showStackDrawer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-left max-w-3xl mx-auto space-y-4 shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  <Terminal className="w-4 h-4" />
                  <span>Primary Developer Environment</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-stone-300 leading-relaxed">
                  Every project in this portfolio is engineered with <strong className="text-slate-950 dark:text-white">Next.js App Router</strong>, <strong className="text-slate-950 dark:text-white">TypeScript Strict Mode</strong>, <strong className="text-slate-950 dark:text-white">Tailwind CSS</strong>, and <strong className="text-slate-950 dark:text-white">PostgreSQL / Supabase</strong> backend architectures.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
