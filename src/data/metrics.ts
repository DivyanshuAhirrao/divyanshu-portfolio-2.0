import type { Metric } from "./types";

/** Counter values rendered by the Metrics section. */
export const metrics: Metric[] = [
  { value: 3, suffix: "+", label: "Years shipping production software" },
  { value: 25, suffix: "+", label: "Features and services delivered" },
  { value: 40, suffix: "%", label: "Average latency cut on rewrites" },
  { value: 99, suffix: ".9%", label: "Uptime on systems I maintain" },
];
