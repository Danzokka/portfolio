# Portfolio Redesign — Design Spec
**Date:** 2026-03-15
**Author:** Rafael Dantas (Danzokka)
**Approach:** Incremental refactor (component by component, preserving i18n, routing, data layer)

---

## 1. Context & Goal

The current portfolio uses a vaporwave aesthetic that doesn't represent Rafael's identity as a Fullstack Engineer with DevOps and Infrastructure expertise. The goal is a complete visual redesign that:

- Communicates seniority and technical depth (fullstack + devops + infra)
- Has a clear, recognizable brand identity ("Danzokka")
- Feels dark, minimal, and precise — not decorative
- Uses Three.js purposefully (not as decoration, but to illustrate architecture/network/pipeline work)
- Supports both Portuguese and English (existing i18n system preserved)

**What is NOT changing:** `resume.tsx` data structure (except explicit additions below), language context system, `/project/[slug]` routing logic, shadcn/ui registry setup, React Three Fiber dependencies.

**What IS being removed:** `about.tsx` section — its content (work history, education) is folded into the Skills section as a timeline sub-component. The top-level nav item "About" is dropped.

---

## 2. Design System

### 2.1 Color Tokens

Update `src/app/globals.css` — replace existing vaporwave variables with:

```css
--bg:            #080808;  /* OLED near-black — page background */
--bg-surface:    #0e0e10;  /* cards, panels, raised surfaces */
--border:        #1a1a1a;  /* all borders and dividers */
--text-primary:  #F1F5F9;  /* titles, important body text */
--text-muted:    #555555;  /* labels, metadata, secondary */
--text-faint:    #2a2a2a;  /* decorative, very subtle */
--accent-purple: #6C63FF;  /* frontend / fullstack identity */
--accent-cyan:   #00D4FF;  /* infra / networking identity */
--accent-green:  #00FF88;  /* devops / terminal / success */
```

Keep existing shimmer/rainbow keyframes — they are used by shadcn components and must survive the cleanup pass.

### 2.2 Typography

**Font loading — via `next/font/google` in `layout.tsx` (not raw CSS @import):**

```tsx
// src/app/layout.tsx
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
})
```

Apply both variables to `<html>` and remove existing Geist font variables.

**Update `globals.css` font mappings:**
```css
body { font-family: var(--font-ibm-plex-sans), sans-serif; }
--font-mono: var(--font-ibm-plex-mono);  /* replaces --font-geist-mono */
```

**Typography scale:**

| Element | Font | Weight | Notes |
|---|---|---|---|
| Hero display title | IBM Plex Mono | 700 | ~6rem, letter-spacing `-0.04em` |
| Section number labels (`// 01`) | IBM Plex Mono | 400 | 11px, `--text-muted`, letter-spacing 3px |
| Section titles | IBM Plex Sans | 600 | 2–3rem |
| Body / descriptions | IBM Plex Sans | 400 | 1rem, line-height 1.65 |
| Tech tags / badges | IBM Plex Mono | 400 | 11–12px |
| Terminal prompts / code blocks | IBM Plex Mono | 400 | Any code-style element |
| Navigation links | IBM Plex Mono | 400 | HyperText scramble on hover |

### 2.3 Scroll Animations (Tailwind-native, no new component)

The existing `BlurFade` component (`src/components/ui/blur-fade.tsx`) is **retired** — replaced by a `useBlurFade` hook that applies Tailwind classes directly, keeping the same visual result without Framer Motion overhead on every element.

**Hook: `src/hooks/use-blur-fade.ts`**
```ts
// Returns ref to attach to element
// Sets element.setAttribute('data-visible', 'true') when IntersectionObserver fires
// threshold: 0.15, once: true
```

**Tailwind classes on each animated element:**
```
opacity-0 blur-sm translate-y-3
motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out
data-[visible=true]:opacity-100 data-[visible=true]:blur-0 data-[visible=true]:translate-y-0
```

