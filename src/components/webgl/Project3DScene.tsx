'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Project3DSceneProps {
  mockupType?: string;
  isHovered?: boolean;
  isReducedMotion?: boolean;
  theme?: string;
}

/**
 * Performant 3D Tech Shape rendered inside Project cards.
 * Responds to mouse hover state with dynamic speed up and smooth lerped tilt.
 */
export function Project3DScene({
  mockupType = 'dashboard',
  isHovered = false,
  isReducedMotion = false,
}: Project3DSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Pick shape color according to project type
  const mainColor = mockupType === 'ecommerce' ? '#818cf8' : mockupType === 'erp' ? '#38bdf8' : '#a78bfa';
  const wireColor = mockupType === 'ecommerce' ? '#c084fc' : mockupType === 'erp' ? '#60a5fa' : '#c084fc';

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const targetSpeed = isHovered ? 1.4 : 0.4;

    // Smooth group tilt on hover
    if (groupRef.current) {
      const targetRotX = isHovered ? (state.pointer.y * 0.4) : 0;
      const targetRotY = isHovered ? (state.pointer.x * 0.4) : 0;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * targetSpeed;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * (targetSpeed * 1.5);
      innerRef.current.rotation.z = Math.cos(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color={mainColor} />
      <pointLight position={[-5, -5, -2]} intensity={0.6} color="#818cf8" />

      {/* Outer Wireframe Tech Shape */}
      <mesh ref={meshRef} scale={1.25}>
        {mockupType === 'ecommerce' ? (
          <dodecahedronGeometry args={[1, 0]} />
        ) : mockupType === 'erp' ? (
          <octahedronGeometry args={[1, 0]} />
        ) : (
          <icosahedronGeometry args={[1, 0]} />
        )}
        <meshStandardMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={isHovered ? 0.85 : 0.55}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Crystal */}
      <mesh ref={innerRef} scale={0.65}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={mainColor}
          transparent
          opacity={isHovered ? 0.9 : 0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}
