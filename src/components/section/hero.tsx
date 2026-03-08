"use client";
import dynamic from "next/dynamic";
import { H1, Lead } from "../ui/typography";
import ShiningButton from "../ui/shining-button";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use-is-mobile";

const HeroVaporwave = dynamic(
  () => import("@/components/three/hero-vaporwave"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-linear-to-b from-[#0A001A] via-[#1A0042] to-[#0A001A]" />
    ),
  },
);

const MobileFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-black" />
);

const Hero = () => {
  const { data } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section
      id="hero"
      className="relative overflow-hidden h-screen w-screen bg-black"
    >
      {/* Wave / fallback background */}
      <div className="absolute inset-0 z-0">
        {isMobile ? <MobileFallback /> : <HeroVaporwave />}
      </div>

      {/* Text content — absolutely positioned so h-full is always correct */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER}>
          <H1>{data.hero.title}</H1>
        </BlurFade>
        <BlurFade
          delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER}
          className="mt-4"
        >
          <Lead align="center">{data.hero.description}</Lead>
        </BlurFade>
        <div className="mt-6 flex items-center justify-center w-full gap-4">
          <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER}>
            <ShiningButton href="#about" className="bg-black" size={"lg"}>
              {data.hero.aboutMe}
            </ShiningButton>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 3 * DELAY_TIME_MULTIPLIER}>
            <ShiningButton href="#projects" className="bg-black" size={"lg"}>
              {data.hero.seeProjects}
            </ShiningButton>
          </BlurFade>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