Note: `element.setAttribute('data-visible', 'true')` sets a string, matching the `data-[visible=true]:` Tailwind v4 variant exactly.

**Stagger support:** pass `delay` in ms, applied as `style={{ transitionDelay: `${delay}ms` }}`.

### 2.4 Global Styles Changes Summary

In `globals.css`:
- Remove: vaporwave variables (`--vaporwave-*`), old color tokens, `@import` font statements
- Add: new color tokens (section 2.1), `--font-mono` remapped to `--font-ibm-plex-mono`
- Keep: shimmer, spin-around, rainbow, shine keyframes
- Add to hero only: scanlines pseudo-element at ~1.5% opacity via `.hero-scanlines` class

---

## 3. Brand / Logo

### 3.1 Logo.tsx Component

**File:** `src/components/logo.tsx`

**Visual concept — Terminal prefix:**
```
~/dev/
Danz okka
FULLSTACK · DEVOPS
```

- `~/dev/` — IBM Plex Mono 400, `--text-muted`, 9–12px (by size), letter-spacing 1px
- `Danz` — IBM Plex Mono 700, `--accent-green` (#00FF88)
- `okka` — IBM Plex Mono 300, `--text-primary`
- Subtitle — IBM Plex Mono 400, `--text-faint`, 9px, letter-spacing 3px, uppercase, hidden on `sm`

**Props:**
```tsx
interface LogoProps {
  size?: 'sm' | 'md' | 'lg'  // sm = header, md = footer, lg = splash
  showSubtitle?: boolean
  className?: string
}
```

**Sizes:**
| Size | Path | Name | Subtitle |
|---|---|---|---|
| `sm` | 9px | 18px | hidden |
| `md` | 10px | 22px | visible |
| `lg` | 12px | 32px | visible |

---

## 4. Type System Changes (`src/types/user.d.ts`)

These changes must be made before any component implementation:

```ts
// Add to Skill type:
interface Skill {
  name: string
  icon: JSX.Element
  category: 'frontend' | 'backend' | 'devops'  // NEW
}

// Add to Project type:
interface Project {
  // ...existing fields...
  category: 'frontend' | 'backend' | 'infra'   // NEW
}

// Add tagline to Hero type:
interface Hero {
  // ...existing fields...
  tagline: string                                // NEW
}

// Add skills to SectionTitles (or top-level User):
interface SectionTitles {
  // ...existing...
  skills: string                                 // NEW
}

// Update Navbar type to add skills key:
interface Navbar {
  // ...existing: home, projects, about, services, contact...
  skills: string    // NEW — replaces 'about' in nav
}

// Update Metrics (existing) — change value to number, add suffix:
interface Metric {
  value: number       // CHANGED from string (was "100+")
  suffix: string      // NEW (e.g., "+", "K+", "")
  label: string
  isInfinity?: boolean  // NEW — renders ∞ instead of NumberTicker
}
```

---

## 5. Data Changes (`src/data/resume.tsx`)

### 5.1 Skills — add `category` to each skill

```ts
// COMMON_DATA.skills — add category to every entry:
{ name: 'React', icon: <ReactIcon />, category: 'frontend' },
{ name: 'Next.js', icon: <NextIcon />, category: 'frontend' },
// ...etc for all skills
```

### 5.2 Projects — add `category` to each project

```ts
// Each project in DATA_EN.projects and DATA_PT.projects:
{ ...existingProject, category: 'frontend' | 'backend' | 'infra' }
```

### 5.3 New i18n keys — add to both DATA_EN and DATA_PT

```ts
// DATA_EN additions:
hero: {
  ...existing,
  tagline: 'connecting systems',
},
navbar: {
  ...existing,
  skills: 'Skills',    // replaces 'about'
},
sections: {
  ...existing,
  skills: 'Skills',
  skillsFrontend: 'Frontend',
  skillsBackend: 'Backend',
  skillsDevops: 'Infra & DevOps',
  projectsAll: 'All',
  projectsFrontend: 'Frontend',
  projectsBackend: 'Backend',
  projectsInfra: 'Infra',
},
metrics: [
  { value: 5,  suffix: '+', label: 'years experience' },
  { value: 30, suffix: '+', label: 'projects shipped' },
  { value: 10, suffix: '+', label: 'prod deployments' },
  { value: 0,  suffix: '',  label: 'coffee limit', isInfinity: true },
],

// DATA_PT additions (same keys, Portuguese values):
hero: { tagline: 'conectando sistemas' },
navbar: { skills: 'Habilidades' },
sections: {
  skills: 'Habilidades',
  skillsFrontend: 'Frontend',
  skillsBackend: 'Backend',
  skillsDevops: 'Infra & DevOps',
  projectsAll: 'Todos',
  projectsFrontend: 'Frontend',
  projectsBackend: 'Backend',
  projectsInfra: 'Infra',
},
metrics: [
  { value: 5,  suffix: '+', label: 'anos de experiência' },
  { value: 30, suffix: '+', label: 'projetos entregues' },
  { value: 10, suffix: '+', label: 'deploys em produção' },
  { value: 0,  suffix: '',  label: 'limite de café', isInfinity: true },
],
```

---

## 6. Section Architecture

### 6.1 Header

**File:** `src/components/header.tsx` (refactor)

- Fixed top, `bg-transparent` → `bg-[--bg]/80 backdrop-blur-sm` on scroll (via `useScrollY` hook checking `scrollY > 50`)
- Left: `<Logo size="sm" />`
- Right (desktop): nav links using `HyperText` Magic UI component — scramble on hover. Items: `data.navbar.skills`, `data.navbar.projects`, `data.navbar.services`, `data.navbar.contact`. Language toggle stays.
- Right (mobile): hamburger icon (Lucide `Menu`) opens a full-screen overlay nav drawer. Drawer shows same nav items as stacked links + language toggle. Overlay background: `--bg/95 backdrop-blur-md`.
- Remove `data.navbar.home` and `data.navbar.about` from nav (About section removed).

### 6.2 Hero

**File:** `src/components/section/hero.tsx` (refactor)

**Layers (z-index):**
- z-0: `<HeroNetworkScene />` — Three.js, see section 7.1
- z-10: Content (positioned bottom-left on desktop, centered on mobile)
- z-20: Bottom gradient fade `transparent → --bg`

**Content:**
```
// FULLSTACK ENGINEER           ← section label, IBM Plex Mono, --text-muted, 11px
RAFAEL DANTAS                   ← IBM Plex Mono 700, 6rem desktop / 3rem mobile
────────────────                ← 2px line, --accent-green, w-16
<TypingAnimation loop words={[  ← IBM Plex Mono 400, 1.2rem, --text-muted
  data.hero.roles[0],           (key added to data: array of role strings)
  data.hero.roles[1],
  data.hero.roles[2],
]} />
                                ← 32px gap
{data.hero.tagline}             ← IBM Plex Mono 400, --text-faint, 11px, letter-spacing 4px

<InteractiveHoverButton>        ← {data.hero.seeProjects} (existing key)
<InteractiveHoverButton>        ← {data.hero.contact} (new key, add to both langs)
```

Note: Add `hero.roles: string[]` and `hero.contact: string` to `Hero` type and both data objects.

### 6.3 Skills

**File:** `src/components/section/skills.tsx` (new)

**Layout:** Full-width section. Section label + TextAnimate title. Then 3-column grid (`grid-cols-1 md:grid-cols-3`), each separated by `1px solid var(--border)` vertical dividers.

**Each column:**
```
[accent-colored dot] FRONTEND          ← IBM Plex Mono 400, column accent color
──────────────────────────────
[React] [Next.js] [TypeScript]         ← tech badges: bg-surface, border, IBM Plex Mono 11px
[Tailwind] [GraphQL]

→ Related Projects:                    ← IBM Plex Sans 400, --text-muted, small
  ┌──────────────────┐
  │ Project Card sm  │                 ← mini card: title + 1 tag + arrow link
  └──────────────────┘

Work timeline (accordion):            ← shadcn Accordion, collapsed by default
  ┌── [Company] · [Role] · [Period] ──┤
```

Work history (from existing `DATA.work`) is placed here as a shadcn Accordion below each column's related skills (or as a full-width sub-section below all three columns — implementer's choice based on data volume).

