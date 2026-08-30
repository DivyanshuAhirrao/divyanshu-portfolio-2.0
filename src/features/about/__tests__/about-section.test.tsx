import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutSection } from "../index";
import { principles } from "@/data";

describe("AboutSection", () => {
  it("renders each principle as a heading with body copy", () => {
    render(<AboutSection />);

    for (const principle of principles) {
      expect(screen.getByRole("heading", { name: principle.title })).toBeInTheDocument();
      expect(screen.getByText(principle.body)).toBeInTheDocument();
    }
  });

  it("splits the statement into individually revealed words", () => {
    const { container } = render(<AboutSection />);
    const words = container.querySelectorAll('[data-reveal="word"]');
    expect(words.length).toBeGreaterThan(5);
    expect(words[1]?.getAttribute("style")).toContain("transition-delay");
  });

  it("exposes an #about anchor", () => {
    const { container } = render(<AboutSection />);
    expect(container.querySelector("section#about")).not.toBeNull();
  });
});
