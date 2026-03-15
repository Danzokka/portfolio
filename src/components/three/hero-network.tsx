"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECTION_RADIUS = 2.2;

function NetworkGraph() {
  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const time = useRef(0);

  const { positions, nodeVelocities } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const nodeVelocities = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      nodeVelocities[i * 3]     = (Math.random() - 0.5) * 0.008;
      nodeVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      nodeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions, nodeVelocities };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Max possible connections
    const maxLines = NODE_COUNT * (NODE_COUNT - 1);
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    return geo;
  }, []);

  const nodeMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        color: new THREE.Color("#6C63FF"),
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      }),
    []
  );

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#6C63FF"),
        transparent: true,
        opacity: 0.18,
      }),
    []
  );

  useFrame(() => {
    time.current += 0.005;

    // Drift nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3]     += nodeVelocities[i * 3];
      positions[i * 3 + 1] += nodeVelocities[i * 3 + 1];
      positions[i * 3 + 2] += nodeVelocities[i * 3 + 2];

      // Bounce off bounds
      if (Math.abs(positions[i * 3])     > 6)  nodeVelocities[i * 3]     *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 3.5) nodeVelocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 2)  nodeVelocities[i * 3 + 2] *= -1;
    }

    if (nodesRef.current) {
      (nodesRef.current.geometry.attributes.position as THREE.BufferAttribute).set(positions);
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Recompute edges
    const linePositions = lineGeometry.attributes.position as THREE.BufferAttribute;
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECTION_RADIUS) {
          linePositions.array[lineIdx++] = positions[i * 3];
          linePositions.array[lineIdx++] = positions[i * 3 + 1];
          linePositions.array[lineIdx++] = positions[i * 3 + 2];
          linePositions.array[lineIdx++] = positions[j * 3];
          linePositions.array[lineIdx++] = positions[j * 3 + 1];
          linePositions.array[lineIdx++] = positions[j * 3 + 2];
        }
      }
    }
    lineGeometry.setDrawRange(0, lineIdx / 3);
    linePositions.needsUpdate = true;

    // Slow rotation
    if (nodesRef.current) nodesRef.current.rotation.y = time.current * 0.06;
    if (linesRef.current) linesRef.current.rotation.y = time.current * 0.06;
  });

  return (
    <>
      <points ref={nodesRef} material={nodeMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

export default function HeroNetworkScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <NetworkGraph />
      </Canvas>
    </div>
  );
}
