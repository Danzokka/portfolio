"use client";
import Link from "next/link";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import CodeParticlesBg from "@/components/three/code-particles-bg-lazy";
import type { Project } from "@/types/user";

type FilterKey = "all" | "frontend" | "backend" | "infra";

const EXT: Record<Project["category"], string> = {
  frontend: ".tsx",
  backend:  ".ts",
  infra:    ".sh",
};

const GRADIENT: Record<Project["category"], string> = {
  frontend: "linear-gradient(135deg, #0d0d20, #1a1035)",
  backend:  "linear-gradient(135deg, #001a1a, #0d2020)",
  infra:    "linear-gradient(135deg, #001a0d, #0d2010)",
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
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

interface TerminalCardProps {
  project: Project;
  delay: number;
}

const TerminalCard = memo(function TerminalCard({ project, delay }: TerminalCardProps) {
  const ref = useBlurFade<HTMLDivElement>();
  const filename = `${project.slug}${EXT[project.category]}`;

  return (
    <div
      ref={ref}
      data-animate
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-[#080808] border border-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#6C63FF]/30 transition-colors duration-300">
          {/* Terminal top bar */}
          <div className="flex items-center justify-between px-3 h-8 bg-[#0a0a0a] border-b border-[#0d0d0d]">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[9px] text-zinc-600 ml-1">{filename}</span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
            />
          </div>

          {/* Image / gradient fallback */}
          <div className="h-36 overflow-hidden relative">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ background: GRADIENT[project.category] }}
              />
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="font-sans font-semibold text-sm text-zinc-100 mb-0.5">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] text-zinc-600 mb-2">
              // {project.dates}
            </p>
            <p className="font-sans text-xs text-zinc-500 line-clamp-2 mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="font-mono text-[9px] px-1.5 py-0.5 border border-zinc-800 rounded-sm text-zinc-600"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

export default function Projects() {
  const { data } = useLanguage();
  const { sectionTitles, projects } = data;
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const titleRef = useBlurFade<HTMLDivElement>();

  const FILTERS = useMemo<{ key: FilterKey; label: string }[]>(
    () => [
      { key: "all",      label: sectionTitles.projectsAll      },
      { key: "frontend", label: sectionTitles.projectsFrontend },
      { key: "backend",  label: sectionTitles.projectsBackend  },
      { key: "infra",    label: sectionTitles.projectsInfra    },
    ],
    [sectionTitles]
  );

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="w-full py-24 px-4 max-w-6xl mx-auto relative">
      {/* Animated code particles background */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none overflow-hidden rounded-2xl">
        <CodeParticlesBg />
      </div>

      <div className="relative z-10">
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
            <TerminalCard key={project.slug} project={project} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
