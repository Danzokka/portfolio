"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button, ButtonLink } from "@/components/ds/button";
import { SlideStage } from "@/components/ds/slide-stage";
import { Post, POSTS } from "@/data/portfolio";
import { PosterTitle, SectionKicker } from "./ui";

const POST_FILTERS = ["all", "carrossel", "reel"] as const;
const IG = "https://instagram.com/dan_the_dev";

function ProfilePic({ size }: { size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/instagram-profile.png" alt="dan_the_dev" className="block rounded-full" style={{ width: size, height: size }} />
  );
}

function Lightbox({ post, onClose }: { post: Post; onClose: () => void }) {
  const { t, li } = useLanguage();
  const [idx, setIdx] = useState(0);
  const n = post.slides.length;
  const step = (d: number) => setIdx((i) => (i + d + n) % n);
  const [width, setWidth] = useState(440);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- viewport is only known client-side
    setWidth(Math.min(440, innerWidth - 80));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + n) % n);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [n, onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={post.title}
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-[rgba(7,9,13,.94)] p-6"
    >
      <div onClick={(e) => e.stopPropagation()} className="grid max-w-[960px] items-center gap-8 md:grid-cols-[auto_minmax(0,360px)]">
        <div className="grid justify-items-center gap-3.5">
          <SlideStage slide={post.slides[idx]} index={idx} total={n} width={width} />
          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={() => step(-1)}>
              {t.prev}
            </Button>
            <div className="flex gap-1">
              {post.slides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1 cursor-pointer transition-[width] duration-200 ease-out-expo ${i === idx ? "w-6 bg-green" : "w-2 bg-hairline"}`}
                />
              ))}
            </div>
            <Button size="sm" onClick={() => step(1)}>
              {t.next}
            </Button>
          </div>
        </div>
        <div className="grid content-start gap-4">
          <div className="flex items-center gap-2.5">
            <ProfilePic size={32} />
            <span className="font-mono text-[13px] font-semibold">@dan_the_dev</span>
            <span className="font-mono text-[11px] text-muted">{post.date[li]}</span>
          </div>
          <div className="poster text-[34px] leading-[.95]">{post.title}</div>
          <p className="m-0 text-[14px] leading-[1.6] whitespace-pre-wrap text-muted">{post.caption}</p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink size="sm" variant="outline" href={IG} target="_blank" rel="noreferrer">
              {t.openIg}
            </ButtonLink>
            <Button size="sm" variant="ghost" onClick={onClose}>
              {t.close}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Content() {
  const { t, li } = useLanguage();
  const [filter, setFilter] = useState<(typeof POST_FILTERS)[number]>("all");
  const [open, setOpen] = useState<Post | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const shown = filter === "all" ? POSTS : POSTS.filter((p) => p.type === filter);
  const strip = (d: number) => stripRef.current?.scrollBy({ left: d * 318, behavior: "smooth" });

  return (
    <section id="conteudo" className="py-section relative overflow-hidden border-t border-hairline">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40%_50%_at_0%_0%,#00FF8812_0%,transparent_70%)]" />
      <div className="px-gutter relative mx-auto max-w-[1440px]">
        <SectionKicker n="04" label="./dan_the_dev" right={<span>{POSTS.length + " " + t.posts}</span>} />
        <div className="mt-6 mb-10 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid gap-4">
            <PosterTitle inline a={t.contentA} em={t.contentEm} className="text-[clamp(2.8rem,7vw,7rem)] leading-[.9]" />
            <p data-reveal className="m-0 max-w-[36rem] text-[16px] leading-[1.6] text-muted [text-wrap:pretty]">
              {t.contentDesc}
            </p>
          </div>
          <a
            data-reveal
            href={IG}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 border border-hairline bg-surface py-3 pr-4 pl-3 text-[inherit] transition-[border-color,transform] duration-150 hover:border-green hover:text-[inherit] hover:[transform:translateY(-2px)]"
          >
            <ProfilePic size={52} />
            <span className="grid gap-[3px]">
              <span className="font-mono text-[15px] font-semibold">@dan_the_dev</span>
              <span className="font-mono text-[11px] tracking-[.08em] text-muted uppercase">{t.follow}</span>
            </span>
          </a>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {POST_FILTERS.map((k, i) => (
            <Button key={k} size="sm" variant={filter === k ? "primary" : "secondary"} onClick={() => setFilter(k)}>
              {t.postFilters[i]}
            </Button>
          ))}
          <span className="flex-1" />
          <span className="font-mono text-[11px] tracking-[.08em] text-muted">{t.postsLang}</span>
          <Button size="icon" variant="secondary" onClick={() => strip(-1)} aria-label={t.prev}>
            ←
          </Button>
          <Button size="icon" variant="secondary" onClick={() => strip(1)} aria-label={t.next}>
            →
          </Button>
        </div>
      </div>
      <div
        ref={stripRef}
        className="scrollbar-none relative flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth pt-2 pb-6"
        style={{ paddingInline: "max(clamp(20px,4vw,48px), calc((100vw - 1440px) / 2 + 48px))" }}
      >
        {shown.map((p) => (
          <div
            key={p.id}
            data-reveal
            onClick={() => setOpen(p)}
            data-hover
            className="grid flex-none cursor-pointer snap-start gap-3"
          >
            <div className="relative transition-[transform,box-shadow] duration-150 ease-out-expo hover:shadow-[6px_6px_0_#00FF88] hover:[transform:translate(-3px,-3px)]">
              <SlideStage slide={p.slides[0]} index={0} total={p.slides.length} width={300} />
              <span className="absolute top-2.5 right-2.5 bg-green px-[7px] py-1 font-mono text-[11px] font-bold tracking-[.12em] text-ink uppercase">
                {p.type === "reel" ? "▶ reel" : "▧ " + p.slides.length}
              </span>
            </div>
            <div className="flex w-[300px] items-baseline justify-between gap-3">
              <span className="text-[14px] leading-[1.3] font-semibold">{p.title}</span>
              <span className="flex-none font-mono text-[11px] text-muted">{p.date[li]}</span>
            </div>
            <span className="font-mono text-[11px] tracking-[.06em] text-muted">{p.tags}</span>
          </div>
        ))}
      </div>
      {open && <Lightbox post={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
