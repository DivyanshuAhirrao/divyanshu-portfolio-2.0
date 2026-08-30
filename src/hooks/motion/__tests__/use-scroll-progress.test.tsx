import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useScrollProgress } from "../use-scroll-progress";

function Bar() {
  const ref = useScrollProgress<HTMLDivElement>();
  return <div ref={ref} data-testid="bar" />;
}

function setScroll({ scrollY, scrollHeight }: { scrollY: number; scrollHeight: number }) {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
  Object.defineProperty(window, "scrollY", { configurable: true, value: scrollY });
}

describe("useScrollProgress", () => {
  it("starts at zero progress", () => {
    setScroll({ scrollY: 0, scrollHeight: 3000 });
    render(<Bar />);
    expect(screen.getByTestId("bar").style.transform).toBe("scaleX(0)");
  });

  it("tracks scroll position", async () => {
    setScroll({ scrollY: 0, scrollHeight: 3000 });
    render(<Bar />);

    setScroll({ scrollY: 1000, scrollHeight: 3000 });
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });

    expect(screen.getByTestId("bar").style.transform).toBe("scaleX(0.5)");
  });

  it("clamps to 1 and avoids dividing by zero", async () => {
    setScroll({ scrollY: 5000, scrollHeight: 1000 });
    render(<Bar />);
    expect(screen.getByTestId("bar").style.transform).toBe("scaleX(0)");
  });
});
