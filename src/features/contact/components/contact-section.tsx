import { contact } from "@/config/site";

// Computed once at module load (build/first-import time), not per render, so
// the value is identical on the server-rendered HTML and the client's first
// hydration pass — avoids React error #418 (server/client HTML mismatch).
// Long-lived cached SSR responses could still show a stale year until the
// next deploy/rebuild; that's an acceptable, purely cosmetic trade-off for a
// footer copyright line versus reintroducing a render-time Date() call.
const COPYRIGHT_YEAR = new Date().getFullYear();

const rows = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "GitHub", value: contact.github, href: contact.githubUrl },
  { label: "LinkedIn", value: contact.linkedin, href: contact.linkedinUrl },
  { label: "Location", value: contact.location },
];

export function ContactSection() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="reveal label mb-10" data-reveal="blur">
          (05) Contact
        </div>

        <div className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-7" data-reveal="blur">
            <h2 className="display-xl text-[clamp(2.2rem,7vw,6rem)] text-ink">
              Let's build
              <br />
              <span className="text-signal">the next one.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-dim">
              Tell me what you're building, where it's stuck, and when it needs to be live. I reply
              within a day or two — and I'll be straight about whether I'm the right fit.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-10 inline-flex items-center gap-3 bg-signal px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-foreground transition-colors hover:bg-ink"
            >
              {contact.email}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div
            className="reveal md:col-span-5"
            data-reveal="right"
            style={{ transitionDelay: "140ms" }}
          >
            <div className="border-t border-line">
              {rows.map((row) =>
                row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-signal"
                  >
                    <span className="label">{row.label}</span>
                    <span className="text-sm text-ink transition-colors group-hover:text-signal">
                      {row.value}
                    </span>
                  </a>
                ) : (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-line py-4"
                  >
                    <span className="label">{row.label}</span>
                    <span className="text-sm text-ink">{row.value}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 overflow-hidden border-t border-line pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="label">© {COPYRIGHT_YEAR} Divyanshu Ahirrao</span>
            <span className="label flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-signal" />
              Engineered, not templated
            </span>
            <a href="#top" className="label transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
