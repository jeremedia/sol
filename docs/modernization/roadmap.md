# Sol Modernization Roadmap

This fork is not a cosmetic rewrite. The goal is to preserve the parts of Sol that are genuinely valuable while replacing the delivery mechanism that now causes drag: Sass macro generation, Webpack 4 packaging, detached release commits, and wiki-only operational knowledge.

## Current State

The upstream release line contains three distinct asset groups that need different treatment:

1. Design primitives worth preserving.
   Colors, spacing, motion, focus behavior, font assets, session color logic, and typography metrics are the durable parts of the system.
2. Legacy delivery mechanisms worth replacing.
   Sass atom/variant macros, Webpack 4, Babel 7, committed `dist/`, and detached-tag releases are operational debt.
3. Low-coverage behavior that needs explicit parity checks.
   Typography shoulder trimming, high-contrast overrides, Asian font handling, and session color behavior are easy to accidentally break.

## Branch Strategy

- `main`
  Mirrors the fork default branch and preserves the imported upstream history.
- `legacy/v4`
  Frozen reference branch from `v4.2.0`. Use this for parity fixtures, visual diffs, and emergency backports.
- `modernization/main`
  Active development branch for the rewrite.

Modernization work should branch from `modernization/main`. Legacy-only fixes should branch from `legacy/v4`.

## Modernization Phases

### Phase 0: Repository Foundation

- Fix CI so it validates `build` as well as `test`.
- Move modernization decisions into the repo instead of the wiki or release folklore.
- Document target architecture, parity requirements, and branch/release rules.
- Stop making architectural decisions from stale `main` history; use `v4.2.0` as the baseline.

### Phase 1: Token Extraction

- Extract colors, typography values, spacing, motion, focus, and font metadata into machine-readable source files.
- Generate native CSS custom properties from those tokens.
- Preserve exact values first; no value tuning in this phase.
- Add snapshot coverage for generated token output.

### Phase 2: Runtime Modernization

- Convert the JS layer to ESM-first modules with explicit exports.
- Replace class-based session color mutation with CSS variable writes.
- Make Asian font loading configurable and self-hostable by default.
- Prefer modern browser primitives and CSS features before retaining JS polyfills.

### Phase 3: Adapter Layer

- Add an optional Tailwind preset/plugin built on top of Sol tokens.
- Keep it an adapter, not the new source of truth.
- Ensure direct CSS consumption remains first-class.

### Phase 4: Docs and Adoption

- Replace wiki-only guidance with versioned docs and runnable examples.
- Build parity fixtures directly in `apps/docs` and fall back to the `legacy/v4` branch only when historical comparison is required.
- Pilot the modern packages in a real consumer before any package-name swap.

## First Deliverables

The first modernization milestone is intentionally small and operational:

- Clean fork and branch strategy
- In-repo roadmap and architecture docs
- CI that runs build + test
- A parity checklist to control the rewrite

That is enough to start real implementation without baking more drift into the repo.

## Definition of Done for the Rewrite

The modernization is complete when all of the following are true:

- Tokens are the primary source of truth.
- CSS ships as native custom properties and modern entry points.
- The supported build no longer depends on Sass, Webpack 4, or the legacy root `dist/` artifacts.
- Releases are reproducible from branch history.
- Docs, examples, and parity tests live in the repository.
- JS utilities are modular, typed or type-checked, and framework-agnostic.
