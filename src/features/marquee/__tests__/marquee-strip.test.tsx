import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MarqueeStrip } from "../index";
import { marqueeItems } from "@/data";

describe("MarqueeStrip", () => {
  it("duplicates the keyword track so the loop is seamless", () => {
    render(<MarqueeStrip />);
    for (const item of marqueeItems) {
      expect(screen.getAllByText(item)).toHaveLength(2);
    }
  });

  it("sets the marquee duration custom property", () => {
    const { container } = render(<MarqueeStrip />);
    const track = container.querySelector<HTMLElement>(".marquee-track");
    expect(track?.style.getPropertyValue("--marquee-duration")).toBe("32s");
  });
});
