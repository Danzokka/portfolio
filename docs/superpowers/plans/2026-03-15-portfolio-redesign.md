# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Incrementally refactor the portfolio from vaporwave aesthetic to a dark terminal/GitHub aesthetic with Danzokka brand identity, Three.js skill column backgrounds, and Magic UI components.

**Architecture:** Refactor component-by-component (18 tasks across 4 chunks), preserving the existing i18n context, `resume.tsx` data layer, and `/project/[slug]` routing. Type system and data changes land first so all subsequent components compile. Three.js scenes are isolated components with mobile/reduced-motion fallbacks.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, React Three Fiber, shadcn/ui, Magic UI, IBM Plex (next/font), Motion (framer-motion)

**Spec:** `docs/superpowers/specs/2026-03-15-portfolio-redesign-design.md`

---

## Chunk 1: Foundation (Types, Data, Styles, Fonts)

---

### Task 1: Install Magic UI components

**Files:**
- Create: `src/components/magicui/interactive-hover-button.tsx`
- Create: `src/components/magicui/text-animate.tsx`
- Create: `src/components/magicui/typing-animation.tsx`
- Create: `src/components/magicui/number-ticker.tsx`
- Create: `src/components/magicui/hyper-text.tsx`

- [ ] **Step 1: Install all five components via shadcn CLI**

```bash
cd /home/danzokka/VSCode/pessoal/portfolio
npx shadcn@latest add "https://magicui.design/r/interactive-hover-button" --yes
npx shadcn@latest add "https://magicui.design/r/text-animate" --yes
npx shadcn@latest add "https://magicui.design/r/typing-animation" --yes
npx shadcn@latest add "https://magicui.design/r/number-ticker" --yes
npx shadcn@latest add "https://magicui.design/r/hyper-text" --yes
```

- [ ] **Step 2: Verify files exist**

```bash
ls src/components/magicui/
```

Expected output includes: `interactive-hover-button.tsx`, `text-animate.tsx`, `typing-animation.tsx`, `number-ticker.tsx`, `hyper-text.tsx`

- [ ] **Step 3: Inspect `TypingAnimation` prop API**

```bash
cat src/components/magicui/typing-animation.tsx | grep -A 20 "interface\|Props"
```

Note the actual prop names — specifically whether it accepts `words: string[]` and `loop: boolean` or `text: string`. Record this for use in Task 8 (Hero). If it only accepts a single `text` string, the Hero will use a custom wrapper that cycles through role strings.

- [ ] **Step 4: Verify project still compiles**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 5: Commit**

```bash
git add src/components/magicui/
git commit -m "feat: install magic ui components (hover-button, text-animate, typing, ticker, hyper-text)"
```

---

### Task 2: Update type system (`user.d.ts`)

**Files:**
- Modify: `src/types/user.d.ts`

- [ ] **Step 1: Read the current type file**

```bash
cat src/types/user.d.ts
```

- [ ] **Step 2: Add new fields to existing interfaces — do NOT remove existing fields unless specified**

Apply these additions and changes in `src/types/user.d.ts`:

```ts
// In Skill interface — ADD:
category: 'frontend' | 'backend' | 'devops'

// In Project interface — ADD (keep all existing fields):
slug: string                               // NEW — used by /project/[slug] route
category: 'frontend' | 'backend' | 'infra' // NEW

// In Hero interface — ADD (keep seeProjects and all existing fields):
tagline: string    // NEW
roles: string[]    // NEW
contact: string    // NEW

// In Navbar interface — ADD:
skills: string     // NEW
// Keep 'about' as optional if it exists to avoid breaking DATA_EN/PT until Task 3 removes it

// In SectionTitles interface (or wherever section label strings are typed) — ADD:
skills: string           // NEW
skillsFrontend: string   // NEW
skillsBackend: string    // NEW
skillsDevops: string     // NEW
projectsAll: string      // NEW
projectsFrontend: string // NEW
projectsBackend: string  // NEW
projectsInfra: string    // NEW
// Make 'about', 'aboutSubtitle', 'aboutDescription' optional (?: string) if they exist as required,
// since the About section is being removed

// Replace existing Metric interface entirely:
interface Metric {
  value: number        // was string
  suffix: string       // NEW
  label: string
  isInfinity?: boolean // NEW
}
```

- [ ] **Step 3: Verify type file compiles (will show errors in resume.tsx — expected)**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: errors pointing to `resume.tsx` missing new required fields. This confirms types are applied. No errors should reference `user.d.ts` itself.

- [ ] **Step 4: Commit type changes**

```bash
git add src/types/user.d.ts
git commit -m "feat: add slug, category, tagline, roles, metrics and i18n fields to type definitions"
```

---

### Task 3: Update data layer (`resume.tsx`)

**Files:**
- Modify: `src/data/resume.tsx`

- [ ] **Step 1: Read the current data file**

```bash
cat src/data/resume.tsx
```

- [ ] **Step 2: Add `slug` and `category` to every project in `DATA_EN.projects` and `DATA_PT.projects`**

`slug` should be a URL-safe string derived from the project title (e.g. `"api-gateway"`, `"ci-platform"`).
`category` should be `'frontend' | 'backend' | 'infra'` based on the project's primary technology.

- [ ] **Step 3: Add `category` to every skill in `COMMON_DATA.skills`**

Assign `category: 'frontend'` to: React, Next.js, TypeScript, Tailwind, HTML/CSS, and any UI-layer skills.
Assign `category: 'backend'` to: Node.js, NestJS, Go, PostgreSQL, Prisma, REST, GraphQL, and API-layer skills.
Assign `category: 'devops'` to: Docker, Kubernetes, AWS, CI/CD, GitHub Actions, Terraform, Linux, and infra skills.

