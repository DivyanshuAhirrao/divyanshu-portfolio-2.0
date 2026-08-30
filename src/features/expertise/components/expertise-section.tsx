import { useState } from "react";

import { capabilities } from "@/data";

import { useHorizontalPin } from "../hooks/use-horizontal-pin";

export function ExpertiseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { pinRef, trackRef, ghostRef, barRef } = useHorizontalPin<HTMLDivElement>((progress) => {
    const index = Math.min(capabilities.length - 1, Math.floor(progress * capabilities.length));
    setActiveIndex((current) => (current === index ? current : index));
  });

  return (
    <section id="expertise" className="border-b border-line/70 px-16">
      <div ref={pinRef} className="relative overflow-hidden">
        {/* Giant background word drifting at a slower rate — parallax depth. */}
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="display-xl pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(14rem,38vw,34rem)] leading-none text-ink/[0.04] will-change-transform"
        >
          EXPERTISE&nbsp;—&nbsp;EXPERTISE
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1320px] flex-col justify-center px-6 pb-16 pt-28 lg:px-10 lg:pt-32">
          <div
            className="reveal mb-10 flex items-end justify-between gap-1 lg:mb-14"
            data-reveal="blur"
          >
            <h2 className="display-xl text-[clamp(2rem,6vw,5rem)] text-ink">
              What I<br />
              <span className="text-dim">do</span>
            </h2>
            <span className="label pb-3">(03) {capabilities.length} disciplines</span>
          </div>

          <div
            className="overflow-hidden border-t border-line data-[scroll-mode=native]:overflow-x-auto data-[scroll-mode=native]:snap-x data-[scroll-mode=native]:snap-mandatory"
            data-scroll-mode="pinned"
          >
            <div
              ref={trackRef}
              className="flex w-max gap-0 will-change-transform"
              data-horizontal-track
            >
              {capabilities.map((item, i) => (
                <div
                  key={item.id}
                  className="row-link group flex h-[46vh] min-h-[320px] w-[80vw] shrink-0 snap-start flex-col justify-between gap-4 border-b border-l border-line px-6 py-10 first:border-l-0 sm:w-[46vw] lg:h-[52vh] lg:w-[30vw] lg:px-8 lg:py-12"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] text-signal">{item.id}</span>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i === activeIndex ? "bg-signal" : "bg-line"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl uppercase text-ink transition-colors duration-300 group-hover:text-signal lg:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-dim">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress rail: live card counter + scrub-linked bar. */}
          <div className="mt-8 flex items-center gap-5 lg:mt-10">
            <span className="label shrink-0 tabular-nums">
              {capabilities[activeIndex]?.id} / {capabilities.length.toString().padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-line/60">
              <div
                ref={barRef}
                className="h-px w-full origin-left scale-x-0 bg-signal will-change-transform"
              />
            </div>
            <span className="label hidden shrink-0 sm:inline">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
