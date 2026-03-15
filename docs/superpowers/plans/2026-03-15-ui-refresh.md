# UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor Skills (auto-play carousel with D3 terminal-window skill cards), Projects (terminal window cards + animated code particles background), Language Toggle (square icon button), and Footer (split layout) to strengthen the developer identity of the portfolio.

**Architecture:** Data changes (types + resume.tsx) must land first as a single commit since all components depend on them. Then each component is rewritten independently. Skills and Projects are full rewrites; Header and Footer are targeted edits.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4 CSS-first, Three.js via @react-three/fiber, pnpm.

**Verification command throughout:** `pnpm tsc --noEmit` (must exit 0 before every commit)

**Spec:** `docs/superpowers/specs/2026-03-15-ui-refresh-design.md`

---

## Chunk 1: Data Foundation

### Task 1: Update type system (`src/types/user.d.ts`)

**Files:**
- Modify: `src/types/user.d.ts`

- [ ] **Step 1: Add `level` and `description?` to the `Skill` type**

  Replace the existing `Skill` type:
  ```ts
  export type Skill = {
    name: string;
    icon: JSX.Element | SVGSVGElement;
    category: 'frontend' | 'backend' | 'devops';
    level: 'expert' | 'advanced' | 'learning';
    description?: string;
  };
  ```

- [ ] **Step 2: Add `SkillDescriptions` type and add it to `User`**

  After the `Skill` type, add:
  ```ts
  export type SkillDescriptions = {
    frontend: string;
    backend: string;
    devops: string;
  };
  ```

  Inside the `User` type, add after `skills: Skill[];`:
  ```ts
  skillDescriptions: SkillDescriptions;
  ```

- [ ] **Step 3: Update `SectionTitles` — remove `footerSubtitle`, add footer keys**

  In the `SectionTitles` type, remove this line:
  ```ts
  footerSubtitle: string;
  ```
  And add in its place:
  ```ts
  footerHeadline: string;
  footerPitch: string;
  footerResume: string;
  ```

