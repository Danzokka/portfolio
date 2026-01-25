import { BlurFade } from "../ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ProgressiveBlur } from "../ui/progressive-blur";
import BlurSeparator from "../ui/blur-separator";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="flex min-h-screen h-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <BlurSeparator title="Meus Projetos"/>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Veja os meus últimos trabalhos
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Já trabalhei em uma variedade de projetos, desde sites simples até
              aplicações web complexas. Aqui estão alguns dos meus favoritos.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-300 mx-auto auto-rows-fr">
          {DATA.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              className="h-full"
            >
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
