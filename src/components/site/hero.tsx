"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { ButtonLink } from "@/components/ds/button";
import { ic } from "@/data/portfolio";
import { SceneBg } from "./scene-bg";
import { TechIcon } from "./ui";

const NOW_STACK = ["AWS", "EKS", "Kubernetes", "Jenkins", "Argo CD", "Prometheus", "Grafana", "Alertmanager", "Go"];

/** Types each role out, holds it, then moves to the next one. */
function useTypewriter(words: string[]) {
  const [state, setState] = useState({ role: 0, chars: 0 });
  useEffect(() => {
    // restart from the first letter when the language changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((s) => ({ ...s, chars: 0 }));
  }, [words]);
  const word = words[state.role % words.length];
  useEffect(() => {
    const done = state.chars >= word.length;
    const id = setTimeout(
      () => setState((s) => (done ? { chars: 0, role: (s.role + 1) % words.length } : { ...s, chars: s.chars + 1 })),
      done ? 1800 : 55,
    );
    return () => clearTimeout(id);
  }, [state, word, words.length]);
  return word.slice(0, state.chars);
}

export function Hero() {
  const { t } = useLanguage();
  const role = useTypewriter(t.roles);

  return (
    <section id="top" className="relative h-screen min-h-[620px] overflow-hidden">
      <SceneBg kind="terreno" hero className="absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,#090A0Ee6 0%,#090A0E99 38%,transparent 72%),radial-gradient(40% 35% at 20% 45%,#00FF880d 0%,transparent 70%),linear-gradient(to top,#090A0E 0%,transparent 34%)",
        }}
      />

      <h1
        style={{ left: "max(clamp(20px,4vw,48px), calc((100% - 1440px) / 2 + clamp(20px,4vw,48px)))" }}
        className="pointer-events-none absolute top-[44%] right-[clamp(20px,4vw,48px)] m-0 -translate-y-[58%] text-left poster text-[clamp(3.5rem,min(17vw,22vh),16rem)] leading-[.84]">
        Rafael
        <br />
        <em className="text-green">Dantas.</em>
      </h1>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="px-gutter mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-end gap-8 pb-[clamp(28px,5vh,48px)]">
          <div className="pointer-events-auto grid max-w-[34rem] gap-3.5">
            <div data-reveal className="flex items-center gap-3 font-mono text-[clamp(20px,2.3vw,32px)] leading-[1.2] font-semibold">
              <span className="text-green">$</span>
              <span className="min-h-[1.2em] bg-green px-2.5 py-0.5 whitespace-nowrap text-ink">{role}</span>
              <span className="animate-blink text-green">▌</span>
            </div>
            <p data-reveal className="m-0 text-[clamp(15px,1.2vw,17px)] leading-[1.6] text-fg [text-wrap:pretty]">
              {t.heroA}
              <a href="#conteudo">@dan_the_dev</a>
              {t.heroB}
            </p>
            <div data-reveal className="mt-1.5 flex flex-wrap gap-3">
              <ButtonLink size="lg" href="#projetos">
                {t.ctaProjects}
              </ButtonLink>
              <ButtonLink size="lg" variant="outline" href="#contato">
                {t.ctaTalk}
              </ButtonLink>
            </div>
          </div>

          {/* "now" card — only on wide, tall screens */}
          <div
            data-reveal
            className="pointer-events-auto hidden w-[340px] border border-hairline bg-[rgba(13,17,24,.9)] font-mono [@media(min-width:1101px)_and_(min-height:641px)]:block"
          >
            <div className="flex justify-between border-b border-hairline px-3.5 py-2.5 text-[11px] tracking-[.16em] text-muted uppercase">
              <span>{"// " + t.nowK}</span>
              <span className="flex items-center gap-1.5 text-green">
                <span className="size-[7px] animate-pulse-dot rounded-full bg-green" />
                online
              </span>
            </div>
            <div className="grid gap-1.5 px-3.5 pt-3.5 pb-2.5">
              <span className="poster text-[32px] leading-[.92]">{t.nowRole}</span>
              <span className="text-[12px] text-green">@ citiesoft · {t.nowSince}</span>
            </div>
            <div className="hidden gap-[7px] border-b border-hairline px-3.5 pt-1 pb-3.5 [@media(min-height:821px)]:grid">
              {t.nowDoing.map((nd) => (
                <div key={nd} className="flex gap-2 font-sans text-[13px] leading-[1.4] text-fg">
                  <span className="font-mono text-green">▸</span>
                  <span>{nd}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 px-3.5 pt-3 pb-3.5">
              {NOW_STACK.map((n) => (
                <span key={n} className="flex items-center gap-1.5 border border-hairline bg-deep px-[7px] py-1 text-[11px] text-fg">
                  <TechIcon src={ic(n)} size={12} />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
