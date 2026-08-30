import { useParallax } from "../hooks/use-parallax";
import { contact } from "@/config/site";

const panel = [
  { label: "Status", value: "Open to work", dot: true },
  { label: "Based", value: "India · IST" },
  { label: "Focus", value: "Web · Mobile · AI" },
  { label: "Since", value: "2023" },
];

export function HeroSection() {
  const parallaxRef = useParallax<HTMLDivElement>(0.14);

  return (
    <section id="top" className="relative overflow-hidden border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="rise flex items-center gap-4 [animation-delay:1250ms]">
          <span className="h-1.5 w-1.5 bg-signal" />
          <span className="label">Full-stack Software Engineer</span>
          <span className="h-px flex-1 bg-line" />
          <span className="label">Portfolio · 2026</span>
        </div>

        <div ref={parallaxRef} className="mt-10">
          <h1 className="display-xl break-words text-[clamp(2.05rem,10.5vw,9rem)] text-ink">
            <span className="mask-line [&>span]:[animation-delay:1300ms]">
              <span className="whitespace-nowrap">Software that makes</span>
            </span>
            <span className="mask-line [&>span]:[animation-delay:1400ms] py-1">
              <span className="whitespace-nowrap">
                teams say <em className="not-italic text-signal">“yes”</em>
              </span>
            </span>
            <span className="mask-line [&>span]:[animation-delay:1500ms] py-1">
              <span className="whitespace-nowrap text-dim">before the demo ends.</span>
            </span>
          </h1>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="rise md:col-span-6 [animation-delay:1650ms]">
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink/90">
              I'm Divyanshu — I design and build production systems end to end: the interface people
              touch, the services behind it, and the pipeline that ships it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-signal px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-foreground transition-colors hover:bg-ink"
              >
                See selected work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 border border-line px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim transition-colors hover:border-ink hover:text-ink"
              >
                Start a project
              </a>
            </div>
          </div>

          <div className="rise grid grid-cols-2 gap-px self-end border border-line bg-line md:col-span-6 md:grid-cols-4 [animation-delay:1780ms]">
            {panel.map((item) => (
              <div key={item.label} className="bg-canvas p-5">
                <div className="label mb-3">{item.label}</div>
                <div className="flex items-center gap-2 font-display text-sm uppercase text-ink">
                  {item.dot ? <span className="h-1.5 w-1.5 animate-pulse bg-signal" /> : null}
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rise mt-16 flex items-center gap-3 [animation-delay:1900ms]">
          <span className="label">(Scroll to see how)</span>
          <span className="h-px w-16 bg-signal" />
        </div>
      </div>
    </section>
  );
}
