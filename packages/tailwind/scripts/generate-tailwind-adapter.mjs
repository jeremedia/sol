#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourcePath = resolve(packageRoot, "..", "core", "src", "tokens", "sol.tokens.json");
const distDir = resolve(packageRoot, "dist");

const themePath = resolve(distDir, "theme.css");
const utilitiesPath = resolve(distDir, "utilities.css");
const indexPath = resolve(distDir, "index.css");
const preflightPath = resolve(distDir, "preflight.css");

const checkMode = process.argv.includes("--check");
const tokenSource = JSON.parse(readFileSync(sourcePath, "utf8"));

const namedSizes = tokenSource.typography.sizes.named;
const discreteSizes = tokenSource.typography.sizes.discrete;

function compareOrWrite(filePath, content) {
  if (checkMode) {
    const existing = readFileSync(filePath, "utf8");

    if (existing !== content) {
      console.error(`Tailwind adapter artifact is out of date: ${filePath}`);
      process.exit(1);
    }

    return;
  }

  writeFileSync(filePath, content, "utf8");
}

function stableCss(lines) {
  return `${lines.filter(Boolean).join("\n")}\n`;
}

function formatDeclarations(declarations, indent = "  ") {
  return Object.entries(declarations)
    .map(([name, value]) => `${indent}${name}: ${value};`)
    .join("\n");
}

function formatRule(selector, declarations) {
  return `${selector} {\n${formatDeclarations(declarations)}\n}`;
}

function colorVarName(path) {
  return `--color--${path.join("--")}`;
}

function themeVarName(path) {
  return `--color-sol-${path.join("-")}`;
}

function pushThemeDeclaration(lines, name, value) {
  lines.push(`  ${name}: ${value};`);
}

function traversePalette(node, path = [], lines = []) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === "object" && "hex" in value) {
      pushThemeDeclaration(
        lines,
        themeVarName([...path, key]),
        `var(${colorVarName([...path, key])})`
      );
      continue;
    }

    traversePalette(value, [...path, key], lines);
  }

  return lines;
}

function traverseSemantic(node, path = [], lines = []) {
  if (node && typeof node === "object" && "ref" in node) {
    pushThemeDeclaration(
      lines,
      themeVarName(path),
      `var(${colorVarName(path)})`
    );
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === "ref") {
      continue;
    }

    if (value && typeof value === "object") {
      traverseSemantic(value, [...path, key], lines);
    }
  }

  return lines;
}

function textSizeThemeLines() {
  const lines = [];

  for (const [sizeName, values] of Object.entries(namedSizes)) {
    for (const variant of Object.keys(values)) {
      const suffix = variant === "mobile" ? "" : `-${variant}`;
      const cssSuffix = variant === "mobile" ? "" : `--${variant}`;

      pushThemeDeclaration(
        lines,
        `--text-sol-${sizeName}${suffix}`,
        `calc(var(--typography--size--${sizeName}${cssSuffix}) * var(--rem-conversion))`
      );
      pushThemeDeclaration(
        lines,
        `--text-sol-${sizeName}${suffix}--line-height`,
        `calc(var(--leading-sol-solid) * var(--text-sol-${sizeName}${suffix}))`
      );
    }
  }

  return lines;
}

function solTypographySizeThemeLines() {
  const lines = [];

  for (const [sizeName, values] of Object.entries(namedSizes)) {
    for (const variant of Object.keys(values)) {
      const suffix = variant === "mobile" ? "" : `-${variant}`;
      const cssSuffix = variant === "mobile" ? "" : `--${variant}`;

      pushThemeDeclaration(
        lines,
        `--sol-typography-size-${sizeName}${suffix}`,
        `var(--typography--size--${sizeName}${cssSuffix})`
      );
    }
  }

  for (const size of discreteSizes) {
    pushThemeDeclaration(
      lines,
      `--sol-typography-size-${size}pt`,
      `var(--typography--size--${size}pt)`
    );
  }

  return lines;
}

function typographyUtilityBlocks() {
  const weightTokenNames = Object.keys(tokenSource.typography.faces.bold);
  const blocks = [];

  for (const weightName of Object.keys(tokenSource.typography.faces)) {
    const declarations = {};

    for (const tokenName of weightTokenNames) {
      declarations[`--typography--${tokenName}`] =
        `var(--typography--face--${weightName}--${tokenName})`;
    }

    blocks.push(formatRule(`@utility sol-weight-${weightName}`, declarations));
  }

  for (const [presetName, presetValues] of Object.entries(
    tokenSource.typography.presets
  )) {
    const declarations = {};

    for (const [tokenName, tokenValue] of Object.entries(presetValues)) {
      const variableName = `--typography--${tokenName}`;

      if (tokenValue && typeof tokenValue === "object" && "mobile" in tokenValue) {
        declarations[variableName] =
          `var(--typography--preset--${presetName}--${tokenName})`;

        continue;
      }

      declarations[variableName] =
        `var(--typography--preset--${presetName}--${tokenName})`;
    }

    blocks.push(formatRule(`@utility sol-baseline-${presetName}`, declarations));
  }

  blocks.push(
    [
      "@utility sol-size-* {",
      "  --typography--size: --value(--sol-typography-size-*, integer, [integer]);",
      "}"
    ].join("\n")
  );

  return blocks;
}

