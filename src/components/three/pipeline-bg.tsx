"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAGE_COLORS = ["#6C63FF", "#8B85FF", "#00D4FF", "#00FF88", "#00FF88"];
const STAGE_X = [-3.2, -1.6, 0.0, 1.6, 3.2];
const ROW_Y = [1.4, 0.4, -0.6, -1.6];
const NODE_R = 0.13;

// Each row has a different phase offset so pulses are staggered
const ROW_PHASES = [0, 1.8, 3.6, 5.4];

function MultiPipeline() {
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);
  const time = useRef(0);
  const pulseX = useRef(ROW_PHASES.map(() => STAGE_X[0]));
  const segIdx = useRef(ROW_PHASES.map(() => 0));

  const nodeMats = useMemo(() =>
    ROW_Y.flatMap(() =>
      STAGE_COLORS.map((c) =>
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.7 })
      )
    ), []);

  const pipeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#00FF88", transparent: true, opacity: 0.18 }),
    []
  );

  const pulseMats = useMemo(
    () => ROW_Y.map((_, row) =>
      new THREE.MeshBasicMaterial({
        color: STAGE_COLORS[Math.min(segIdx.current[row] + 1, STAGE_COLORS.length - 1)],
        transparent: true,
        opacity: 0.95,
      })
    ),
    []
  );

  const pipeGeos = useMemo(() =>
    ROW_Y.map((y) => {
      const pts = STAGE_X.map((x) => new THREE.Vector3(x, y, 0));
      return new THREE.BufferGeometry().setFromPoints(pts);
    }), []);

  // Vertical connector lines between rows
  const connectorGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    STAGE_X.forEach((x) => {
      ROW_Y.forEach((y, yi) => {
        if (yi < ROW_Y.length - 1) {
          pts.push(new THREE.Vector3(x, y, 0));
          pts.push(new THREE.Vector3(x, ROW_Y[yi + 1], 0));
        }
      });
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const connectorMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#6C63FF", transparent: true, opacity: 0.08 }),
    []
  );

  useFrame((_, delta) => {
    time.current += delta;
    const speed = 1.4;

    ROW_Y.forEach((_, row) => {
      const seg = segIdx.current[row];
      const to = STAGE_X[Math.min(seg + 1, STAGE_X.length - 1)];

      pulseX.current[row] += speed * delta;
      if (pulseX.current[row] >= to) {
        if (seg < STAGE_X.length - 2) {
          segIdx.current[row] = seg + 1;
          pulseX.current[row] = STAGE_X[seg];
          pulseMats[row].color.set(STAGE_COLORS[seg + 1]);
        } else {
          segIdx.current[row] = 0;
          pulseX.current[row] = STAGE_X[0];
          pulseMats[row].color.set(STAGE_COLORS[0]);
        }
      }

      const ref = pulseRefs.current[row];
      if (ref) ref.position.x = pulseX.current[row];
    });

    // Pulse node opacities
    nodeMats.forEach((mat, i) => {
      mat.opacity = 0.4 + 0.4 * Math.sin(time.current * 1.2 + i * 0.5);
    });
  });

  return (
    <group>
      {/* Horizontal pipe lines per row */}
      {ROW_Y.map((y, row) => (
        <primitive key={`pipe-${row}`} object={new THREE.Line(pipeGeos[row], pipeMat)} />
      ))}

      {/* Vertical connectors */}
      <primitive object={new THREE.LineSegments(connectorGeo, connectorMat)} />

      {/* Nodes */}
      {ROW_Y.map((y, row) =>
        STAGE_X.map((x, col) => (
          <mesh
            key={`node-${row}-${col}`}
            position={[x, y, 0]}
            material={nodeMats[row * STAGE_X.length + col]}
          >
            <circleGeometry args={[NODE_R, 16]} />
          </mesh>
        ))
      )}

      {/* Travelling pulses per row */}
      {ROW_Y.map((y, row) => (
        <mesh
          key={`pulse-${row}`}
          ref={(el) => { pulseRefs.current[row] = el; }}
          position={[STAGE_X[0], y, 0.01]}
          material={pulseMats[row]}
        >
          <circleGeometry args={[0.07, 12]} />
        </mesh>
      ))}
    </group>
  );
}

export default function PipelineBg() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <MultiPipeline />
      </Canvas>
    </div>
  );
}
