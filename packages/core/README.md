# `@jeremedia/sol-core`

This package is the first concrete boundary in the modernization branch.

Current scope:

- canonical token source under `src/tokens/sol.tokens.json`
- bundled MoMA Sans source assets under `src/moma-sans`
- generated CSS custom properties under `dist/tokens.css`
- generated standalone foundation stylesheet under `dist/core.css`
- bundled MoMA Sans font assets under `dist/moma-sans`
- generated machine-readable artifact under `dist/tokens.json`
- modern runtime modules under `src/js`

The core stylesheet exposes a small explicit API for the modernization path:

- `.sol-typography` or `[data-sol-typography]` for baseline-trimmed text blocks
- `sol-typography--weight-*` and `data-sol-typography-weight="*"` modifiers
- `sol-typography--baseline-*` and `data-sol-typography-baseline="*"` modifiers
- `sol-typography--size-*` and `data-sol-typography-size="*"` modifiers

Runtime modules are exported from the package root and named subpaths:

```js
import { SessionColor, loadAsianFonts } from "@jeremedia/sol-core";
import { applySessionColorVariables } from "@jeremedia/sol-core/session-color";
```

This package is the supported foundation for the modern Sol implementation. It no longer depends on the old root `dist/` asset layout.