const themeLines = [
  "/*",
  " * Generated by packages/tailwind/scripts/generate-tailwind-adapter.mjs",
  " * Do not edit this file directly.",
  " */",
  "",
  "@theme inline {",
  "  --font-sans: var(--font-family--sans-language);",
  "  --font-sol-sans: var(--font-family--sans-language);",
  "  --font-sol-condensed: var(--font-family--condensed);",
  '  --font-sol-store: "MoMA Sans Store", "Helvetica", sans-serif;',
  "  --font-weight-sol-regular: var(--font-weight--regular);",
  "  --font-weight-sol-bold: var(--font-weight--bold);",
  "  --tracking-sol-regular: calc(var(--typography--face--regular--tracking) * 1em);",
  "  --tracking-sol-bold: calc(var(--typography--face--bold--tracking) * 1em);",
  "  --tracking-sol-kanji: 0.04em;",
  "  --tracking-sol-kana: -0.1em;",
  "  --tracking-sol-korean: 0em;",
  "  --leading-sol-body: var(--typography--preset--body--leading);",
  "  --leading-sol-solid: var(--typography--preset--solid--leading);",
  "  --breakpoint-sol-375: var(--breakpoint--375);",
  "  --breakpoint-sol-desktop: var(--breakpoint--desktop);",
  "  --breakpoint-sol-1024: var(--breakpoint--1024);",
  "  --breakpoint-sol-1280: var(--breakpoint--1280);",
  "  --breakpoint-sol-2000: var(--breakpoint--2000);",
  "  --spacing-sol-page: var(--page-spacing);",
  "  --spacing-sol-page-fixed: var(--page-spacing--fixed);",
  "  --spacing-sol-nav-height: var(--nav-height);",
  "  --spacing-sol-focus-thickness: var(--focus-thickness);",
  "  --spacing-sol-link-enlargement: var(--link-enlargement);",
  "  --radius-sol-focus: var(--focus-radius);",
  "  --color-sol-text: var(--color);",
  "  --color-sol-background: var(--color--background);",
  "  --color-sol-focus: var(--color--focus);",
  "  --color-sol-focus-reverse: var(--color--focus--reverse);",
  ...traversePalette(tokenSource.colors.palette),
  ...traverseSemantic(tokenSource.colors.semantic),
  ...textSizeThemeLines(),
  "",
  ...solTypographySizeThemeLines(),
  "}"
];

const utilitiesLines = [
  "/*",
  " * Generated by packages/tailwind/scripts/generate-tailwind-adapter.mjs",
  " * Do not edit this file directly.",
  " */",
  "",
  "@custom-variant sol-lang-ja (&:lang(ja));",
  "@custom-variant sol-lang-ko (&:lang(ko));",
  "@custom-variant sol-lang-zh-hans (&:lang(zh-Hans));",
  "@custom-variant sol-lang-zh-hant (&:lang(zh-Hant));",
  "@custom-variant sol-high-contrast (&:where([data-high-contrast], [data-high-contrast] *));",
  "",
  ...typographyUtilityBlocks()
];

const indexLines = [
  "/*",
  " * Generated by packages/tailwind/scripts/generate-tailwind-adapter.mjs",
  " * Do not edit this file directly.",
  " */",
  "",
  "@layer theme, base, components, utilities;",
  '@import "tailwindcss/theme.css" layer(theme);',
  '@import "./theme.css";',
  '@import "./utilities.css";',
  '@import "tailwindcss/utilities.css" layer(utilities);'
];

const preflightLines = [
  "/*",
  " * Generated by packages/tailwind/scripts/generate-tailwind-adapter.mjs",
  " * Do not edit this file directly.",
  " */",
  "",
  "@layer theme, base, components, utilities;",
  '@import "tailwindcss/theme.css" layer(theme);',
  '@import "./theme.css";',
  '@import "tailwindcss/preflight.css" layer(base);',
  '@import "./utilities.css";',
  '@import "tailwindcss/utilities.css" layer(utilities);'
];

mkdirSync(distDir, { recursive: true });

compareOrWrite(themePath, stableCss(themeLines));
compareOrWrite(utilitiesPath, stableCss(utilitiesLines));
compareOrWrite(indexPath, stableCss(indexLines));
compareOrWrite(preflightPath, stableCss(preflightLines));

if (!checkMode) {
  console.log(`Generated ${themePath}`);
  console.log(`Generated ${utilitiesPath}`);
  console.log(`Generated ${indexPath}`);
  console.log(`Generated ${preflightPath}`);
}
