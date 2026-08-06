'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useWebGLSupport } from './useWebGLSupport';
import { HeroScene } from './HeroScene';

/**
 * Main WebGL Canvas container for the Hero section.
 * Handles server-side rendering hydration, device pixel ratio optimization,
 * WebGL feature detection, and reduced-motion fallback.
 */
export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const { isSupported, isReducedMotion, isChecked } = useWebGLSupport();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme || theme || 'dark';

  // Fallback ambient CSS background for SSR or unsupported WebGL devices
  const fallbackBackground = (
    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-indigo-600/5 to-transparent pointer-events-none" />
  );

  if (!mounted || !isChecked) {
    return fallbackBackground;
  }

  if (!isSupported) {
    return fallbackBackground;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Performance optimization: Cap device pixel ratio to max 2
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <HeroScene isReducedMotion={isReducedMotion} theme={activeTheme} />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
