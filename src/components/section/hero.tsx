"use client";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import HeroNetworkScene from "@/components/three/hero-network-lazy";

const Hero = () => {
  const { data } = useLanguage();
  const isMobile = useIsMobile();
  const { hero } = data;

  return (
    <section
      id="hero"
      className="relative overflow-hidden h-screen w-screen bg-black"
    >
      {/* Network topology background */}
      {!isMobile && <HeroNetworkScene />}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Terminal path label */}
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER}>
          <p className="font-mono text-xs text-zinc-600 tracking-widest mb-3">
            ~/dev/portfolio
          </p>
        </BlurFade>

        {/* Name */}
        <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER}>
          <h1 className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl text-zinc-100 tracking-tight leading-none">
            {hero.title}
          </h1>
        </BlurFade>

        {/* Typing roles */}
        <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER} className="mt-3">
          <div className="font-mono text-base sm:text-lg text-[#00FF88] flex items-center gap-1">
            <span className="text-zinc-600">&gt;</span>
            <TypingAnimation
              words={hero.roles}
              loop
              className="text-[#00FF88]"
            />
          </div>
        </BlurFade>

        {/* Tagline */}
        <BlurFade delay={DELAY_TIME + 3 * DELAY_TIME_MULTIPLIER} className="mt-2">
          <p className="font-mono text-xs text-zinc-600 tracking-[4px] uppercase">
            {hero.tagline}
          </p>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={DELAY_TIME + 4 * DELAY_TIME_MULTIPLIER} className="mt-6 max-w-lg">
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            {hero.description}
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade
          delay={DELAY_TIME + 5 * DELAY_TIME_MULTIPLIER}
          className="mt-8 flex items-center gap-4 flex-wrap justify-center"
        >
          <Link href="#projects">
            <InteractiveHoverButton>
              {hero.seeProjects}
            </InteractiveHoverButton>
          </Link>
          <Link
            href="#contact"
            className="font-mono text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200 underline underline-offset-4 cursor-pointer"
          >
            {hero.contact}
          </Link>
        </BlurFade>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
