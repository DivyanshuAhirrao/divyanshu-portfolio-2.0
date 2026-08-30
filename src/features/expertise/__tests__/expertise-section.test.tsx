import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ExpertiseSection } from "../index";
import { capabilities } from "@/data";

describe("ExpertiseSection", () => {
  beforeEach(() => {
    // Subtle motion keeps the horizontal pin on its reduced-motion path, so jsdom
    // never has to boot GSAP/ScrollTrigger.
    document.documentElement.dataset["motion"] = "subtle";
  });

  it("lists every capability with its number and body", () => {
    render(<ExpertiseSection />);

    for (const capability of capabilities) {
      expect(screen.getByRole("heading", { name: capability.title })).toBeInTheDocument();
      expect(screen.getByText(capability.body)).toBeInTheDocument();
      expect(screen.getByText(capability.id)).toBeInTheDocument();
    }
  });

  it("exposes an #expertise anchor", () => {
    const { container } = render(<ExpertiseSection />);
    expect(container.querySelector("section#expertise")).not.toBeNull();
  });

  it("keeps the track natively swipeable when motion is reduced", () => {
    const { container } = render(<ExpertiseSection />);
    expect(container.querySelector("[data-scroll-mode]")).not.toBeNull();
    expect(container.querySelector("[data-horizontal-track]")).not.toBeNull();
  });
});