- [ ] **Step 4: Add new hero fields to `DATA_EN.hero` and `DATA_PT.hero`**

Keep all existing hero fields. Add:

```ts
// DATA_EN.hero additions:
tagline: 'connecting systems',
contact: 'Contact',
roles: ['Fullstack Engineer', 'DevOps Engineer', 'Infrastructure'],

// DATA_PT.hero additions:
tagline: 'conectando sistemas',
contact: 'Contato',
roles: ['Engenheiro Fullstack', 'Engenheiro DevOps', 'Infraestrutura'],
```

- [ ] **Step 5: Add `skills` key to `DATA_EN.navbar` and `DATA_PT.navbar`**

```ts
// DATA_EN.navbar — ADD (keep existing keys):
skills: 'Skills',

// DATA_PT.navbar — ADD (keep existing keys):
skills: 'Habilidades',
```

- [ ] **Step 6: Add new section label strings to `DATA_EN.sectionTitles` and `DATA_PT.sectionTitles`**

Note: the field is `sectionTitles` in the existing codebase, not `sections`.

```ts
// DATA_EN.sectionTitles additions:
skills: 'Skills',
skillsFrontend: 'Frontend',
skillsBackend: 'Backend',
skillsDevops: 'Infra & DevOps',
projectsAll: 'All',
projectsFrontend: 'Frontend',
projectsBackend: 'Backend',
projectsInfra: 'Infra',

// DATA_PT.sectionTitles additions:
skills: 'Habilidades',
skillsFrontend: 'Frontend',
skillsBackend: 'Backend',
skillsDevops: 'Infra & DevOps',
projectsAll: 'Todos',
projectsFrontend: 'Frontend',
projectsBackend: 'Backend',
projectsInfra: 'Infra',
```

- [ ] **Step 7: Replace `metrics` arrays in `DATA_EN` and `DATA_PT`**

```ts
// DATA_EN.metrics:
metrics: [
  { value: 5,  suffix: '+', label: 'years experience' },
  { value: 30, suffix: '+', label: 'projects shipped' },
  { value: 10, suffix: '+', label: 'prod deployments' },
  { value: 0,  suffix: '',  label: 'coffee limit', isInfinity: true },
],

// DATA_PT.metrics:
metrics: [
  { value: 5,  suffix: '+', label: 'anos de experiência' },
  { value: 30, suffix: '+', label: 'projetos entregues' },
  { value: 10, suffix: '+', label: 'deploys em produção' },
  { value: 0,  suffix: '',  label: 'limite de café', isInfinity: true },
],
```

- [ ] **Step 8: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 9: Commit**

```bash
git add src/data/resume.tsx
git commit -m "feat: update resume data with slug, categories, roles, tagline, metrics and i18n keys"
```

---

### Task 4: Update `globals.css` and fonts in `layout.tsx`

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read both files**

```bash
cat src/app/layout.tsx
cat src/app/globals.css
```

- [ ] **Step 2: Update `layout.tsx` — add IBM Plex Mono, remove Geist Mono**

The current `layout.tsx` already imports `IBM_Plex_Sans`. Only add `IBM_Plex_Mono` and remove `Geist_Mono`. Do NOT re-add `IBM_Plex_Sans`. The result should be:

```tsx
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})
```

Apply both variables on `<html>` tag (not `<body>`):
```tsx
<html lang="pt-BR" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`}>
```

Remove `geistSans` and `geistMono` from the `className` if present.

- [ ] **Step 3: Remove `ParticleBackground` import and usage from `layout.tsx`**

Delete the `import ParticleBackground` line and the `<ParticleBackground />` JSX element.

- [ ] **Step 4: Update `globals.css` — new color tokens**

In `globals.css`, locate the existing CSS custom property block (`:root` or `.dark`). Add the new design tokens using names that do NOT conflict with Tailwind v4's `@theme inline` block:

```css
/* Design system tokens */
--bg: #080808;
--bg-surface: #0e0e10;
--ui-border: #1a1a1a;      /* Use --ui-border, NOT --border (conflicts with shadcn @theme) */
--text-primary: #F1F5F9;
--text-muted: #555555;
--text-faint: #2a2a2a;
--accent-purple: #6C63FF;
--accent-cyan: #00D4FF;
--accent-green: #00FF88;
```

Important: use `--ui-border` (not `--border`) to avoid collision with Tailwind v4's `@theme inline` `--color-border: var(--border)` mapping that shadcn components depend on.

Update all subsequent references in this plan from `var(--border)` to `var(--ui-border)`.

- [ ] **Step 5: Update body and font references in `globals.css`**

```css
body {
  font-family: var(--font-ibm-plex-sans), sans-serif;
  background-color: var(--bg);
  color: var(--text-primary);
}
```

Inside the `@theme inline` block (search for `@theme inline` in globals.css), change the mono font line:
```css
/* Find and change this line inside @theme inline: */
--font-mono: var(--font-geist-mono);
/* Replace with: */
--font-mono: var(--font-ibm-plex-mono);
```

- [ ] **Step 6: Keep shimmer/rainbow keyframes, remove vaporwave-only ones**

Preserve: `shimmer-slide`, `spin-around`, `rainbow`, `shine` keyframes.
Remove: any keyframes that reference old vaporwave colors and are not used by any remaining shadcn/ui component.

- [ ] **Step 7: Add hero scanlines class**

```css
.hero-scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 136, 0.015) 2px,
    rgba(0, 255, 136, 0.015) 4px
  );
  pointer-events: none;
  z-index: 1;
}
```

- [ ] **Step 8: Add blur-fade animation classes**

```css
.blur-fade-hidden {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(12px);
}