- [ ] **Step 4: Run TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -40
  ```
  Expected: errors referencing `footerSubtitle` (in `footer.tsx` and `resume.tsx`) and missing `skillDescriptions`/`level` on skills. This is expected — they will be fixed in Task 2. Do NOT commit yet.

---

### Task 2: Update data layer and globals.css

**Files:**
- Modify: `src/data/resume.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add `level` + `description` to all 23 skills in `COMMON_DATA.skills`**

  Reorder the skills array so the most important skill per category is first (it will be the "featured" card spanning 2 columns). Replace the entire `skills` array in `COMMON_DATA`:

  ```ts
  skills: ([
    // Frontend — React first (featured)
    { name: "React",           icon: <StackIcon name="react"          className="size-4" />,               category: "frontend", level: "expert",   description: "Hooks, context, Server Actions" },
    { name: "TypeScript",      icon: <StackIcon name="typescript"     className="size-4" />,               category: "frontend", level: "expert",   description: "Strict mode, generics, utility types" },
    { name: "Next.js",         icon: <StackIcon name="nextjs2"        className="size-4" />,               category: "frontend", level: "expert",   description: "App Router, SSR, middleware" },
    { name: "Tailwind CSS",    icon: <StackIcon name="tailwindcss"    className="size-4" />,               category: "frontend", level: "expert",   description: "Utility-first, v4, design tokens" },
    { name: "JavaScript",      icon: <StackIcon name="js"             className="size-4" />,               category: "frontend", level: "advanced", description: "ES2024, async/await, DOM APIs" },
    { name: "ShadcnUI",        icon: <StackIcon name="shadcnui"       className="size-4" variant="dark"/>, category: "frontend", level: "advanced", description: "Components + custom theming" },
    // Backend — NestJS first (featured)
    { name: "NestJS",          icon: <StackIcon name="nestjs"         className="size-4" />,               category: "backend",  level: "expert",   description: "Modules, guards, microservices" },
    { name: "Node.js",         icon: <StackIcon name="nodejs"         className="size-4" />,               category: "backend",  level: "advanced", description: "REST APIs, async streams" },
    { name: "PostgreSQL",      icon: <StackIcon name="postgresql"     className="size-4" />,               category: "backend",  level: "advanced", description: "Queries, migrations, indexing" },
    { name: "Prisma",          icon: <StackIcon name="prisma"         className="size-4" variant="dark"/>, category: "backend",  level: "advanced", description: "Schema, migrations, ORM" },
    { name: "MongoDB",         icon: <StackIcon name="mongodb"        className="size-4" />,               category: "backend",  level: "advanced", description: "Aggregation, Atlas, mongoose" },
    { name: "Python",          icon: <StackIcon name="python"         className="size-4" />,               category: "backend",  level: "learning", description: "Scripts, data processing" },
    { name: "PHP",             icon: <StackIcon name="php"            className="size-4" />,               category: "backend",  level: "learning", description: "Moodle plugins, legacy APIs" },
    { name: "Moodle",          icon: <StackIcon name="moodle"         className="size-4" />,               category: "backend",  level: "learning", description: "LMS integrations, plugins" },
    // DevOps — Docker first (featured)
    { name: "Docker",          icon: <StackIcon name="docker"         className="size-4" />,               category: "devops",   level: "advanced", description: "Compose, multi-stage builds" },
    { name: "Linux",           icon: <StackIcon name="linux"          className="size-4" />,               category: "devops",   level: "advanced", description: "Admin, scripts, systemd" },
    { name: "AWS",             icon: <StackIcon name="aws"            className="size-4" variant="dark"/>, category: "devops",   level: "advanced", description: "EC2, S3, IAM, networking" },
    { name: "Shell",           icon: <StackIcon name="bash"           className="size-4" variant="dark"/>, category: "devops",   level: "advanced", description: "Bash automation scripts" },
    { name: "Git",             icon: <StackIcon name="git"            className="size-4" />,               category: "devops",   level: "expert",   description: "Branching, rebasing, hooks" },
    { name: "GitHub",          icon: <StackIcon name="github"         className="size-4" variant="dark"/>, category: "devops",   level: "expert",   description: "Actions CI, packages, API" },
    { name: "GitHub Actions",  icon: <StackIcon name="githubactions"  className="size-4" variant="dark"/>, category: "devops",   level: "advanced", description: "CI/CD pipelines" },
    { name: "Jenkins",         icon: <StackIcon name="jenkins"        className="size-4" variant="dark"/>, category: "devops",   level: "advanced", description: "Pipeline as code, webhooks" },
    { name: "N8N",             icon: <StackIcon name="n8n"            className="size-4" />,               category: "devops",   level: "learning", description: "Automation workflows" },
  ] as Skill[]),
  ```

- [ ] **Step 2: Add `skillDescriptions` to `DATA_EN`**

  Inside `DATA_EN`, after `projects: [...]`, add:
  ```ts
  skillDescriptions: {
    frontend: "Building responsive, accessible interfaces with React and Next.js. Strong focus on design systems, component architecture, and smooth animations with Tailwind CSS and Framer Motion.",
    backend: "Designing RESTful and event-driven APIs with NestJS and Node.js. Experienced with PostgreSQL, MongoDB, Prisma ORM, and Moodle LMS integrations.",
    devops: "Automating deployments and managing cloud infrastructure on AWS with Docker, Jenkins, and GitHub Actions. Full observability with Grafana, Keycloak, and SonarQube.",
  },
  ```

- [ ] **Step 3: Add `skillDescriptions` to `DATA_PT`**

  Inside `DATA_PT`, same position, add:
  ```ts
  skillDescriptions: {
    frontend: "Construindo interfaces responsivas e acessíveis com React e Next.js. Foco em sistemas de design, arquitetura de componentes e animações com Tailwind CSS e Framer Motion.",
    backend: "Desenvolvendo APIs RESTful e orientadas a eventos com NestJS e Node.js. Experiência com PostgreSQL, MongoDB, Prisma ORM e integrações com Moodle LMS.",
    devops: "Automatizando deploys e gerenciando infraestrutura em nuvem na AWS com Docker, Jenkins e GitHub Actions. Observabilidade completa com Grafana, Keycloak e SonarQube.",
  },
  ```

