import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WorkSection } from "../index";
import { projects } from "@/data";
import { caseFileLabel } from "@/data/transforms";

describe("WorkSection", () => {
  it("renders every project with its meta and stats", () => {
    render(<WorkSection />);

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.tagline)).toBeInTheDocument();
      expect(screen.getByText(project.meta)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link")).toHaveLength(projects.length);
  });

  it("shows the derived case-file count", () => {
    render(<WorkSection />);
    expect(screen.getByText(caseFileLabel(projects))).toBeInTheDocument();
  });

  it("exposes a #work anchor for the header nav", () => {
    const { container } = render(<WorkSection />);
    expect(container.querySelector("section#work")).not.toBeNull();
  });
});
