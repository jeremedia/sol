# Sol

<br>

<a href="https://www.moma.org/collection/works/35205"><img src="https://www.moma.org/d/p/sa/maximum/cri_000000291104.jpg" height="480" /></a>

<br>

> The form itself is of very limited importance; it becomes the grammar for the total work. In fact it is best that the basic unit be deliberately uninteresting so that it may more easily become an intrinsic part of the entire work. Using complex basic forms only disrupts the unity of the whole. Using a simple form repeatedly narrows the field of the work and concentrates the intensity to the arrangement of the form. This arrangement becomes the end while the form becomes the means.
>
> [Sol LeWitt](https://www.moma.org/artists/3528), [_Paragraphs on Conceptual Art_](https://www.moma.org/documents/moma_catalogue_1971_300297572.pdf#page=171)

<br>

**Sol** is a front-end (JS/CSS) library, developed by MoMA’s Digital Product team for use across the organization’s various products. It takes an “atomic” approach of providing simple utility functions and classes which incorporate the basic design paradigms for MoMA’s brand, (mostly) agnostic of their specific usage.

<br>

## Documentation

The modern implementation is documented in-repo:

- `apps/docs` contains the living fixtures and integration examples.
- `docs/modernization/roadmap.md` tracks the rewrite plan and remaining work.
- `docs/modernization/architecture.md` documents the target package boundaries.
- `docs/modernization/parity-checklist.md` records the behaviors that must survive the rewrite.

## Modern Workspace

This fork is being rebuilt in-place from the `v4.2.0` release line as a clean-break, modern implementation.

- `legacy/v4` preserves the last coherent legacy release for systems that still require it.
- `modernization/main` is the active branch for the modern implementation.
- `packages/core` is the source of truth for tokens, core CSS, bundled fonts, and runtime modules.
- `packages/tailwind` provides the CSS-first Tailwind v4 adapter over the core token layer.
- `apps/docs` is the living fixture site for tokens, typography, and runtime behavior.
- `docs/modernization/roadmap.md` describes the migration phases and repository plan.
- `docs/modernization/architecture.md` captures the target package layout and design constraints.
- `docs/modernization/parity-checklist.md` lists the behaviors that must survive the rewrite.

## Development

Install workspace dependencies with `npm install`, then run `npm run build` to generate the supported artifacts.

To regenerate or verify the full core package artifacts, run `npm run build:core` or `npm run check:core`.

To regenerate or verify the Tailwind adapter artifacts, run `npm run build:tailwind` or `npm run check:tailwind`.

To regenerate or verify the docs app artifacts, run `npm run build:docs` or `npm run check:docs`.

To regenerate or verify the canonical token artifacts only, run `npm run build:tokens` or `npm run check:tokens`.

## Usage

The supported modern entry points are package-first:

- `@jeremedia/sol-core` for tokens, core CSS, bundled fonts, and runtime helpers
- `@jeremedia/sol-tailwind` for the optional Tailwind v4 adapter

Example:

```css
@import "@jeremedia/sol-core/core.css";
@import "@jeremedia/sol-tailwind";
```

```js
import { SessionColor, loadAsianFonts } from "@jeremedia/sol-core";

new SessionColor();
loadAsianFonts({ provider: "self-hosted", basePath: "/fonts" });
```
