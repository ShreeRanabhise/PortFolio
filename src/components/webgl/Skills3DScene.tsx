'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Skills3DSceneProps {
  isReducedMotion?: boolean;
  theme?: string;
}

/**
 * Interactive 3D Wireframe sphere grid for the Skills section.
 * Slowly rotates and responds subtly to cursor movement.
 */
export function Skills3DScene({ isReducedMotion = false, theme = 'dark' }: Skills3DSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#a78bfa' : '#818cf8';

  useFrame((state) => {
    if (isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1 + pointerX * 0.3;
      meshRef.current.rotation.x = time * 0.05 - pointerY * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * -0.15;
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1} color={primaryColor} />

      {/* Main wireframe geodesic dome/sphere */}
      <mesh ref={meshRef} scale={3.2}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={isDark ? 0.15 : 0.1}
        />
      </mesh>

      {/* Outer concentric tech ring */}
      <mesh ref={ringRef} scale={4.2}>
        <torusGeometry args={[1, 0.015, 6, 24]} />
        <meshBasicMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={isDark ? 0.2 : 0.12}
        />
      </mesh>
    </group>
  );
}
