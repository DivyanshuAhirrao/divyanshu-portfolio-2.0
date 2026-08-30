import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useCountUp } from "../use-count-up";

function Counter({ target, duration }: { target: number; duration?: number }) {
  const { ref, value } = useCountUp<HTMLDivElement>(target, duration);
  return (
    <div ref={ref} data-testid="counter">
      {value}
    </div>
  );
}

describe("useCountUp", () => {
  it("counts up to the target once the element is visible", async () => {
    render(<Counter target={40} duration={20} />);
    await waitFor(() => expect(screen.getByTestId("counter").textContent).toBe("40"));
  });

  it("never overshoots the target", async () => {
    render(<Counter target={3} duration={20} />);
    await waitFor(() => {
      const value = Number(screen.getByTestId("counter").textContent);
      expect(value).toBe(3);
    });
  });

  it("jumps straight to the target when reduced motion is requested", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );

    render(<Counter target={99} />);
    expect(screen.getByTestId("counter").textContent).toBe("99");
  });
});
