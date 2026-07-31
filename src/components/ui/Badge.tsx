import React from 'react';

interface BadgeProps {
  variant?: 'mist' | 'lavender' | 'sage' | 'peach' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  const variantStyles = {
    mist: 'bg-sky-100/80 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60',
    lavender: 'bg-purple-100/80 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60',
    sage: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60',
    peach: 'bg-orange-100/80 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60',
    neutral: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700'
  };

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap shrink-0 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
