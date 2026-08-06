'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, User, Code, Layout, Briefcase, ShoppingBag, Server, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { commandItems } from '@/data/portfolioData';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = commandItems.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    if (href.startsWith('#')) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].href);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'Code': return <Code className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'Server': return <Server className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      case 'Download': return <Download className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      default: return <ExternalLink className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white dark:bg-[#0d1017] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-white"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.06] gap-3">
            <Search className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command, section name, or project..."
              className="w-full bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none placeholder:text-slate-400 dark:placeholder:text-stone-500 font-medium"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/[0.04]">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-slate-500 dark:text-stone-400 text-sm">
                No matching command or project found for &quot;{query}&quot;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-violet-50 dark:bg-violet-600/20 border border-violet-200 dark:border-violet-500/30 text-violet-900 dark:text-white font-semibold'
                        : 'text-slate-700 dark:text-stone-300 hover:bg-slate-50 dark:hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.03] shrink-0 border border-slate-200 dark:border-white/[0.06]">
                        {renderIcon(item.icon)}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-stone-400 truncate">{item.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && <ArrowRight className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.03] text-slate-600 dark:text-stone-400 border border-slate-200 dark:border-white/[0.06] font-semibold">
                        Jump
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-white/[0.01] border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-stone-500 font-semibold">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/[0.03] rounded border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-300 font-mono">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/[0.03] rounded border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-300 font-mono">↵</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/[0.03] rounded border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-300 font-mono">ESC</kbd> Close</span>
            </div>
            <span>Portfolio Command Center</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
