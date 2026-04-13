# Modern Architecture

The modern branch is now organized around explicit package boundaries instead of a shared root build.

## Current Repository Shape

```text
packages/
  core/
    src/
      js/
      moma-sans/
      tokens/
    dist/
  tailwind/
    dist/
apps/
  docs/
docs/
  modernization/
```

## Package Boundaries

### `packages/core`

The source of truth.

- canonical design tokens
- generated CSS custom properties
- generated `core.css`
- source font assets under `src/moma-sans`
- published font assets under `dist/moma-sans`
- framework-agnostic runtime helpers

### `packages/tailwind`

The adapter layer.

- CSS-first Tailwind v4 integration
- token aliases exposed through `@theme inline`
- Sol-specific `@utility` and `@custom-variant` helpers
- no source-of-truth values

### `apps/docs`

The verification surface.

- static docs build checked into the repo
- token, typography, session-color, language, and accessibility fixtures
- artifact checks used by CI

## Design Constraints

1. Preserve Sol's design intelligence.
   Typography metrics, spacing, motion, session color behavior, high-contrast behavior, and language-specific font decisions remain product behavior.
2. Keep package boundaries explicit.
   Core owns tokens and primitives. Tailwind remains an adapter. Docs remains a consumer and verification surface.
3. Avoid hidden legacy dependencies.
   The supported branch should not depend on root `dist/`, the old Sass tree, Webpack, or compatibility shims.
4. Keep framework-agnostic consumption first-class.
   Tailwind support is useful, but the core package must stand on its own.

## Release Model

Releases are branch-based.

- release commits stay on branch history
- versioning happens through the workspace release script
- generated artifacts are rebuilt from package sources, not restored from a detached release state

## Testing Model

- unit tests for runtime helpers
- artifact checks for generated CSS, tokens, fonts, and docs output
- CI that runs `build`, `test`, and artifact verification

## Non-Goals

- restoring the old root package shape
- reviving the Sass/Webpack pipeline on `modernization/main`
- preserving legacy class-level compatibility on the supported branch
- moving design tuning and new component invention into the same phase as infrastructure cleanup
