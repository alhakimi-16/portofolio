"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/providers/I18nProvider";
import { gsap } from "@/lib/gsap";
import { INTRO_SEEN_KEY, isIntroReady, markIntroReady } from "@/lib/intro";
import { lockScroll } from "@/lib/scroll-lock";

const EPOCHS = 12;

/**
 * First-visit intro: a model "trains" (epochs tick up, loss falls), then the
 * curtain lifts. Skipped on repeat visits within a session and for reduced motion.
 */
export function Preloader({ name }: { name: string }) {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    // only once per session (and never again after a client-side language switch)
    if (!el || isIntroReady() || html.hasAttribute("data-intro-seen")) {
      markIntroReady();
      return;
    }

    const unlock = lockScroll();
    const counter = el.querySelector<HTMLElement>("[data-counter]");
    const epoch = el.querySelector<HTMLElement>("[data-epoch]");
    const loss = el.querySelector<HTMLElement>("[data-loss]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    const progress = { value: 0 };

    const finish = () => {
      html.setAttribute("data-intro-seen", "");
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.to(progress, {
      value: 1,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        const p = progress.value;
        if (counter) counter.textContent = String(Math.round(p * 100)).padStart(3, "0");
        if (epoch) epoch.textContent = String(Math.min(EPOCHS, Math.floor(p * EPOCHS) + 1)).padStart(2, "0");
        if (loss)
          loss.textContent = (0.93 * Math.exp(-4.4 * p) + 0.011 + 0.012 * Math.sin(p * 38) * (1 - p)).toFixed(4);
        if (bar) bar.style.transform = `scaleX(${p})`;
      },
    })
      .to(
        el.querySelectorAll("[data-fade]"),
        { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.03 },
        "+=0.1",
      )
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.15 }, "-=0.2")
      .add(() => {
        unlock();
        markIntroReady();
      }, "-=0.8")
      .add(finish);

    return () => {
      tl.kill();
      unlock();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[80] flex-col justify-between bg-bg gutter pt-6 pb-8 text-fg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex justify-between label text-muted">
        <span className="overflow-hidden">
          <span data-fade className="block">
            {t.preloader.training}…
          </span>
        </span>
        <span className="overflow-hidden">
          <span data-fade className="block">
            {name}
          </span>
        </span>
      </div>

      <div className="overflow-hidden">
        <span data-fade data-counter className="block display text-[clamp(6rem,30vw,26rem)] leading-[0.8] tabular">
          000
        </span>
      </div>

      <div>
        <div className="flex justify-between label text-muted">
          <span className="overflow-hidden">
            <span data-fade className="block">
              {t.preloader.epoch}{" "}
              <span data-epoch className="text-fg">
                01
              </span>
              /{EPOCHS}
            </span>
          </span>
          <span className="overflow-hidden">
            <span data-fade className="block">
              {t.preloader.loss}{" "}
              <span data-loss className="text-fg tabular">
                0.9410
              </span>
            </span>
          </span>
        </div>
        <div className="mt-3 h-px bg-line">
          <div data-bar className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
