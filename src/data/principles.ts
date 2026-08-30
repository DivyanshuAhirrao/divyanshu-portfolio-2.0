import type { Principle } from "./types";

/** Working principles rendered by the About section. */
export const principles: Principle[] = [
  {
    id: "01",
    title: "Ship small, ship often",
    body: "Short feedback loops beat big reveals. Every week should end with something real in front of users.",
  },
  {
    id: "02",
    title: "Performance is a feature",
    body: "Speed is the first thing people feel and the last thing teams budget for. I budget for it first.",
  },
  {
    id: "03",
    title: "Boring infrastructure",
    body: "Predictable deploys, clear logs and one-click rollbacks. Excitement belongs in the product, not the pipeline.",
  },
];
