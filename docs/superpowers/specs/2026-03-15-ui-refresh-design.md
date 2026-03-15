# UI Refresh — Skills, Projects, Language Toggle, Footer

> **For agentic workers:** Use superpowers:executing-plans or superpowers:subagent-driven-development to implement.

**Goal:** Refactor four existing UI areas with richer, more distinctive designs that strengthen the terminal/developer identity of the Danzokka portfolio.

**Decisions confirmed by user (visual brainstorming session):**
- Skills: auto-play carousel with progress bar + rich text
- Projects: terminal window cards + animated background
- Language toggle: square icon button, current flag, "PT/EN" label, purple hover border
- Footer: split layout with Open Resume button, Lucide MapPin icon for location

---

## 1. Skills Section — Auto-play Carousel

### Data changes required first

**`src/types/user.d.ts`** — add `skillDescriptions` as a top-level key on `User` (NOT inside `SectionTitles`):

```ts
export type SkillDescriptions = {
  frontend: string;
  backend: string;
  devops: string;
};

// Inside `type User`:
skillDescriptions: SkillDescriptions;
```

Access path in components: `data.skillDescriptions.frontend`

**`src/data/resume.tsx`** — `skillDescriptions` contains language-specific copy, so it must be added to **`DATA_EN`** and **`DATA_PT`** individually (not `COMMON_DATA`). The File Map below reflects this — ignore any reference to `COMMON_DATA` for this field.

```ts
// DATA_EN
skillDescriptions: {
  frontend: "Building responsive, accessible interfaces with React and Next.js. Strong focus on design systems, component architecture, and smooth animations with Tailwind CSS and Framer Motion.",
  backend: "Designing RESTful and event-driven APIs with NestJS and Node.js. Experienced with PostgreSQL, MongoDB, Prisma ORM, and Moodle LMS integrations.",
  devops: "Automating deployments and managing cloud infrastructure on AWS with Docker, Jenkins, and GitHub Actions. Full observability with Grafana, Keycloak, and SonarQube.",
},

// DATA_PT
skillDescriptions: {
  frontend: "Construindo interfaces responsivas e acessíveis com React e Next.js. Foco em sistemas de design, arquitetura de componentes e animações com Tailwind CSS e Framer Motion.",
  backend: "Desenvolvendo APIs RESTful e orientadas a eventos com NestJS e Node.js. Experiência com PostgreSQL, MongoDB, Prisma ORM e integrações com Moodle LMS.",
  devops: "Automatizando deploys e gerenciando infraestrutura em nuvem na AWS com Docker, Jenkins e GitHub Actions. Observabilidade completa com Grafana, Keycloak e SonarQube.",
},
```

### Layout

- Full-width section, centered header (`./skills` eyebrow + h2 from `sectionTitles.skills`)
- Tab strip with three buttons: Frontend · Backend · DevOps & Infra
- Progress bar below the tab strip fills over 5 seconds then auto-advances
- Panel below shows the active category content (cross-fade transition)

### Tab strip + progress bar

```
[ Frontend ] [ Backend ] [ DevOps & Infra ]
━━━━━━━━━━━━━━━━━━━━━━━━  ← progress bar, purple, animates L→R over 5s
```

- Tabs: `font-mono text-xs uppercase tracking-widest px-4 py-2 cursor-pointer transition-colors`
- Active: `text-zinc-100 border-b-2 border-[#6C63FF]`
- Inactive: `text-zinc-600 hover:text-zinc-400 border-b-2 border-transparent`

**Progress bar reset mechanism — JS-driven (not CSS class toggle):**

Use a `key` prop on the progress bar div. When the tab changes (either by user click or auto-advance timer), increment a `progressKey` counter. React unmounts + remounts the element, which reliably restarts the CSS animation from 0 without needing `getBoundingClientRect`.

```tsx
const [activeTab, setActiveTab] = useState(0);
const [progressKey, setProgressKey] = useState(0);

function goTo(index: number) {
  setActiveTab(index);
  setProgressKey((k) => k + 1); // forces remount → restarts animation
}
```

