import { useState } from "react";

import { useScrollProgress } from "@/hooks/motion/use-scroll-progress";
import { useActiveSection } from "@/hooks/motion/use-active-section";
import { useMotionIntensity } from "@/hooks/motion/use-motion-intensity";
import { useTheme } from "@/hooks/theme/use-theme";
import { contact, sections, site } from "@/config/site";

const links = sections;
const sectionIds = ["top", ...links.map((l) => l.id)];


export function SiteHeader() {
  const progressRef = useScrollProgress<HTMLDivElement>();
  const active = useActiveSection(sectionIds);
  const { intensity, toggle } = useMotionIntensity();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur-md">
      <div ref={progressRef} className="scroll-progress" aria-hidden />
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="h-2.5 w-2.5 bg-signal transition-transform duration-500 group-hover:rotate-45" />
          <span className="truncate font-display text-sm uppercase tracking-tight text-ink sm:text-base">
            {site.name}
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`nav-link font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
                active === link.id ? "is-active text-ink" : "text-dim hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle color theme"
            className="flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-dim transition-colors hover:border-ink hover:text-ink"
          >
            <span aria-hidden>{theme === "dark" ? "◐" : "◑"}</span>
            <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={intensity === "full"}
            title="Toggle motion intensity"
            className="hidden items-center gap-2 border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-dim transition-colors hover:border-ink hover:text-ink sm:flex"
          >
            <span
              className={`h-1.5 w-1.5 transition-colors ${
                intensity === "full" ? "bg-signal" : "bg-dim"
              }`}
            />
            Motion · {intensity === "full" ? "Full" : "Subtle"}
          </button>
          <a
            href={`mailto:${contact.email}`}
            className="hidden bg-signal px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-signal-foreground transition-colors hover:bg-ink lg:block"
          >
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="border border-line px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-dim md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line/70 md:hidden" aria-label="Sections (mobile)">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 px-6 py-4 font-display text-2xl uppercase text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
