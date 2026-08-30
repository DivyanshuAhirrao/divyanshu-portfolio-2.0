import { toRevealWords } from "@/data/transforms";

/**
 * Splits a sentence into words and reveals each one on scroll, using the
 * shared `[data-reveal]` observer in `use-reveal`.
 */
export function SplitText({
  text,
  className = "",
  step = 34,
  delay = 0,
}: {
  text: string;
  className?: string;
  step?: number;
  delay?: number;
}) {
  const words = toRevealWords(text, step, delay);

  return (
    <span className={className}>
      {words.map((item, i) => (
        <span
          key={`${item.word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            className="reveal inline-block"
            data-reveal="word"
            style={{ transitionDelay: `${item.delay}ms` }}
          >
            {item.word}
            {item.isLast ? "" : "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}
