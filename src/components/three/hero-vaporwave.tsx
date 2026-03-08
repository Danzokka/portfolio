"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Grid ────────────────────────────────────────────────────────────────────
const GRID_W = 22;
const GRID_D = 20;
const GRID_COLS = 7;
const GRID_ROWS = 28;

function makeGridVerts() {
  const v: number[] = [];
  for (let r = 0; r <= GRID_ROWS; r++) {
    const z = -GRID_D / 2 + (r / GRID_ROWS) * GRID_D;
    v.push(-GRID_W / 2, 0, z, GRID_W / 2, 0, z);
  }
  for (let c = 0; c <= GRID_COLS; c++) {
    const x = -GRID_W / 2 + (c / GRID_COLS) * GRID_W;
    v.push(x, 0, -GRID_D / 2, x, 0, GRID_D / 2);
  }
  return new Float32Array(v);
}

function ScrollGrid({ yPos = -0.6 }: { yPos?: number }) {
  const r1 = useRef<THREE.LineSegments>(null);
  const r2 = useRef<THREE.LineSegments>(null);
  const verts = useMemo(makeGridVerts, []);

  useFrame(({ clock }) => {
    const off = (clock.getElapsedTime() * 3.5) % GRID_D;
    if (r1.current) r1.current.position.z = off;
    if (r2.current) r2.current.position.z = off - GRID_D;
  });

  const gridNode = (ref: React.RefObject<THREE.LineSegments | null>) => (
    <lineSegments ref={ref} position={[0, yPos, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[verts, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#FF2D78" transparent opacity={0.7} />
    </lineSegments>
  );

  return (
    <>
      {gridNode(r1)}
      {gridNode(r2)}
    </>
  );
}

// ─── Mountains ───────────────────────────────────────────────────────────────
const MOUNTAIN_PTS: [number, number][] = [
  [-11, 0],
  [-8.5, 2.4],
  [-7.2, 1.1],
  [-5.5, 3.8],
  [-4, 2.0],
  [-2.5, 3.3],
  [-1, 1.5],
  [0, 2.1],
  [1, 1.5],
  [2.5, 3.3],
  [4, 2.0],
  [5.5, 3.8],
  [7.2, 1.1],
  [8.5, 2.4],
  [11, 0],
];

function Mountains() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(MOUNTAIN_PTS[0][0], MOUNTAIN_PTS[0][1]);
    MOUNTAIN_PTS.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
    shape.lineTo(11, -0.5);
    shape.lineTo(-11, -0.5);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <mesh geometry={geo} position={[0, -0.1, -12]}>
      <meshBasicMaterial color="#130030" side={THREE.DoubleSide} />
    </mesh>
  );
}

function MountainGlow() {
  const line = useMemo(() => {
    const v = MOUNTAIN_PTS.flatMap(([x, y]) => [x, y, 0]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(v), 3),
    );
    const mat = new THREE.LineBasicMaterial({ color: "#FF2D78" });
    return new THREE.Line(geo, mat);
  }, []);

  return <primitive object={line} position={[0, -0.09, -11.9]} />;
}

// ─── Sun ─────────────────────────────────────────────────────────────────────
const SUN_R = 3.2;
const SUN_STRIPES = 8;

function VaporSun() {
  const stripes = useMemo(
    () =>
      Array.from({ length: SUN_STRIPES }, (_, i) => {
        const t = (i + 0.6) / SUN_STRIPES;
        const y = -(t * SUN_R * 0.92);
        const half = Math.sqrt(Math.max(0, SUN_R ** 2 - y ** 2));
        return { y, w: half * 2 + 0.3, h: (SUN_R * 0.88) / (SUN_STRIPES + 1) };
      }),
    [],
  );

  return (
    <group position={[0, 2.3, -15]}>
      <mesh>
        <circleGeometry args={[SUN_R, 64]} />
        <meshBasicMaterial color="#FF4800" />
      </mesh>
      <mesh position={[0, -SUN_R * 0.25, 0.005]}>
        <circleGeometry args={[SUN_R, 64]} />
        <meshBasicMaterial color="#FF1A6E" />
      </mesh>
      {stripes.map(({ y, w, h }, i) => (
        <mesh key={i} position={[0, y, 0.02]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color="#060010" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Parallax group ──────────────────────────────────────────────────────────
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const mouseX = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y +=
      (mouseX.current * 0.04 - ref.current.rotation.y) * 0.03;
  });

  return <group ref={ref}>{children}</group>;
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <fog attach="fog" args={["#0A001A", 3, 30]} />
      <mesh position={[0, -0.58, -5]}>
        <planeGeometry args={[30, 0.02]} />
        <meshBasicMaterial color="#FF2D78" />
      </mesh>
      <ParallaxGroup>
        <ScrollGrid />
        <Mountains />
        <MountainGlow />
        <VaporSun />
      </ParallaxGroup>
    </>
  );
}

export default function HeroVaporwave() {
  return (
    <Canvas
      camera={{ position: [0, 0.7, 3.5], fov: 72 }}
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, #0A001A 0%, #1A0042 28%, #120028 60%, #0A001A 100%)",
      }}
      dpr={[1, 1.5]}
      onCreated={({ camera }) => camera.lookAt(0, 0.1, -10)}
    >
      <Scene />
    </Canvas>
  );
}