**Frontend column:** `<ComponentTreeBg />` (section 7.3) — same `position: absolute inset-0` pattern, `z-0`. Column content `z-10`.

**Backend column:** `<NestConsoleBg />` (section 7.4) — same pattern.

**Infra/DevOps column:** `<PipelineBg />` (section 7.2) — same pattern.

Skills filtered by `skill.category` from `COMMON_DATA.skills`.

### 6.4 Projects

**File:** `src/components/section/projects.tsx` (refactor)

- Section label + `<TextAnimate animation="blurInUp" by="word">` title
- Filter tabs: shadcn `Tabs` with items from `data.sections.projectsAll/Frontend/Backend/Infra`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-4
- Each card: shadcn `Card` (`bg-[--bg-surface] border-[--border]`)
  - Top: category accent color tag (IBM Plex Mono)
  - Title: IBM Plex Sans SemiBold
  - Description: IBM Plex Sans 400, 2-line clamp
  - Tech stack badges: IBM Plex Mono
  - CTA: `<InteractiveHoverButton>` → `/project/[slug]`
- Filter logic: client-side state, `project.category` field

### 6.5 Metrics

**File:** `src/components/section/metrics.tsx` (new)

Narrow horizontal band (`py-16`), centered, between Projects and Services.

```tsx
{data.metrics.map(metric => (
  metric.isInfinity
    ? <span>∞</span>                    // IBM Plex Mono 700, 4rem, --text-primary
    : <NumberTicker value={metric.value} />  // same styling
  <span>{metric.suffix}</span>          // IBM Plex Mono 700, 4rem
  <p>{metric.label}</p>                 // IBM Plex Sans 400, --text-muted, small
))}
```

