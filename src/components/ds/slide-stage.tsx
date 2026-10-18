import { Fragment, ReactNode } from "react";
import { Slide } from "@/data/portfolio";
import { LogoHorizontal } from "./brand";

// dan_the_dev DS · CarouselSlide + SlideStage (components/carousel/*.jsx).
// Native 1080×1350 canvas, scaled down to `width`. Only the slide kinds the posts use are ported.
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;

const TONE: Record<string, string> = { muted: "#A7B0C5", accent: "#00FF88", danger: "#EF4444", green: "#00FF88" };

const posterH = "m-0 poster leading-[0.88] [text-wrap:balance]";
const h2 = "m-0 font-sans font-bold text-[68px] leading-[1.05] tracking-[-0.02em] [text-wrap:balance]";
const lead = "mt-10 mb-0 text-[42px] leading-[1.35] text-muted max-w-[840px] [text-wrap:pretty]";
const note = "mt-[26px] mb-0 text-[34px] leading-[1.4] text-muted";
const body = "absolute left-[72px] right-[72px]";

// *word* → solid green block (poster headlines)
function Em({ text }: { text?: string }) {
  if (!text) return null;
  return text.split(/(\*[^*]+\*)/).map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <span key={i} className="bg-green px-[0.1em] text-ink [box-decoration-break:clone]">
        {p.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

const LAYOUTS: Record<string, (s: Slide) => ReactNode> = {
  cover: (s) => (
    <div className={`${body} bottom-[220px]`}>
      <h1 className={`${posterH} text-[150px]`}>
        <Em text={s.title} />
      </h1>
      {s.lead ? <p className={lead}>{s.lead}</p> : null}
    </div>
  ),
  statement: (s) => (
    <div className={`${body} top-[330px]`}>
      <p className={`${posterH} text-[120px]`}>
        <Em text={s.text} />
      </p>
      <div className="mt-10 h-[14px] w-[196px] bg-green" />
    </div>
  ),
  terms: (s) => (
    <div className={`${body} top-[230px]`}>
      {s.terms?.map((x, k) => (
        <div
          key={x.abbr}
          className="grid grid-cols-[230px_1fr] gap-[30px]"
          style={{ borderTop: k ? "3px solid #252D39" : "none", padding: `${k ? 34 : 0}px 0 34px` }}
        >
          <span className={`${posterH} text-[130px] leading-[0.85] text-green`}>{x.abbr}</span>
          <div>
            <div className="text-[44px] font-bold">{x.name}</div>
            <div className="mt-2.5 text-[34px] leading-[1.4] text-muted">{x.text}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  bars: (s) => {
    const bars = s.bars ?? [];
    const max = Math.max(...bars.map((b) => b.value));
    return (
      <div className={`${body} top-[200px]`}>
        <h2 className={`${h2} mb-[70px]`}>{s.title}</h2>
        <div className="grid gap-[34px]">
          {bars.map((b, k) => {
            const last = k === bars.length - 1;
            return (
              <div key={b.label} className="grid grid-cols-[260px_1fr_130px] items-center gap-6">
                <span className="text-[36px] text-muted">{b.label}</span>
                <span className="relative h-[60px] border-[3px] border-hairline bg-surface">
                  <span
                    className="absolute inset-y-0 left-0 bg-green"
                    style={{ width: `${Math.max(3, (b.value / max) * 100)}%`, opacity: last ? 1 : 0.55 }}
                  />
                </span>
                <span className={`text-right font-score text-[60px] font-extrabold ${last ? "text-green" : "text-fg"}`}>
                  {b.text}
                </span>
              </div>
            );
          })}
        </div>
        {s.note ? <p className={note}>{s.note}</p> : null}
      </div>
    );
  },
  terminal: (s) => (
    <div className={`${body} top-[190px]`}>
      <h2 className={`${h2} mb-10`}>{s.title}</h2>
      <div className="border-[3px] border-hairline bg-[#05070A] p-[30px] font-mono text-[30px] leading-[1.7]">
        {s.lines?.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap" style={{ color: TONE[l.tone ?? ""] ?? "#F4F7FF" }}>
            {l.prompt ? <span className="text-green">$ </span> : null}
            {l.text}
          </div>
        ))}
        <div>
          <span className="text-green">$ </span>
          <span className="bg-green text-ink">{" "}</span>
        </div>
      </div>
      {s.note ? <p className={note}>{s.note}</p> : null}
    </div>
  ),
  cta: (s) => (
    <div className={`${body} top-[300px]`}>
      <p className={`${posterH} text-[124px]`}>
        <Em text={s.text} />
      </p>
      {s.action ? <p className={`${lead} mt-11`}>{s.action}</p> : null}
      <div className="mt-12 flex flex-wrap gap-5">
        <span className="bg-green px-[34px] py-[22px] font-mono text-[30px] font-bold tracking-[0.08em] text-ink uppercase shadow-[8px_8px_0_color-mix(in_srgb,#00FF88_30%,#090A0E)]">
          Salvar post
        </span>
        <span className="border-[3px] border-hairline px-[30px] py-[19px] font-mono text-[30px] font-bold tracking-[0.08em] uppercase">
          @dan_the_dev
        </span>
      </div>
    </div>
  ),
};

function CarouselSlide({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  const Body = LAYOUTS[slide.kind] ?? LAYOUTS.statement;
  const first = index === 0;
  const last = slide.kind === "cta";
  const footLabel = last ? "fim" : first ? "arrasta →" : "→";
  return (
    <div
      data-slide-kind={slide.kind}
      className="relative overflow-hidden bg-deep font-sans text-fg"
      style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[size:120px_120px] [mask-image:linear-gradient(#000,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(#F4F7FF08 4px, transparent 4px), linear-gradient(90deg, #F4F7FF08 4px, transparent 4px)",
        }}
      />
      {first || last ? (
        <div aria-hidden className="absolute inset-9">
          <span className="absolute top-0 left-0 size-11 border-t-4 border-l-4 border-green" />
          <span className="absolute right-0 bottom-0 size-11 border-r-4 border-b-4 border-green" />
        </div>
      ) : null}
      <div className="absolute top-16 right-[72px] left-[72px] flex items-center justify-between">
        <span className="font-mono text-[26px] tracking-[0.16em] text-green uppercase">{slide.kicker}</span>
        <span className="font-score text-[40px] font-extrabold text-muted">
          {String(index + 1).padStart(2, "0")}
          <span className="text-hairline">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>
      <div aria-hidden className="absolute top-[124px] right-[72px] left-[72px] flex gap-2.5">
        {Array.from({ length: total }, (_, k) => (
          <span key={k} className={`h-2.5 flex-1 ${k <= index ? "bg-green" : "bg-hairline"}`} />
        ))}
      </div>
      {Body(slide)}
      <div className="absolute right-[72px] bottom-16 left-[72px] flex items-center justify-between">
        <LogoHorizontal size={30} />
        <span className="font-mono text-[24px] tracking-[0.16em] text-muted uppercase">{footLabel}</span>
      </div>
    </div>
  );
}

export function SlideStage({
  slide,
  index = 0,
  total = 1,
  width = 360,
}: {
  slide: Slide;
  index?: number;
  total?: number;
  width?: number;
}) {
  const scale = width / SLIDE_WIDTH;
  return (
    <div className="flex-none overflow-hidden border border-hairline" style={{ width, height: SLIDE_HEIGHT * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
        <CarouselSlide slide={slide} index={index} total={total} />
      </div>
    </div>
  );
}
