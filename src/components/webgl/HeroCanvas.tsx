'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { useWebGLSupport } from './useWebGLSupport';
import { HeroScene } from './HeroScene';

/**
 * Enhanced WebGL Canvas container for the Hero section.
 * Features: mobile viewport detection & mesh scaling, adaptive quality tiering (HIGH/LOW),
 * low-power GPU preference, DPR capping [1, 1.5], context loss recovery, tab visibility pausing,
 * and prefers-reduced-motion accessibility support.
 */
export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { theme, resolvedTheme } = useTheme();
  const { isSupported, isReducedMotion, isChecked } = useWebGLSupport();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect Quality Tier based on hardwareConcurrency
  const qualityTier = useMemo<'high' | 'low'>(() => {
    if (typeof window === 'undefined') return 'high';
    const concurrency = navigator.hardwareConcurrency || 4;
    return concurrency < 4 ? 'low' : 'high';
  }, []);

  // Pause render loop when document is hidden (tab switching / minimized)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // WebGL Context Loss Listener
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setIsContextLost(true);
    };

    const onContextRestored = () => {
      setIsContextLost(false);
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);
  }, []);

  const activeTheme = resolvedTheme || theme || 'dark';

  // Fallback ambient CSS background for SSR or unsupported WebGL devices
  const fallbackBackground = (
    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-indigo-600/5 to-transparent pointer-events-none" />
  );

  if (!mounted || !isChecked || !isSupported || isContextLost || !isVisible) {
    return fallbackBackground;
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.5 : 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
          depth: true,
          stencil: false,
        }}
        onCreated={handleCreated}
        frameloop={isReducedMotion ? 'never' : 'always'}
        className="w-full h-full"
      >
        <HeroScene
          isReducedMotion={isReducedMotion}
          theme={activeTheme}
          qualityTier={qualityTier}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
