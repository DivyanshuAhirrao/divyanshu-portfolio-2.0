import type { Metric, Project } from "./types";

/** Zero-pads a count for the editorial "(04)" section labels. */
export function padCount(count: number, size = 2): string {
  return String(Math.max(0, Math.trunc(count))).padStart(size, "0");
}

/** "(04) Case files" label for the Work section header. */
export function caseFileLabel(projects: readonly Project[]): string {
  return `(${padCount(projects.length)}) Case files`;
}

/** Renders a metric as its final display string, e.g. `99.9%`. */
export function formatMetric(metric: Metric, value = metric.value): string {
  return `${value}${metric.suffix}`;
}

/** Doubles a list so a CSS marquee can loop seamlessly. */
export function duplicateTrack<T>(items: readonly T[]): T[] {
  return [...items, ...items];
}

export type RevealWord = { word: string; delay: number; isLast: boolean };

/** Splits a sentence into words with staggered reveal delays. */
export function toRevealWords(text: string, step = 34, delay = 0): RevealWord[] {
  const words = text.split(" ").filter((w) => w.length > 0);
  return words.map((word, i) => ({
    word,
    delay: delay + i * step,
    isLast: i === words.length - 1,
  }));
}
