import { Suspense, lazy } from "react";

import { Preloader } from "@/components/layout/preloader";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionFallback } from "@/components/layout/section-fallback";
import { HeroSection } from "@/features/hero";
import { MarqueeStrip } from "@/features/marquee";
import { useReveal } from "@/hooks/motion/use-reveal";

// Below-the-fold sections are code-split: SSR still streams their HTML (so the
// content stays crawlable) while the client downloads them after the hero.
const WorkSection = lazy(() => import("@/features/work").then((m) => ({ default: m.WorkSection })));
const AboutSection = lazy(() =>
  import("@/features/about").then((m) => ({ default: m.AboutSection })),
);
const MetricsSection = lazy(() =>
  import("@/features/metrics").then((m) => ({ default: m.MetricsSection })),
);
const ExpertiseSection = lazy(() =>
  import("@/features/expertise").then((m) => ({ default: m.ExpertiseSection })),
);
const ExperienceSection = lazy(() =>
  import("@/features/experience").then((m) => ({ default: m.ExperienceSection })),
);
const NameSection = lazy(() => import("@/features/name").then((m) => ({ default: m.NameSection })));
const ContactSection = lazy(() =>
  import("@/features/contact").then((m) => ({ default: m.ContactSection })),
);

/** Composes the single-page portfolio: eager hero, streamed sections below. */
export function HomePage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grain min-h-screen bg-canvas text-ink">
      <Preloader />
      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <Suspense fallback={<SectionFallback h={900} />}>
          <WorkSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={700} />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={320} />}>
          <MetricsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={620} />}>
          <ExpertiseSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={520} />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={480} />}>
          <NameSection />
        </Suspense>
        <Suspense fallback={<SectionFallback h={720} />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}
