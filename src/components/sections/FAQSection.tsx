'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { faqData } from '@/data/portfolioData';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <HelpCircle className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Common Questions &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              Answers
            </span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Clear insights regarding availability, technical workflow, stack preferences, and engineering collaboration models.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none ${
                  isOpen
                    ? 'bg-slate-50/90 dark:bg-white/[0.03] border-violet-300 dark:border-violet-500/40'
                    : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`p-2 rounded-xl border transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'bg-violet-100 dark:bg-violet-500/20 border-violet-300 dark:border-violet-500/40 text-violet-600 dark:text-violet-300 rotate-180'
                        : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-white/[0.04]"
                    >
                      <div className="pt-4 text-sm text-slate-700 dark:text-stone-300 leading-relaxed font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct question CTA */}
        <div className="text-center pt-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-semibold text-slate-700 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200 shadow-sm dark:shadow-none hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>Have a different question? Contact Shree directly</span>
          </a>
        </div>
      </div>
    </section>
  );
}
