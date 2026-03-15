"use client";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import type { Service } from "@/types/user";

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const ref = useBlurFade<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-animate
      style={{ transitionDelay: `${delay}ms` }}
      className="p-6 rounded-xl border border-[#1a1a1a] bg-zinc-950/60 hover:border-[#6C63FF]/30 transition-colors duration-300 flex flex-col gap-4"
    >
      <div className="size-10 flex items-center justify-center rounded-lg bg-[#6C63FF]/10 text-[#6C63FF]">
        {service.icon}
      </div>
      <h3 className="font-sans font-semibold text-zinc-100 text-sm">
        {service.title}
      </h3>
      <p className="font-sans text-xs text-zinc-500 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

export default function Services() {
  const { data } = useLanguage();
  const { sectionTitles, services } = data;

  const titleRef = useBlurFade<HTMLDivElement>();

  return (
    <section id="services" className="w-full py-24 px-4 max-w-6xl mx-auto">
      <div ref={titleRef} data-animate className="mb-12 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./services
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100 mb-3">
          {sectionTitles.services}
        </h2>
        <p className="font-sans text-sm text-zinc-500 max-w-md mx-auto">
          {sectionTitles.servicesDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
