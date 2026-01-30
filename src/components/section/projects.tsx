"use client";
import { BlurFade } from "../ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import BlurSeparator from "../ui/blur-separator";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { H2, Lead } from "../ui/typography";
import { useLanguage } from "@/contexts/language-context";

export default function Projects() {
  const { data } = useLanguage();

  return (
    <section id="projects">
      <div className="flex min-h-screen h-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="" inView>
            <BlurSeparator title={data.sectionTitles.projects} />
          </BlurFade>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="" inView>
              <H2>{data.sectionTitles.projectsSubtitle}</H2>
            </BlurFade>
            <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER} className="" inView>
              <Lead>
                {data.sectionTitles.projectsDescription}
              </Lead>
            </BlurFade>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-300 mx-auto auto-rows-fr">
          {data.projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={DELAY_TIME + (id + 3) * DELAY_TIME_MULTIPLIER}
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