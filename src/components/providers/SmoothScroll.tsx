"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import type { LenisOptions } from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerLenis } from "@/lib/scroll-lock";

// Kept outside the component: Lenis is re-created whenever its options change.
const options: LenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  anchors: { offset: 0 },
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
};

function ScrollTriggerSync() {
  const lenis = useLenis(() => ScrollTrigger.update());
  useEffect(() => {
    registerLenis(lenis);
    return () => registerLenis(undefined);
  }, [lenis]);
  return null;
}

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={options}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