- [ ] **Step 4: Replace `footerSubtitle` with new footer keys in `DATA_EN.sectionTitles`**

  Remove `footerSubtitle: "Available for work",` and add:
  ```ts
  footerHeadline: "Ready to connect systems.",
  footerPitch: "From pixel-perfect UIs to production infrastructure — I build end-to-end and ship fast.",
  footerResume: "Open Resume",
  ```

- [ ] **Step 5: Replace `footerSubtitle` with new footer keys in `DATA_PT.sectionTitles`**

  Remove `footerSubtitle: "Disponível para trabalho",` and add:
  ```ts
  footerHeadline: "Pronto para conectar sistemas.",
  footerPitch: "De interfaces pixel-perfect a infraestrutura de produção — construo de ponta a ponta e entrego rápido.",
  footerResume: "Abrir Currículo",
  ```

- [ ] **Step 6: Add `progress-bar` keyframe to `src/app/globals.css`**

  Find the line `--animate-blink-cursor: blink-cursor 1.2s step-end infinite;` inside `@theme inline`. Insert these two new lines **immediately before** that line — do not touch anything after it:
  ```css
    --animate-progress-bar: progress-bar 5s linear forwards;
    @keyframes progress-bar {
    from { width: 0%; }
    to   { width: 100%; }}
  ```
  The class name to use in components is `animate-progress-bar`.

- [ ] **Step 7: Patch `footer.tsx` so the type change compiles cleanly**

  In `src/components/footer.tsx`, line 31 references `sectionTitles.footerSubtitle`. Since the type field was removed in Task 1, TypeScript will error here. Apply a minimal patch — change just this one reference so it compiles. The full footer rewrite happens in Task 7:

  Find:
  ```tsx
  {sectionTitles.footerSubtitle}
  ```
  Replace with:
  ```tsx
  {sectionTitles.footerHeadline}
  ```

  This is a temporary fix; Task 7 will replace the entire file.

- [ ] **Step 8: Run TypeScript check — must be 0 errors**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -20
  ```
  Expected: exits 0, no output. If errors remain from `skills.tsx` due to old field access, they will be fixed in Task 3 — but the build should be clean here because the current `skills.tsx` does not access `level`, `description`, or `skillDescriptions` yet.

- [ ] **Step 9: Commit data foundation**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/types/user.d.ts src/data/resume.tsx src/app/globals.css src/components/footer.tsx
  git commit -m "feat: add skill level/description fields, skillDescriptions, update footer i18n keys, add progress-bar keyframe"
  ```

---

## Chunk 2: Skills Section Rewrite

### Task 3: Rewrite `src/components/section/skills.tsx`

**Files:**
- Modify: `src/components/section/skills.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire file contents**

  ```tsx
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
  ```

- [ ] **Step 2: Run TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -30
  ```
  Expected: 0 errors from skills.tsx. Fix any errors before continuing.

- [ ] **Step 3: Start dev server and verify visually**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm dev
  ```
  Open `http://localhost:3000/#skills`. Verify:
  - Three tab buttons: Frontend · Backend · DevOps & Infra
  - Purple progress bar animates left→right over ~5 seconds then auto-advances
  - Clicking a tab resets the progress bar immediately
  - Left column shows description text
  - Right column shows 2-col grid of terminal-window skill cards
  - Featured (first) card spans full width
  - Each card has: dots bar + filename (.tsx/.ts/.sh) + icon + name + description + level badge
  - Three.js background visible at low opacity

