import { useEffect, useRef } from "react";

/**
 * Pins a section and scrubs its inner track horizontally while the user scrolls
 * vertically (GSAP + ScrollTrigger). Loads GSAP after hydration only, so SSR and
 * the initial bundle stay untouched. Falls back to native horizontal swiping when
 * motion is reduced or GSAP is unavailable.
 */
export function useHorizontalPin<T extends HTMLElement = HTMLDivElement>() {
  const pinRef = useRef<T | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset["motion"] === "subtle";

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
        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

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
          },
        });
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

  return { pinRef, trackRef };
}
