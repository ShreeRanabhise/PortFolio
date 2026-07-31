'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-stone-200/50 dark:bg-stone-800/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Color Theme"
      className="group relative p-2 rounded-full text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-800/70 border border-stone-300/60 dark:border-stone-700/60 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-sky-700 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300" />
      )}
    </button>
  );
}
