import Link from "next/link";

interface LogoProps {
  className?: string;
  /** When true, renders as a plain div instead of a link */
  asDiv?: boolean;
}

export default function Logo({ className = "", asDiv = false }: LogoProps) {
  const inner = (
    <div className={`font-mono leading-none text-left select-none ${className}`}>
      {/* Terminal path prefix */}
      <div className="text-[10px] tracking-widest text-zinc-600 mb-0.5">
        ~/dev/
      </div>
      {/* Brand name */}
      <div className="flex items-baseline gap-0">
        <span className="text-2xl font-bold text-[#00FF88]">Danz</span>
        <span className="text-2xl font-light text-zinc-100">okka</span>
      </div>
      {/* Tagline */}
      <div className="text-[8px] tracking-[3px] text-zinc-700 mt-0.5 uppercase font-normal">
        Fullstack · DevOps
      </div>
    </div>
  );

  if (asDiv) return inner;

  return (
    <Link href="/" aria-label="Danzokka — home">
      {inner}
    </Link>
  );
}
