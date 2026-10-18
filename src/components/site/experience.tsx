"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { EXP, ic } from "@/data/portfolio";
import { SceneBg } from "./scene-bg";
import { PosterTitle, SectionKicker, TechIcon } from "./ui";

export function Experience() {
  const { t, li } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [{ p, idx }, setProg] = useState({ p: 0, idx: 0 });

  // timeline fill follows scroll; the entry that crossed 55% of the viewport is the active one
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = 0;
      const ex = ref.current;
      if (!ex) return;
      const r = ex.getBoundingClientRect();
      const np = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / Math.max(1, r.height - innerHeight * 0.3)));
      let ni = 0;
      ex.querySelectorAll("[data-exp]").forEach((a, i) => {
        if (a.getBoundingClientRect().top < innerHeight * 0.55) ni = i;
      });
      setProg((s) => (Math.abs(np - s.p) > 0.004 || ni !== s.idx ? { p: np, idx: ni } : s));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    sync();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experiencia" ref={ref} className="relative isolate overflow-clip border-t border-hairline bg-deep">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <SceneBg
          kind="paineis"
          className="sticky top-0 h-screen opacity-45 [mask-image:radial-gradient(55%_75%_at_22%_50%,#000,transparent)]"
        />
      </div>
      <div className="px-gutter py-section mx-auto grid max-w-[1440px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-[clamp(32px,5vw,72px)]">
        <div className="relative">
          <div className="sticky top-[110px] grid gap-6">
            <SectionKicker n="02" label={t.expKicker} rule={false} />
            <PosterTitle a={t.expA} em={t.expEm} className="text-[clamp(2.8rem,6.4vw,6.4rem)] leading-[.9]" />
            <div data-reveal className="flex items-end gap-4">
              <span className="font-score text-[clamp(7rem,13vw,12rem)] leading-[.8] font-semibold text-green">{EXP[idx].year}</span>
              <span className="pb-2.5 font-mono text-[12px] tracking-[.14em] text-muted uppercase">{"→ " + EXP[idx].end[li]}</span>
            </div>
          </div>
        </div>

        <div className="relative pl-8">
          <div aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-hairline" />
          <div aria-hidden className="absolute top-0 left-0 w-0.5 bg-green" style={{ height: (p * 100).toFixed(1) + "%" }} />
          {EXP.map((e, i) => {
            const on = i <= idx;
            return (
              <article key={e.company + e.period[0]} data-reveal data-exp className="relative grid gap-3.5 pt-2 pb-16">
                <span
                  aria-hidden
                  className={`absolute top-3 -left-[39px] size-3.5 border-2 transition-[background,border-color] duration-200 ${on ? "border-green bg-green" : "border-hairline bg-ink"}`}
                />
                <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] tracking-[.14em] uppercase">
                  <span className="text-green">{e.period[li]}</span>
                  <span className="text-muted">{"// " + e.kind[li]}</span>
                </div>
                <h3
                  className={`m-0 poster text-[clamp(2.2rem,4vw,3.8rem)] leading-[.9] transition-colors duration-200 ${i === idx ? "text-green" : "text-fg"}`}
                >
                  {e.company}
                </h3>
                <div className="text-[17px] font-semibold">{e.role[li]}</div>
                <div className="grid gap-2">
                  {e.bullets[li ? "en" : "pt"].map((b) => (
                    <div key={b} className="flex gap-2.5 text-[15px] leading-[1.55] text-muted">
                      <span className="font-mono text-green">▸</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                {e.tech.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {e.tech.map((n) => (
                      <span key={n} className="flex items-center gap-1.5 border border-hairline bg-surface px-2 py-[5px] font-mono text-[11px] text-fg">
                        <TechIcon src={ic(n)} size={13} />
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
