'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  isReducedMotion?: boolean;
  theme?: string;
  qualityTier?: 'high' | 'low';
}

/**
 * Enhanced 3D Architectural Core & Layered Constellation Particles.
 * Uses meshPhysicalMaterial clearcoat for fresnel edge highlights,
 * multi-depth particle layers with differential parallax rates,
 * and adaptive quality tiering for mobile safety.
 */
export function HeroScene({ isReducedMotion = false, theme = 'dark', qualityTier = 'high' }: HeroSceneProps) {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef1 = useRef<THREE.Points>(null);
  const particlesRef2 = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const isDark = theme === 'dark';
  const isHighQuality = qualityTier === 'high';

  // Palette tokens
  const primaryColor = isDark ? '#a78bfa' : '#6366f1'; // violet-400 : indigo-500
  const wireframeColor = isDark ? '#818cf8' : '#4f46e5'; // indigo-400 : indigo-600
  const particleColorNear = isDark ? '#c084fc' : '#818cf8'; // purple-400 : indigo-400
  const particleColorFar = isDark ? '#7c3aed' : '#4f46e5'; // violet-600 : indigo-600

  // High-tier gets 240 particles split across 2 depth layers, Low-tier gets 90 particles
  const particleCountNear = isHighQuality ? 160 : 70;
  const particleCountFar = isHighQuality ? 100 : 30;

  // Foreground particle layer
  const particlePositionsNear = useMemo(() => {
    const positions = new Float32Array(particleCountNear * 3);
    for (let i = 0; i < particleCountNear; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.2 + Math.random() * 3.8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCountNear]);

  // Background deep particle layer
  const particlePositionsFar = useMemo(() => {
    const positions = new Float32Array(particleCountFar * 3);
    for (let i = 0; i < particleCountFar; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 5.5 + Math.random() * 4.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCountFar]);

  // Orbiting satellite nodes
  const satellites = useMemo(() => {
    return isHighQuality
      ? [
          { radius: 2.8, speed: 0.35, yOffset: 0.5, scale: 0.22 },
          { radius: 3.4, speed: -0.28, yOffset: -0.8, scale: 0.18 },
          { radius: 4.1, speed: 0.22, yOffset: 1.2, scale: 0.24 },
        ]
      : [{ radius: 3.0, speed: 0.3, yOffset: 0.3, scale: 0.2 }];
  }, [isHighQuality]);

  const satRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Smooth camera / group rotation with spring lerp
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX * 0.22 + time * 0.04,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY * 0.18,
        0.04
      );
    }

    // Geodesic core idle spin
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x = time * 0.18;
      coreMeshRef.current.rotation.y = time * 0.25;
    }

    // Inner core counter spin
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = time * -0.25;
      innerCoreRef.current.rotation.z = time * 0.2;
    }

    // Outer torus ring spin
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * -0.12;
      outerRingRef.current.rotation.z = time * 0.15;
    }

    // Differential depth parallax on particle layers
    if (particlesRef1.current) {
      particlesRef1.current.rotation.y = time * 0.03;
    }
    if (particlesRef2.current) {
      particlesRef2.current.rotation.y = time * -0.015;
    }

    // Satellite orbits
    satellites.forEach((sat, idx) => {
      const mesh = satRefs.current[idx];
      if (mesh) {
        const angle = time * sat.speed;
        mesh.position.x = Math.cos(angle) * sat.radius;
        mesh.position.z = Math.sin(angle) * sat.radius;
        mesh.position.y = Math.sin(time * 0.7 + idx) * 0.35 + sat.yOffset;
        mesh.rotation.x = time * 0.4;
        mesh.rotation.y = time * 0.6;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Studio Lighting Setup with Rim & Fresnel Highlights */}
      <ambientLight intensity={isDark ? 0.6 : 0.85} />
      <directionalLight position={[10, 12, 6]} intensity={isDark ? 1.4 : 1.6} color={primaryColor} />
      <pointLight position={[-12, -10, -6]} intensity={0.9} color="#4f46e5" />
      <spotLight position={[0, 15, 10]} angle={0.3} penumbra={1} intensity={0.8} color="#a78bfa" />

      {/* Geodesic Core Mesh with Physical Fresnel Specular Clearcoat */}
      <mesh ref={coreMeshRef} scale={1.35}>
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
      <mesh ref={innerCoreRef} scale={0.72}>
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
        <mesh ref={outerRingRef} scale={1.85}>
          <torusGeometry args={[1.5, 0.018, 8, 32]} />
          <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.32} />
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

      {/* Foreground Particle Constellation (Near Layer) */}
      <points ref={particlesRef1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositionsNear, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={particleColorNear}
          transparent
          opacity={isDark ? 0.7 : 0.5}
          sizeAttenuation
        />
      </points>

      {/* Background Deep Particle Constellation (Far Layer) */}
      {isHighQuality && (
        <points ref={particlesRef2}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particlePositionsFar, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color={particleColorFar}
            transparent
            opacity={isDark ? 0.45 : 0.3}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
