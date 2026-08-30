import { useCountUp } from "../hooks/use-count-up";
import { metrics, type Metric } from "@/data";
import { formatMetric } from "@/data/transforms";

function MetricCard({ metric }: { metric: Metric }) {
  const { ref, value } = useCountUp<HTMLDivElement>(metric.value);

  return (
    <div ref={ref} className="bg-canvas p-7" aria-label={`${formatMetric(metric)} — ${metric.label}`}>
      <div className="display-xl text-[clamp(2.4rem,6vw,4.5rem)] text-ink">
        {value}
        <span className="text-signal">{metric.suffix}</span>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-dim">{metric.label}</div>
    </div>
  );
}

export function MetricsSection() {
  return (
    <section className="border-b border-line/70">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="reveal label mb-10" data-reveal="blur">
          (02) By the numbers
        </div>
        <div
          className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          data-reveal-stagger="90"
        >
          {metrics.map((metric) => (
            <div key={metric.label} data-reveal="scale" className="reveal">
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
