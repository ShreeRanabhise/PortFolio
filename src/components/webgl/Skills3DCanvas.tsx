'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useWebGLSupport } from './useWebGLSupport';
import { Skills3DScene } from './Skills3DScene';

export function Skills3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const { isSupported, isReducedMotion, isChecked } = useWebGLSupport();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme || theme || 'dark';

  if (!mounted || !isChecked || !isSupported) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        className="w-full h-full"
      >
        <Skills3DScene isReducedMotion={isReducedMotion} theme={activeTheme} />
      </Canvas>
    </div>
  );
}

export default Skills3DCanvas;