Progress bar element:
```tsx
<div
  key={progressKey}
  className="h-0.5 bg-[#6C63FF] w-0 animate-progress-bar"
/>
```

Add to `globals.css` inside `@theme inline`:
```css
--animate-progress-bar: progress-bar 5s linear forwards;
@keyframes progress-bar {
  from { width: 0%; }
  to   { width: 100%; }
}
```

Auto-advance with `useEffect`:
```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    goTo((activeTab + 1) % 3);
  }, 5000);
  return () => clearTimeout(timer);
}, [activeTab, progressKey]);
```

### Panel content (per category)

Two-column layout inside the panel (stacks on mobile):

**Left — Description block (40% width on desktop):**
- Eyebrow: `font-mono text-[10px] text-[categoryColor] uppercase tracking-[3px] mb-2`
- Headline: `font-sans text-xl font-bold text-zinc-100 mb-3` — use `sectionTitles.skillsFrontend / skillsBackend / skillsDevops`
- Body: `font-sans text-sm text-zinc-500 leading-relaxed` — from `data.skillDescriptions[category]`
- Category colors: frontend=`#6C63FF`, backend=`#00D4FF`, devops=`#00FF88`

**Right — Skills grid (60% width on desktop):**
- Responsive `flex flex-wrap gap-2`
- Each pill: `flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono hover:border-zinc-600 transition-colors`
- Icon: `{skill.icon as React.ReactNode}` (cast needed due to `JSX.Element | SVGSVGElement` type)

**Panel transition:**
- Use `opacity-0` → `opacity-100` controlled by state, with `transition-opacity duration-400`
- No `useBlurFade` on panels — the carousel manages its own visibility; `useBlurFade` only on the outer section container

**Three.js backgrounds** (existing): keep ComponentTreeBg / NestConsoleBg / PipelineBg at `opacity-[0.08]` absolute behind each panel column. Since the new design is a single panel (not 3 columns), render the background matching the active tab only.

### File: `src/components/section/skills.tsx`
- Full rewrite; tabs + progress bar + two-column panel
- Three.js bg rendered conditionally per active tab with `dynamic()` wrappers (already exist)

---

## 2. Projects Section — Terminal Window Cards

### Background component

**`src/components/three/code-particles-bg.tsx`** — floating particles + code glyph sprites

Implementation approach: **`THREE.Sprite` with `CanvasTexture`** (no external font loading required).

For each glyph, create a small offscreen `<canvas>` (e.g., 64×64), draw the character with `ctx.fillText`, convert to `THREE.CanvasTexture`, then use as `SpriteMaterial`. Create ~12 unique glyph sprites (`{`, `}`, `()`, `=>`, `//`, `</>`, `fn`, `[]`, `::`, `&&`, `null`, `true`).

Additionally, ~60 plain dot particles using `THREE.Points` (same approach as HeroNetworkScene).

Drift all objects slowly (0.003–0.008 units/frame), bounce off bounds. No rotation needed.

Palette: mix of `#6C63FF` at 15% opacity and `#1a1a1a` for dots. Glyphs in `#6C63FF` and `#00D4FF` at ~20% opacity.

Canvas wrapper: `opacity-[0.12]`, `absolute inset-0 pointer-events-none`, SSR disabled.

**`src/components/three/code-particles-bg-lazy.tsx`** — `dynamic()` wrapper (5 lines, same pattern as `hero-network-lazy.tsx`). Projects section `dynamic()`-imports this wrapper.

### Terminal card design

Each card is a named sub-component `TerminalCard` defined in `projects.tsx`.

**Filename extension mapping** (deterministic from `project.category`):
```ts
const EXT: Record<Project['category'], string> = {
  frontend: '.tsx',
  backend:  '.ts',
  infra:    '.sh',
};
// Usage: `${project.slug}${EXT[project.category]}`
```

**Card structure:**
```
┌──────────────────────────────────────┐
│ ● ● ●   slug.tsx            ↗       │  top bar (h-8, bg-[#0a0a0a], border-b border-[#0d0d0d])
├──────────────────────────────────────┤
│  [project image or category gradient]│  h-36, object-cover
├──────────────────────────────────────┤
│  Project Title              (font-sans font-semibold text-sm text-zinc-100)
│  // 2025–2026               (font-mono text-[10px] text-zinc-600)
│  Description text…          (font-sans text-xs text-zinc-500 line-clamp-2)
│                                      │
│  [Next.js] [NestJS] [Prisma]         │  tech tags
└──────────────────────────────────────┘
```

