"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAGES = [
  { label: "clone",   x: -3.2, color: "#6C63FF" },
  { label: "install", x: -1.6, color: "#8B85FF" },
  { label: "test",    x:  0.0, color: "#00D4FF" },
  { label: "build",   x:  1.6, color: "#00FF88" },
  { label: "deploy",  x:  3.2, color: "#00FF88" },
];

const Y = 0;
const NODE_R = 0.15;
const PIPE_Y = Y;

function Pipeline() {
  const pulseRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  const pulseX = useRef(STAGES[0].x);
  const segmentIndex = useRef(0);

  const nodeMats = useMemo(
    () => STAGES.map((s) => new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.8 })),
    []
  );

  const pipeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#1a1a1a", transparent: true, opacity: 0.5 }),
    []
  );

  const pulseMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#00FF88", transparent: true, opacity: 0.9 }),
    []
  );

  const pipeGeo = useMemo(() => {
    const pts = STAGES.map((s) => new THREE.Vector3(s.x, PIPE_Y, 0));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    time.current += delta;

    const speed = 1.2; // units per second
    const seg = segmentIndex.current;
    const from = STAGES[seg].x;
    const to = STAGES[Math.min(seg + 1, STAGES.length - 1)].x;

    pulseX.current += speed * delta;
    if (pulseX.current >= to) {
      if (seg < STAGES.length - 2) {
        segmentIndex.current = seg + 1;
        pulseX.current = from;
      } else {
        // Reset
        segmentIndex.current = 0;
        pulseX.current = STAGES[0].x;
      }
    }

    if (pulseRef.current) {
      pulseRef.current.position.x = pulseX.current;
    }

    // Node pulse
    nodeMats.forEach((mat, i) => {
      mat.opacity = 0.5 + 0.35 * Math.sin(time.current * 1.5 + i * 1.2);
    });
  });

  return (
    <group>
      {/* Pipe line */}
      <primitive object={new THREE.Line(pipeGeo, pipeMat)} />

      {/* Stage nodes */}
      {STAGES.map((s, i) => (
        <mesh key={i} position={[s.x, Y, 0]} material={nodeMats[i]}>
          <circleGeometry args={[NODE_R, 16]} />
        </mesh>
      ))}

      {/* Travelling pulse */}
      <mesh ref={pulseRef} position={[STAGES[0].x, Y, 0.01]} material={pulseMat}>
        <circleGeometry args={[0.07, 12]} />
      </mesh>
    </group>
  );
}

export default function PipelineBg() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.08]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Pipeline />
      </Canvas>
    </div>
  );
}
