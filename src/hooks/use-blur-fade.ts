import { useEffect, useRef } from "react";

interface UseBlurFadeOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Returns a ref to attach to a container element.
 * When the element enters the viewport, `data-visible="true"` is set on it,
 * triggering the CSS transition defined in globals.css via [data-animate].
 */
export function useBlurFade<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
}: UseBlurFadeOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
