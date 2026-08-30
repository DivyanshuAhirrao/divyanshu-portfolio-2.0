import { useEffect, useRef } from "react";

import { getMotionIntensity } from "@/hooks/motion/use-motion-intensity";

/**
 * Buttery scroll parallax. The element chases scrollY with exponential
 * smoothing so motion glides instead of snapping to coarse scroll events.
 *
 * Mobile hardening:
 * - Touch/narrow viewports use a reduced factor (mobile scroll deltas are huge
 *   relative to viewport height, so full-strength parallax reads as jitter).
 * - The rAF loop keeps running for a short tail after the last scroll event,
 *   which is what smooths iOS/Android batched, irregular scroll dispatch.
 * - Per-frame catch-up is capped and writes are quantised, so a fast flick
 *   can't produce a large jump or sub-pixel shimmer.
 * - `subtle` motion intensity disables the transform entirely.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(factor = 0.18) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none), (max-width: 767px)");

    let raf = 0;
    let idleFrames = 0;
    let current = window.scrollY;
    let lastY = NaN;
    let lastOpacity = NaN;

    const reset = () => {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.willChange = "";
      lastY = NaN;
      lastOpacity = NaN;
    };

    const enabled = () => !reduce.matches && getMotionIntensity() === "full";

    const tick = () => {
      raf = 0;
      if (!enabled()) {
        reset();
        return;
      }

      const mobile = coarse.matches;
      const strength = factor * (mobile ? 0.45 : 1);
      const ease = mobile ? 0.09 : 0.13;
      const maxStep = mobile ? 26 : 60; // px of catch-up per frame

      const target = window.scrollY;
      let step = (target - current) * ease;
      if (step > maxStep) step = maxStep;
      if (step < -maxStep) step = -maxStep;
      current += step;

      const settled = Math.abs(target - current) < 0.2;
      if (settled) current = target;

      // Quantise writes: kills sub-pixel shimmer during fast flicks
      const y = Math.round(current * strength * 2) / 2;
      const opacity = Math.round(Math.max(1 - current / 620, 0) * 50) / 50;

      if (y !== lastY) {
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        lastY = y;
      }
      if (opacity !== lastOpacity) {
        el.style.opacity = String(opacity);
        lastOpacity = opacity;
      }

      // Keep the loop alive briefly after scrolling stops (batched mobile events)
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames < 8) {
        raf = requestAnimationFrame(tick);
      } else {
        el.style.willChange = "";
      }
    };

    const schedule = () => {
      idleFrames = 0;
      if (!enabled()) return;
      el.style.willChange = "transform, opacity";
      if (!raf) raf = requestAnimationFrame(tick);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("touchmove", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduce.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("touchmove", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
      if (raf) cancelAnimationFrame(raf);
      reset();
    };
  }, [factor]);

  return ref;
}
