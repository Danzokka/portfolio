"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Wipe = "down" | "cover" | "up";

const WIPE: Record<Wipe, [string, string]> = {
  down: ["translateY(100%)", "none"],
  cover: ["translateY(0%)", "transform 460ms cubic-bezier(.65,0,.35,1)"],
  up: ["translateY(-100%)", "transform 560ms cubic-bezier(.16,1,.3,1)"],
};

const WipeContext = createContext<((href: string) => void) | undefined>(undefined);

/**
 * Route changes between the home page and the project pages go behind a green panel:
 * it covers the screen, the route swaps, then it slides off the top.
 */
export function WipeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [wipe, setWipe] = useState<Wipe>("down");
  const pending = useRef<{ hash: string } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const navigate = useCallback(
    (href: string) => {
      const [path, hash = ""] = href.split("#");
      if (path === pathname) {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      pending.current = { hash };
      setWipe("cover");
      timers.current.push(setTimeout(() => router.push(href, { scroll: false }), 480));
    },
    [pathname, router],
  );

  useEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    const el = p.hash ? document.getElementById(p.hash) : null;
    scrollTo({ top: el ? el.getBoundingClientRect().top + scrollY - 40 : 0 });
    timers.current.push(setTimeout(() => setWipe("up"), 60));
    timers.current.push(setTimeout(() => setWipe("down"), 700));
  }, [pathname]);

  useEffect(() => {
    const ts = timers.current;
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <WipeContext.Provider value={navigate}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[250] bg-green"
        style={{ transform: WIPE[wipe][0], transition: WIPE[wipe][1] }}
      />
    </WipeContext.Provider>
  );
}

export function useWipeNavigate() {
  const ctx = useContext(WipeContext);
  if (!ctx) throw new Error("useWipeNavigate must be used within a WipeProvider");
  return ctx;
}
