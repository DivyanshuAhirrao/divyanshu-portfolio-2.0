import { SplitText } from "@/components/motion/split-text";
import { principles } from "@/data";

export function AboutSection() {
  return (
    <section id="about" className="border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="reveal label mb-10" data-reveal="blur">
          (01) About
        </div>

        <p className="display-xl max-w-[24ch] text-[clamp(1.9rem,5.4vw,4.6rem)] leading-[0.95] text-ink">
          <SplitText text="Most products don't fail on ideas. They fail on the" step={26} />
          <span className="text-signal">
            {" "}
            <SplitText text="thousand small details" step={26} delay={280} />
          </span>{" "}
          <SplitText text="nobody budgeted for." step={26} delay={420} />
        </p>

        <div
          className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3"
          data-reveal-stagger="90"
        >
          {principles.map((item) => (
            <div
              key={item.id}
              data-reveal="scale"
              className="reveal bg-canvas p-7 transition-colors duration-500 hover:bg-panel"
            >
              <div className="font-mono text-[11px] text-signal">{item.id}</div>
              <h3 className="mt-5 font-display text-xl uppercase text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <p className="reveal text-base leading-relaxed text-dim md:col-span-7" data-reveal="left">
            I've spent the last three years inside automation platforms, AI tooling and mobile
            products — the kind of work where a slow query or a shaky release process is felt by
            everyone. I stay close to the whole stack so decisions hold up from the database to the
            first paint.
          </p>
          <div
            className="reveal md:col-span-5"
            data-reveal="right"
            style={{ transitionDelay: "140ms" }}
          >
            <div className="label mb-4">Currently</div>
            <p className="font-display text-xl uppercase leading-tight text-ink">
              Building scalable platforms at FireFlink and taking on a small number of
              collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
