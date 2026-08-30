import { Preloader } from "@/components/layout/preloader";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { ExperienceSection } from "@/features/experience";
import { ExpertiseSection } from "@/features/expertise";
import { HeroSection } from "@/features/hero";
import { MarqueeStrip } from "@/features/marquee";
import { MetricsSection } from "@/features/metrics";
import { NameSection } from "@/features/name";
import { WorkSection } from "@/features/work";
import { useReveal } from "@/hooks/motion/use-reveal";

/** Composes the single-page portfolio. */
export function HomePage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grain min-h-screen bg-canvas text-ink">
      <Preloader />
      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <WorkSection />
        <AboutSection />
        <MetricsSection />
        <ExpertiseSection />
        <ExperienceSection />
        <NameSection />
        <ContactSection />
      </main>
    </div>
  );
}
