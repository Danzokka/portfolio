"use client";

import { useEffect, useRef } from "react";
import { ic, MARQ } from "@/data/portfolio";
import { TechIcon } from "./ui";

const ITEMS = [...MARQ, ...MARQ].map((text, i) => ({ text, accent: i % 4 === 1 }));

/** Endless tech strip; it skews with scroll velocity. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = scrollY,
      vel = 0,
      skew = 0,
      raf = 0;
    const onScroll = () => {
      vel += scrollY - lastY;
      lastY = scrollY;
    };
    const step = () => {
      vel *= 0.85;
      skew += (Math.max(-12, Math.min(12, vel * 0.25)) - skew) * 0.15;
      if (ref.current) ref.current.style.transform = `skewX(${-skew}deg)`;
      raf = requestAnimationFrame(step);
    };
    addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(step);
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="overflow-hidden border-y border-hairline bg-deep py-5">
      <div ref={ref} className="will-change-transform">
        <div className="flex w-max animate-marquee">
          {ITEMS.map((m, i) => (
            <span key={i} className="flex items-center gap-4 pr-11 whitespace-nowrap">
              <span className="grid size-10 place-items-center border border-hairline bg-surface">
                <TechIcon src={ic(m.text, m.accent ? "00FF88" : "F4F7FF")} size={22} />
              </span>
              <span className={`poster text-[clamp(28px,3.4vw,48px)] leading-none ${m.accent ? "text-green" : "text-fg"}`}>
                {m.text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
