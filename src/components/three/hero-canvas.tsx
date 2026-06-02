"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A slow-drifting field of glowing particles with subtle mouse parallax.
 * Cheap (single Points object, additive blending) and tuned for a cinematic feel.
 */
function ParticleField({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const pink = new THREE.Color("#ff4d8d");
    const violet = new THREE.Color("#a855f7");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const r = Math.random();
      const c = r < 0.5 ? pink : r < 0.85 ? violet : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.04;
    points.current.rotation.x = Math.sin(t * 0.1) * 0.08;

    // Gentle mouse parallax
    const targetX = (state.pointer.x * viewport.width) / 30;
    const targetY = (state.pointer.y * viewport.height) / 30;
    points.current.position.x += (targetX - points.current.position.x) * 0.03;
    points.current.position.y += (targetY - points.current.position.y) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  // Lighter on phones: fewer particles, no AA, capped DPR — saves battery/CPU.
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={isMobile ? [1, 1.3] : [1, 1.6]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ParticleField count={isMobile ? 600 : 1400} />
    </Canvas>
  );
}
