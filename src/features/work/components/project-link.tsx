import type { Project } from "../types";
/**
 * Fancy case-file link: monospace label with a coral underline sweep and an
 * arrow that slides on hover. Opens external URLs in a new tab.
 */
export function ProjectLink({ project }: { project: Project }) {
  const isExternal = project.external ?? /^https?:\/\//.test(project.href);

  return (
    <a
      href={project.href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      aria-label={`${project.linkLabel ?? "View project"} — ${project.title}`}
      className="project-link group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-dim transition-colors duration-300 hover:text-signal focus-visible:text-signal focus-visible:outline-none"
    >
      <span className="project-link-label">{project.linkLabel ?? "View project"}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1.5"
      >
        {isExternal ? "↗" : "→"}
      </span>
    </a>
  );
}