Grid: `grid-cols-2 md:grid-cols-4`.

### 6.6 Services

**File:** `src/components/section/services.tsx` (refactor)

- Section label + TextAnimate title
- Grid of shadcn `Card` — dark surface, `border-[--border]`
- Each card: Lucide icon + title (IBM Plex Sans SemiBold) + description (IBM Plex Sans)
- Top border accent: `border-t-2 border-t-[--accent-purple/cyan/green]` rotated per card

### 6.7 Reviews

**File:** `src/components/section/reviews.tsx` (refactor)

- Section label + TextAnimate title
- Cards: shadcn `Card`, dark surface
- Quote prefix: `//` in `--text-muted` IBM Plex Mono — then quote text in IBM Plex Sans
- Author: IBM Plex Mono small, `--text-muted`
- Rating: Lucide `Star` icons, `--accent-green`

### 6.8 Footer

**File:** `src/components/footer.tsx` (refactor)

- `<Logo size="md" showSubtitle />`
- Nav links row: GitHub, LinkedIn, Email — Lucide icons
- Built-with: `// built with Next.js · deployed on Vercel` — IBM Plex Mono, `--text-faint`, 10px

---

## 7. Three.js Scenes

### 7.1 HeroNetworkScene (`src/components/three/hero-network.tsx`)

Replaces `HeroVaporwave`. Lazy-loaded via `React.lazy` + `Suspense` (fallback: `bg-[--bg]`).

