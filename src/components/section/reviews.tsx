"use client";
import { useLanguage } from "@/contexts/language-context";
import { useBlurFade } from "@/hooks/use-blur-fade";
import type { Review } from "@/types/user";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-zinc-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  const ref = useBlurFade<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-animate
      style={{ transitionDelay: `${delay}ms` }}
      className="p-6 rounded-xl border border-[#1a1a1a] bg-zinc-950/60 flex flex-col gap-4"
    >
      <StarRating rating={review.rating} />
      <p className="font-sans text-sm text-zinc-300 leading-relaxed">
        &ldquo;{review.reviewText}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="size-9 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.avatar}
            alt={review.name}
            className="size-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div>
          <p className="font-sans text-xs font-semibold text-zinc-200">
            {review.name}
          </p>
          <p className="font-mono text-[10px] text-zinc-600">{review.position}</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { data } = useLanguage();
  const { sectionTitles, reviews } = data;

  const titleRef = useBlurFade<HTMLDivElement>();

  return (
    <section id="reviews" className="w-full py-24 px-4 max-w-6xl mx-auto">
      <div ref={titleRef} data-animate className="mb-12 text-center">
        <p className="font-mono text-xs text-zinc-600 tracking-widest uppercase mb-2">
          ./reviews
        </p>
        <h2 className="font-sans text-3xl font-bold text-zinc-100 mb-3">
          {sectionTitles.reviews}
        </h2>
        <p className="font-sans text-sm text-zinc-500 max-w-md mx-auto">
          {sectionTitles.reviewsDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
