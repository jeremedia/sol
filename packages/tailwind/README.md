# `@jeremedia/sol-tailwind`

This package exposes a CSS-first Tailwind v4 adapter for the modern Sol token layer.

Current contents:

- `dist/index.css`: Tailwind theme + utilities entrypoint without Preflight
- `dist/preflight.css`: alternate entrypoint that includes Preflight
- `dist/theme.css`: Sol token aliases exposed through Tailwind `@theme inline`
- `dist/utilities.css`: Sol-specific `@utility` and `@custom-variant` helpers

This package does not define Sol values itself. It projects `@jeremedia/sol-core` variables into Tailwind-native utilities.

Recommended import order:

```css
@import "@jeremedia/sol-core/dist/core.css";
@import "@jeremedia/sol-tailwind";

@source "../app/views";
@source "../app/javascript";
```

Examples:

```html
<p class="text-sol-medium sol-desktop:text-sol-medium-desktop leading-sol-body font-sol-regular tracking-sol-regular">
  Tailwind-native Sol typography
</p>

<h2 class="sol-typography sol-weight-bold sol-baseline-solid sol-size-large sol-desktop:sol-size-large-desktop text-sol-brand-10">
  Baseline-trimmed Sol typography
</h2>

<p class="sol-lang-ja:tracking-sol-kanji">
  Language-aware tracking override
</p>
```