**Implementation:**
- 80–100 nodes: `THREE.SphereGeometry(0.08)`, distributed using a simple random 3D Gaussian spread (no external force library). Nodes repel slightly using a custom per-frame spring update (O(n) with spatial bucketing if needed).
- Node colors: randomly assigned from `[--accent-purple, --accent-cyan, --accent-green]` at 25–35% opacity
- Edges: `THREE.LineSegments` connecting nodes within distance threshold (~4 units), `--border` color
- Animation: slow Y rotation (0.0004 rad/frame), slow Z drift (0.0001)
- Mouse parallax: `useRef` tracking mouse position → shifts camera X/Y by ±0.5 units, eased with lerp (0.05)
- Mobile fallback: `useIsMobile()` hook (already exists) → render `null`, show CSS gradient background instead
- `prefers-reduced-motion`: skip rotation + parallax via `window.matchMedia('(prefers-reduced-motion: reduce)')`

**No new dependencies required.** All math done with Three.js built-ins.

### 7.3 ComponentTreeBg (`src/components/three/component-tree-bg.tsx`)

New component. Represents a React component tree as atmospheric background for the Frontend column.

**Visual concept:** A tree of nodes from top (root component) branching downward — like a React DevTools component tree. Nodes pulse softly. Active "render" propagates as a wave of brightness top-to-bottom.

**Implementation:**
- Tree structure: 1 root → 2–3 children → 4–6 grandchildren. ~10–15 nodes total.
- Nodes: `THREE.SphereGeometry(0.12)`, color `--accent-purple` at low opacity
- Edges: `THREE.Line` between parent → child
- Animation: every ~2s, a brightness pulse propagates down the tree (re-render simulation). Nodes briefly increase opacity when "rendering".
- Layout: tree spread in 2D plane (Z=0), camera faces it straight on
- Canvas fills parent column, `opacity: 0.08` on materials
- Static on `prefers-reduced-motion`

---

### 7.4 NestConsoleBg (`src/components/three/nest-console-bg.tsx`)

New component. Simulates a NestJS bootstrap console initializing — as atmospheric background for the Backend column.

**Visual concept:** Not a 3D scene in the traditional sense — instead a `<Canvas>` renders a `THREE.PlaneGeometry` as a "screen" surface, with a scrolling texture of NestJS-style log lines drawn onto it via `THREE.CanvasTexture`. This creates a subtle 3D terminal-on-a-plane effect with slight perspective tilt.

**Log lines content (looping, fictional but realistic):**
```
[NestFactory] Starting Nest application...
[InstanceLoader] AppModule dependencies initialized
[RoutesResolver] AppController {/}: +2ms
[RouterExplorer] Mapped {/health, GET}
[RouterExplorer] Mapped {/api/users, GET}
[RouterExplorer] Mapped {/api/auth/login, POST}
[NestApplication] Nest application successfully started
```

**Implementation:**
- `THREE.PlaneGeometry` tilted ~15° on X axis (slight perspective)
- Texture: 2D canvas element updated each frame, drawing monospace text lines in `--accent-cyan` at low opacity, scrolling upward slowly
- Material: `THREE.MeshBasicMaterial({ map: canvasTexture, transparent: true, opacity: 0.07 })`
- Text color: `#00D4FF` (accent-cyan) at 60% alpha on transparent canvas
- New lines appear at bottom and scroll upward, looping continuously
- Static on `prefers-reduced-motion`

---

New component. CI/CD pipeline visualization as atmospheric background for Infra/DevOps column.

**Implementation:**
- 4 boxes: build → test → deploy → prod, rendered as `THREE.BoxGeometry` wireframes
- Connecting lines animate a "pulse" traveling along them (a small sphere moving along the edge)
- Canvas: `width="100%" height="100%"` — fills parent container. Parent must be `position: relative` with defined height (inherit from column height).
- Opacity: ~8% overall via scene background alpha or material `transparent: true, opacity: 0.08`
- Static on `prefers-reduced-motion`

