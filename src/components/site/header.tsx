"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/language-context";
import { LogoDanzokka, TerminalCat } from "@/components/ds/brand";
import { ButtonLink } from "@/components/ds/button";

const NAV = ["#stack", "#experiencia", "#projetos", "#conteudo", "#contato"];

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [solid, setSolid] = useState(false);
  const [wink, setWink] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const langSeg = (on: boolean) =>
    clsx(
      "grid place-items-center px-2.5 transition-[background,color] duration-200 ease-in-out",
      on ? "bg-green text-ink" : "bg-transparent text-muted",
    );

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] border-b transition-[background,border-color] duration-300 ease-in-out",
        solid ? "border-hairline bg-black/80 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav className="px-gutter mx-auto flex max-w-[1440px] items-center justify-between gap-6 py-3">
        <a href="#top" className="flex items-center gap-3 text-[inherit] hover:text-[inherit]">
          <span className="flex" onMouseEnter={() => setWink(true)} onMouseLeave={() => setWink(false)}>
            <TerminalCat size={40} expression={wink ? "wink" : "open"} />
          </span>
          <LogoDanzokka size={18} />
        </a>
        <div className="hidden flex-wrap gap-0.5 md:flex">
          {NAV.map((href, i) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 font-mono text-[12px] tracking-[.08em] text-muted uppercase transition-colors duration-200 hover:text-green"
            >
              {t.nav[i]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
            className="flex h-8 cursor-pointer items-stretch border border-hairline bg-deep p-0 font-mono text-[11px] tracking-[.12em]"
          >
            <span className={langSeg(lang === "pt")}>PT</span>
            <span className={langSeg(lang === "en")}>EN</span>
          </button>
          <ButtonLink size="sm" href="#contato" className="max-sm:hidden">
            {t.talk}
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
