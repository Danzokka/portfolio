"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/user";

type FilterKey = "all" | "frontend" | "backend" | "infra";

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
        active
          ? "bg-[#6C63FF] text-white"
          : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}

interface ProjectCardWrapperProps {
  project: Project;
  delay: number;
}

function ProjectCardWrapper({ project, delay }: ProjectCardWrapperProps) {
  const ref = useBlurFade<HTMLDivElement>();
  return (
    <div ref={ref} data-animate className="h-full" style={{ transitionDelay: `${delay}ms` }}>
      <ProjectCard
        href={project.href}
        title={project.title}
        description={project.description}
        dates={project.dates}
        tags={project.technologies}
        image={project.image}
        video={project.video}
        links={project.links}
      />
    </div>
  );
}

export default function Projects() {
  const { data } = useLanguage();
  const { sectionTitles, projects } = data;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const titleRef = useBlurFade<HTMLDivElement>();

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",      label: sectionTitles.projectsAll      },
    { key: "frontend", label: sectionTitles.projectsFrontend },
    { key: "backend",  label: sectionTitles.projectsBackend  },
    { key: "infra",    label: sectionTitles.projectsInfra    },
  ];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="w-full py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div ref={titleRef} data-animate className="mb-10 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./projects
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100 mb-3">
          {sectionTitles.projects}
        </h2>
        <p className="font-sans text-sm text-zinc-500 max-w-md mx-auto">
          {sectionTitles.projectsDescription}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
        {FILTERS.map((f) => (
          <TabButton
            key={f.key}
            label={f.label}
            active={activeFilter === f.key}
            onClick={() => setActiveFilter(f.key)}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectCardWrapper key={project.slug} project={project} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}
