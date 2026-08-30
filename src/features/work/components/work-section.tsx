import { projects } from "@/data";
import { caseFileLabel } from "@/data/transforms";

export function WorkSection() {
  return (
    <section id="work" className="border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="reveal mb-12 flex items-end justify-between gap-6" data-reveal="blur">
          <h2 className="display-xl text-[clamp(2rem,6vw,5rem)] text-ink">
            Selected
            <br />
            <span className="text-dim">work</span>
          </h2>
          <span className="label pb-3">{caseFileLabel(projects)}</span>
        </div>

        <div className="border-t border-line" data-reveal-stagger="110">
          {projects.map((project) => (
            <a
              key={project.id}
              href="#contact"
              data-reveal="left"
              className="row-link reveal group grid items-center gap-6 border-b border-line px-2 py-8 md:grid-cols-12 lg:py-10"
            >
              <span className="font-mono text-[11px] text-signal md:col-span-1">{project.id}</span>

              <div className="md:col-span-5">
                <div className="display-xl text-[clamp(1.6rem,4vw,3rem)] text-ink transition-colors duration-300 group-hover:text-signal">
                  {project.title}
                </div>
                <div className="label mt-2">{project.meta}</div>
              </div>

              <p className="text-sm leading-relaxed text-dim md:col-span-3">{project.tagline}</p>

              <div className="hidden grid-cols-3 gap-px border border-line bg-line md:col-span-3 md:grid">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="bg-canvas px-3 py-2.5 text-center">
                    <div className="label !text-[9px] !tracking-[0.16em]">{stat.label}</div>
                    <div className="mt-1 font-display text-sm uppercase text-ink">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 md:col-span-11 md:col-start-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
