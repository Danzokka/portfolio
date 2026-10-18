"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useBoot } from "@/contexts/boot-context";

type RevealEl = HTMLElement & { __rv?: 1; __shown?: 1 };

const EASE = "cubic-bezier(.16,1,.3,1)";

function prep(el: RevealEl) {
  if (el.__rv) return;
  el.__rv = 1;
  if (el.dataset.reveal === "mask") {
    el.style.clipPath = "inset(0 0 100% 0)";
    el.style.translate = "0 .35em";
    el.style.transition = `clip-path 900ms ${EASE}, translate 900ms ${EASE}`;
  } else {
    el.style.opacity = "0";
    el.style.filter = "blur(8px)";
    el.style.translate = "0 16px";
    el.style.transition = `opacity 600ms linear, filter 600ms ${EASE}, translate 600ms ${EASE}`;
  }
}

function show(el: RevealEl) {
  el.__shown = 1;
  if (el.dataset.reveal === "mask") {
    el.style.clipPath = "inset(0 0 -20% 0)";
    el.style.translate = "0 0";
  } else {
    el.style.opacity = "1";
    el.style.filter = "none";
    el.style.translate = "0 0";
  }
}

/**
 * Elements marked `data-reveal` (blur-up) or `data-reveal="mask"` (clip wipe) animate in when they
 * scroll into view. Nothing reveals before the boot screen is gone; the visible ones then stagger in.
 */
export function RevealRoot({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { bootDone } = useBoot();
  const bootRef = useRef(bootDone);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = () => root.querySelectorAll<RevealEl>("[data-reveal]");
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) => {
          if (e.isIntersecting && bootRef.current) {
            show(e.target as RevealEl);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    const scan = () => {
      if (!bootRef.current) return;
      all().forEach((el) => {
        if (!el.__rv || el.__shown) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.92 && r.bottom > 0) show(el);
      });
    };
    const prepAll = () =>
      all().forEach((el) => {
        if (el.__rv) return;
        prep(el);
        io.observe(el);
      });
    prepAll();
    const mo = new MutationObserver(() => {
      prepAll();
      scan();
    });
    mo.observe(root, { childList: true, subtree: true });
    addEventListener("scroll", scan, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      removeEventListener("scroll", scan);
    };
  }, []);

  useEffect(() => {
    bootRef.current = bootDone;
    const root = ref.current;
    if (!bootDone || !root) return;
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    root.querySelectorAll<RevealEl>("[data-reveal]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0 && !el.__shown) timers.push(setTimeout(() => show(el), i++ * 90));
    });
    return () => timers.forEach(clearTimeout);
  }, [bootDone]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