---

## 8. Magic UI Components — Installation

**Step 0 (before any component work):** Install all five components:

```bash
npx shadcn@latest add "https://magicui.design/r/interactive-hover-button"
npx shadcn@latest add "https://magicui.design/r/text-animate"
npx shadcn@latest add "https://magicui.design/r/typing-animation"
npx shadcn@latest add "https://magicui.design/r/number-ticker"
npx shadcn@latest add "https://magicui.design/r/hyper-text"
```

Files land in `src/components/magicui/`.

| Component | Usage |
|---|---|
| `TypingAnimation` | Hero: loop through role strings |
| `HyperText` | Header nav links — scramble on hover |
| `TextAnimate` (`blurInUp by="word"`) | All section titles on scroll-enter |
| `InteractiveHoverButton` | All CTAs (hero, projects, contact) |
| `NumberTicker` | Metrics section numeric values |

---

## 9. Implementation Order

Each step is independently testable before moving to the next.

| Step | Task | Files |
|---|---|---|
| 0 | Install Magic UI components | bash only |
| 1 | Type system changes | `user.d.ts` |
| 2 | Data layer changes | `resume.tsx` |
| 3 | `globals.css` — new tokens, font vars, remove vaporwave | `globals.css` |
| 4 | `layout.tsx` — IBM Plex via `next/font`, remove Geist, remove `ParticleBackground` import | `layout.tsx` |
| 5 | `Logo.tsx` — new component | `src/components/logo.tsx` |
| 6 | `Header` — Logo, HyperText nav, mobile drawer | `header.tsx` |
| 7 | `Hero` — new layout, `HeroNetworkScene` Three.js | `hero.tsx`, `hero-network.tsx` |
| 8 | `Skills` — new section, 3× Three.js column bgs, work accordion | `skills.tsx`, `component-tree-bg.tsx`, `nest-console-bg.tsx`, `pipeline-bg.tsx` |
| 9 | `Projects` — refactor with filter tabs | `projects.tsx` |
| 10 | `Metrics` — new section | `metrics.tsx` |
| 11 | `Services` — refactor | `services.tsx` |
| 12 | `Reviews` — refactor | `reviews.tsx` |
| 13 | `Footer` — Logo swap | `footer.tsx` |
| 14 | Cleanup — delete old files, verify build | see below |

**Cleanup (step 14) — files to delete:**
- `src/components/three/hero-vaporwave.tsx`
- `src/components/three/hero-wave.tsx`
- `src/components/three/hero-scene.tsx`
- `src/components/three/particle-background.tsx`
- `src/components/three/particle-background-lazy.tsx`
- `src/components/section/about.tsx`
- `src/components/ui/blur-fade.tsx` (after replacing all usages with `useBlurFade` hook)

Remove `ParticleBackground` import from `layout.tsx` in step 4, before deleting the file in step 14.

---

## 10. Pre-delivery Checklist

- [ ] `prefers-reduced-motion` respected in all Three.js scenes and scroll animations
- [ ] Both Three.js scenes have mobile fallback (`useIsMobile`)
- [ ] `cursor-pointer` on all clickable elements
- [ ] IBM Plex fonts loading via `next/font` — no FOUT, no raw @import
- [ ] `--font-mono` remapped to IBM Plex Mono
- [ ] Language toggle works in all new sections; all new strings in both DATA_EN and DATA_PT
- [ ] `/project/[slug]` pages render correctly (smoke test)
- [ ] `user.d.ts` types match all new data fields
- [ ] `NumberTicker` receives `number`, not string; `isInfinity` metrics render `∞`
- [ ] Mobile nav drawer opens/closes correctly at 375px
- [ ] No emoji icons (Lucide only)
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Color contrast ≥ 4.5:1 on all text
- [ ] Focus states visible for keyboard navigation
- [ ] Build passes with zero TypeScript errors after cleanup
