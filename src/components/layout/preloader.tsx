import { useEffect, useState } from "react";

/**
 * Editorial preloader: a coral progress rule and a counter that runs to 100,
 * then the whole panel slides up out of view.
 */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setGone(true);
      return;
    }

    let raf = 0;
    let start = 0;
    const duration = 1200;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(() => setGone(true), 1150);
    return () => window.clearTimeout(timer);
  }, [done]);

  if (gone) return null;

  return (
    <div className="preloader" data-done={done ? "true" : "false"} aria-hidden>
      <div className="w-full px-6 pb-8 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="label">Divyanshu Ahirrao — Portfolio</div>
          <div className="display-xl text-[clamp(3.5rem,12vw,10rem)] text-ink">
            {pct}
            <span className="text-signal">%</span>
          </div>
        </div>
        <div className="mt-6 h-px w-full bg-line">
          <div
            className="h-px bg-signal transition-[width] duration-150 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
