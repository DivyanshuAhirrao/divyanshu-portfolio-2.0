export function NameSection() {
  return (
    <section aria-label="Name" className="relative overflow-hidden border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="reveal label mb-10" data-reveal="blur">
          (Full name, full stack)
        </div>

        <h2 className="display-xl leading-[0.84] tracking-[-0.02em]">
          <span className="reveal block" data-reveal="wipe" style={{ transitionDelay: "0ms" }}>
            <span className="text-[clamp(3rem,11.5vw,11rem)] text-ink">Divyanshu</span>
          </span>
          <span className="reveal block" data-reveal="wipe" style={{ transitionDelay: "140ms" }}>
            <span className="text-outline text-[clamp(3.4rem,13vw,12.5rem)] transition-all duration-500 hover:text-signal">
              Ahirrao
            </span>
          </span>
        </h2>

        <div className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3" data-reveal="blur">
          <span className="label">Design · Build · Ship</span>
          <span className="h-px w-14 bg-signal" />
          <span className="label">One engineer, the whole pipeline</span>
        </div>
      </div>
    </section>
  );
}
