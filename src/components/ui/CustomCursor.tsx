'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for soft outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Enable custom cursor strictly for pointer/fine mouse devices
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const updateDevice = () => setIsPointerDevice(mediaQuery.matches);
    updateDevice();
    mediaQuery.addEventListener('change', updateDevice);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovered(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor], a, button, input, textarea');
      if (cursorTarget) {
        const cursorData = cursorTarget.getAttribute('data-cursor');
        if (cursorData === 'view') {
          setCursorType('view');
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener('change', updateDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isPointerDevice || !isHovered) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 800 }}
      />

      {/* Soft Following Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200 ${
          cursorType === 'view'
            ? 'w-16 h-16 bg-sky-500/90 text-white border-sky-400 shadow-md font-semibold text-[10px] tracking-wider uppercase'
            : cursorType === 'pointer'
            ? 'w-10 h-10 border-sky-400/80 bg-sky-400/10 dark:border-sky-300/80 dark:bg-sky-400/15'
            : 'w-8 h-8 border-stone-400/40 bg-stone-400/5 dark:border-stone-500/40 dark:bg-stone-500/10'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {cursorType === 'view' && <span>View ↗</span>}
      </motion.div>
    </div>
  );
}