@media (prefers-reduced-motion: no-preference) {
  .blur-fade-hidden {
    transition: opacity 500ms ease-out, filter 500ms ease-out, transform 500ms ease-out;
  }
}

.blur-fade-hidden[data-visible="true"] {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
```

- [ ] **Step 9: Start dev server and verify no build errors**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: dark background renders, IBM Plex font loads, no console module errors.

- [ ] **Step 10: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: replace vaporwave tokens with dark terminal design system, swap Geist for IBM Plex"
```

---

## Chunk 2: Logo, Header, Hero

---

### Task 5: Create `Logo` component

**Files:**
- Create: `src/components/logo.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/logo.tsx
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showSubtitle?: boolean
  className?: string
}

const sizeConfig = {
  sm: { path: 'text-[9px]',  name: 'text-[18px]' },
  md: { path: 'text-[10px]', name: 'text-[22px]' },
  lg: { path: 'text-[12px]', name: 'text-[32px]' },
}

export function Logo({ size = 'sm', showSubtitle = false, className }: LogoProps) {
  const cfg = sizeConfig[size]

  return (
    <div className={cn('font-mono leading-none select-none', className)}>
      <div
        className={cn(cfg.path, 'tracking-[1px]')}
        style={{ color: 'var(--text-muted)' }}
      >
        ~/dev/
      </div>
      <div className={cn(cfg.name, 'flex items-baseline gap-0 mt-[3px]')}>
        <span className="font-bold" style={{ color: 'var(--accent-green)' }}>
          Danz
        </span>
        <span className="font-light" style={{ color: 'var(--text-primary)' }}>
          okka
        </span>
      </div>
      {showSubtitle && (
        <div
          className="text-[9px] tracking-[3px] uppercase mt-[5px]"
          style={{ color: 'var(--text-faint)' }}
        >
          Fullstack · DevOps
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 3: Commit**

```bash
git add src/components/logo.tsx
git commit -m "feat: add Danzokka logo component with terminal prefix style"
```

---

### Task 6: Refactor `Header`

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Read current header**

```bash
cat src/components/header.tsx
```

- [ ] **Step 2: Rewrite header**

```tsx
// src/components/header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { HyperText } from '@/components/magicui/hyper-text'
import { useLanguage } from '@/contexts/language-context'

export function Header() {
  const { data, language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = [
    { label: data.navbar.skills,   href: '#skills'   },
    { label: data.navbar.projects, href: '#projects' },
    { label: data.navbar.services, href: '#services' },
    { label: data.navbar.contact,  href: '#contact'  },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-sm border-b'
          : 'bg-transparent'
      )}
      style={scrolled ? {
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        borderColor: 'var(--ui-border)',
      } : {}}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" aria-label="Danzokka home">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>
              <HyperText
                className="text-[13px] cursor-pointer"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                animateOnHover
                duration={600}
              >
                {item.label}
              </HyperText>
            </Link>
          ))}
          {/* Language toggle — keep existing implementation, update border/bg to use --ui-border and --accent-purple tokens */}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer p-1"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col p-8 backdrop-blur-md"
          style={{ background: 'color-mix(in srgb, var(--bg) 95%, transparent)' }}
        >
          <button
            className="self-end cursor-pointer mb-12 p-1"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
          <nav className="flex flex-col gap-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-mono"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Language toggle — paste existing language toggle JSX here */}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Verify compiles**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 4: Check mobile nav at 375px**

```bash
npm run dev
```

Open DevTools → 375px. Hamburger visible. Tap → drawer opens. X closes it.

- [ ] **Step 5: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: refactor header with Logo, HyperText nav, mobile drawer"
```

---

### Task 7: Create `HeroNetworkScene` (Three.js)

**Files:**
- Create: `src/components/three/hero-network.tsx`
- Create: `src/components/three/hero-network-lazy.tsx`

- [ ] **Step 1: Create the Three.js network scene**

```tsx
// src/components/three/hero-network.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 90
const CONNECTION_DISTANCE = 4
const COLORS = ['#6C63FF', '#00D4FF', '#00FF88']

function NetworkMesh({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const cameraTargetRef = useRef({ x: 0, y: 0 })

  const { positions, colors, linePositions } = useMemo(() => {
    const positions: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8
        )
      )
    }
    const colors = positions.map(() => COLORS[Math.floor(Math.random() * COLORS.length)])
    const linePositions: number[] = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < CONNECTION_DISTANCE) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          )
        }
      }
    }
    return { positions, colors, linePositions }
  }, [])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    return geo
  }, [linePositions])

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y += 0.0004 * delta * 60
    cameraTargetRef.current.x += (mouseRef.current.x * 0.5 - cameraTargetRef.current.x) * 0.05
    cameraTargetRef.current.y += (mouseRef.current.y * 0.5 - cameraTargetRef.current.y) * 0.05
    groupRef.current.position.x = cameraTargetRef.current.x
    groupRef.current.position.y = cameraTargetRef.current.y
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={colors[i]} transparent opacity={0.3} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#1a1a1a" transparent opacity={0.4} />
      </lineSegments>
    </group>
  )
}

