import dynamic from "next/dynamic";

const HeroNetworkScene = dynamic(() => import("./hero-network"), {
  ssr: false,
});

export default HeroNetworkScene;
