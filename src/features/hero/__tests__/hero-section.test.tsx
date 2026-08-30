import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "../index";
import { contact } from "@/config/site";

describe("HeroSection", () => {
  it("renders one h1 with the full headline", () => {
    render(<HeroSection />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toContain("Software that makes");
    expect(headings[0]?.textContent).toContain("before the demo ends.");
  });

  it("links the primary CTAs to work and email", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /see selected work/i })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
  });

  it("shows the status panel and the #top anchor", () => {
    const { container } = render(<HeroSection />);
    expect(screen.getByText("Open to work")).toBeInTheDocument();
    expect(container.querySelector("section#top")).not.toBeNull();
  });
});