export function HeroNetworkScene() {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NetworkMesh mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: Create lazy wrapper**

```tsx
// src/components/three/hero-network-lazy.tsx
'use client'
import dynamic from 'next/dynamic'

export const HeroNetworkScene = dynamic(
  () => import('./hero-network').then(m => ({ default: m.HeroNetworkScene })),
  { ssr: false }
)
```

- [ ] **Step 3: Verify compiles**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 4: Commit**

```bash
git add src/components/three/hero-network.tsx src/components/three/hero-network-lazy.tsx
git commit -m "feat: add hero network topology Three.js scene with mouse parallax"
```

---

### Task 8: Refactor `Hero` section

**Files:**
- Modify: `src/components/section/hero.tsx`

- [ ] **Step 1: Read current hero and check `TypingAnimation` API from Task 1 Step 3**

```bash
cat src/components/section/hero.tsx
cat src/components/magicui/typing-animation.tsx | head -60
```

- [ ] **Step 2: Determine role animation approach**

If `TypingAnimation` accepts `words: string[]` and `loop: boolean` — use it directly.

If it only accepts a single `text: string` — create a thin wrapper at `src/components/magicui/typing-animation-loop.tsx`:

```tsx
// src/components/magicui/typing-animation-loop.tsx
'use client'
import { useState, useEffect } from 'react'
import { TypingAnimation } from './typing-animation'

interface TypingLoopProps {
  words: string[]
  className?: string
  style?: React.CSSProperties
}

export function TypingLoop({ words, className, style }: TypingLoopProps) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, 2800)
    return () => clearTimeout(timer)
  }, [index, words.length])

  return (
    <span className={className} style={{ ...style, transition: 'opacity 0.3s', opacity: visible ? 1 : 0 }}>
      <TypingAnimation text={words[index]} duration={80} />
    </span>
  )
}
```

Use whichever approach matches the actual installed API.

- [ ] **Step 3: Rewrite hero**

```tsx
// src/components/section/hero.tsx
'use client'

import { useLanguage } from '@/contexts/language-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { HeroNetworkScene } from '@/components/three/hero-network-lazy'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
// Use TypingAnimation or TypingLoop based on Step 2 above:
import { TypingAnimation } from '@/components/magicui/typing-animation'

export function Hero() {
  const { data } = useLanguage()
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      className="relative h-screen w-screen overflow-hidden flex items-end hero-scanlines"
      style={{ background: 'var(--bg)' }}
    >
      {/* Three.js background — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <HeroNetworkScene />
        </div>
      )}

      {/* Mobile gradient fallback */}
      {isMobile && (
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, #0d0820 0%, #080808 70%)' }}
        />
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 pb-24 md:pb-32 max-w-4xl">
        <p
          className="font-mono text-[11px] tracking-[3px] uppercase mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          // Fullstack Engineer
        </p>

        <h1
          className="font-mono font-bold leading-none tracking-[-0.04em]"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          RAFAEL DANTAS
        </h1>

        <div className="w-16 h-[2px] mt-4 mb-5" style={{ background: 'var(--accent-green)' }} />

        {/* Role typing animation — use words[] API or TypingLoop wrapper per Step 2 */}
        <TypingAnimation
          words={data.hero.roles}
          className="font-mono"
          style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}
          loop
          typeSpeed={80}
          deleteSpeed={40}
          pauseDelay={2000}
          startOnView={false}
        />

        <p
          className="font-mono text-[11px] tracking-[4px] uppercase mt-8 mb-10"
          style={{ color: 'var(--text-faint)' }}
        >
          {data.hero.tagline}
        </p>

        <div className="flex flex-wrap gap-4">
          <InteractiveHoverButton
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {data.hero.seeProjects}
          </InteractiveHoverButton>
          <InteractiveHoverButton
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {data.hero.contact}
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify compiles**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Verify: network scene on desktop, gradient on mobile, typing animation cycles roles, both CTA buttons render.

- [ ] **Step 6: Commit**

```bash
git add src/components/section/hero.tsx
git commit -m "feat: refactor hero with network Three.js scene, typing animation and new layout"
```

---

## Chunk 3: Skills Section + Three.js Column Backgrounds

---

### Task 9: Create `useBlurFade` hook

**Files:**
- Create: `src/hooks/use-blur-fade.ts`

- [ ] **Step 1: Create the hook**

```ts
// src/hooks/use-blur-fade.ts
import { useEffect, useRef } from 'react'

export function useBlurFade(delay = 0) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.setAttribute('data-visible', 'true')
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-blur-fade.ts
git commit -m "feat: add useBlurFade hook for scroll-triggered blur-fade animations"
```

---

### Task 10: Create `ComponentTreeBg` (Frontend Three.js background)

**Files:**
- Create: `src/components/three/component-tree-bg.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/three/component-tree-bg.tsx
'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODES = [
  { id: 0, x: 0,    y: 3    },
  { id: 1, x: -3,   y: 1    },
  { id: 2, x: 3,    y: 1    },
  { id: 3, x: -4.5, y: -1   },
  { id: 4, x: -1.5, y: -1   },
  { id: 5, x: 1.5,  y: -1   },
  { id: 6, x: 4.5,  y: -1   },
  { id: 7, x: -5,   y: -3   },
  { id: 8, x: -3,   y: -3   },
  { id: 9, x: -1,   y: -3   },
  { id: 10, x: 1,   y: -3   },
  { id: 11, x: 3,   y: -3   },
  { id: 12, x: 5,   y: -3   },
]

const EDGES = [
  [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],
  [3,7],[3,8],[4,9],[5,10],[6,11],[6,12],
]

