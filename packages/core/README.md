# `@jeremedia/sol-core`

This package is the first concrete boundary in the modernization branch.

Current scope:

- canonical token source under `src/tokens/sol.tokens.json`
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

This package still does not replace the legacy root build yet. It now provides the stable token, font, and core typography surface the compatibility and Tailwind layers can build on.
