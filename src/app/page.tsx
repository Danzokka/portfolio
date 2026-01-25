import Hero from "@/components/section/hero";
import About from "@/components/section/about";
import Projects from "@/components/section/projects";
import Reviews from "@/components/section/reviews";
import Services from "@/components/section/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Services />
      <Reviews />
    </>
  );
}
