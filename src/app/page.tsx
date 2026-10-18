import { BootScreen } from "@/components/site/boot-screen";
import { RevealRoot } from "@/components/site/reveal-root";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { About } from "@/components/site/about";
import { Experience } from "@/components/site/experience";
import { Projects } from "@/components/site/projects";
import { Content } from "@/components/site/content";
import { Contact } from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <BootScreen />
      <RevealRoot className="relative overflow-x-clip bg-ink font-sans text-fg">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Content />
          <Contact />
        </main>
      </RevealRoot>
    </>
  );
}
