'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth springs for cursor follow with zero React re-renders
  const cursorX = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.1 });
  const cursorY = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.1 });

  const dotX = useSpring(rawX, { damping: 45, stiffness: 800, mass: 0.05 });
  const dotY = useSpring(rawY, { damping: 45, stiffness: 800, mass: 0.05 });

  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(finePointerQuery.matches);

    if (!finePointerQuery.matches) return;

    let rafId: number | null = null;
    let pendingX = -100;
    let pendingY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rawX.set(pendingX);
          rawY.set(pendingY);

          if (e.target !== lastTargetRef.current && e.target instanceof HTMLElement) {
            lastTargetRef.current = e.target;
            const isClickable =
              e.target.tagName === 'A' ||
              e.target.tagName === 'BUTTON' ||
              e.target.closest('a') !== null ||
              e.target.closest('button') !== null ||
              e.target.getAttribute('role') === 'button';
            setIsPointer(isClickable);
          }

          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY, isVisible]);

  if (!isFinePointer) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Outer subtle ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500/50 bg-violet-500/10 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 1.4 : 1,
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-violet-500 pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 0.6 : 1,
        }}
      />
    </div>
  );
}
