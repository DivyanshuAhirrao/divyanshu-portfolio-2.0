import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NameSection } from "../index";

describe("NameSection", () => {
  it("renders the full name as a single heading", () => {
    render(<NameSection />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent?.replace(/\s+/g, " ")).toContain("Divyanshu");
    expect(heading.textContent).toContain("Ahirrao");
  });

  it("reveals the two name lines with a wipe", () => {
    const { container } = render(<NameSection />);
    expect(container.querySelectorAll('[data-reveal="wipe"]')).toHaveLength(2);
  });
});
