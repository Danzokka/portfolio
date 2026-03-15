"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import type { Skill } from "@/types/user";

const ComponentTreeBg = dynamic(
  () => import("@/components/three/component-tree-bg"),
  { ssr: false }
);
const NestConsoleBg = dynamic(
  () => import("@/components/three/nest-console-bg"),
  { ssr: false }
);
const PipelineBg = dynamic(
  () => import("@/components/three/pipeline-bg"),
  { ssr: false }
);

type ColumnCategory = "frontend" | "backend" | "devops";

interface SkillColumnProps {
  title: string;
  skills: Skill[];
  category: ColumnCategory;
  delay?: number;
}

function SkillColumn({ title, skills, category, delay = 0 }: SkillColumnProps) {
  const ref = useBlurFade<HTMLDivElement>();

  const filtered = skills.filter((s) =>
    category === "devops" ? s.category === "devops" : s.category === category
  );

  const borderColor =
    category === "frontend"
      ? "border-purple-500/20"
      : category === "backend"
      ? "border-[#00D4FF]/20"
      : "border-[#00FF88]/20";

  const titleColor =
    category === "frontend"
      ? "text-[#6C63FF]"
      : category === "backend"
      ? "text-[#00D4FF]"
      : "text-[#00FF88]";

  return (
    <div
      ref={ref}
      data-animate
      className={`relative overflow-hidden rounded-xl border ${borderColor} bg-zinc-950/60 backdrop-blur-sm p-6 flex flex-col gap-4`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Three.js atmospheric background */}
      {category === "frontend" && <ComponentTreeBg />}
      {category === "backend"  && <NestConsoleBg />}
      {category === "devops"   && <PipelineBg />}

      {/* Header */}
      <h3 className={`font-mono text-xs font-semibold tracking-widest uppercase ${titleColor} z-10 relative`}>
        {title}
      </h3>

      {/* Skills grid */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {filtered.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-mono hover:border-zinc-600 transition-colors duration-200"
          >
            <span className="size-4 flex-shrink-0 flex items-center">{skill.icon as React.ReactNode}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data } = useLanguage();
  const { sectionTitles, skills } = data;

  const titleRef = useBlurFade<HTMLDivElement>();

  return (
    <section id="skills" className="w-full py-24 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <div ref={titleRef} data-animate className="mb-12 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./skills
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100">
          {sectionTitles.skills}
        </h2>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkillColumn
          title={sectionTitles.skillsFrontend}
          skills={skills}
          category="frontend"
          delay={0}
        />
        <SkillColumn
          title={sectionTitles.skillsBackend}
          skills={skills}
          category="backend"
          delay={100}
        />
        <SkillColumn
          title={sectionTitles.skillsDevops}
          skills={skills}
          category="devops"
          delay={200}
        />
      </div>
    </section>
  );
}
