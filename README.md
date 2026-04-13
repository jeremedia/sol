# Sol

Modern Sol is a clean-break rewrite of MoMA's front-end library.

This repository is now a private npm workspace for building and validating the modern package surface. The supported implementation is package-first, ESM-first, and built around generated token artifacts, modern CSS, and a small explicit runtime layer.

It is not a drop-in replacement for the legacy `sol` package.

## Status

- `modernization/main` is the active branch for the modern implementation.
- `legacy/v4` preserves the legacy release line for systems that still require it.
- The supported branch no longer carries the old root `dist/`, Webpack, Sass macro build, or legacy compatibility package as active surfaces.

## Packages

- `@jeremedia/sol-core`
  Tokens, generated CSS, bundled fonts, and framework-agnostic runtime helpers.
- `@jeremedia/sol-tailwind`
  CSS-first Tailwind v4 adapter built on top of the core token layer.
- `@jeremedia/sol-docs`
  In-repo docs and fixture app used to verify tokens, typography, session color, language behavior, and accessibility states.

## Requirements

- Node `24.x`
- npm `11.x`

The repository root is a private workspace. Consumers should use the package entrypoints, not the root package.

## Workspace Commands

Install dependencies:

```sh
npm install
```

Build all supported artifacts:

```sh
npm run build
```

Run tests:

```sh
npm test
```

Verify generated artifacts:

```sh
npm run check:artifacts
```

Useful targeted commands:

- `npm run build:core`
- `npm run check:core`
- `npm run build:tailwind`
- `npm run check:tailwind`
- `npm run build:docs`
- `npm run check:docs`
- `npm run build:tokens`
- `npm run check:tokens`

## Usage

### Core CSS

```css
@import "@jeremedia/sol-core/core.css";
```

### Tailwind v4 Adapter

```css
@import "@jeremedia/sol-core/core.css";
@import "@jeremedia/sol-tailwind";

@source "../app/views";
@source "../app/javascript";
```

### Runtime Helpers

```js
import { SessionColor, loadAsianFonts } from "@jeremedia/sol-core";
import { applySessionColorVariables } from "@jeremedia/sol-core/session-color";

new SessionColor();
loadAsianFonts({ provider: "self-hosted", basePath: "/fonts" });

applySessionColorVariables({
  rootElement: document.documentElement,
  colorNumber: 8,
});
```

## Documentation

- [apps/docs/README.md](/Volumes/jer4TBv3/workspaces/personal/sol/apps/docs/README.md)
  Commands and scope for the docs fixture app.
- [docs/modernization/roadmap.md](/Volumes/jer4TBv3/workspaces/personal/sol/docs/modernization/roadmap.md)
  Rewrite phases and operational direction.
- [docs/modernization/architecture.md](/Volumes/jer4TBv3/workspaces/personal/sol/docs/modernization/architecture.md)
  Target package layout and design constraints.
- [docs/modernization/parity-checklist.md](/Volumes/jer4TBv3/workspaces/personal/sol/docs/modernization/parity-checklist.md)
  Behaviors that the rewrite is not allowed to lose.

## Release Model

Releases are branch-based and run through the workspace release script:

```sh
npm run release -- 5.0.0
```

That flow versions the workspace packages, rebuilds artifacts, creates a branch commit, and tags the release from branch history.
