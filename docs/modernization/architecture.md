# Target Architecture

The modern fork should separate durable design-system concerns from adapters and documentation, without carrying the legacy runtime as a supported surface.

## Guiding Constraints

1. Preserve Sol's design intelligence.
   Typography metrics, spacing relationships, session color behavior, high-contrast behavior, and language-specific font decisions are product behavior, not implementation details.
2. Replace hidden build magic with explicit artifacts.
   Tokens, generated CSS, compatibility layers, and adapters should each have a visible source and output path.
3. Keep framework-agnostic consumption first-class.
   Tailwind support is useful, but Sol should not depend on Tailwind for its own existence.
4. Prefer a clean break.
   The legacy release line remains available on `legacy/v4`; this branch should optimize for the modern API instead of preserving the old packaging model.

## Proposed Repository Shape

```text
packages/
  core/
    tokens/
    css/
    fonts/
    js/
  tailwind/
    preset/
    plugin/
apps/
  docs/
  examples/
```

## Package Responsibilities

### `packages/core`

The source of truth.

- Token definitions
- Generated CSS custom properties
- Base font-face declarations
- Small framework-agnostic JS utilities
- Published as the stable foundation for new consumers

### `packages/tailwind`

The adapter layer.

- CSS-first Tailwind v4 adapter built on `@theme inline`, `@utility`, and `@custom-variant`
- Sol token aliases for Tailwind color, font, breakpoint, spacing, and type utilities
- Small Sol-specific helpers for baseline-trimmed typography integration
- No Sol-specific source of truth should live here

### `apps/docs`

The living documentation surface.

- Static build checked into the repo for easy review
- Visual parity fixtures
- Interactive examples for tokens, typography, session color, language behavior, and accessibility states

## Release Model

The current detached-head release flow should be replaced with a branch-based release model.

- Release commits must remain on branch history.
- Generated artifacts should be produced in CI or release jobs, not manually force-added from detached state.
- Versioning should be automated with a tool such as Changesets or semantic-release.

## Testing Model

The rewrite needs more than unit tests.

- Unit tests for JS utilities
- Build validation in CI
- CSS snapshot tests for token generation
- Visual regression tests against parity fixtures
- Example app smoke tests for docs and adapters

## Non-Goals

- Recreating every legacy atom as a first-class modern primitive
- Baking Tailwind assumptions into core CSS
- Tuning design values during the same phase as architecture changes
- Reintroducing the legacy Sass/Webpack delivery path into the supported build
