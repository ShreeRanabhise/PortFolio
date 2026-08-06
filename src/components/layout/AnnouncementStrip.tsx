'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export function AnnouncementStrip() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-violet-950 via-[#0d1017] to-indigo-950 text-white border-b border-white/[0.08] relative z-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-2 min-w-0 mx-auto sm:mx-0">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
              </span>
              <span className="inline-flex items-center gap-1.5 text-violet-200 text-[11px] sm:text-xs truncate">
                <span className="truncate">{personalInfo.availability}</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center gap-1 text-violet-300 hover:text-white font-semibold transition-colors duration-200 group text-xs"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors duration-200"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
