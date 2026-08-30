import { describe, expect, it } from "vitest";

import { capabilities, marqueeItems, metrics, principles, projects, roles } from "../index";
import { contact, sections, site } from "@/config/site";

describe("portfolio content", () => {
  it("has unique ids across every numbered collection", () => {
    for (const list of [projects, capabilities, principles]) {
      const ids = list.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("gives every project three stats and at least one tag", () => {
    for (const project of projects) {
      expect(project.stats).toHaveLength(3);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.title.length).toBeGreaterThan(0);
    }
  });

  it("marks exactly one role as current and orders it first", () => {
    expect(roles.filter((r) => r.current)).toHaveLength(1);
    expect(roles[0]?.current).toBe(true);
  });

  it("keeps metric values positive and labelled", () => {
    for (const metric of metrics) {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate marquee keywords", () => {
    expect(new Set(marqueeItems).size).toBe(marqueeItems.length);
  });
});

describe("site config", () => {
  it("exposes a valid email and absolute social urls", () => {
    expect(contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/i);
    expect(contact.githubUrl).toMatch(/^https:\/\//);
    expect(contact.linkedinUrl).toMatch(/^https:\/\//);
  });

  it("keeps SEO copy within search-friendly limits", () => {
    expect(site.title.length).toBeLessThan(60);
    expect(site.description.length).toBeLessThan(200);
  });

  it("lists unique section ids", () => {
    const ids = sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
