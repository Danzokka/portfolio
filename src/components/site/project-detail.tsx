"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/language-context";
import { useWipeNavigate } from "@/contexts/wipe-context";
import { Button, ButtonLink } from "@/components/ds/button";
import { EXT, hasIcon, ic, LAYER, Project, PROJECTS } from "@/data/portfolio";
import { SceneBg } from "./scene-bg";
import { TechIcon } from "./ui";

const BOX_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='5' y='5' width='14' height='14' fill='none' stroke='#00FF88' stroke-width='2'/></svg>",
  );

const wrap = "px-gutter mx-auto max-w-[1440px]";
const block = `${wrap} grid gap-7 py-[clamp(56px,10vh,104px)]`;

function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[12px] tracking-[.15em] text-muted uppercase">
      <span className="font-bold text-green">{n}</span>
      <span>{"// " + label}</span>
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}

function Shot({
  src,
  label,
  main,
  zoom,
  onOpen,
}: {
  src: string;
  label: string;
  main?: boolean;
  zoom: string;
  onOpen: () => void;
}) {
  const box = clsx(
    "group relative overflow-hidden bg-deep",
    main ? "col-span-full aspect-[16/8] border-2 border-hairline" : "aspect-[16/10] border border-hairline",
  );
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={clsx(
        box,
        "cursor-zoom-in p-0 text-left transition-[transform,border-color,box-shadow] duration-150 ease-out-expo hover:border-green hover:shadow-[6px_6px_0_#00FF88] hover:[transform:translate(-3px,-3px)]",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="block size-full object-cover object-top" />
      <span className="absolute right-3 bottom-3 bg-green px-2 py-1 font-mono text-[11px] font-bold tracking-[.12em] text-ink uppercase opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {zoom}
      </span>
    </button>
  );
}

/** Full-screen viewer for the project screenshots: arrows/keys to step, Esc or a click outside to close. */
function ShotViewer({
  shots,
  index,
  setIndex,
  onClose,
  title,
}: {
  shots: string[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
  title: string;
}) {
  const { t } = useLanguage();
  const n = shots.length;
  const step = (d: number) => setIndex((index + d + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((index + 1) % n);
      if (e.key === "ArrowLeft") setIndex((index - 1 + n) % n);
    };
    addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, n, setIndex]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={title}
      className="fixed inset-0 z-[150] flex flex-col bg-[rgba(7,9,13,.96)] backdrop-blur-sm"
    >
      <div className="px-gutter flex items-center justify-between gap-4 border-b border-hairline py-3 font-mono text-[12px] tracking-[.15em] text-muted uppercase">
        <span>
          <span className="text-green">{"// " + t.prints}</span> · {title}
        </span>
        <span className="font-score text-[22px] tracking-normal text-muted">
          {String(index + 1).padStart(2, "0")}
          <span className="text-hairline">/</span>
          {String(n).padStart(2, "0")}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-[clamp(12px,3vw,40px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={shots[index]}
          src={shots[index]}
          alt={`${title} ${index + 1}`}
          onClick={(e) => e.stopPropagation()}
          className="block max-h-full max-w-full border-2 border-hairline object-contain shadow-[10px_10px_0_color-mix(in_srgb,#00FF88_30%,#090A0E)]"
        />
      </div>

      <div onClick={(e) => e.stopPropagation()} className="px-gutter grid gap-3 border-t border-hairline py-3">
        {n > 1 && (
          <div className="flex justify-center gap-2 overflow-x-auto scrollbar-none">
            {shots.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}`}
                className={clsx(
                  "h-14 w-24 flex-none cursor-pointer overflow-hidden border-2 bg-deep p-0 transition-[border-color,opacity] duration-150",
                  i === index ? "border-green opacity-100" : "border-hairline opacity-50 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt="" className="block size-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-3">
          {n > 1 && (
            <Button size="sm" variant="secondary" onClick={() => step(-1)}>
              {t.prev}
            </Button>
          )}
          {n > 1 && (
            <div className="flex gap-1">
              {shots.map((s, i) => (
                <span
                  key={s}
                  onClick={() => setIndex(i)}
                  className={`h-1 cursor-pointer transition-[width] duration-200 ease-out-expo ${i === index ? "w-6 bg-green" : "w-2 bg-hairline"}`}
                />
              ))}
            </div>
          )}
          {n > 1 && (
            <Button size="sm" onClick={() => step(1)}>
              {t.next}
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onClose}>
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetail({ project: dp }: { project: Project }) {
  const { t, lang, li } = useLanguage();
  const navigate = useWipeNavigate();
  const [shown, setShown] = useState(false);
  const dI = PROJECTS.findIndex((p) => p.slug === dp.slug);
  const nx = PROJECTS[(dI + 1) % PROJECTS.length];
  const close = () => navigate("/#projetos");
  const [viewer, setViewer] = useState<number | null>(null);
  const viewerRef = useRef(viewer);
  viewerRef.current = viewer;

  useEffect(() => {
    const id = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(id);
  }, []);

  // Esc closes the screenshot viewer first, and only leaves the page when it is closed
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (viewerRef.current !== null) setViewer(null);
      else navigate("/#projetos");
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [navigate]);

  // architecture lanes: explicit for devops projects, derived from the tech list otherwise
  let used: [string, string[]][];
  if (dp.arch) used = dp.arch.map((a) => [li ? a[1] : a[0], a[2]]);
  else {
    const lanes: [keyof typeof t.layers, string[]][] = [["user", []], ["fe", []], ["api", []], ["db", []], ["infra", []]];
    dp.tech.forEach((n) => lanes.find((x) => x[0] === LAYER[n])?.[1].push(n));
    lanes[0][1].push(lang === "pt" ? "navegador" : "browser");
    used = lanes.filter((x) => x[1].length).map(([k, it]) => [t.layers[k], it]);
  }

  const shots = dp.shots ?? [];
  const mainShot = dp.image ?? shots[0];
  const extraShots = dp.image ? shots : shots.slice(1);
  const allShots = [mainShot, ...extraShots].filter((s): s is string => !!s);

  const story = dp.story?.[lang];
  const hasDesc = !!story?.desc.length,
    hasLearn = !!story?.learn.length;
  let k = 0;
  const nk = () => String(++k).padStart(2, "0");
  const K = { prints: allShots.length ? nk() : "", overview: nk(), desc: hasDesc ? nk() : "", learn: hasLearn ? nk() : "", stack: nk(), arch: nk() };

  const longest = Math.max(...dp.title.split(/\s+/).map((w) => w.length));
  const titleSize = `clamp(3rem, min(14vw, ${(150 / longest).toFixed(1)}vw), 13rem)`;
  const specs = [
    { k: t.specs[0], v: dp.dates },
    { k: t.specs[1], v: dp.category },
    { k: t.specs[2], v: dp.tech.length + " " + t.tools },
    { k: t.specs[3], v: "● " + t.statusV },
  ];
  const inT = shown ? "opacity-100 [transform:none]" : "opacity-0";

  return (
    <div className="relative isolate min-h-screen bg-ink">
      <div className="sticky top-0 z-[5] border-b border-hairline bg-black/85 backdrop-blur-md">
        <div className={`${wrap} flex items-center justify-between gap-4 py-3`}>
          <Button size="sm" variant="secondary" onClick={close}>
            {t.back}
          </Button>
          <span className="font-mono text-[12px] text-muted max-sm:hidden">
            ~/projetos/<span className="text-green">{dp.slug}</span>
            {dp.ext || EXT[dp.category]}
          </span>
          <span className="font-mono text-[12px] text-muted">
            {String(dI + 1).padStart(2, "0") + " / " + String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none sticky top-0 -z-10 h-0">
        <SceneBg
          kind="logs"
          className="absolute inset-x-0 top-0 h-screen opacity-45 [mask-image:radial-gradient(80%_80%_at_50%_45%,#000_25%,transparent)]"
        />
      </div>

      <section
        className={`relative z-[1] ${wrap} pt-[clamp(40px,8vh,96px)] transition-[opacity,transform] delay-150 duration-[500ms,700ms] ease-[linear,cubic-bezier(.16,1,.3,1)] ${inT}`}
        style={shown ? undefined : { transform: "translateY(40px)" }}
      >
        <div className="flex flex-wrap gap-3 font-mono text-[12px] tracking-[.15em] text-muted uppercase">
          <span className="text-green">{"// " + dp.category}</span>
          <span>{dp.dates}</span>
          <span className="flex items-center gap-1.5 text-green">
            <span className="size-[7px] animate-pulse-dot rounded-full bg-green" />
            {t.live}
          </span>
        </div>
        <h1 className="mt-5 mb-7 poster leading-[.84] [overflow-wrap:anywhere]" style={{ fontSize: titleSize }}>
          {dp.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          {dp.href ? (
            <ButtonLink size="lg" href={dp.href} target="_blank" rel="noreferrer">
              {dp.code ? t.code : t.visit}
            </ButtonLink>
          ) : (
            <span className="flex items-center gap-2 border border-hairline bg-surface px-4 py-3 font-mono text-[12px] tracking-[.08em] text-muted uppercase">
              {t.internal}
            </span>
          )}
        </div>
      </section>

      {allShots.length > 0 && (
        <section
          className={`relative z-[1] ${wrap} mt-[clamp(40px,6vh,72px)] grid gap-5 transition-[opacity,transform] delay-300 duration-[500ms,900ms] ease-[linear,cubic-bezier(.16,1,.3,1)] ${inT}`}
          style={shown ? undefined : { transform: "translateY(80px)" }}
        >
          <Kicker n={K.prints} label={t.prints} />
          {/* auto-fill keeps the small prints at a fixed size even when there are only one or two */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3">
            {allShots.map((src, i) => (
              <Shot
                key={src}
                main={i === 0}
                src={src}
                label={i === 0 ? t.shotPh[0] : t.shotPh[1] + " " + String(i + 1).padStart(2, "0")}
                zoom={t.zoom}
                onOpen={() => setViewer(i)}
              />
            ))}
          </div>
        </section>
      )}

      <section className={block}>
        <Kicker n={K.overview} label={t.overview} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
          <p className="m-0 text-[clamp(20px,1.8vw,26px)] leading-[1.5] text-fg [text-wrap:pretty]">{dp[lang][1]}</p>
          <div className="grid border border-hairline bg-surface">
            {specs.map((sp) => (
              <div key={sp.k} className="flex justify-between gap-4 border-b border-hairline px-[18px] py-4 font-mono text-[14px]">
                <span className="text-[12px] tracking-[.1em] text-muted uppercase">{sp.k}</span>
                <span>{sp.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {hasDesc && story && (
        <div className="border-t border-hairline bg-deep">
          <section className={block}>
            <Kicker n={K.desc} label={t.descK} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[clamp(32px,5vw,72px)]">
              <h2 className="m-0 poster text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[.92] [text-wrap:balance]">{story.title}</h2>
              <div className="grid gap-[18px]">
                {story.desc.map((pg) => (
                  <p key={pg} className="m-0 text-[17px] leading-[1.7] text-fg [text-wrap:pretty]">
                    {pg}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {hasLearn && story && (
        <div className="border-t border-hairline">
          <section className={block}>
            <Kicker n={K.learn} label={t.learnK} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
              {story.learn.map((x, i) => (
                <div
                  key={x}
                  className="grid content-start gap-3.5 border border-hairline bg-surface p-[22px] transition-[border-color,transform] duration-150 hover:border-green hover:[transform:translateY(-2px)]"
                >
                  <span className="font-score text-[56px] leading-[.85] font-semibold text-green">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] leading-[1.6] text-fg [text-wrap:pretty]">{x}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="border-t border-hairline bg-deep">
        <section className={block}>
          <Kicker n={K.stack} label={t.stackK} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2">
            {dp.tech.map((n, i) => (
              <div
                key={n}
                className="flex items-center justify-between gap-2.5 border border-hairline bg-surface p-4 transition-[border-color,transform] duration-150 hover:border-green hover:[transform:translateY(-2px)]"
              >
                <span className="flex items-center gap-2.5 font-mono text-[14px]">
                  <TechIcon src={ic(n)} size={20} />
                  {n}
                </span>
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="border-y border-hairline">
        <section className={block}>
          <Kicker n={K.arch} label={t.architecture} />
          <div className="flex flex-wrap items-stretch gap-y-3">
            {used.map(([label, items], i) => (
              <div key={label} className="flex min-w-0 flex-[1_1_200px] items-center">
                <div
                  className={clsx(
                    "grid min-h-[150px] min-w-0 flex-1 content-start gap-3 border-2 bg-surface p-4",
                    i === used.length - 1 ? "border-green" : "border-hairline",
                  )}
                >
                  <div className="flex justify-between font-mono text-[12px] tracking-[.14em] uppercase">
                    <span className="text-green">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-muted">{label}</span>
                  </div>
                  <div className="grid gap-2">
                    {items.map((n) => (
                      <span key={n} className="flex items-center gap-2 font-mono text-[14px]">
                        <TechIcon src={hasIcon(n) ? ic(n) : BOX_ICON} size={16} />
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                {i < used.length - 1 && (
                  <div
                    aria-hidden
                    className="h-0.5 w-10 flex-none animate-dash bg-[size:24px_2px]"
                    style={{ backgroundImage: "linear-gradient(90deg,#00FF88 0 12px,transparent 12px 24px)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <a
        href={`/projetos/${nx.slug}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          navigate(`/projetos/${nx.slug}`);
        }}
        className="block text-[inherit] transition-[background] duration-200 ease-in-out hover:bg-surface hover:text-[inherit]"
      >
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-6 py-[clamp(48px,9vh,96px)]`}>
          <div className="grid gap-3">
            <span className="font-mono text-[12px] tracking-[.15em] text-muted uppercase">{t.nextProject}</span>
            <span className="poster text-[clamp(3rem,9vw,8rem)] leading-[.86] text-green">{nx.title}</span>
          </div>
          <span className="font-mono text-[40px] text-green">→</span>
        </div>
      </a>

      {viewer !== null && allShots.length > 0 && (
        <ShotViewer shots={allShots} index={viewer} setIndex={setViewer} onClose={() => setViewer(null)} title={dp.title} />
      )}
    </div>
  );
}
