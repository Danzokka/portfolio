"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const PURPLE_DARK = new THREE.Color("#4F1C8C");
const PURPLE_LIGHT = new THREE.Color("#C084FC");

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 4;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const color = PURPLE_DARK.clone().lerp(PURPLE_LIGHT, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    ref.current.position.x += (mouse.x * 0.3 - ref.current.position.x) * 0.05;
    ref.current.position.y += (mouse.y * 0.3 - ref.current.position.y) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      className="absolute inset-0"
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </Canvas>
  );
}
