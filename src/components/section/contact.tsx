"use client";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";

export default function Contact() {
  const { data } = useLanguage();
  const { sectionTitles, contact } = data;

  const titleRef = useBlurFade<HTMLDivElement>();
  const cardRef = useBlurFade<HTMLDivElement>();

  return (
    <section id="contact" className="w-full py-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div ref={titleRef} data-animate className="mb-12 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./contact
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100 mb-3">
          {sectionTitles.contact}
        </h2>
        <p className="font-sans text-sm text-zinc-500 max-w-md mx-auto">
          {sectionTitles.contactDescription}
        </p>
      </div>

      {/* Content */}
      <div
        ref={cardRef}
        data-animate
        className="max-w-2xl mx-auto rounded-2xl border border-[#1a1a1a] bg-zinc-950/60 overflow-hidden"
      >
        {/* Top accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(108,99,255,0.7), transparent)",
          }}
        />

        <div className="p-8 flex flex-col gap-6">
          {/* Email CTA */}
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-4 p-4 rounded-xl border border-[#6C63FF]/20 bg-[#6C63FF]/5 hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/10 transition-all duration-300"
          >
            <div className="size-10 flex items-center justify-center rounded-lg bg-[#6C63FF]/15 text-[#6C63FF] flex-shrink-0">
              <Mail size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] text-[#6C63FF] uppercase tracking-widest mb-0.5">
                {sectionTitles.contactEmail}
              </p>
              <p className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors truncate">
                {contact.email}
              </p>
            </div>
          </a>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            {contact.social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name} (opens in new tab)`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1a1a1a] bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200"
              >
                <span className="text-zinc-400">{s.icon}</span>
                <span className="font-mono text-xs text-zinc-400 hover:text-zinc-200">
                  {s.name}
                </span>
              </a>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a]">
            <MapPin size={13} className="text-zinc-600 flex-shrink-0" />
            <span className="font-mono text-xs text-zinc-600">
              {data.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
