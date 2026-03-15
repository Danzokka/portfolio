"use client";
import { useRef, useMemo, useEffect, useState } from "react";

const BOOT_LINES = [
  "[NestFactory] Starting Nest application...",
  "[InstanceLoader] AppModule dependencies initialized",
  "[InstanceLoader] AuthModule dependencies initialized",
  "[InstanceLoader] DatabaseModule dependencies initialized",
  "[RoutesResolver] AppController {/}",
  "[RoutesResolver] AuthController {/auth}",
  "[RoutesResolver] UserController {/users}",
  "[RouterExplorer] Mapped {/, GET}",
  "[RouterExplorer] Mapped {/auth/login, POST}",
  "[RouterExplorer] Mapped {/users, GET}",
  "[RouterExplorer] Mapped {/users/:id, GET}",
  "[NestApplication] Nest application successfully started",
  "[Bootstrap] Listening on port 3001",
  "[HealthCheck] Database connection established",
  "[HealthCheck] Redis connection established",
  "[HealthCheck] All services healthy",
];

const LINE_COLORS: Record<string, string> = {
  NestFactory:    "#6C63FF",
  InstanceLoader: "#00FF88",
  RoutesResolver: "#00D4FF",
  RouterExplorer: "#a89fff",
  NestApplication:"#00FF88",
  Bootstrap:      "#f1f5f9",
  HealthCheck:    "#00FF88",
};

function getColor(line: string): string {
  for (const [key, color] of Object.entries(LINE_COLORS)) {
    if (line.includes(key)) return color;
  }
  return "#555";
}

export default function NestConsoleBg() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (indexRef.current < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[indexRef.current]]);
        indexRef.current++;
      } else {
        // Restart loop
        setTimeout(() => {
          setVisibleLines([]);
          indexRef.current = 0;
        }, 2500);
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeout(() => {
          intervalRef.current = setInterval(() => {
            if (indexRef.current < BOOT_LINES.length) {
              setVisibleLines((prev) => [...prev, BOOT_LINES[indexRef.current]]);
              indexRef.current++;
            }
          }, 220);
        }, 3000);
      }
    }, 220);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden p-4 opacity-[0.12]"
        style={{ scrollbarWidth: "none" }}
      >
        <pre className="font-mono text-[10px] leading-relaxed whitespace-pre-wrap break-all select-none">
          {visibleLines.map((line, i) => (
            <div key={i} style={{ color: getColor(line) }}>
              {line}
            </div>
          ))}
          {visibleLines.length > 0 && (
            <span className="animate-blink-cursor text-[#00FF88]">█</span>
          )}
        </pre>
      </div>
    </div>
  );
}