- [ ] **Step 4: Commit**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/components/section/skills.tsx
  git commit -m "feat: rewrite skills section as auto-play carousel with D3 terminal-window skill cards"
  ```

---

## Chunk 3: Projects Section

### Task 4: Create `CodeParticlesBg` Three.js component

**Files:**
- Create: `src/components/three/code-particles-bg.tsx`
- Create: `src/components/three/code-particles-bg-lazy.tsx`

- [ ] **Step 1: Create `src/components/three/code-particles-bg.tsx`**

  ```tsx
  "use client";
  import { useRef, useEffect } from "react";
  import * as THREE from "three";

  const GLYPHS = ["{}", "()", "=>", "//", "</>", "fn", "[]", "::", "&&", "null", "true", "const"];

  type DotVel = { vx: number; vy: number };

  function makeGlyphTexture(glyph: string): THREE.CanvasTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "bold 22px monospace";
    ctx.fillStyle = Math.random() > 0.5 ? "#6C63FF" : "#00D4FF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.3;
    ctx.fillText(glyph, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }

  export default function CodeParticlesBg() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = mountRef.current;
      if (!el) return;

      const w = el.clientWidth || 800;
      const h = el.clientHeight || 600;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.z = 5;

      // Dot particles
      const DOT_COUNT = 60;
      const dotPositions = new Float32Array(DOT_COUNT * 3);
      const dotVels: DotVel[] = [];

      for (let i = 0; i < DOT_COUNT; i++) {
        dotPositions[i * 3]     = (Math.random() - 0.5) * 10;
        dotPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        dotVels.push({
          vx: (Math.random() - 0.5) * 0.007,
          vy: (Math.random() - 0.5) * 0.005,
        });
      }

      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
      const dotMat = new THREE.PointsMaterial({ color: "#1a1a1a", size: 0.05 });
      const dots = new THREE.Points(dotGeo, dotMat);
      scene.add(dots);

      // Glyph sprites
      const sprites: { sprite: THREE.Sprite; vx: number; vy: number }[] = [];
      for (const glyph of GLYPHS) {
        const tex = makeGlyphTexture(glyph);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
        const sprite = new THREE.Sprite(mat);
        sprite.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 3
        );
        sprite.scale.set(0.55, 0.55, 1);
        scene.add(sprite);
        sprites.push({
          sprite,
          vx: (Math.random() - 0.5) * 0.004,
          vy: (Math.random() - 0.5) * 0.003,
        });
      }

      const BOUNDS = { x: 5.2, y: 4.2 };
      const pos = dotGeo.attributes.position as THREE.BufferAttribute;
      const posArr = pos.array as Float32Array;

      let animId: number;
      function animate() {
        animId = requestAnimationFrame(animate);

        for (let i = 0; i < DOT_COUNT; i++) {
          posArr[i * 3]     += dotVels[i].vx;
          posArr[i * 3 + 1] += dotVels[i].vy;
          if (Math.abs(posArr[i * 3])     > BOUNDS.x) dotVels[i].vx *= -1;
          if (Math.abs(posArr[i * 3 + 1]) > BOUNDS.y) dotVels[i].vy *= -1;
        }
        pos.needsUpdate = true;

        for (const s of sprites) {
          s.sprite.position.x += s.vx;
          s.sprite.position.y += s.vy;
          if (Math.abs(s.sprite.position.x) > BOUNDS.x) s.vx *= -1;
          if (Math.abs(s.sprite.position.y) > BOUNDS.y) s.vy *= -1;
        }

        renderer.render(scene, camera);
      }
      animate();

      return () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    }, []);

    return <div ref={mountRef} className="absolute inset-0" />;
  }
  ```

- [ ] **Step 2: Create `src/components/three/code-particles-bg-lazy.tsx`**

  ```tsx
  import dynamic from "next/dynamic";

  const CodeParticlesBg = dynamic(
    () => import("@/components/three/code-particles-bg"),
    { ssr: false }
  );

  export default CodeParticlesBg;
  ```

- [ ] **Step 3: Run TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -20
  ```
  Expected: 0 new errors.

