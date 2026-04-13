# Parity Checklist

This checklist is the guardrail for the modernization. If a behavior is on this list, the rewrite is not allowed to silently drop it.

## Tokens and Foundations

- Brand palette values match the release baseline
- Grayscale values match the release baseline
- Membership colors match the release baseline
- Page spacing and fixed spacing preserve mobile and desktop values
- Motion timings and easing values remain available
- Focus colors and active/tap-highlight alpha values remain available
- Font assets remain packaged and resolvable from published CSS

## Typography

- Cap-height and x-height metrics are preserved
- Shoulder trimming behavior remains available
- Body and solid baseline systems remain available
- Named type sizes preserve mobile and desktop transitions
- Numeric point-size variants remain supported or intentionally mapped
- Superscript and subscript sizing/offset behavior remains correct
- Language-specific tracking adjustments remain available

## Color Behavior

- Session color mapping preserves the exact 7-color order
- Session color is available as CSS variables
- Promo, collection, and ps1 color aliases remain available
- High-contrast mode preserves readable foreground/background swaps
- SVG color behavior still avoids alpha overlap issues

## Layout and Utility Surface

- Wrapper, bleed, and page extension behaviors remain available
- Grid and flex utility behavior remains available through modern APIs
- Margin, padding, width, height, ratio, visibility, and overflow utilities have a defined modern replacement surface
- Breakpoint behavior remains mobile-first and deterministic

## JavaScript Runtime

- Session color persistence works across reloads
- Session color application does not depend on brittle DOM ordering
- Asian font loading behavior remains available with configurable hosting
- Navigation height updates remain correct
- Viewport utility behavior is verified in modern browsers
- Balance text behavior prefers native CSS where available and falls back safely

## Distribution and Operations

- `build` produces reproducible artifacts
- `test` and `build` both run in CI
- Release commits remain on branch history
- Published package metadata matches the released tag version
- Docs/examples demonstrate the current published behavior
- The supported workspace no longer depends on the legacy root `dist/` pipeline
