import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MetricsSection } from "../index";
import { metrics } from "@/data";
import { formatMetric } from "@/data/transforms";

describe("MetricsSection", () => {
  it("renders one card per metric with an accessible final value", () => {
    render(<MetricsSection />);

    for (const metric of metrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(
        screen.getByLabelText(`${formatMetric(metric)} — ${metric.label}`),
      ).toBeInTheDocument();
    }
  });

  it("staggers the cards for the scroll reveal", () => {
    const { container } = render(<MetricsSection />);
    expect(container.querySelector("[data-reveal-stagger]")).not.toBeNull();
    expect(container.querySelectorAll('[data-reveal="scale"]')).toHaveLength(metrics.length);
  });
});
