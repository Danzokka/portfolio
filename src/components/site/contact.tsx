"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { HudMeta, LogoDanzokka, TerminalCat } from "@/components/ds/brand";
import { EMAIL, ic } from "@/data/portfolio";
import { SceneBg } from "./scene-bg";
import { PosterTitle, SectionKicker, TechIcon } from "./ui";

const SOCIALS = [
  { label: "GitHub", handle: "Danzokka", href: "https://github.com/Danzokka" },
  { label: "LinkedIn", handle: "rafael-dantas-boeira", href: "https://www.linkedin.com/in/rafael-dantas-boeira/" },
  { label: "Instagram", handle: "@dan_the_dev", href: "https://instagram.com/dan_the_dev" },
];

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wink, setWink] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contato" className="relative overflow-hidden border-t border-hairline">
      <SceneBg kind="globo" className="absolute inset-0 opacity-80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#090A0E_0%,#090A0Ecc_40%,transparent_100%),linear-gradient(to_top,#090A0E_0%,transparent_30%)]"
      />
      <div className="px-gutter relative mx-auto max-w-[1440px] pt-[clamp(80px,14vh,160px)] pb-12">
        <SectionKicker n="05" label={t.contactKicker} right={<span className="text-green">→ open to work</span>} />
        <PosterTitle
          a={t.contactA}
          em={t.contactEm}
          className="mt-6 mb-10 text-[clamp(3.4rem,11vw,11rem)] leading-[.84]"
        />
        <div className="grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[18px]">
          <button
            type="button"
            data-reveal
            onClick={copyEmail}
            className="grid cursor-pointer gap-3.5 border-2 border-green bg-surface p-[clamp(20px,3vw,32px)] text-left transition-[transform,box-shadow] duration-150 ease-out-expo hover:shadow-[6px_6px_0_#00FF88] hover:[transform:translate(-3px,-3px)]"
          >
            <span className="font-mono text-[12px] tracking-[.15em] text-green uppercase">{copied ? t.copied : t.copy}</span>
            <span className="font-mono text-[clamp(16px,2vw,24px)] break-all text-fg">{EMAIL}</span>
            <span className="text-[14px] leading-[1.6] text-muted">{t.contactDesc}</span>
          </button>
          <div className="grid border border-hairline bg-surface">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                data-reveal
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-[18px] font-mono text-[14px] text-fg transition-[background,color] duration-200 hover:bg-deep hover:text-green"
              >
                <span className="flex items-center gap-3">
                  <TechIcon src={ic(s.label)} size={16} />
                  {s.label}
                </span>
                <span className="text-muted">{s.handle} ↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-6">
          <div className="flex items-center gap-4">
            <span className="flex" onMouseEnter={() => setWink(true)} onMouseLeave={() => setWink(false)}>
              <TerminalCat size={48} expression={wink ? "wink" : "open"} />
            </span>
            <LogoDanzokka size={18} />
          </div>
          <HudMeta items={t.footMeta} />
        </div>
      </div>
    </section>
  );
}
