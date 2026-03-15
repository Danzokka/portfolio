"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES = [
  { x: 0, y: 1.6, depth: 0 },
  { x: -1.2, y: 0.4, depth: 1 },
  { x: 1.2, y: 0.4, depth: 1 },
  { x: -1.9, y: -0.8, depth: 2 },
  { x: -0.6, y: -0.8, depth: 2 },
  { x: 0.6, y: -0.8, depth: 2 },
  { x: 1.9, y: -0.8, depth: 2 },
  { x: -2.2, y: -2.0, depth: 3 },
  { x: -1.3, y: -2.0, depth: 3 },
  { x: -0.3, y: -2.0, depth: 3 },
  { x: 0.9, y: -2.0, depth: 3 },
  { x: 2.3, y: -2.0, depth: 3 },
];

const EDGES = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 5], [2, 6],
  [3, 7], [3, 8],
  [4, 9],
  [5, 10],
  [6, 11],
];

function ComponentTree() {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  const nodeColors = useMemo(() =>
    NODES.map((n) => {
      if (n.depth === 0) return new THREE.Color("#6C63FF");
      if (n.depth === 1) return new THREE.Color("#8B85FF");
      if (n.depth === 2) return new THREE.Color("#a89fff");
      return new THREE.Color("#c4bfff");
    }),
    []
  );

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#6C63FF", transparent: true, opacity: 0.25 }),
    []
  );

  const pulseMats = useMemo(
    () =>
      NODES.map((_, i) =>
        new THREE.MeshBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.7,
        })
      ),
    [nodeColors]
  );

  useFrame(() => {
    time.current += 0.012;
    if (groupRef.current) {
      // Subtle breathing
      groupRef.current.position.y = Math.sin(time.current * 0.4) * 0.05;
    }
    // Pulse node opacities
    pulseMats.forEach((mat, i) => {
      mat.opacity = 0.5 + 0.3 * Math.sin(time.current + i * 0.7);
    });
  });

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(NODES[a].x, NODES[a].y, 0),
          new THREE.Vector3(NODES[b].x, NODES[b].y, 0),
        ]);
        const lineObj = new THREE.Line(geo, lineMat);
        return <primitive key={i} object={lineObj} />;
      })}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, 0]} material={pulseMats[i]}>
          <circleGeometry args={[n.depth === 0 ? 0.12 : 0.08, 12]} />
        </mesh>
      ))}
    </group>
  );
}

export default function ComponentTreeBg() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.08]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ComponentTree />
      </Canvas>
    </div>
  );
}
