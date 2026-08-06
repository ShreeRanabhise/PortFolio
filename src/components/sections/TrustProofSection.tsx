'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, Layout, Code, Award, CheckCircle } from 'lucide-react';
import { proofMetricsData, certificatesData } from '@/data/portfolioData';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function TrustProofSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600 dark:text-violet-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-emerald-600 dark:text-violet-400" />;
      case 'Code': return <Code className="w-5 h-5 text-emerald-600 dark:text-violet-400" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-600 dark:text-violet-400" />;
      default: return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-violet-400" />;
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-[#090b10] border-t border-b border-slate-300/90 dark:border-white/[0.08] text-slate-900 dark:text-white relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {proofMetricsData.map((metric) => (
            <motion.div
              key={metric.id}
              variants={fadeUp}
              className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-white/[0.03] border border-emerald-200/80 dark:border-white/[0.06] hover:border-emerald-400/50 dark:hover:border-violet-500/20 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-between space-y-3 group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white dark:bg-white/[0.03] border border-emerald-200/80 dark:border-white/[0.06] group-hover:scale-110 transition-transform duration-300">
                  {getIcon(metric.iconName)}
                </div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-stone-600 uppercase font-bold tracking-wider">Proved</span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-violet-400 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-stone-300 mt-1">{metric.label}</div>
                <div className="text-[11px] text-slate-600 dark:text-stone-500 leading-snug mt-0.5">{metric.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-stone-500 font-bold tracking-[0.15em]">
            Verified Certifications:
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {certificatesData.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-white/[0.03] border border-emerald-200/80 dark:border-white/[0.06] text-xs font-medium text-slate-800 dark:text-stone-400 shadow-sm dark:shadow-none"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-violet-400 shrink-0" />
                <span className="font-bold text-emerald-950 dark:text-stone-200">{cert.title}</span>
                <span className="text-emerald-700 dark:text-stone-500">({cert.issuer})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
