'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  isReducedMotion?: boolean;
  theme?: string;
  qualityTier?: 'high' | 'low';
  isMobile?: boolean;
}

/**
 * Enhanced 3D Architectural Core & Layered Constellation Particles.
 * Mobile-optimised with proportional mesh & particle scaling when isMobile=true.
 */
export function HeroScene({
  isReducedMotion = false,
  theme = 'dark',
  qualityTier = 'high',
  isMobile = false,
}: HeroSceneProps) {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef1 = useRef<THREE.Points>(null);
  const particlesRef2 = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const isDark = theme === 'dark';
  const isHighQuality = qualityTier === 'high';

  // Palette tokens
  const primaryColor = isDark ? '#a78bfa' : '#6366f1';
  const wireframeColor = isDark ? '#818cf8' : '#4f46e5';
  const particleColorNear = isDark ? '#c084fc' : '#818cf8';
  const particleColorFar = isDark ? '#7c3aed' : '#4f46e5';

  const particleCountNear = isHighQuality ? (isMobile ? 100 : 160) : 50;
  const particleCountFar = isHighQuality ? (isMobile ? 60 : 100) : 20;

  // Foreground particle layer (compact radius on mobile)
  const particlePositionsNear = useMemo(() => {
    const positions = new Float32Array(particleCountNear * 3);
    for (let i = 0; i < particleCountNear; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = isMobile ? 1.6 + Math.random() * 2.0 : 3.2 + Math.random() * 3.8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCountNear, isMobile]);

  // Background deep particle layer (compact radius on mobile)
  const particlePositionsFar = useMemo(() => {
    const positions = new Float32Array(particleCountFar * 3);
    for (let i = 0; i < particleCountFar; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = isMobile ? 2.8 + Math.random() * 2.2 : 5.5 + Math.random() * 4.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCountFar, isMobile]);

  // Orbiting satellite nodes (scaled down on mobile)
  const satellites = useMemo(() => {
    const scaleFactor = isMobile ? 0.55 : 1.0;
    return isHighQuality
      ? [
          { radius: 2.8 * scaleFactor, speed: 0.35, yOffset: 0.3 * scaleFactor, scale: 0.22 * scaleFactor },
          { radius: 3.4 * scaleFactor, speed: -0.28, yOffset: -0.5 * scaleFactor, scale: 0.18 * scaleFactor },
          { radius: 4.1 * scaleFactor, speed: 0.22, yOffset: 0.8 * scaleFactor, scale: 0.24 * scaleFactor },
        ]
      : [{ radius: 2.5 * scaleFactor, speed: 0.3, yOffset: 0.2 * scaleFactor, scale: 0.18 * scaleFactor }];
  }, [isHighQuality, isMobile]);

  const satRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX * 0.18 + time * 0.04,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY * 0.15,
        0.04
      );
    }

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x = time * 0.18;
      coreMeshRef.current.rotation.y = time * 0.25;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = time * -0.25;
      innerCoreRef.current.rotation.z = time * 0.2;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * -0.12;
      outerRingRef.current.rotation.z = time * 0.15;
    }

    if (particlesRef1.current) {
      particlesRef1.current.rotation.y = time * 0.03;
    }
    if (particlesRef2.current) {
      particlesRef2.current.rotation.y = time * -0.015;
    }

    satellites.forEach((sat, idx) => {
      const mesh = satRefs.current[idx];
      if (mesh) {
        const angle = time * sat.speed;
        mesh.position.x = Math.cos(angle) * sat.radius;
        mesh.position.z = Math.sin(angle) * sat.radius;
        mesh.position.y = Math.sin(time * 0.7 + idx) * 0.25 + sat.yOffset;
        mesh.rotation.x = time * 0.4;
        mesh.rotation.y = time * 0.6;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Studio Lighting Setup */}
      <ambientLight intensity={isDark ? 0.6 : 0.85} />
      <directionalLight position={[10, 12, 6]} intensity={isDark ? 1.4 : 1.6} color={primaryColor} />
      <pointLight position={[-12, -10, -6]} intensity={0.9} color="#4f46e5" />
      <spotLight position={[0, 15, 10]} angle={0.3} penumbra={1} intensity={0.8} color="#a78bfa" />

      {/* Geodesic Core Mesh - Proportional scaling on mobile */}
      <mesh ref={coreMeshRef} scale={isMobile ? 0.75 : 1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={isDark ? 0.5 : 0.65}
          roughness={0.25}
          metalness={0.7}
          clearcoat={0.35}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Inner Solid Octahedron Core */}
      <mesh ref={innerCoreRef} scale={isMobile ? 0.4 : 0.72}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={wireframeColor}
          transparent
          opacity={isDark ? 0.75 : 0.85}
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.5}
        />
      </mesh>

      {/* Outer Torus Wireframe Ring */}
      {isHighQuality && (
        <mesh ref={outerRingRef} scale={isMobile ? 1.0 : 1.85}>
          <torusGeometry args={[1.5, 0.018, 8, 32]} />
          <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* Orbiting Satellite Nodes */}
      {satellites.map((sat, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            satRefs.current[idx] = el;
          }}
          scale={sat.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={particleColorNear}
            wireframe
            transparent
            opacity={0.75}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Foreground Particles (Sized down on mobile) */}
      <points ref={particlesRef1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositionsNear, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.035 : 0.065}
          color={particleColorNear}
          transparent
          opacity={isDark ? 0.65 : 0.45}
          sizeAttenuation
        />
      </points>

      {/* Background Deep Particles (Sized down on mobile) */}
      {isHighQuality && (
        <points ref={particlesRef2}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particlePositionsFar, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.025 : 0.045}
            color={particleColorFar}
            transparent
            opacity={isDark ? 0.4 : 0.25}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
