"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // RGB triplet e.g. "139,63,212"
  size?: number; // radial gradient size in px
  borderRadius?: string;
}

export function GlowBorder({
  children,
  className,
  color = "255,45,120",
  size = 320,
  borderRadius = "0.75rem",
}: GlowBorderProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--glow-x");
    el.style.removeProperty("--glow-y");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        { "--glow-x": "-9999px", "--glow-y": "-9999px" } as React.CSSProperties
      }
      className={cn("relative group/glow", className)}
    >
      {children}
      {/* Border-only glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-300"
        style={{
          borderRadius,
          padding: "1.5px",
          background: `radial-gradient(${size}px circle at var(--glow-x) var(--glow-y), rgba(${color},0.9), transparent 65%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 10,
        }}
      />
    </div>
  );
}
