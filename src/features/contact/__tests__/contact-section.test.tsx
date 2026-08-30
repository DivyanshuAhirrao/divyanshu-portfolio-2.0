import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactSection } from "../index";
import { contact } from "@/config/site";

describe("ContactSection", () => {
  it("renders every contact channel", () => {
    render(<ContactSection />);
    expect(screen.getAllByText(contact.email).length).toBeGreaterThan(0);
    expect(screen.getByText(contact.github)).toBeInTheDocument();
    expect(screen.getByText(contact.linkedin)).toBeInTheDocument();
    expect(screen.getByText(contact.location)).toBeInTheDocument();
  });

  it("opens external profiles in a new tab and keeps mailto in place", () => {
    render(<ContactSection />);
    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("href", contact.githubUrl);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noreferrer");

    const email = screen.getAllByRole("link", { name: new RegExp(contact.email, "i") })[0]!;
    expect(email).toHaveAttribute("href", `mailto:${contact.email}`);
    expect(email).not.toHaveAttribute("target");
  });

  it("renders the current year in the footer", () => {
    render(<ContactSection />);
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()} Divyanshu Ahirrao`)),
    ).toBeInTheDocument();
  });
});
