'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  isReducedMotion?: boolean;
  theme?: string;
}

/**
 * Interactive 3D particle constellation & wireframe neural core scene.
 * Dynamically adjusts colors and physics speed based on theme and motion preferences.
 */
export function HeroScene({ isReducedMotion = false, theme = 'dark' }: HeroSceneProps) {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const isDark = theme === 'dark';

  // Palette colors based on portfolio theme (violet/indigo accent)
  const primaryColor = isDark ? '#a78bfa' : '#6366f1'; // violet-400 : indigo-500
  const wireframeColor = isDark ? '#818cf8' : '#4f46e5'; // indigo-400 : indigo-600
  const particleColor = isDark ? '#c084fc' : '#818cf8'; // purple-400 : indigo-400

  // Particle positions generation (160 particles for low GPU footprint)
  const [particlePositions, particleScales] = useMemo(() => {
    const count = 160;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Sphere volume distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.5 + Math.random() * 4.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = Math.random() * 0.04 + 0.02;
    }

    return [positions, scales];
  }, []);

  // Orbiting satellite nodes
  const satellites = useMemo(() => {
    return [
      { radius: 2.8, speed: 0.4, yOffset: 0.5, scale: 0.22 },
      { radius: 3.4, speed: -0.3, yOffset: -0.8, scale: 0.18 },
      { radius: 4.1, speed: 0.25, yOffset: 1.2, scale: 0.25 },
    ];
  }, []);

  const satRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    // Smooth camera / group rotation based on pointer with linear interpolation
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX * 0.25 + time * 0.05,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY * 0.2,
        0.05
      );
    }

    // Core mesh idle rotation
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x = time * 0.2;
      coreMeshRef.current.rotation.y = time * 0.3;
    }

    // Outer ring counter-rotation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * -0.15;
      outerRingRef.current.rotation.z = time * 0.2;
    }

    // Particle field pulse
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
    }

    // Satellite orbital movement
    satellites.forEach((sat, idx) => {
      const mesh = satRefs.current[idx];
      if (mesh) {
        const angle = time * sat.speed;
        mesh.position.x = Math.cos(angle) * sat.radius;
        mesh.position.z = Math.sin(angle) * sat.radius;
        mesh.position.y = Math.sin(time * 0.8 + idx) * 0.4 + sat.yOffset;
        mesh.rotation.x = time * 0.5;
        mesh.rotation.y = time * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={isDark ? 0.6 : 0.9} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.2 : 1.5} color={primaryColor} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4f46e5" />

      {/* Central Core (Low-poly Icosahedron with inner wireframe) */}
      <mesh ref={coreMeshRef} scale={1.3}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={isDark ? 0.45 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Secondary Inner Core Solid */}
      <mesh scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={wireframeColor}
          transparent
          opacity={isDark ? 0.7 : 0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Torus Wireframe Ring */}
      <mesh ref={outerRingRef} scale={1.8}>
        <torusGeometry args={[1.5, 0.02, 8, 32]} />
        <meshBasicMaterial color={primaryColor} wireframe transparent opacity={0.35} />
      </mesh>

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
          <meshStandardMaterial
            color={particleColor}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Particle Constellation */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={particleColor}
          transparent
          opacity={isDark ? 0.65 : 0.45}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
