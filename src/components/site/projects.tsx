"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { useWipeNavigate } from "@/contexts/wipe-context";
import { Button } from "@/components/ds/button";
import { Category, EXT, hasIcon, ic, PROJECTS } from "@/data/portfolio";
import { TerminalCat } from "@/components/ds/brand";
import { SceneBg } from "./scene-bg";
import { PosterTitle, SectionKicker, TechIcon } from "./ui";

const FILTERS: ("all" | Category)[] = ["all", "devops", "backend", "frontend"];

export function Projects() {
  const { t, lang } = useLanguage();
  const navigate = useWipeNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projetos" className="px-gutter py-section relative isolate mx-auto max-w-[1440px]">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2">
        <SceneBg
          kind="logs"
          className="sticky top-0 h-screen opacity-35 [mask-image:radial-gradient(75%_80%_at_50%_50%,#000_25%,transparent)]"
        />
      </div>
      <SectionKicker
        n="03"
        label={t.projKicker}
        right={<span>{String(list.length).padStart(2, "0") + " " + t.items}</span>}
      />
      <div className="mt-6 mb-10 flex flex-wrap items-end justify-between gap-6">
        <PosterTitle a={t.projA} em={t.projEm} className="text-[clamp(2.8rem,7vw,7rem)] leading-[.9]" />
        <div data-reveal className="flex flex-wrap gap-2">
          {FILTERS.map((k, i) => (
            <Button key={k} size="sm" variant={filter === k ? "primary" : "secondary"} onClick={() => setFilter(k)}>
              {t.filters[i]}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-[18px]">
        {list.map((p, i) => {
          // card cover: the project image, else its first screenshot, else the cat or the file-extension placeholder
          const cover = p.image ?? p.shots?.[0];
          return (
            <a
              key={p.slug}
              href={`/projetos/${p.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate(`/projetos/${p.slug}`);
              }}
              data-reveal
              className="group grid grid-rows-[auto_1fr] border border-hairline bg-surface text-[inherit] transition-[transform,border-color,box-shadow] duration-150 ease-out-expo hover:border-green hover:text-[inherit] hover:shadow-[6px_6px_0_#00FF88] hover:[transform:translate(-3px,-3px)]"
            >
              <div className="relative aspect-video overflow-hidden border-b border-hairline bg-deep">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover}
                    alt=""
                    className="block size-full object-cover object-top brightness-[.55] saturate-[1.25]"
                  />
                ) : (
                  <div
                    className="absolute inset-0 grid place-items-center bg-[size:24px_24px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#F4F7FF08 1px,transparent 1px),linear-gradient(90deg,#F4F7FF08 1px,transparent 1px)",
                    }}
                  >
                    {p.catCover ? (
                      <span className="size-[46%] transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                        <TerminalCat size="100%" />
                      </span>
                    ) : (
                      <span className="font-mono text-[clamp(48px,6vw,72px)] font-semibold text-petrol">{p.ext || EXT[p.category]}</span>
                    )}
                  </div>
                )}
                <span className="absolute top-3 left-3 border border-hairline bg-ink px-[9px] py-[5px] font-mono text-[12px] text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="grid content-start gap-3 p-5">
                <span className="font-mono text-[12px] tracking-[.12em] text-green uppercase">
                  {"// " + p.category + " · " + p.dates}
                </span>
                <span className="poster text-[clamp(2rem,3vw,2.8rem)] leading-[.92]">{p.title}</span>
                <span className="text-[15px] leading-[1.55] text-muted [text-wrap:pretty]">{p[lang][0]}</span>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech
                      .filter(hasIcon)
                      .slice(0, 5)
                      .map((n) => (
                        <span key={n} className="grid size-8 place-items-center border border-hairline bg-deep">
                          <TechIcon src={ic(n, "A7B0C5")} size={16} />
                        </span>
                      ))}
                  </div>
                  <span className="font-mono text-[13px] tracking-[.08em] whitespace-nowrap text-green uppercase">{t.seeCase} →</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
