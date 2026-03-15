"use client";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import type { Metric } from "@/types/user";

function MetricCard({ metric }: { metric: Metric }) {
  const ref = useBlurFade<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-animate
      className="flex flex-col items-center justify-center gap-1 py-8"
    >
      <div className="font-mono font-bold text-4xl sm:text-5xl text-zinc-100 flex items-baseline gap-0.5">
        {metric.isInfinity ? (
          <span className="text-[#00FF88] text-5xl">∞</span>
        ) : (
          <>
            <NumberTicker value={metric.value} className="text-zinc-100" />
            {metric.suffix && (
              <span className="text-[#6C63FF] text-3xl">{metric.suffix}</span>
            )}
          </>
        )}
      </div>
      <p className="font-sans text-xs text-zinc-600 uppercase tracking-widest text-center">
        {metric.label}
      </p>
    </div>
  );
}

export default function Metrics() {
  const { data } = useLanguage();
  const { metrics } = data;

  return (
    <section className="w-full py-12 border-y border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 divide-x divide-[#1a1a1a]">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
