import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useActiveSection } from "../use-active-section";

function setPageHeight(height: number) {
  Object.defineProperty(document.body, "scrollHeight", { configurable: true, value: height });
}

function mountSections(tops: Record<string, number>) {
  for (const [id, top] of Object.entries(tops)) {
    const el = document.createElement("section");
    el.id = id;
    el.getBoundingClientRect = () => ({ top, bottom: top + 400 }) as DOMRect;
    document.body.appendChild(el);
  }
}

beforeEach(() => {
  // Far from the bottom of the page, so the "last section" rule stays off.
  setPageHeight(20000);
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});

afterEach(() => {
  document.body.querySelectorAll("section").forEach((el) => el.remove());
});

describe("useActiveSection", () => {
  it("falls back to the first id when nothing has scrolled past", () => {
    mountSections({ top: 800, work: 1600 });
    const { result } = renderHook(() => useActiveSection(["top", "work"]));
    expect(result.current).toBe("top");
  });

  it("picks the last section above the reading line", () => {
    mountSections({ top: -900, work: -200, contact: 900 });
    const { result } = renderHook(() => useActiveSection(["top", "work", "contact"]));
    expect(result.current).toBe("work");
  });

  it("re-measures on scroll", async () => {
    mountSections({ top: 10, work: 900 });
    const { result } = renderHook(() => useActiveSection(["top", "work"]));
    expect(result.current).toBe("top");

    document.getElementById("work")!.getBoundingClientRect = () =>
      ({ top: -10, bottom: 390 }) as DOMRect;

    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });

    expect(result.current).toBe("work");
  });

  it("activates the last section at the bottom of the page", () => {
    setPageHeight(window.innerHeight);
    mountSections({ top: 800, work: 1600, contact: 2400 });
    const { result } = renderHook(() => useActiveSection(["top", "work", "contact"]));
    expect(result.current).toBe("contact");
  });

  it("ignores ids that are not in the DOM", () => {
    const { result } = renderHook(() => useActiveSection(["ghost"]));
    expect(result.current).toBe("ghost");
  });
});
