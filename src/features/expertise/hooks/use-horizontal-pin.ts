import { useEffect, useRef } from "react";

/**
 * Pins a section and scrubs its inner track horizontally while the user scrolls
 * vertically (GSAP + ScrollTrigger). Loads GSAP after hydration only, so SSR and
 * the initial bundle stay untouched. Falls back to native horizontal swiping when
 * motion is reduced or GSAP is unavailable.
 */
export function useHorizontalPin<T extends HTMLElement = HTMLDivElement>(
  onProgress?: (progress: number) => void,
) {
  const pinRef = useRef<T | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // No pinning: the track stays natively swipeable inside its own overflow box.
      track.parentElement?.setAttribute("data-scroll-mode", "native");
      return;
    }

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const viewport = track.parentElement;
        const distance = () => Math.max(0, track.scrollWidth - (viewport?.clientWidth ?? 0));
        const ghost = ghostRef.current;
        const bar = barRef.current;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            // Scroll length mirrors the horizontal travel for a 1:1, natural feel.
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              onProgressRef.current?.(self.progress);
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Giant background word drifts slower than the cards for parallax depth.
        if (ghost) {
          const getGhostDistance = () => {
            const viewportWidth = viewport?.clientWidth ?? window.innerWidth;

            return Math.max(0, ghost.scrollWidth - viewportWidth);
          };

          const getGhostStart = () => {
            if (window.innerWidth < 768) {
              // Mobile: show roughly the last 2–3 letters initially.
              return -getGhostDistance() + 40;
            }

            // Desktop: start from the beginning.
            return 0;
          };

          gsap.fromTo(
            ghost,
            {
              x: getGhostStart,
            },
            {
              x: () => (window.innerWidth < 768 ? 0 : distance() * 0.6),
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }, pin);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("orientationchange", refresh);

      cleanup = () => {
        window.removeEventListener("orientationchange", refresh);
        ctx.revert();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return { pinRef, trackRef, ghostRef, barRef };
}
