"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/language-context";
import { ic, SKILLS, SkillCat } from "@/data/portfolio";
import { SceneBg } from "./scene-bg";
import { PosterTitle, SectionKicker, TechIcon } from "./ui";

const CATS: ("all" | SkillCat)[] = ["all", "infra", "obs", "lang", "app"];

/** Spins the [data-orb] chips on a Fibonacci sphere; drag to throw it. */
function useSkillSphere() {
  const boxRef = useRef<HTMLDivElement>(null);
  const sph = useRef({ ax: -0.25, ay: 0, vx: 0, vy: 0.004, drag: null as null | { x: number; y: number } });

  useEffect(() => {
    const S = sph.current;
    let raf = 0;
    const onUp = () => (S.drag = null);
    const onMove = (e: PointerEvent) => {
      const d = S.drag;
      if (!d) return;
      S.vy = (e.clientX - d.x) * 0.0006;
      S.vx = -(e.clientY - d.y) * 0.0006;
      d.x = e.clientX;
      d.y = e.clientY;
    };
    const step = () => {
      raf = requestAnimationFrame(step);
      const box = boxRef.current;
      if (!box) return;
      const r = box.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      if (!S.drag) {
        S.vy += (0.004 - S.vy) * 0.02;
        S.vx *= 0.96;
      }
      S.ay += S.vy;
      S.ax = Math.max(-1.2, Math.min(1.2, S.ax + S.vx));
      const R = Math.min(r.width, r.height) * 0.42,
        items = box.querySelectorAll<HTMLElement>("[data-orb]"),
        N = items.length;
      const cy = Math.cos(S.ay),
        sy = Math.sin(S.ay),
        cx = Math.cos(S.ax),
        sx = Math.sin(S.ax);
      items.forEach((el, i) => {
        const yy = 1 - (i / (N - 1)) * 2,
          rr = Math.sqrt(1 - yy * yy),
          th = i * 2.399963;
        const x = Math.cos(th) * rr,
          y = yy,
          z = Math.sin(th) * rr;
        const x1 = x * cy + z * sy,
          z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx,
          z2 = y * sx + z1 * cx;
        const sc = 0.55 + (z2 + 1) * 0.3;
        el.style.transform = `translate(-50%,-50%) translate3d(${x1 * R}px,${y2 * R}px,0) scale(${sc})`;
        el.style.opacity = String(0.18 + (z2 + 1) * 0.41);
        el.style.zIndex = String(Math.round((z2 + 1) * 50));
      });
    };
    addEventListener("pointerup", onUp);
    addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    sph.current.drag = { x: e.clientX, y: e.clientY };
  };
  return { boxRef, onPointerDown };
}

export function About() {
  const { t } = useLanguage();
  const [cat, setCat] = useState<(typeof CATS)[number]>("all");
  const { boxRef, onPointerDown } = useSkillSphere();
  const active = SKILLS.filter(([, c]) => cat === "all" || c === cat).length;

  return (
    <section id="stack" className="px-gutter py-section relative isolate mx-auto max-w-[1440px]">
      <SceneBg
        kind="cluster"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_92%,transparent)]"
      />
      <SectionKicker n="01" label={t.aboutKicker} right={<span>{SKILLS.length + " " + t.tools}</span>} />
      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
        <div className="grid content-start gap-6">
          <PosterTitle a={t.aboutA} em={t.aboutEm} className="text-[clamp(2.8rem,6.4vw,6.4rem)] leading-[.9]" />
          <p data-reveal className="m-0 max-w-[34rem] text-[clamp(15px,1.2vw,18px)] leading-[1.6] text-fg [text-wrap:pretty]">
            {t.about}
          </p>
          <div data-reveal className="flex w-fit flex-wrap border border-hairline">
            {CATS.map((k, i) => (
              <button
                key={k}
                type="button"
                onClick={() => setCat(k)}
                className={clsx(
                  "cursor-pointer border-0 border-r border-hairline px-4 py-2.5 font-mono text-[12px] tracking-[.08em] uppercase transition-[background,color] duration-200 ease-in-out",
                  cat === k ? "bg-green text-ink" : "bg-transparent text-muted",
                )}
              >
                {t.cats[i]}
              </button>
            ))}
          </div>
          <p data-reveal className="m-0 min-h-[5.2em] max-w-[34rem] text-[15px] leading-[1.6] text-muted [text-wrap:pretty]">
            {t.catTexts[CATS.indexOf(cat)]}
          </p>
        </div>

        <div
          data-reveal
          ref={boxRef}
          onPointerDown={onPointerDown}
          className="relative h-[clamp(380px,46vw,600px)] cursor-grab touch-none"
        >
          <div aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[62%] -translate-1/2 rounded-full border border-hairline" />
          <div aria-hidden className="absolute top-1/2 left-1/2 h-px w-[62%] -translate-1/2 bg-hairline" />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-1/2 font-score text-[clamp(80px,9vw,140px)] leading-none font-semibold text-green opacity-90"
          >
            {String(active).padStart(2, "0")}
          </div>
          {SKILLS.map(([n, c]) => {
            const on = cat === "all" || cat === c,
              hot = cat !== "all" && on;
            return (
              <div key={n} data-orb className="absolute top-1/2 left-1/2 will-change-[transform,opacity]">
                <span
                  className={clsx(
                    "flex items-center gap-2 border px-2.5 py-[7px] font-mono text-[12px] whitespace-nowrap transition-[border-color,background,color] duration-200",
                    hot ? "border-green bg-green-ink text-green" : "border-hairline bg-surface",
                    !hot && (on ? "text-fg" : "text-dim"),
                  )}
                >
                  <TechIcon src={ic(n, hot ? "00FF88" : on ? "F4F7FF" : "7d869a")} size={16} />
                  {n}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
