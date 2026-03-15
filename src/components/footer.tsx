"use client";
import { MapPin, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import Logo from "@/components/logo";

const Footer = () => {
  const { data } = useLanguage();
  const { sectionTitles, contact } = data;
  const footerRef = useBlurFade<HTMLElement>();

  return (
    <footer ref={footerRef} data-animate className="w-full border-t border-[#1a1a1a] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-12">
          {/* Left column */}
          <div className="flex-1">
            <p className="font-mono text-[10px] text-[#00FF88] uppercase tracking-[3px] mb-4">
              → open to work
            </p>
            <h2 className="font-sans font-bold text-3xl text-zinc-100 mb-3">
              {sectionTitles.footerHeadline}
            </h2>
            <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-6">
              {sectionTitles.footerPitch}
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Primary CTA */}
              <a
                href={`mailto:${contact.email}`}
                className="relative inline-flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-[#6C63FF]/40 bg-transparent px-6 font-mono text-sm text-zinc-300 transition-all duration-300 hover:border-[#6C63FF] hover:text-zinc-100"
              >
                {sectionTitles.getStarted}
              </a>
              {/* Resume CTA */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 border border-zinc-800 rounded-md font-mono text-xs text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200"
              >
                <FileText size={12} />
                {sectionTitles.footerResume}
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 lg:flex lg:flex-col lg:items-end">
            {/* Available status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="font-mono text-xs text-[#00FF88]">
                {sectionTitles.available}
              </span>
            </div>
            {/* Contact stack */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 lg:justify-end font-sans text-xs text-zinc-600">
                <MapPin size={12} className="text-zinc-600 flex-shrink-0" />
                Brasília, Brazil
              </div>
              {contact.social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-zinc-600 hover:text-[#6C63FF] transition-colors lg:text-right"
                >
                  {s.url.replace("https://", "")}
                </a>
              ))}
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-[11px] text-zinc-600 hover:text-[#6C63FF] transition-colors lg:text-right"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-6 border-t border-[#1a1a1a]">
          <Logo asDiv />
          <p className="font-mono text-[10px] text-zinc-700">
            © {new Date().getFullYear()} Rafael Dantas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
