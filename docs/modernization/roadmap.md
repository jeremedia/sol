# Modernization Status

This branch has completed the structural rewrite needed to support a modern Sol package surface.

## What Landed

### Workspace and Tooling

- npm workspaces replaced the old Yarn 1 workflow
- Node `24.x` is the supported runtime
- Vitest replaced the old Jest/Babel stack
- CI validates artifact checks, build output, and tests against the current workspace

### Package Surface

- `@jeremedia/sol-core` is the source of truth for tokens, CSS, fonts, and runtime helpers
- `@jeremedia/sol-tailwind` provides the optional Tailwind v4 adapter
- `apps/docs` is the living verification surface for the modern branch

### Legacy Removal

- the old root JS runtime tree was removed
- the compatibility package was removed from the supported branch
- the legacy example apps were removed
- root `dist/sol*` artifacts were removed
- the legacy Sass source tree was removed from `modernization/main`
- font source now lives in `packages/core/src/moma-sans`

## Branch Roles

- `main`
  Imported fork default branch history.
- `legacy/v4`
  Frozen legacy reference line from `v4.2.0`.
- `modernization/main`
  Modern package-first implementation.

## What Remains

The foundational modernization is complete. Remaining work is product-facing expansion rather than infrastructure rescue:

- publish/version the modern packages intentionally
- adopt the packages in real consumers
- expand the docs and fixtures as new components or behaviors are added
- add stronger visual regression coverage if the branch becomes a long-lived published surface

## Definition of Done

For the foundation phase, the branch is done when all of the following are true:

- tokens are the primary source of truth
- CSS ships through package entrypoints
- runtime helpers are modular and framework-agnostic
- the supported branch does not depend on the old root asset layout
- releases are reproducible from branch history
- docs and artifact checks live in the repository
