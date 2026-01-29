import VideoBg from "../ui/video-bg";
import { ProgressiveBlur } from "../ui/progressive-blur";
import { H1, Lead, P } from "../ui/typography";
import ShiningButton from "../ui/shining-button";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden h-screen w-screen">
      <VideoBg source="/videos/waves.mp4" />
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER} className="">
          <H1>Welcome to My Portfolio</H1>
        </BlurFade>
        <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="mt-4">
        <Lead align="center">
          I am a passionate developer specializing in creating beautiful and
          functional web applications. <br /> Explore my projects and services
          below.
        </Lead>
        </BlurFade>
        <div className="mt-6 flex items-center justify-center px-4 w-full">
          <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER} className="flex gap-4">
          <ShiningButton href="#about" className="mr-4 bg-black" size={"lg"}>
            About Me
          </ShiningButton>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 3 * DELAY_TIME_MULTIPLIER} className="">
          <ShiningButton href="#projects" className="bg-black" size={"lg"}>
            See Projects
          </ShiningButton>
          </BlurFade>
        </div>
      </div>
      <ProgressiveBlur height="50%" position="bottom" />
    </section>
  );
};

export default Hero;
