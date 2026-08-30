import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useReveal } from "../use-reveal";

function Panel() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <span data-testid="a" data-reveal="blur" className="reveal">
        A
      </span>
      <span data-testid="b" data-reveal="left" className="reveal">
        B
      </span>
      <span data-testid="plain">C</span>
    </div>
  );
}

describe("useReveal", () => {
  it("reveals every [data-reveal] descendant when it intersects", () => {
    render(<Panel />);
    expect(screen.getByTestId("a")).toHaveClass("reveal-in");
    expect(screen.getByTestId("b")).toHaveClass("reveal-in");
  });

  it("leaves non-reveal nodes untouched", () => {
    render(<Panel />);
    expect(screen.getByTestId("plain")).not.toHaveClass("reveal-in");
  });

  it("shows everything when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Panel />);
    expect(screen.getByTestId("a")).toHaveClass("reveal-in");
  });
});
