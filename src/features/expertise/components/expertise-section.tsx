import { capabilities } from "@/data";

import { useHorizontalPin } from "../hooks/use-horizontal-pin";

export function ExpertiseSection() {
  const { pinRef, trackRef } = useHorizontalPin<HTMLDivElement>();

  return (
    <section id="expertise" className="border-b border-line/70">
      <div ref={pinRef} className="relative overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="reveal mb-12 flex items-end justify-between gap-6" data-reveal="blur">
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
              {capabilities.map((item) => (
                <div
                  key={item.id}
                  className="row-link group flex w-[80vw] shrink-0 snap-start flex-col gap-4 border-b border-l border-line px-6 py-10 first:border-l-0 sm:w-[46vw] lg:w-[30vw] lg:px-8 lg:py-12"
                >
                  <span className="font-mono text-[11px] text-signal">{item.id}</span>
                  <h3 className="font-display text-2xl uppercase text-ink transition-colors duration-300 group-hover:text-signal lg:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
