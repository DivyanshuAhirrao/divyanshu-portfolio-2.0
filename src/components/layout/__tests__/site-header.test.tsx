import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "../site-header";
import { sections, site } from "@/config/site";
import { THEME_KEY } from "@/hooks/theme/use-theme";

describe("SiteHeader", () => {
  it("renders a nav link per configured section", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Sections" });
    for (const section of sections) {
      expect(nav.querySelector(`a[href="#${section.id}"]`)).not.toBeNull();
    }
  });

  it("shows the site name", () => {
    render(<SiteHeader />);
    expect(screen.getAllByText(site.name).length).toBeGreaterThan(0);
  });

  it("toggles and persists the colour theme", async () => {
    render(<SiteHeader />);
    const button = screen.getByTitle("Toggle color theme");

    await userEvent.click(button);
    const first = document.documentElement.dataset["theme"];
    expect(first).toBe(window.localStorage.getItem(THEME_KEY));

    await userEvent.click(button);
    expect(document.documentElement.dataset["theme"]).not.toBe(first);
  });

  it("opens the mobile menu", async () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /toggle navigation/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeInTheDocument();
  });
});
