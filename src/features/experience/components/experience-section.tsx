import { roles } from "@/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="reveal mb-12 flex items-end justify-between gap-6" data-reveal="blur">
          <h2 className="display-xl text-[clamp(2rem,6vw,5rem)] text-ink">
            The
            <br />
            <span className="text-dim">track record</span>
          </h2>
          <span className="label pb-3">(04) Experience</span>
        </div>

        <div className="border-t border-line" data-reveal-stagger="120">
          {roles.map((role) => (
            <div
              key={role.title}
              data-reveal="left"
              className="reveal grid gap-4 border-b border-line py-8 md:grid-cols-12"
            >
              <div
                className={`font-mono text-[11px] uppercase tracking-[0.16em] md:col-span-3 ${
                  role.current ? "text-signal" : "text-dim"
                }`}
              >
                {role.period}
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display text-2xl uppercase text-ink">{role.title}</h3>
                <div className="label mt-2">{role.company}</div>
              </div>
              <p className="text-sm leading-relaxed text-dim md:col-span-4">{role.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
