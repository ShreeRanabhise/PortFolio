'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  className?: string;
}

/**
 * Animated number counter component.
 * Extracts numeric values from strings (e.g., "40%", "<0.01", "99.9%") and counts up
 * smoothly when scrolled into view.
 */
export function Counter({ value, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Check if user prefers reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !isInView) return;

    // Match numeric parts (integers or decimals)
    const match = value.match(/([<>]?\s*)([\d.]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';

    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    const hasDecimal = match[2].includes('.');
    const decimalPlaces = hasDecimal ? match[2].split('.')[1].length : 0;

    let startTime: number | null = null;
    const duration = 1200; // 1.2s easeOut animation

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = (numericTarget * easedProgress).toFixed(decimalPlaces);

      setDisplayValue(`${prefix}${currentNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
