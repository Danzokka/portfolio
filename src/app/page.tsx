import Hero from "@/components/section/hero";
import Meet from "@/components/section/meet";
import Projects from "@/components/section/projects";
import Reviews from "@/components/section/reviews";
import Services from "@/components/section/services";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Meet />
      <Services />
      <Reviews />
    </>
  );
}
