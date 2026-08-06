'use client';

import { useState, useEffect } from 'react';

export interface WebGLSupport {
  isSupported: boolean;
  isReducedMotion: boolean;
  isChecked: boolean;
}

export function useWebGLSupport(): WebGLSupport {
  const [support, setSupport] = useState<WebGLSupport>({
    isSupported: true,
    isReducedMotion: false,
    isChecked: false,
  });

  useEffect(() => {
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      hasWebGL = false;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;

    setSupport({
      isSupported: hasWebGL,
      isReducedMotion: prefersReducedMotion,
      isChecked: true,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSupport((prev) => ({ ...prev, isReducedMotion: e.matches }));
    };

    reducedMotionQuery.addEventListener('change', handleMotionChange);
    return () => {
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return support;
}
