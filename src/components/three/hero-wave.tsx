"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLS = 70;
const ROWS = 40;
const SPACING = 0.28;
const COUNT = COLS * ROWS;

function ParticleWave() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Build initial grid positions
  const { positions, baseX, baseY } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const baseX = new Float32Array(COUNT);
    const baseY = new Float32Array(COUNT);
    let i = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = (col - COLS / 2) * SPACING;
        const y = (row - ROWS / 2) * SPACING;
        baseX[i] = x;
        baseY[i] = y;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;
        i++;
      }
    }
    return { positions, baseX, baseY };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const x = baseX[i];
      const y = baseY[i];
      const z =
        Math.sin(x * 0.9 + t * 1.1) * 0.22 +
        Math.sin(y * 1.2 + t * 0.8) * 0.18 +
        Math.sin((x + y) * 0.6 + t * 0.6) * 0.12;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    // Parallax — camera drifts slightly with mouse
    ref.current.position.x += (mouse.x * 0.6 - ref.current.position.x) * 0.04;
    ref.current.position.y += (mouse.y * 0.3 - ref.current.position.y) * 0.04;
  });

  return (
    <points ref={ref} rotation={[-Math.PI / 3.5, 0, 0]} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#9B59E8"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroWave() {
  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: 60 }}
      className="absolute inset-0"
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <ParticleWave />
    </Canvas>
  );
}
