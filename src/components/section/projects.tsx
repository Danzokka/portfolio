"use client";
import Link from "next/link";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import type { Project } from "@/types/user";

type FilterKey = "all" | "frontend" | "backend" | "infra";

const EXT: Record<Project["category"], string> = {
  frontend: ".tsx",
  backend:  ".ts",
  infra:    ".sh",
};

const PH_GRADIENT: Record<Project["category"], string> = {
  frontend: "linear-gradient(145deg, #14113a 0%, #1e1960 50%, #0e0c28 100%)",
  backend:  "linear-gradient(145deg, #002a30 0%, #0d3535 50%, #001a1f 100%)",
  infra:    "linear-gradient(145deg, #00200d 0%, #0d3018 50%, #001408 100%)",
};

const FEAT_BORDER: Record<Project["category"], string> = {
  frontend: "rgba(108,99,255,0.22)",
  backend:  "rgba(0,212,255,0.2)",
  infra:    "rgba(0,255,136,0.18)",
};

const FEAT_SHADOW: Record<Project["category"], string> = {
  frontend: "0 0 60px rgba(108,99,255,0.07)",
  backend:  "0 0 60px rgba(0,212,255,0.06)",
  infra:    "0 0 60px rgba(0,255,136,0.05)",
};

const FEAT_ACCENT: Record<Project["category"], string> = {
  frontend: "linear-gradient(to right, transparent, rgba(108,99,255,0.7), transparent)",
  backend:  "linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)",
  infra:    "linear-gradient(to right, transparent, rgba(0,255,136,0.6), transparent)",
};

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

const ProjectCard = memo(function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  const ref = useBlurFade<HTMLDivElement>();
  const isFeat = !!project.featured;
  const filename = `${project.slug}${EXT[project.category]}`;

  return (
    <div
      ref={ref}
      data-animate
      style={{ transitionDelay: `${delay}ms` }}
      className={isFeat ? "col-span-1 sm:col-span-2" : ""}
    >
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group h-full"
      >
        <div
          className={`relative overflow-hidden rounded-[14px] flex flex-col h-full transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.004] ${
            isFeat ? "min-h-[320px]" : "min-h-[220px]"
          }`}
          style={{
            border: isFeat
              ? `1px solid ${FEAT_BORDER[project.category]}`
              : "1px solid #161616",
            boxShadow: isFeat ? FEAT_SHADOW[project.category] : undefined,
          }}
        >
          {/* Top accent line (featured only) */}
          {isFeat && (
            <div
              className="absolute inset-x-0 top-0 h-px z-10 pointer-events-none"
              style={{ background: FEAT_ACCENT[project.category] }}
            />
          )}

          {/* Full-bleed background */}
          <div className="absolute inset-0">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 44vw"
                className="object-cover brightness-50 saturate-125"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: PH_GRADIENT[project.category] }}
              >
                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>
            )}
          </div>

          {/* Gradient overlay — content readable at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(3,3,3,0.97) 0%, rgba(3,3,3,0.85) 35%, rgba(3,3,3,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Terminal bar */}
          <div
            className="relative z-20 flex items-center justify-between px-3 h-8 border-b border-white/[0.05] flex-shrink-0 backdrop-blur-sm"
            style={{ background: "rgba(8,8,8,0.85)" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[9px] text-zinc-600">{filename}</span>
            </div>
            <ArrowUpRight
              size={14}
              className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
            />
          </div>

          {/* Content — pinned to bottom via mt-auto */}
          <div
            className={`relative z-20 mt-auto flex flex-col ${
              isFeat ? "p-5 gap-3" : "p-4 gap-2"
            }`}
          >
            <div className="font-mono text-[9px] text-zinc-500">
              {"// "}
              {project.dates}
            </div>

            <h3
              className={`font-sans font-bold text-zinc-100 leading-tight ${
                isFeat ? "text-[22px] tracking-tight" : "text-sm"
              }`}
            >
              {project.title}
            </h3>

            <p
              className={`font-mono text-zinc-500 leading-relaxed ${
                isFeat ? "text-[11px]" : "text-[10px] line-clamp-2"
              }`}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className={`font-mono rounded border border-white/[0.08] text-zinc-500 backdrop-blur-sm bg-black/50 ${
                    isFeat ? "text-[10px] px-2.5 py-1" : "text-[9px] px-1.5 py-0.5"
                  }`}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {isFeat && project.links && project.links.length > 0 && (
              <div className="flex gap-2 mt-1">
                {project.links.map((link) => (
                  <span
                    key={link.href}
                    className="font-mono text-[10px] px-3 py-1.5 rounded-md border border-white/[0.10] text-zinc-200 bg-black/60 backdrop-blur-sm"
                  >
                    ↗ {link.type}
                  </span>
                ))}
              </div>
            )}
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

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 [grid-auto-flow:dense]">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}
