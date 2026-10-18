import { clsx } from "clsx";
import { ReactNode } from "react";

/** Tech icon served from Simple Icons / Iconify (remote SVG, so a plain img). */
export function TechIcon({ src, size }: { src: string; size: number }) {
  if (!src) return <span className="block flex-none" style={{ width: size, height: size }} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="block flex-none"
      style={{ width: size, height: size }}
      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
    />
  );
}

/** "01 // ./sobre ——— 31 ferramentas" row that opens every section */
export function SectionKicker({
  n,
  label,
  right,
  rule = true,
  accentNumber = false,
}: {
  n: string;
  label: string;
  right?: ReactNode;
  rule?: boolean;
  accentNumber?: boolean;
}) {
  return (
    <div
      data-reveal
      className="flex items-center gap-4 font-mono text-[12px] tracking-[.15em] text-muted uppercase"
    >
      <span className={clsx("font-bold", accentNumber ? "text-green" : "text-fg")}>{n}</span>
      <span>{"// " + label}</span>
      {rule && <span className="h-px flex-1 bg-hairline" />}
      {right}
    </div>
  );
}

/** Section headline: condensed poster type, second line italic green */
export function PosterTitle({
  a,
  em,
  className,
  inline = false,
}: {
  a: string;
  em: string;
  className?: string;
  inline?: boolean;
}) {
  return (
    <h2 data-reveal="mask" className={clsx("m-0 poster", className)}>
      {a}
      {inline ? " " : <br />}
      <em className="text-green">{em}</em>
    </h2>
  );
}
