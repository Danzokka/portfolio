import { useId } from "react";

// dan_the_dev DS · TerminalCat + Logo (components/brand/*.jsx). Only the a3-corner pose is used here.
const CAT = {
  body: "M172 256L0 256L0 215L12 201L12 198L0 186L0 107C7 91 7 65 15 47C23 27 32 18 46 20C60 22 76 43 92 59C111 58 134 62 155 70C172 59 193 45 209 50C226 56 222 79 217 112C214 124 211 130 215 139C224 166 216 190 201 210C190 221 177 227 166 230C169 240 171 249 172 256Z",
  eyes: [
    { cx: 67.2, cy: 142.2, rx: 16.5, ry: 17.5 },
    { cx: 174.7, cy: 154.1, rx: 15, ry: 17 },
  ],
  mouth: { x: 111.5, y: 171, width: 18.5, height: 5, rotation: 8 },
};

export function TerminalCat({
  size,
  expression = "open",
  framed = true,
}: {
  size: number | string;
  expression?: "open" | "wink";
  framed?: boolean;
}) {
  const clipId = useId();
  const m = CAT.mouth;
  const last = CAT.eyes.length - 1;
  return (
    <svg viewBox="0 0 256 256" aria-hidden className="block flex-none" style={{ width: size, height: size }}>
      {framed && <rect x="4" y="4" width="248" height="248" rx="56" fill="#00FF88" />}
      {framed && (
        <defs>
          <clipPath id={clipId}>
            <rect x="4" y="4" width="248" height="248" rx="56" />
          </clipPath>
        </defs>
      )}
      <g clipPath={framed ? `url(#${clipId})` : undefined}>
        <path d={CAT.body} fill="#090A0E" />
        {CAT.eyes.map((e, i) =>
          expression === "wink" && i === last ? (
            <path
              key={i}
              d={`M${e.cx - e.rx * 0.55} ${e.cy - e.ry * 0.85}L${e.cx + e.rx * 0.75} ${e.cy}L${e.cx - e.rx * 0.55} ${e.cy + e.ry * 0.85}`}
              fill="none"
              stroke="#00FF88"
              strokeWidth={e.rx * 0.62}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="#00FF88" />
          ),
        )}
        <rect
          x={m.x}
          y={m.y}
          width={m.width}
          height={m.height}
          rx={m.height / 2}
          transform={`rotate(${m.rotation} ${m.x + m.width / 2} ${m.y + m.height / 2})`}
          fill="#00FF88"
        />
      </g>
    </svg>
  );
}

/** Logo variant="danzokka" */
export function LogoDanzokka({ size = 18 }: { size?: number }) {
  return (
    <div aria-label="Danzokka" className="font-mono leading-none select-none" style={{ fontSize: size }}>
      <div className="mb-0.5 text-[0.4166em] tracking-[0.1em] text-[#52525b]">~/dev/</div>
      <div className="flex items-baseline text-[1em]">
        <span className="font-bold text-green">Danz</span>
        <span className="font-light text-fg">okka</span>
      </div>
      <div className="mt-0.5 text-[0.3333em] tracking-[3px] text-[#3f3f46] uppercase">Fullstack · DevOps</div>
    </div>
  );
}

/** Logo variant="horizontal" — used in the carousel slide footer */
export function LogoHorizontal({ size }: { size: number }) {
  return (
    <span className="inline-flex items-center gap-[0.375em] font-mono whitespace-nowrap text-fg" style={{ fontSize: size }}>
      <TerminalCat size="2.1em" />
      <span className="inline-flex">
        <span className="font-bold">dan</span>
        <span className="text-green">_the_dev</span>
        <span aria-hidden className="text-green">
          ▌
        </span>
      </span>
    </span>
  );
}

/** HudMeta: uppercase mono meta row separated by // */
export function HudMeta({ items }: { items: string[] }) {
  return (
    <p className="m-0 flex flex-wrap items-center gap-[0.5em] font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
      {items.map((it, i) => (
        <span key={i} className="contents">
          {i ? (
            <span aria-hidden className="text-hairline">
              {"//"}
            </span>
          ) : null}
          <span>{it}</span>
        </span>
      ))}
    </p>
  );
}
