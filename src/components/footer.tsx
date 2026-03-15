"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import Logo from "@/components/logo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const Footer = () => {
  const { data } = useLanguage();
  const { sectionTitles, contact } = data;

  const containerRef = useBlurFade<HTMLDivElement>();

  return (
    <footer className="w-full border-t border-[#1a1a1a] mt-16">
      <div
        ref={containerRef}
        data-animate
        className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-8 text-center"
      >
        {/* Available badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5">
          <span className="size-2 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="font-mono text-xs text-[#00FF88] tracking-widest">
            {sectionTitles.available}
          </span>
        </div>

        {/* CTA heading */}
        <h2 className="font-sans font-bold text-3xl sm:text-4xl text-zinc-100 max-w-md">
          {sectionTitles.footerSubtitle}
        </h2>

        {/* CTA button */}
        <Link href={`mailto:${contact.email}`}>
          <InteractiveHoverButton>{sectionTitles.getStarted}</InteractiveHoverButton>
        </Link>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {contact.social.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="size-9 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* Logo + copyright */}
        <div className="flex flex-col items-center gap-3 pt-4 border-t border-[#1a1a1a] w-full">
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
