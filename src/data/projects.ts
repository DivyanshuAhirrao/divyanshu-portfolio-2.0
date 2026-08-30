import type { Project } from "./types";

/** Case files rendered by the Work section. */
export const projects: Project[] = [
  {
    id: "01",
    title: "FireFlink Test Console",
    tagline: "A test-automation cockpit that made 1.2k suites feel like one dashboard.",
    meta: "Automation platform · 2025",
    tags: ["React", "TypeScript", "Design systems"],
    stats: [
      { label: "Suites", value: "1.2k" },
      { label: "P95", value: "84ms" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "02",
    title: "AI Assist Layer",
    tagline: "An LLM layer wired into product workflows — cheaper, faster, measurable.",
    meta: "LLM tooling · 2025",
    tags: ["Python", "Node", "Prompt infra"],
    stats: [
      { label: "Prompts", value: "40k" },
      { label: "Latency", value: "1.1s" },
      { label: "Cost", value: "−38%" },
    ],
  },
  {
    id: "03",
    title: "Field Ops Mobile",
    tagline: "Offline-first field app that keeps 60fps on the cheapest hardware in the fleet.",
    meta: "Cross-platform app · 2024",
    tags: ["React Native", "Offline sync", "Maps"],
    stats: [
      { label: "Frame", value: "60fps" },
      { label: "Bundle", value: "3.1MB" },
      { label: "Score", value: "98" },
    ],
  },
  {
    id: "04",
    title: "Delivery Pipeline",
    tagline: "From weekly releases to daily deploys with one-click rollback.",
    meta: "CI/CD & cloud infra · 2024",
    tags: ["Docker", "GitHub Actions", "Cloud"],
    stats: [
      { label: "Deploys", value: "Daily" },
      { label: "Build", value: "4.2s" },
      { label: "Rollback", value: "1-click" },
    ],
  },
];
