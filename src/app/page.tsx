import Hero from "@/components/hero";
import Meet from "@/components/meet";
import Projects from "@/components/projects";
import Reviews from "@/components/reviews";
import Services from "@/components/services";
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
