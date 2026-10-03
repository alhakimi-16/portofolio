import type Lenis from "lenis";

/**
 * Reference-counted scroll lock shared by the preloader, menu, drawer and command menu,
 * so closing one overlay never re-enables scrolling while another is still open.
 */
const locks = new Set<symbol>();
let lenis: Lenis | undefined;

function sync() {
  const locked = locks.size > 0;
  document.documentElement.toggleAttribute("data-scroll-locked", locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function registerLenis(instance: Lenis | undefined) {
  lenis = instance;
  if (typeof document !== "undefined") sync();
}

export function lockScroll(): () => void {
  const token = Symbol("scroll-lock");
  locks.add(token);
  sync();
  return () => {
    locks.delete(token);
    sync();
  };
}

export function scrollToTarget(target: string | number, options?: { immediate?: boolean; offset?: number }) {
  if (lenis) {
    lenis.scrollTo(target, { offset: options?.offset ?? 0, immediate: options?.immediate, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: options?.immediate ? "instant" : "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: options?.immediate ? "instant" : "smooth" });
}
