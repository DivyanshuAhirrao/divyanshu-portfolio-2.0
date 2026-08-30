import { describe, expect, it } from "vitest";

import {
  caseFileLabel,
  duplicateTrack,
  formatMetric,
  padCount,
  toRevealWords,
} from "../transforms";
import { projects } from "../projects";
import { metrics } from "../metrics";

describe("padCount", () => {
  it("pads to two digits by default", () => {
    expect(padCount(4)).toBe("04");
    expect(padCount(12)).toBe("12");
  });

  it("respects a custom size and clamps negatives", () => {
    expect(padCount(7, 3)).toBe("007");
    expect(padCount(-3)).toBe("00");
  });
});

describe("caseFileLabel", () => {
  it("labels the work section with the project count", () => {
    expect(caseFileLabel(projects)).toBe(`(${padCount(projects.length)}) Case files`);
  });

  it("handles an empty list", () => {
    expect(caseFileLabel([])).toBe("(00) Case files");
  });
});

describe("formatMetric", () => {
  it("appends the suffix to the final value", () => {
    expect(formatMetric({ value: 99, suffix: ".9%", label: "Uptime" })).toBe("99.9%");
  });

  it("supports an in-flight counter value", () => {
    const first = metrics[0]!;
    expect(formatMetric(first, 0)).toBe(`0${first.suffix}`);
  });
});

describe("duplicateTrack", () => {
  it("doubles the list so the marquee can loop", () => {
    expect(duplicateTrack(["a", "b"])).toEqual(["a", "b", "a", "b"]);
  });

  it("does not mutate the input", () => {
    const input = ["a"];
    duplicateTrack(input);
    expect(input).toEqual(["a"]);
  });
});

describe("toRevealWords", () => {
  it("staggers delays per word", () => {
    expect(toRevealWords("one two three", 10, 100)).toEqual([
      { word: "one", delay: 100, isLast: false },
      { word: "two", delay: 110, isLast: false },
      { word: "three", delay: 120, isLast: true },
    ]);
  });

  it("drops empty segments from double spaces", () => {
    expect(toRevealWords("a  b").map((w) => w.word)).toEqual(["a", "b"]);
  });
});
