import dynamic from "next/dynamic";

const CodeParticlesBg = dynamic(
  () => import("@/components/three/code-particles-bg"),
  { ssr: false }
);

export default CodeParticlesBg;