- [ ] **Step 4: Commit**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/components/three/code-particles-bg.tsx src/components/three/code-particles-bg-lazy.tsx
  git commit -m "feat: add CodeParticlesBg Three.js component with glyph sprites and dot particles"
  ```

---

### Task 5: Rewrite `src/components/section/projects.tsx`

**Files:**
- Modify: `src/components/section/projects.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire file contents**

  ```tsx
  "use client";
  import Link from "next/link";
  import { useState } from "react";
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

  function TerminalCard({ project, delay }: TerminalCardProps) {
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
            <div className="h-36 overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
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
  ```

- [ ] **Step 2: Run TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -20
  ```
  Expected: 0 errors.

- [ ] **Step 3: Verify visually**

  Open `http://localhost:3000/#projects`. Verify:
  - Code glyph particles floating in background (`{}`, `=>`, `null`, etc.)
  - Filter tabs (All / Frontend / Backend / Infra) work
  - Each project card has: terminal top bar with dots + filename (`.tsx`/`.ts`/`.sh`) + ArrowUpRight icon + image/gradient + title + `// dates` + description + tech tags
  - Hover shows purple border glow
  - Cards reveal with blur-fade on scroll

- [ ] **Step 4: Commit**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/components/section/projects.tsx
  git commit -m "feat: rewrite projects section with terminal window cards and code particles background"
  ```

---

## Chunk 4: Header + Footer

### Task 6: Update language toggle in `src/components/header.tsx`

**Files:**
- Modify: `src/components/header.tsx` (targeted edit, lines 68–85)

- [ ] **Step 1: Replace the language toggle `<button>` block**

  Find this block in `header.tsx` (the existing language toggle button, lines ~68–85):
  ```tsx
  <button
    onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
    title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    className="relative size-9 rounded-full border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 hover:border-purple-400/60 backdrop-blur-sm transition-all duration-300 overflow-hidden group p-0 cursor-pointer"
  >
    <span
      className="absolute inset-0 flex items-center justify-center leading-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
      style={{ fontSize: "44px" }}
    >
      {language === "pt" ? "🇧🇷" : "🇺🇸"}
    </span>
    <span
      className="absolute inset-0 flex items-center justify-center leading-none opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
      style={{ fontSize: "36px" }}
    >
      {language === "pt" ? "🇺🇸" : "🇧🇷"}
    </span>
  </button>
  ```

  Replace it with:
  ```tsx
  <button
    onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
    title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    className="flex flex-col items-center gap-0.5 cursor-pointer group"
  >
    <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-xl transition-all duration-200 group-hover:border-[#6C63FF] group-hover:bg-[#6C63FF]/5">
      {language === "pt" ? "🇧🇷" : "🇺🇸"}
    </div>
    <span className="font-mono text-[8px] text-zinc-700 tracking-widest select-none">
      PT / EN
    </span>
  </button>
  ```

- [ ] **Step 2: Run TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -20
  ```
  Expected: 0 errors.

- [ ] **Step 3: Verify visually**

  Open `http://localhost:3000`. Verify:
  - Language button is a rounded square (not circle)
  - Shows current flag + "PT / EN" label below
  - Hover shows purple border + very subtle purple tint
  - Clicking switches language correctly

- [ ] **Step 4: Commit**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/components/header.tsx
  git commit -m "feat: replace language toggle with square icon button (D3 design)"
  ```

---

### Task 7: Rewrite `src/components/footer.tsx`

**Files:**
- Modify: `src/components/footer.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire file contents**

  ```tsx
  "use client";
  import Link from "next/link";
  import { MapPin, FileText } from "lucide-react";
  import { useLanguage } from "@/contexts/language-context";
  import { useBlurFade } from "@/hooks/use-blur-fade";
  import Logo from "@/components/logo";

  const Footer = () => {
    const { data } = useLanguage();
    const { sectionTitles, contact } = data;
    const footerRef = useBlurFade<HTMLElement>();

    return (
      <footer ref={footerRef} data-animate className="w-full border-t border-[#1a1a1a] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Split layout */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
            {/* Left column */}
            <div className="flex-1">
              <p className="font-mono text-[10px] text-[#00FF88] uppercase tracking-[3px] mb-4">
                → open to work
              </p>
              <h2 className="font-sans font-bold text-3xl text-zinc-100 mb-3">
                {sectionTitles.footerHeadline}
              </h2>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-6">
                {sectionTitles.footerPitch}
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Primary CTA */}
                <a
                  href={`mailto:${contact.email}`}
                  className="relative inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-[#6C63FF]/40 bg-transparent px-6 font-mono text-sm text-zinc-300 transition-all duration-300 hover:border-[#6C63FF] hover:text-zinc-100"
                >
                  {sectionTitles.getStarted}
                </a>
                {/* Resume CTA */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 border border-zinc-800 rounded-md font-mono text-xs text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200"
                >
                  <FileText size={12} />
                  {sectionTitles.footerResume}
                </a>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 lg:flex lg:flex-col lg:items-end">
              {/* Available status */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span className="font-mono text-xs text-[#00FF88]">
                  {sectionTitles.available}
                </span>
              </div>
              {/* Contact stack */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 lg:justify-end font-sans text-xs text-zinc-600">
                  <MapPin size={12} className="text-zinc-600 flex-shrink-0" />
                  Brasília, Brazil
                </div>
                {contact.social.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-zinc-600 hover:text-[#6C63FF] transition-colors lg:text-right"
                  >
                    {s.url.replace("https://", "")}
                  </a>
                ))}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-[11px] text-zinc-600 hover:text-[#6C63FF] transition-colors lg:text-right"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center pt-6 border-t border-[#1a1a1a]">
            <Logo asDiv />
            <p className="font-mono text-[10px] text-zinc-700">
              © {new Date().getFullYear()} Rafael Dantas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
  ```

- [ ] **Step 2: Run TypeScript check — must be 0 errors**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit 2>&1 | head -20
  ```
  At this point `footerSubtitle` has been removed from the type (Task 1) and from `resume.tsx` (Task 2), and the footer no longer references it — so 0 errors are expected.

- [ ] **Step 3: Verify visually**

  Open `http://localhost:3000` and scroll to footer. Verify:
  - Left column: `→ open to work` green eyebrow + headline (`footerHeadline`) + pitch text + two buttons (Send message + Open Resume with FileText icon)
  - Right column: pulsing green dot + "Available" + location with MapPin icon + GitHub/LinkedIn links + email
  - Bottom bar: Logo left + copyright right
  - Both language switches (PT/EN) update headline and pitch text correctly

- [ ] **Step 4: Commit**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio
  git add src/components/footer.tsx
  git commit -m "feat: rewrite footer as split layout with resume button and Lucide MapPin"
  ```

---

## Final Verification

- [ ] **Confirm `footerSubtitle` is fully removed**

  ```bash
  grep -r "footerSubtitle" /home/danzokka/VSCode/pessoal/portfolio/src/
  ```
  Expected: no output. If any matches remain, remove them.

- [ ] **Run full TypeScript check**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm tsc --noEmit
  ```
  Expected: exits 0 with no output.

- [ ] **Run production build**

  ```bash
  cd /home/danzokka/VSCode/pessoal/portfolio && pnpm build 2>&1 | tail -20
  ```
  Expected: `✓ Compiled successfully` with no errors.

- [ ] **Manual smoke test**

  Open `http://localhost:3000` and verify:
  1. Header language toggle is square, switches PT↔EN
  2. Skills section: tabs advance automatically every 5s, progress bar resets on click
  3. Skills panel: terminal cards with dots + filename + icon + description + badge
  4. Projects section: floating glyphs background visible, filter tabs work, terminal cards with dots + filename
  5. Footer: split layout, MapPin for location, Open Resume button
  6. Switch to PT — all i18n strings update correctly