**Category gradient fallbacks** (when no `project.image`):
```ts
const GRADIENT: Record<Project['category'], string> = {
  frontend: 'linear-gradient(135deg, #0d0d20, #1a1035)',
  backend:  'linear-gradient(135deg, #001a1a, #0d2020)',
  infra:    'linear-gradient(135deg, #001a0d, #0d2010)',
};
```

**Top bar dots:** three `w-2.5 h-2.5 rounded-full` — colors `#ff5f57` / `#ffbd2e` / `#28c840` (decorative only, no click handlers)

**Open link:** `ArrowUpRight` from Lucide, `size={14}`, `text-zinc-600 hover:text-zinc-400`

**Card hover:** `hover:border-[#6C63FF]/30 transition-colors duration-300`

**Entire card is a link:** wrap with `<Link href={project.href} target="_blank">` — valid because `TerminalCard` renders a `<div>` (not a `<button>`) inside the link.

**Tech tags:** `font-mono text-[9px] px-1.5 py-0.5 border border-zinc-800 rounded-sm text-zinc-600` — show tech name only (no icon in tags to keep the terminal aesthetic)

### Grid

- Same filter tabs as before (All / Frontend / Backend / Infra)
- `grid-template-columns`: 1 → 2 → 3 columns
- Uniform size (no featured card)
- `useBlurFade` on each `TerminalCard` wrapper with staggered `transitionDelay`

### File changes
- `src/components/section/projects.tsx` — replace `ProjectCard` with `TerminalCard` sub-component; add `CodeParticlesBg` import

---

## 3. Language Toggle — Square Icon Button

### Design spec

```tsx
<button
  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
  title={...}
  className="flex flex-col items-center gap-1 cursor-pointer group"
>
  <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-xl transition-all duration-200 group-hover:border-[#6C63FF] group-hover:bg-[#6C63FF]/5">
    {language === 'pt' ? '🇧🇷' : '🇺🇸'}
  </div>
  <span className="font-mono text-[8px] text-zinc-700 tracking-widest select-none">
    PT / EN
  </span>
</button>
```

**Note:** The label `"PT / EN"` is intentionally hardcoded (not i18n-sourced) — it always shows both options and does not need translation.

**File:** `src/components/header.tsx` — replace the existing `<button>` language toggle block with the above.

---

## 4. Footer — Split Layout

### Data changes

**`src/types/user.d.ts`** — add to `SectionTitles`:
```ts
footerHeadline: string;
footerPitch: string;
footerResume: string;
```

**Remove `footerSubtitle`** from `SectionTitles` type (it is replaced by `footerHeadline`). **Important:** Remove the type field and all usages in the same commit as the footer component rewrite — the current `footer.tsx` references `sectionTitles.footerSubtitle` on line 31, so removing the type before rewriting the component will cause a build failure. Do both atomically.

**`src/data/resume.tsx`** — replace `footerSubtitle` with new keys in both DATA_EN and DATA_PT:

```ts
// DATA_EN (remove footerSubtitle, add:)
footerHeadline: "Ready to connect systems.",
footerPitch: "From pixel-perfect UIs to production infrastructure — I build end-to-end and ship fast.",
footerResume: "Open Resume",

// DATA_PT (remove footerSubtitle, add:)
footerHeadline: "Pronto para conectar sistemas.",
footerPitch: "De interfaces pixel-perfect a infraestrutura de produção — construo de ponta a ponta e entrego rápido.",
footerResume: "Abrir Currículo",
```

### Component layout (`src/components/footer.tsx`)

