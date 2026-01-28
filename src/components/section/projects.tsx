import { BlurFade } from "../ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import BlurSeparator from "../ui/blur-separator";
import { DELAY_TIME } from "@/data/config";

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="flex min-h-screen h-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
            <BlurSeparator title="Meus Projetos" />
          </BlurFade>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Veja os meus últimos trabalhos
              </h2>
            </BlurFade>
            <BlurFade delay={DELAY_TIME + 2 * 0.5} className="" inView>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                Já trabalhei em uma variedade de projetos, desde sites simples
                até aplicações web complexas. Aqui estão alguns dos meus
                favoritos.
              </p>
            </BlurFade>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-300 mx-auto auto-rows-fr">
          {DATA.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={DELAY_TIME + (id + 3) * 0.5}
              className="h-full"
              inView
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
