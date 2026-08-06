'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useWebGLSupport } from './useWebGLSupport';
import { Project3DScene } from './Project3DScene';

interface Project3DCanvasProps {
  mockupType?: string;
  isHovered?: boolean;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export function Project3DCanvas({
  mockupType = 'dashboard',
  isHovered = false,
  className = 'w-full h-full',
  fallbackIcon,
}: Project3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const { isSupported, isReducedMotion, isChecked } = useWebGLSupport();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isChecked || !isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={`${className} pointer-events-none relative z-10`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]} // Low DPR for secondary card canvases to optimize GPU
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <Project3DScene
          mockupType={mockupType}
          isHovered={isHovered}
          isReducedMotion={isReducedMotion}
        />
      </Canvas>
    </div>
  );
}

export default Project3DCanvas;
