// Shared pointer state read by the HUD cursor and the 3D scenes. One listener for the whole app.

export const pointer = { x: 0, y: 0, nx: 0, ny: 0, big: false };

let started = false;

export function startPointer() {
  if (started || typeof window === "undefined") return;
  started = true;
  pointer.x = innerWidth / 2;
  pointer.y = innerHeight / 2;
  window.addEventListener("mousemove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.nx = (e.clientX / innerWidth) * 2 - 1;
    pointer.ny = (e.clientY / innerHeight) * 2 - 1;
    const tg = e.target as Element | null;
    pointer.big = !!tg?.closest?.("a,button,[data-hover]");
  });
}