function TreeMesh() {
  const opacitiesRef = useRef<number[]>(NODES.map(() => 0.08))
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const lineGeometry = useMemo(() => {
    const pts: number[] = []
    EDGES.forEach(([a, b]) => {
      pts.push(NODES[a].x, NODES[a].y, 0, NODES[b].x, NODES[b].y, 0)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const levels = [[0],[1,2],[3,4,5,6],[7,8,9,10,11,12]]
    const pulse = () => {
      levels.forEach((level, i) => {
        setTimeout(() => {
          level.forEach(nodeId => {
            opacitiesRef.current[nodeId] = 0.5
            setTimeout(() => { opacitiesRef.current[nodeId] = 0.12 }, 400)
          })
        }, i * 180)
      })
    }
    pulse()
    const interval = setInterval(pulse, 2500)
    return () => clearInterval(interval)
  }, [reducedMotion])

  useFrame(() => {
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity += (opacitiesRef.current[i] - mat.opacity) * 0.1
    })
  })

  return (
    <group>
      {NODES.map((node, i) => (
        <mesh key={i} ref={el => { meshRefs.current[i] = el }} position={[node.x, node.y, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#6C63FF" transparent opacity={0.08} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#6C63FF" transparent opacity={0.07} />
      </lineSegments>
    </group>
  )
}

export function ComponentTreeBg() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <TreeMesh />
    </Canvas>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/three/component-tree-bg.tsx
git commit -m "feat: add ComponentTreeBg Three.js scene for frontend skills column"
```

---

### Task 11: Create `NestConsoleBg` (Backend Three.js background)

**Files:**
- Create: `src/components/three/nest-console-bg.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/three/nest-console-bg.tsx
'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const LOG_LINES = [
  '[NestFactory] Starting Nest application...',
  '[InstanceLoader] AppModule dependencies initialized +2ms',
  '[RoutesResolver] AppController {/}: +1ms',
  '[RouterExplorer] Mapped {/health, GET} route',
  '[RouterExplorer] Mapped {/api/users, GET} route',
  '[RouterExplorer] Mapped {/api/auth/login, POST} route',
  '[RouterExplorer] Mapped {/api/projects, GET} route',
  '[RouterExplorer] Mapped {/api/projects/:id, PUT} route',
  '[NestApplication] Nest application started on port 3000',
  '',
]

const LINE_HEIGHT = 22

function ConsolePlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)
  const scrollRef = useRef(0)

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    canvasRef.current = canvas
    const tex = new THREE.CanvasTexture(canvas)
    textureRef.current = tex
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.map = tex
      mat.needsUpdate = true
    }
  }, [])

  useFrame((_, delta) => {
    if (!canvasRef.current || !textureRef.current) return
    if (!reducedMotion) scrollRef.current += delta * 18

    const ctx = canvasRef.current.getContext('2d')!
    ctx.clearRect(0, 0, 512, 512)
    ctx.font = '13px monospace'

    const totalHeight = LOG_LINES.length * LINE_HEIGHT
    const scroll = scrollRef.current % totalHeight

    LOG_LINES.forEach((line, i) => {
      let y = i * LINE_HEIGHT - scroll + 512
      y = ((y % totalHeight) + totalHeight) % totalHeight

      if (line.startsWith('[NestApplication]')) {
        ctx.fillStyle = 'rgba(0, 255, 136, 0.6)'
      } else if (line.startsWith('[RouterExplorer]')) {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.6)'
      } else {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.4)'
      }
      ctx.fillText(line, 8, y)
    })

    textureRef.current.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} rotation={[-0.25, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial transparent opacity={0.07} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function NestConsoleBg() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ConsolePlane />
    </Canvas>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/three/nest-console-bg.tsx
git commit -m "feat: add NestConsoleBg Three.js scene for backend skills column"
```

---

### Task 12: Create `PipelineBg` (Infra Three.js background)

**Files:**
- Create: `src/components/three/pipeline-bg.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/three/pipeline-bg.tsx
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAGES = [
  { x: -4.5 },  // build
  { x: -1.5 },  // test
  { x:  1.5 },  // deploy
  { x:  4.5 },  // prod
]

function PipelineMesh() {
  const pulseProgress = useRef(0)
  const pulseRef3D = useRef<THREE.Mesh>(null)

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const edgeGeometry = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < STAGES.length - 1; i++) {
      pts.push(STAGES[i].x + 1, 0, 0, STAGES[i + 1].x - 1, 0, 0)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    if (reducedMotion || !pulseRef3D.current) return
    pulseProgress.current = (pulseProgress.current + delta * 0.3) % 1
    pulseRef3D.current.position.x = -3 + pulseProgress.current * 6
  })

  return (
    <group>
      {STAGES.map((stage, i) => (
        <mesh key={i} position={[stage.x, 0, 0]}>
          <boxGeometry args={[1.8, 0.9, 0.1]} />
          <meshBasicMaterial color="#00FF88" transparent opacity={0.07} wireframe />
        </mesh>
      ))}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#00FF88" transparent opacity={0.05} />
      </lineSegments>
      <mesh ref={pulseRef3D} position={[-3, 0, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export function PipelineBg() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <PipelineMesh />
    </Canvas>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/three/pipeline-bg.tsx
git commit -m "feat: add PipelineBg Three.js scene for infra/devops skills column"
```

---

### Task 13: Create `SkillColumn` sub-component and `Skills` section

**Files:**
- Create: `src/components/section/skills.tsx`

The `SkillColumn` sub-component is defined inside `skills.tsx`. It calls `useBlurFade` at its own top level — not inside a `.map()` — satisfying React's Rules of Hooks.

- [ ] **Step 1: Create the skills section**

```tsx
// src/components/section/skills.tsx
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { useBlurFade } from '@/hooks/use-blur-fade'
import { TextAnimate } from '@/components/magicui/text-animate'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Skill, Project } from '@/types/user'

const ComponentTreeBg = dynamic(
  () => import('@/components/three/component-tree-bg').then(m => ({ default: m.ComponentTreeBg })),
  { ssr: false }
)
const NestConsoleBg = dynamic(
  () => import('@/components/three/nest-console-bg').then(m => ({ default: m.NestConsoleBg })),
  { ssr: false }
)
const PipelineBg = dynamic(
  () => import('@/components/three/pipeline-bg').then(m => ({ default: m.PipelineBg })),
  { ssr: false }
)

type ColumnKey = 'frontend' | 'backend' | 'devops'

interface SkillColumnProps {
  columnKey: ColumnKey
  label: string
  accent: string
  skills: Skill[]
  relatedProjects: Project[]
  delay: number
  isMobile: boolean
  Bg: React.ComponentType
}

// Sub-component so useBlurFade is called at top level (not inside map)
function SkillColumn({ columnKey, label, accent, skills, relatedProjects, delay, isMobile, Bg }: SkillColumnProps) {
  const ref = useBlurFade(delay)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="blur-fade-hidden relative overflow-hidden px-0 md:px-8 py-10 first:pl-0 last:pr-0"
      style={{ minHeight: '400px' }}
    >
      {/* Three.js bg — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Bg />
        </div>
      )}

      <div className="relative z-10">
        {/* Column label */}
        <p className="font-mono text-[11px] tracking-[3px] uppercase mb-4" style={{ color: accent }}>
          ● {label}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map(skill => (
            <span
              key={skill.name}
              className="font-mono text-[11px] px-2 py-1 rounded border"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--ui-border)', color: 'var(--text-muted)' }}
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mb-6">
            <p className="font-sans text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
              → Related projects
            </p>
            <div className="flex flex-col gap-2">
              {relatedProjects.map(project => (
                <Link
                  key={project.slug}
                  href={`/project/${project.slug}`}
                  className="flex items-center justify-between p-3 rounded border cursor-pointer transition-colors duration-200"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--ui-border)' }}
                >
                  <span className="font-sans text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </span>
                  <span className="font-mono text-xs" style={{ color: accent }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const COLUMN_CONFIG: Array<{
  key: ColumnKey
  labelKey: 'skillsFrontend' | 'skillsBackend' | 'skillsDevops'
  accent: string
  Bg: React.ComponentType
  projectCat: 'frontend' | 'backend' | 'infra'
}> = [
  { key: 'frontend', labelKey: 'skillsFrontend', accent: 'var(--accent-purple)', Bg: ComponentTreeBg, projectCat: 'frontend' },
  { key: 'backend',  labelKey: 'skillsBackend',  accent: 'var(--accent-cyan)',   Bg: NestConsoleBg,   projectCat: 'backend'  },
  { key: 'devops',   labelKey: 'skillsDevops',   accent: 'var(--accent-green)',  Bg: PipelineBg,      projectCat: 'infra'    },
]

export function Skills() {
  const { data } = useLanguage()
  const isMobile = useIsMobile()
  const titleRef = useBlurFade(0)

  const skillsByCategory = {
    frontend: (data.skills ?? []).filter(s => s.category === 'frontend'),
    backend:  (data.skills ?? []).filter(s => s.category === 'backend'),
    devops:   (data.skills ?? []).filter(s => s.category === 'devops'),
  }

  const projectsByCategory = {
    frontend: (data.projects ?? []).filter(p => p.category === 'frontend').slice(0, 2),
    backend:  (data.projects ?? []).filter(p => p.category === 'backend').slice(0, 2),
    infra:    (data.projects ?? []).filter(p => p.category === 'infra').slice(0, 2),
  }

  return (
    <section id="skills" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section header */}
      <div
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className="blur-fade-hidden mb-16"
      >
        <p className="font-mono text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
          // 02 — {data.sectionTitles?.skills ?? 'Skills'}
        </p>
        <TextAnimate animation="blurInUp" by="word" className="text-3xl font-sans font-semibold" style={{ color: 'var(--text-primary)' }}>
          {data.sectionTitles?.skills ?? 'Skills'}
        </TextAnimate>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--ui-border)' }}>
        {COLUMN_CONFIG.map((col, i) => (
          <SkillColumn
            key={col.key}
            columnKey={col.key}
            label={data.sectionTitles?.[col.labelKey] ?? col.key}
            accent={col.accent}
            skills={skillsByCategory[col.key]}
            relatedProjects={projectsByCategory[col.projectCat]}
            delay={i * 100}
            isMobile={isMobile}
            Bg={col.Bg}
          />
        ))}
      </div>

      {/* Work history accordion — full width, below columns */}
      {data.work && data.work.length > 0 && (
        <div className="mt-16 border-t pt-12" style={{ borderColor: 'var(--ui-border)' }}>
          <p className="font-mono text-[11px] tracking-[3px] uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
            // Work history
          </p>
          <Accordion type="single" collapsible className="w-full">
            {data.work.map((job, i) => (
              <AccordionItem key={i} value={`job-${i}`} style={{ borderColor: 'var(--ui-border)' }}>
                <AccordionTrigger className="font-sans hover:no-underline" style={{ color: 'var(--text-primary)' }}>
                  <span className="flex flex-wrap gap-2 text-left">
                    <span className="font-semibold">{job.company}</span>
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    <span style={{ color: 'var(--text-muted)' }}>{job.title}</span>
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>{job.start} – {job.end ?? 'Present'}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="font-sans" style={{ color: 'var(--text-muted)' }}>
                  {job.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </section>
  )
}
```

Note: adjust `job.company`, `job.title`, `job.start`, `job.end`, `job.description` to match the actual field names in the `Work` type from `user.d.ts`.

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Visual check at 375px and 1440px**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/components/section/skills.tsx
git commit -m "feat: add Skills section with three column Three.js bgs and work accordion"
```

---

## Chunk 4: Projects, Metrics, Services, Reviews, Footer, Cleanup

---

### Task 14: Create `ProjectCard` sub-component and refactor `Projects` section

**Files:**
- Modify: `src/components/section/projects.tsx`

`ProjectCard` is defined inside `projects.tsx` and calls `useBlurFade` at its own top level.

- [ ] **Step 1: Read current projects component**

```bash
cat src/components/section/projects.tsx
```

- [ ] **Step 2: Rewrite projects section**

```tsx
// src/components/section/projects.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useBlurFade } from '@/hooks/use-blur-fade'
import { TextAnimate } from '@/components/magicui/text-animate'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import type { Project } from '@/types/user'

type Filter = 'all' | 'frontend' | 'backend' | 'infra'

const ACCENT: Record<string, string> = {
  frontend: 'var(--accent-purple)',
  backend:  'var(--accent-cyan)',
  infra:    'var(--accent-green)',
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useBlurFade(delay)
  const accent = ACCENT[project.category] ?? 'var(--accent-purple)'

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="blur-fade-hidden rounded border flex flex-col gap-3 p-5 transition-colors duration-200"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--ui-border)' }}
    >
      <span className="font-mono text-[10px] tracking-[2px] uppercase" style={{ color: accent }}>
        {project.category}
      </span>
      <h3 className="font-sans font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
        {project.title}
      </h3>
      <p className="font-sans text-sm line-clamp-2 flex-1" style={{ color: 'var(--text-muted)' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map(skill => (
          <span
            key={skill.name}
            className="font-mono text-[10px] px-2 py-0.5 rounded border"
            style={{ background: 'var(--bg)', borderColor: 'var(--ui-border)', color: 'var(--text-muted)' }}
          >
            {skill.name}
          </span>
        ))}
      </div>
      <Link href={`/project/${project.slug}`}>
        <InteractiveHoverButton className="w-full text-sm">
          View project →
        </InteractiveHoverButton>
      </Link>
    </div>
  )
}

export function Projects() {
  const { data } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const titleRef = useBlurFade(0)

  const st = data.sectionTitles
  const filterTabs: Array<{ key: Filter; label: string }> = [
    { key: 'all',      label: st?.projectsAll      ?? 'All'      },
    { key: 'frontend', label: st?.projectsFrontend ?? 'Frontend' },
    { key: 'backend',  label: st?.projectsBackend  ?? 'Backend'  },
    { key: 'infra',    label: st?.projectsInfra    ?? 'Infra'    },
  ]

  const filtered = (data.projects ?? []).filter(p =>
    filter === 'all' ? true : p.category === filter
  )

  return (
    <section id="projects" className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
      <div ref={titleRef as React.RefObject<HTMLDivElement>} className="blur-fade-hidden mb-12">
        <p className="font-mono text-[11px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
          // 03 — {st?.projects ?? 'Projects'}
        </p>
        <TextAnimate animation="blurInUp" by="word" className="text-3xl font-sans font-semibold" style={{ color: 'var(--text-primary)' }}>
          {st?.projects ?? 'Projects'}
        </TextAnimate>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filterTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className="font-mono text-[11px] px-3 py-1.5 rounded border cursor-pointer transition-colors duration-200"
            style={{
              background: filter === tab.key ? 'var(--accent-purple)' : 'var(--bg-surface)',
              borderColor: filter === tab.key ? 'var(--accent-purple)' : 'var(--ui-border)',
              color: filter === tab.key ? '#fff' : 'var(--text-muted)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test filter tabs in browser**

```bash
npm run dev
```

Click each filter tab. Verify grid updates to show only matching projects.

- [ ] **Step 5: Commit**

```bash
git add src/components/section/projects.tsx
git commit -m "feat: refactor projects with filter tabs, ProjectCard sub-component, blur-fade"
```

---

### Task 15: Create `Metrics` section

**Files:**
- Create: `src/components/section/metrics.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/section/metrics.tsx
'use client'

import { useLanguage } from '@/contexts/language-context'
import { useBlurFade } from '@/hooks/use-blur-fade'
import { NumberTicker } from '@/components/magicui/number-ticker'

export function Metrics() {
  const { data } = useLanguage()
  const ref = useBlurFade(0)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="blur-fade-hidden py-20 border-y"
      style={{ borderColor: 'var(--ui-border)' }}
    >
      <div className="max-w-4xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {(data.metrics ?? []).map((metric, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="font-mono font-bold leading-none" style={{ color: 'var(--text-primary)', fontSize: '3rem' }}>
              {metric.isInfinity ? (
                <span>∞</span>
              ) : (
                <>
                  <NumberTicker value={metric.value} />
                  <span>{metric.suffix}</span>
                </>
              )}
            </div>
            <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/section/metrics.tsx
git commit -m "feat: add Metrics section with NumberTicker"
```

---

### Task 16: Refactor `Services` section

**Files:**
- Modify: `src/components/section/services.tsx`

- [ ] **Step 1: Read current services**

```bash
cat src/components/section/services.tsx
```

- [ ] **Step 2: Apply new style**

Create a `ServiceCard` sub-component (for `useBlurFade`) inside the file. Key changes:

- Add section label + `TextAnimate` title
- Each card: `bg-[--bg-surface] border-[--ui-border]` with `border-t-2` accent cycling through `['var(--accent-purple)', 'var(--accent-cyan)', 'var(--accent-green)'][i % 3]`
- Lucide icon + IBM Plex Sans title/description
- Remove any old `BlurFade` import — use `useBlurFade` instead

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/components/section/services.tsx
git commit -m "feat: refactor services with dark card style, accent border-top and blur-fade"
```

---

### Task 17: Refactor `Reviews` section

**Files:**
- Modify: `src/components/section/reviews.tsx`

- [ ] **Step 1: Read current reviews**

```bash
cat src/components/section/reviews.tsx
```

- [ ] **Step 2: Apply terminal quote style**

Create a `ReviewCard` sub-component inside the file. Key changes:

- Section label + `TextAnimate` title
- Card: `bg-[--bg-surface] border-[--ui-border]`
- Quote: `<span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>//</span>` prefix + quote text in IBM Plex Sans
- Author: `font-mono text-xs --text-muted`
- Stars: Lucide `Star` (filled), `--accent-green`
- Remove any old `BlurFade` import

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add src/components/section/reviews.tsx
git commit -m "feat: refactor reviews with terminal quote style and blur-fade"
```

---

### Task 18: Refactor `Footer` and wire sections in `page.tsx`

**Files:**
- Modify: `src/components/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Refactor footer**

```bash
cat src/components/footer.tsx
```

Replace existing logo with `<Logo size="md" showSubtitle />`. Add built-with line:
```tsx
<p className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
  // built with Next.js · deployed on Vercel
</p>
```
Social links with Lucide `Github`, `Linkedin`, `Mail` icons — `--text-muted`, hover `--text-primary`.

- [ ] **Step 2: Update `page.tsx` — add Skills and Metrics, remove About**

```tsx
// src/app/page.tsx
import { Hero } from '@/components/section/hero'
import { Skills } from '@/components/section/skills'
import { Projects } from '@/components/section/projects'
import { Metrics } from '@/components/section/metrics'
import { Services } from '@/components/section/services'
import { Reviews } from '@/components/section/reviews'

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Metrics />
      <Services />
      <Reviews />
    </main>
  )
}
```

Remove `About` import entirely.

- [ ] **Step 3: Verify compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit footer and page**

```bash
git add src/components/footer.tsx src/app/page.tsx
git commit -m "feat: refactor footer with Danzokka logo, wire all sections in page.tsx"
```

---

### Task 19: Cleanup — delete obsolete files

**Files to delete:**
- `src/components/three/hero-vaporwave.tsx`
- `src/components/three/hero-wave.tsx`
- `src/components/three/hero-scene.tsx`
- `src/components/three/particle-background.tsx`
- `src/components/three/particle-background-lazy.tsx`
- `src/components/section/about.tsx`
- `src/components/ui/blur-fade.tsx`

- [ ] **Step 1: Check for remaining references to files being deleted**

```bash
grep -r "hero-vaporwave\|hero-wave\|hero-scene\|particle-background\|blur-fade\|about" \
  src/ --include="*.tsx" --include="*.ts" -l
```

Expected: only `src/hooks/use-blur-fade.ts` should match `blur-fade`. No other files should match. If any do, fix those imports first.

- [ ] **Step 2: Delete old files**

```bash
rm src/components/three/hero-vaporwave.tsx
rm src/components/three/hero-wave.tsx
rm src/components/three/hero-scene.tsx
rm src/components/three/particle-background.tsx
rm src/components/three/particle-background-lazy.tsx
rm src/components/section/about.tsx
rm src/components/ui/blur-fade.tsx
```

- [ ] **Step 3: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors

- [ ] **Step 4: Production build check**

```bash
npm run build
```

Expected: successful build, zero errors or warnings about missing modules

- [ ] **Step 5: Final visual check — all sections**

```bash
npm run dev
```

Check at **375px**, **768px**, **1440px**:
- Header: Logo renders, HyperText scrambles on hover, mobile drawer opens/closes
- Hero: network scene (desktop) / gradient (mobile), typing animation cycles, CTAs work
- Skills: 3 columns with animated Three.js bgs, badges, related project links, work accordion
- Projects: filter tabs work, all 4 filters reduce grid correctly
- Metrics: NumberTicker animates when scrolled into view, ∞ renders for coffee
- Services: accent top-border cards, blur-fade on scroll
- Reviews: `//` prefix quote style, stars render
- Footer: Danzokka logo with subtitle visible
- Language toggle: switch PT ↔ EN, all sections update

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: delete obsolete vaporwave, particle and about components"
```

---

## Pre-delivery Checklist

Before marking complete:

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run build` — successful
- [ ] `prefers-reduced-motion` tested: Three.js scenes static, blur-fade instant
- [ ] Language toggle works on all sections (EN ↔ PT)
- [ ] `/project/[slug]` pages render correctly (smoke test two projects)
- [ ] Mobile drawer at 375px opens and closes
- [ ] All Three.js scenes have mobile fallback (verify on 375px)
- [ ] No emoji icons used (Lucide only)
- [ ] Color contrast on `--text-primary` vs `--bg`: check with browser DevTools accessibility tab
- [ ] Focus states visible for keyboard navigation (Tab through CTAs)
