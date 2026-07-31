import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'mist' | 'lavender' | 'sage' | 'peach' | 'neutral';
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  badgeVariant = 'mist',
  title,
  subtitle,
  centered = false
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 ${centered ? 'items-center text-center max-w-2xl mx-auto' : 'items-start'}`}>
      {badge && <Badge variant={badgeVariant} className="px-3 py-1 text-xs font-bold tracking-wider uppercase">{badge}</Badge>}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-medium leading-relaxed max-w-2xl pt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}
