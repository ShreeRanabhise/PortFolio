'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { useWebGLSupport } from './useWebGLSupport';
import { AmbientShaderMesh } from './AmbientShaderMesh';

interface WebGLBackgroundProps {
  intensity?: number;
  className?: string;
}

/**
 * Production-grade WebGL Background Component.
 * Self-contained, isolated, with tab visibility pausing, context loss recovery,
 * DPR capping [1, 1.5], and accessibility prefers-reduced-motion fallback.
 */
export function WebGLBackground({ className = 'absolute inset-0 z-0 pointer-events-none' }: WebGLBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const { isSupported, isReducedMotion, isChecked } = useWebGLSupport();

  useEffect(() => {
    setMounted(true);
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

  // Static Gradient Fallback for SSR, Unsupported WebGL, Context Loss, or Reduced Motion
  const staticFallback = (
    <div
      className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-indigo-600/5 to-transparent pointer-events-none"
      aria-hidden="true"
    />
  );

  if (!mounted || !isChecked || !isSupported || isContextLost || !isVisible) {
    return staticFallback;
  }

  return (
    <div ref={containerRef} className={`${className} overflow-hidden`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'low-power',
          antialias: false,
          depth: false,
          stencil: false,
        }}
        onCreated={handleCreated}
        frameloop={isReducedMotion ? 'never' : 'always'}
        className="w-full h-full"
      >
        <AmbientShaderMesh isReducedMotion={isReducedMotion} theme={activeTheme} />
      </Canvas>
    </div>
  );
}

export default WebGLBackground;
