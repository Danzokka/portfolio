"use client";
import React, { useState, useEffect } from "react";
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

const TABS = ["frontend", "backend", "devops"] as const;
type Tab = (typeof TABS)[number];

const TAB_COLORS: Record<Tab, string> = {
  frontend: "#6C63FF",
  backend:  "#00D4FF",
  devops:   "#00FF88",
};

const SKILL_EXT: Record<Skill["category"], string> = {
  frontend: ".tsx",
  backend:  ".ts",
  devops:   ".sh",
};

const BADGE_STYLES: Record<string, string> = {
  expert:   "bg-[#6C63FF]/15 text-[#a89fff]",
  advanced: "bg-[#00D4FF]/10 text-[#00D4FF]",
  learning: "bg-[#00FF88]/8  text-[#00FF88]",
};

interface SkillCardProps {
  skill: Skill;
  featured?: boolean;
}

function SkillCard({ skill, featured = false }: SkillCardProps) {
  const filename =
    skill.name.toLowerCase().replace(/\s+/g, "-") + SKILL_EXT[skill.category];
  return (
    <div
      className={`bg-[#080808] border border-[#1a1a1a] rounded-md overflow-hidden hover:border-[#6C63FF]/30 transition-colors duration-200 cursor-default${featured ? " col-span-2" : ""}`}
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0d0d0d] border-b border-[#111]">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[8px] text-zinc-700 ml-1">{filename}</span>
      </div>
      {/* Body */}
      <div className="p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="size-4 flex-shrink-0 flex items-center">
            {skill.icon as React.ReactNode}
          </span>
          <span className="font-mono text-[10px] text-zinc-300">{skill.name}</span>
        </div>
        {skill.description && (
          <p className="font-sans text-[9px] text-zinc-600 leading-relaxed mb-2">
            {skill.description}
          </p>
        )}
        {skill.level && (
          <span
            className={`inline-block font-mono text-[7px] px-1.5 py-0.5 rounded-sm ${BADGE_STYLES[skill.level] ?? ""}`}
          >
            {skill.level}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data } = useLanguage();
  const { sectionTitles, skills, skillDescriptions } = data;
  const [activeTab, setActiveTab] = useState<Tab>("frontend");
  const [progressKey, setProgressKey] = useState(0);

  const titleRef = useBlurFade<HTMLDivElement>();

  function goTo(tab: Tab) {
    setActiveTab(tab);
    setProgressKey((k) => k + 1);
  }

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    const timer = setTimeout(() => {
      goTo(TABS[(idx + 1) % TABS.length]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeTab, progressKey]);

  const tabLabels: Record<Tab, string> = {
    frontend: sectionTitles.skillsFrontend,
    backend:  sectionTitles.skillsBackend,
    devops:   sectionTitles.skillsDevops,
  };

  const filteredSkills = skills.filter((s) => s.category === activeTab);
  const [featuredSkill, ...restSkills] = filteredSkills;

  return (
    <section id="skills" className="w-full py-24 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <div ref={titleRef} data-animate className="mb-10 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./skills
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100">
          {sectionTitles.skills}
        </h2>
      </div>

      {/* Tab strip */}
      <div className="flex border-b border-[#1a1a1a]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => goTo(tab)}
            className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer border-b-2 -mb-px ${
              activeTab === tab
                ? "text-zinc-100"
                : "text-zinc-600 border-transparent hover:text-zinc-400"
            }`}
            style={
              activeTab === tab
                ? { borderColor: TAB_COLORS[tab], color: TAB_COLORS[tab] }
                : {}
            }
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Progress bar (key-based reset forces CSS animation restart) */}
      <div className="h-px bg-[#0d0d0d]">
        <div
          key={progressKey}
          className="h-full w-0 animate-progress-bar"
          style={{ background: TAB_COLORS[activeTab] }}
        />
      </div>

      {/* Panel */}
      <div className="relative overflow-hidden border border-t-0 border-[#1a1a1a] rounded-b-xl bg-[#050505] p-6">
        {/* Three.js atmospheric bg — only active tab renders */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          {activeTab === "frontend" && <ComponentTreeBg />}
          {activeTab === "backend"  && <NestConsoleBg />}
          {activeTab === "devops"   && <PipelineBg />}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8">
          {/* Left: category description */}
          <div className="lg:w-2/5">
            <p
              className="font-mono text-[9px] uppercase tracking-[3px] mb-2"
              style={{ color: TAB_COLORS[activeTab] }}
            >
              {tabLabels[activeTab]}
            </p>
            <h3 className="font-sans text-xl font-bold text-zinc-100 mb-3">
              {tabLabels[activeTab]}
            </h3>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed">
              {(skillDescriptions as Record<Tab, string>)[activeTab]}
            </p>
          </div>

          {/* Right: skill cards in 2-col terminal grid */}
          <div className="lg:w-3/5 grid grid-cols-2 gap-1.5">
            {featuredSkill && <SkillCard skill={featuredSkill} featured />}
            {restSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
