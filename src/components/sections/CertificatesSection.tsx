'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Globe,
  Heart,
  Calendar,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import {
  certificatesData,
  personalInfo,
} from '@/data/portfolioData';

export function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* ═══════════════════════════════════════════
           PART 1: VERIFIED CERTIFICATIONS
           ═══════════════════════════════════════════ */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
              <Award className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>Professional Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Certificates &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
                Credentials
              </span>
            </h2>
            <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Verified technical certifications validating web development competence, IoT engineering, and data analytics skills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 transition-all duration-500 space-y-6 relative overflow-hidden group shadow-sm dark:shadow-none flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300">
                      Verified Certificate
                    </span>
                    <span className="text-xs font-mono text-slate-700 dark:text-stone-400 font-bold flex items-center gap-1.5 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                      {cert.period}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 font-mono">
                      Issued by {cert.issuer}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-white/[0.06]">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-stone-500 font-bold">
                      Skills & Competencies
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] text-xs font-mono text-slate-800 dark:text-stone-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 dark:text-stone-500 font-semibold">
                    Status: Verified Active
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}?subject=Verification%20Request%20for%20${encodeURIComponent(cert.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
           PART 2: LANGUAGES & PERSONAL INTERESTS
           ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto pt-8 border-t border-slate-200/80 dark:border-white/[0.06]">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
              <Globe className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Linguistic Proficiency</h3>
            </div>

            <div className="space-y-4">
              {personalInfo.languages.map((lang) => (
                <div
                  key={lang.language}
                  className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{lang.language}</h4>
                    <span className="text-xs font-mono text-violet-600 dark:text-violet-400 font-semibold">{lang.proficiency}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-white/[0.06]">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personal Pursuits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
              <Heart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Personal Pursuits</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.interests.map((interest) => (
                <div
                  key={interest}
                  className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{interest}</h4>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