```
┌──────────────────────────────────────────────────────┐
│  Left column (flex-1)      │  Right column (flex-1)  │
│                            │                          │
│  → open to work (eyebrow)  │  ● Available             │
│  H2: footerHeadline        │                          │
│  p: footerPitch            │  📍 Brasília, Brazil     │
│                            │  github.com/Danzokka     │
│  [Send a message]          │  linkedin.com/in/...     │
│  [Open Resume]             │  email@...               │
└──────────────────────────────────────────────────────┘
────────────────────────────────────────────────────────
  [Logo]                          © 2026 Rafael Dantas.
```

**Left column:**
- Eyebrow: `font-mono text-[10px] text-[#00FF88] uppercase tracking-[3px] mb-4` → `"→ open to work"` (hardcoded, not i18n)
- H2: `font-sans font-bold text-3xl text-zinc-100 mb-3` → `sectionTitles.footerHeadline`
- Body: `font-sans text-sm text-zinc-500 leading-relaxed mb-6` → `sectionTitles.footerPitch`
- CTA buttons — stacked or side-by-side on desktop:
  - Primary: `InteractiveHoverButton` renders a native `<button>`, so it cannot be wrapped in `<a>` (invalid HTML). Instead, use a styled `<a>` tag that visually mimics it:
    ```tsx
    <a
      href={`mailto:${contact.email}`}
      className="relative inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-[#6C63FF]/40 bg-transparent px-6 font-mono text-sm text-zinc-300 transition-all duration-300 hover:border-[#6C63FF] group"
    >
      {sectionTitles.getStarted}
    </a>
    ```
  - Secondary (Open Resume): `<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-md font-mono text-xs text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200">` + `FileText` icon from Lucide (size-3)

**Right column:**
- Available: `flex items-center gap-2 mb-6` — `w-2 h-2 rounded-full bg-[#00FF88] animate-pulse` + `font-mono text-xs text-[#00FF88]` → `sectionTitles.available`
- Contact items: `flex flex-col gap-3 items-end` on desktop, `items-start` on mobile
  - Location: `MapPin` from Lucide (size-3, `text-zinc-600`) + `"Brasília, Brazil"` (hardcoded) — `font-sans text-xs text-zinc-600`
  - GitHub / LinkedIn / Email: from `contact.social` and `contact.email` — `font-mono text-[11px] text-zinc-600 hover:text-[#6C63FF] transition-colors`

**Bottom bar:**
- `border-t border-[#1a1a1a] pt-6 mt-10`
- `flex justify-between items-center`
- Left: `<Logo asDiv />`
- Right: `font-mono text-[10px] text-zinc-700` → `© {new Date().getFullYear()} Rafael Dantas. All rights reserved.` (hardcoded English — intentional)

**`useBlurFade`:** attach to the outer `<footer>` element (single reveal for the whole section).

---

## File Map

| File | Action |
|------|--------|
| `src/types/user.d.ts` | Export `SkillDescriptions` type; add `skillDescriptions: SkillDescriptions` to `User`; add `footerHeadline`, `footerPitch`, `footerResume` to `SectionTitles`; remove `footerSubtitle` |
| `src/data/resume.tsx` | Add `skillDescriptions` to **DATA_EN** and **DATA_PT** (language-specific); replace `footerSubtitle` with `footerHeadline`/`footerPitch`/`footerResume` in both. Do NOT touch COMMON_DATA for these fields. |
| `src/components/section/skills.tsx` | Full rewrite — tabs + progress bar (key-based reset) + two-column panel |
| `src/components/section/projects.tsx` | Rewrite — `TerminalCard` sub-component + `CodeParticlesBg` |
| `src/components/three/code-particles-bg.tsx` | New — Sprite-based glyphs + Points particles |
| `src/components/three/code-particles-bg-lazy.tsx` | New — `dynamic()` SSR wrapper (5 lines) |
| `src/components/header.tsx` | Replace language toggle with square icon button |
| `src/components/footer.tsx` | Rewrite — split layout, `MapPin`, resume button |

---

## Design Tokens (unchanged)

```css
--terminal-green: #00FF88
--electric-blue:  #00D4FF
--purple-accent:  #6C63FF
--ui-border:      #1a1a1a
```

## Out of Scope
- About section (already removed)
- Hero, Services, Reviews, Metrics sections (no changes)
- New routes or pages
- `/resume.pdf` file (placeholder href is acceptable)
