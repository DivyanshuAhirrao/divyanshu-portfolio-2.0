import { useEffect, useRef } from "react";

/**
 * Adds the `reveal-in` class to every `[data-reveal]` descendant of the
 * returned ref as it scrolls into view.
 *
 * - `data-reveal="<variant>"` picks the animation (blur | left | right | scale | wipe | line | word).
 * - Delays are declared at render time: inline `transitionDelay` for explicit
 *   ones, CSS `nth-child` rules for `[data-reveal-stagger]` containers. The
 *   observer never writes delays itself, so code-split sections can hydrate
 *   without style mismatches.
 *
 * Falls back to showing everything when IntersectionObserver is unavailable.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const show = (node: HTMLElement) => {
      node.classList.add("reveal-in");
      // Free the delay so hover transitions aren't delayed afterwards
      const clear = () => {
        node.style.transitionDelay = "0ms";
        node.style.willChange = "auto";
        node.removeEventListener("transitionend", clear);
      };
      node.addEventListener("transitionend", clear);
    };

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    // Anchor-jump safety: if the page jumps past a node (nav links, instant
    // scroll), reveal it instantly instead of leaving it hidden above.
    const catchUp = () => {
      nodes.forEach((node) => {
        if (node.classList.contains("reveal-in")) return;
        if (node.getBoundingClientRect().bottom < 0) {
          node.style.transitionDuration = "0s";
          show(node);
          requestAnimationFrame(() => {
            node.style.transitionDuration = "";
          });
        }
      });
    };
    window.addEventListener("scroll", catchUp, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", catchUp);
    };
  }, []);

  return ref;
}
