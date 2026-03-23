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

const TAB_CFG: Record<
  Tab,
  { color: string; glow: string; border: string; ext: string }
> = {
  frontend: {
    color: "#6C63FF",
    glow: "rgba(108, 99, 255, 0.10)",
    border: "rgba(108, 99, 255, 0.30)",
    ext: ".tsx",
  },
  backend: {
    color: "#00D4FF",
    glow: "rgba(0, 212, 255, 0.08)",
    border: "rgba(0, 212, 255, 0.26)",
    ext: ".ts",
  },
  devops: {
    color: "#00FF88",
    glow: "rgba(0, 255, 136, 0.07)",
    border: "rgba(0, 255, 136, 0.24)",
    ext: ".sh",
  },
};

const AUTO_ROTATE_MS = 10000;

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-black/50 border border-white/[0.06] hover:border-white/[0.16] transition-all duration-200 cursor-default group backdrop-blur-sm">
      <span className="size-6 flex-shrink-0 flex items-center justify-center">
        {skill.icon as React.ReactNode}
      </span>
      <div>
        <span className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors duration-200 block leading-tight">
          {skill.name}
        </span>
        {skill.description && (
          <span className="font-sans text-xs text-zinc-500 block leading-snug mt-1">
            {skill.description}
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

  const cfg = TAB_CFG[activeTab];

  function goTo(tab: Tab) {
    setActiveTab(tab);
    setProgressKey((k) => k + 1);
  }

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    const timer = setTimeout(() => {
      goTo(TABS[(idx + 1) % TABS.length]);
    }, AUTO_ROTATE_MS);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabLabels: Record<Tab, string> = {
    frontend: sectionTitles.skillsFrontend,
    backend:  sectionTitles.skillsBackend,
    devops:   sectionTitles.skillsDevops,
  };

  const filteredSkills = skills.filter((s) => s.category === activeTab);

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
      <div role="tablist" aria-label={sectionTitles.skills} className="flex border-b border-[#1a1a1a]">
        {TABS.map((tab) => {
          const c = TAB_CFG[tab];
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(tab)}
              className="px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer border-b-2 -mb-px"
              style={
                isActive
                  ? { borderColor: c.color, color: c.color }
                  : { borderColor: "transparent", color: "#52525b" }
              }
            >
              {tabLabels[tab]}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-px bg-[#0d0d0d]">
        <div
          key={progressKey}
          className="h-full w-0 animate-progress-bar"
          style={{ background: cfg.color }}
        />
      </div>

      {/* Main panel */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[#030303] transition-shadow duration-500"
        style={{
          border: `1px solid ${cfg.border}`,
          boxShadow: `0 0 80px ${cfg.glow}, 0 0 20px ${cfg.glow}`,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${cfg.color}99, transparent)`,
          }}
        />

        {/* Three.js animated background — full panel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.22]">
          {activeTab === "frontend" && <ComponentTreeBg />}
          {activeTab === "backend"  && <NestConsoleBg />}
          {activeTab === "devops"   && <PipelineBg />}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to top, #030303 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
          {/* Left: category info */}
          <div className="lg:w-2/5">
            <span
              className="font-mono text-[9px] uppercase tracking-[3px] mb-2 block"
              style={{ color: cfg.color }}
            >
              {cfg.ext}
            </span>
            <h3
              className="font-sans text-2xl font-bold mb-3"
              style={{ color: cfg.color }}
            >
              {tabLabels[activeTab]}
            </h3>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              {skillDescriptions[activeTab]}
            </p>

            {/* Skill count */}
            <div className="mt-6">
              <p
                className="font-mono text-2xl font-bold"
                style={{ color: cfg.color }}
              >
                {filteredSkills.length}
              </p>
              <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                {sectionTitles.technologies}
              </p>
            </div>
          </div>

          {/* Right: skill cards — 2 col mobile, 3 col desktop */}
          <div className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
