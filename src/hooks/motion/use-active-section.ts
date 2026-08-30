import { useEffect, useState } from "react";

/**
 * Scroll-linked active section tracker. Picks the section whose box covers
 * the reading line (~38% down the viewport), falling back to the last passed
 * section. rAF-throttled, passive listeners only.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.38;
      let next = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) next = id;
      }

      // Bottom of the page always activates the last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        next = ids[ids.length - 1] ?? next;
      }

      setActive((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids.join("|")]);

  return active;
}
