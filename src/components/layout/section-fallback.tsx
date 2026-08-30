/** Reserves vertical space so streamed-in sections don't shift layout (CLS). */
export function SectionFallback({ h = 560 }: { h?: number }) {
  return <div aria-hidden style={{ minHeight: h }} />;
}
