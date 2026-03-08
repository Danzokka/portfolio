"use client";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/three/particle-background"),
  { ssr: false },
);

export default function ParticleBackgroundLazy() {
  return <ParticleBackground />;
}
