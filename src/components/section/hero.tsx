"use client";
import VideoBg from "../ui/video-bg";
import { H1, Lead } from "../ui/typography";
import ShiningButton from "../ui/shining-button";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { useLanguage } from "@/contexts/language-context";

const Hero = () => {
  const { data } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden h-screen w-screen">
      <VideoBg source="/videos/waves.mp4" />
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
