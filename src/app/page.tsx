import Hero from "@/components/section/hero";
import Skills from "@/components/section/skills";
import Projects from "@/components/section/projects";
import Metrics from "@/components/section/metrics";
import Services from "@/components/section/services";
import Contact from "@/components/section/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Metrics />
      <Services />
      <Contact />
    </>
  );
}
