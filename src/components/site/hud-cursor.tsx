"use client";

import { useEffect, useRef, useState } from "react";
import { pointer, startPointer } from "@/lib/pointer";

/** Corner-bracket cursor that trails the pointer and grows over links and buttons. Fine pointers only. */
export function HudCursor() {
  const [on, setOn] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    startPointer();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on a media query only known client-side
    setOn(true);
    const style = document.createElement("style");
    style.textContent = "*{cursor:none!important}";
    document.head.appendChild(style);
    const c = { x: pointer.x, y: pointer.y };
    let raf = 0;
    const step = () => {
      c.x += (pointer.x - c.x) * 0.2;
      c.y += (pointer.y - c.y) * 0.2;
      const box = boxRef.current,
        dot = dotRef.current;
      if (box) {
        const s = pointer.big ? 44 : 28;
        box.style.transform = `translate(${c.x}px,${c.y}px)`;
        box.style.width = s + "px";
        box.style.height = s + "px";
        box.style.margin = `${-s / 2}px 0 0 ${-s / 2}px`;
      }
      if (dot) dot.style.transform = `translate(${pointer.x}px,${pointer.y}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      style.remove();
    };
  }, []);

  if (!on) return null;
  const corner = "absolute size-2 border-green";
  return (
    <>
      <div ref={boxRef} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[400] -mt-3.5 -ml-3.5 size-7">
        <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
        <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
        <span className={`${corner} right-0 bottom-0 border-r-2 border-b-2`} />
      </div>
      <div ref={dotRef} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[401] -mt-0.5 -ml-0.5 size-1 bg-green" />
    </>
  );
}
