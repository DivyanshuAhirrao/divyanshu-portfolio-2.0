import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExperienceSection } from "../index";
import { roles } from "@/data";

describe("ExperienceSection", () => {
  it("renders the full track record", () => {
    render(<ExperienceSection />);

    for (const role of roles) {
      expect(screen.getByRole("heading", { name: role.title })).toBeInTheDocument();
      expect(screen.getByText(role.company)).toBeInTheDocument();
      expect(screen.getByText(role.period)).toBeInTheDocument();
    }
  });

  it("highlights the current role with the signal colour", () => {
    render(<ExperienceSection />);
    const current = roles.find((r) => r.current)!;
    expect(screen.getByText(current.period).className).toContain("text-signal");
  });
});
