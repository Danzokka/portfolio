"use client";
import dynamic from "next/dynamic";
import { H1, Lead } from "../ui/typography";
import ShiningButton from "../ui/shining-button";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use-is-mobile";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-black" />
  ),
});

const MobileFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-black animate-pulse" />
);

const Hero = () => {
  const { data } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="hero" className="relative overflow-hidden h-screen w-screen bg-black">
      {isMobile ? <MobileFallback /> : <HeroScene />}
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER} className="">
          <H1>{data.hero.title}</H1>
        </BlurFade>
        <BlurFade
          delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER}
          className="mt-4"
        >
          <Lead align="center">{data.hero.description}</Lead>
        </BlurFade>
        <div className="mt-6 flex items-center justify-center px-4 w-full">
          <BlurFade
            delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER}
            className="flex gap-4"
          >
            <ShiningButton href="#about" className="mr-4 bg-black" size={"lg"}>
              {data.hero.aboutMe}
            </ShiningButton>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 3 * DELAY_TIME_MULTIPLIER} className="">
            <ShiningButton href="#projects" className="bg-black" size={"lg"}>
              {data.hero.seeProjects}
            </ShiningButton>
          </BlurFade>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
};

export default Hero;
