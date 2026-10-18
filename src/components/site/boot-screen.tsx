"use client";

import { useEffect, useRef, useState } from "react";
import { useBoot } from "@/contexts/boot-context";
import { useLanguage } from "@/contexts/language-context";

export function BootScreen() {
  const { bootDone, finishBoot } = useBoot();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [out, setOut] = useState(false);
  const outRef = useRef(false);
  const n = t.boot.length;

  const skip = () => {
    if (outRef.current) return;
    outRef.current = true;
    setStep(99);
    setOut(true);
    setTimeout(finishBoot, 420);
  };

  useEffect(() => {
    if (bootDone) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const tick = () => {
      i++;
      setStep(i);
      if (i < n) timers.push(setTimeout(tick, 230));
      else timers.push(setTimeout(skip, 360));
    };
    timers.push(setTimeout(tick, 150));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per mount
  }, []);

  if (bootDone) return null;
  const pct = Math.round(Math.min(1, step / n) * 100);

  return (
    <div
      onClick={skip}
      className="fixed inset-0 z-[300] flex items-end bg-deep p-[clamp(24px,6vw,72px)] transition-opacity duration-[400ms] ease-[cubic-bezier(.3,0,.8,.15)]"
      style={{ opacity: out ? 0 : 1 }}
    >
      <div className="grid max-w-[640px] gap-2.5 font-mono text-[clamp(13px,1.4vw,16px)]">
        {t.boot.slice(0, step).map((tx, i) => (
          <div key={i} style={{ color: i === 0 ? "#A7B0C5" : i === n - 1 ? "#00FF88" : "#F4F7FF" }}>
            {tx}
          </div>
        ))}
        <div className="mt-3.5 flex items-center gap-2.5">
          <div className="h-1 w-60 bg-hairline">
            <div className="h-full bg-green transition-[width] duration-[120ms] ease-linear" style={{ width: pct + "%" }} />
          </div>
          <span className="text-[12px] tracking-[.15em] text-muted">{String(pct).padStart(3, "0")}%</span>
        </div>
      </div>
      <span className="absolute top-[clamp(24px,6vw,72px)] right-[clamp(24px,6vw,72px)] font-mono text-[12px] tracking-[.15em] text-muted uppercase">
        {t.skip}
      </span>
    </div>
  );
}
