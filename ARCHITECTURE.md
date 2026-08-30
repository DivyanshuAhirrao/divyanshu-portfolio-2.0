# Architecture

```text
src/
  config/            site identity, sections, SEO/JSON-LD head config
  data/              typed content modules + pure transforms
    __tests__/       content invariants + transform unit tests
    projects.ts capabilities.ts roles.ts metrics.ts principles.ts skills.ts
    transforms.ts    padCount, caseFileLabel, formatMetric, duplicateTrack, toRevealWords
    types.ts         re-exports the feature-owned content types
    index.ts         single import point: `@/data`
  features/          one folder per page section
    <feature>/
      components/    the section UI
      hooks/         hooks used only by that feature (hero/parallax, metrics/count-up)
      types.ts       content types the feature owns
      __tests__/     section render tests
      index.ts       public entry point: `@/features/<feature>`
  pages/             page composition (home-page.tsx)
  components/
    layout/          site-header, preloader, section-fallback (+ __tests__)
    motion/          reusable motion primitives (split-text)
    ui/              shadcn primitives
  hooks/
    motion/          reveal, scroll progress, active section, motion intensity (+ __tests__)
    theme/           persisted dark/light theme (+ __tests__)
    ui/              viewport helpers
  lib/
    errors/          error capture, error page, error reporting
    utils.ts
  routes/            TanStack routes: __root, index (thin), sitemap.xml
  test/setup.ts      jsdom setup: IntersectionObserver + matchMedia stubs
```

Rules of thumb:

- Routes stay thin: head config comes from `config/seo.ts`, markup from `pages/`.
- Features never import each other; shared content lives in `data/`, identity in `config/site.ts`.
- Import a feature through its folder (`@/features/work`), never a file inside it.
- Display logic that can be described as a pure function lives in `data/transforms.ts` and is unit tested.

## Tests

```bash
bun run test           # single run (vitest + jsdom + testing-library)
bun run test:watch
bun run test:coverage
```

Coverage: every page section renders (content, anchors, links, reveal hooks), the header
(nav, theme persistence, mobile menu), the motion/theme hooks, and all data transforms.
