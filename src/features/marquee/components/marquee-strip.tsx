import { marqueeItems } from "@/data";
import { duplicateTrack } from "@/data/transforms";

export function MarqueeStrip() {
  const row = duplicateTrack(marqueeItems);

  return (
    <div className="marquee overflow-hidden border-b border-line/70 py-5">
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: "32s" }}>
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap px-8">
            <span className="font-display text-xl uppercase text-dim transition-colors hover:text-ink lg:text-2xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}
