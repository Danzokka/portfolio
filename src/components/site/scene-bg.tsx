"use client";

import { useEffect, useRef } from "react";
import type { SceneKind, Stage } from "@/lib/scenes";
import { startPointer } from "@/lib/pointer";

/**
 * Mounts a Three.js scene into its own div. Background scenes only live while their section is
 * within ~1.25 viewports of the screen, so at most two or three WebGL contexts exist at once.
 */
export function SceneBg({
  kind,
  hero = false,
  className,
  style,
}: {
  kind: SceneKind;
  hero?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    startPointer();
    let stage: Stage | null = null;
    let cancelled = false;
    let mounting = false;

    const mount = async () => {
      if (stage || mounting) return;
      mounting = true;
      const { makeStage } = await import("@/lib/scenes");
      mounting = false;
      if (cancelled || stage) return;
      stage = makeStage(el, kind, { hero });
    };
    const sync = () => {
      if (hero) {
        if (stage) stage.scroll = scrollY;
        return;
      }
      const sec = el.closest("section") ?? el;
      const r = sec.getBoundingClientRect();
      const near = r.bottom > -innerHeight * 0.25 && r.top < innerHeight * 1.25;
      if (near) mount();
      else if (stage) {
        stage.dispose();
        stage = null;
      }
    };

    if (hero) mount();
    sync();
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          sync();
        });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      stage?.dispose();
    };
  }, [kind, hero]);

  return <div ref={ref} aria-hidden className={className} style={style} />;
}
