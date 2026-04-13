#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourcePath = resolve(packageRoot, "src/tokens/sol.tokens.json");
const distDir = resolve(packageRoot, "dist");
const cssPath = resolve(distDir, "tokens.css");
const jsonPath = resolve(distDir, "tokens.json");

const checkMode = process.argv.includes("--check");
const tokenSource = JSON.parse(readFileSync(sourcePath, "utf8"));

const selectors = {};
const media = {};

function ensureSelector(selector) {
  if (!selectors[selector]) {
    selectors[selector] = {};
  }

  return selectors[selector];
}

function ensureMedia(query, selector = ":root") {
  if (!media[query]) {
    media[query] = {};
  }

  if (!media[query][selector]) {
    media[query][selector] = {};
  }

  return media[query][selector];
}

function addDeclaration(target, name, value) {
  target[name] = String(value);
}

function quoteFontPart(part) {
  const genericFamilies = new Set([
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui"
  ]);

  if (part.startsWith("var(") || genericFamilies.has(part)) {
    return part;
  }

  return `"${part}"`;
}

function fontStack(parts) {
  return parts.map((part) => quoteFontPart(part)).join(", ");
}

function toRgb(hex) {
  const normalized = hex.replace("#", "");
  const pairs =
    normalized.length === 3
      ? normalized.split("").map((character) => `${character}${character}`)
      : normalized.match(/.{1,2}/g);

  if (!pairs || pairs.length !== 3) {
    throw new Error(`Unsupported hex color: ${hex}`);
  }

  return pairs.map((pair) => Number.parseInt(pair, 16)).join(", ");
}

function colorVarName(path) {
  return `--color--${path.join("--")}`;
}

function resolveColorRef(ref) {
  const segments = ref.split(".");
  const namespace = segments.shift();

  if (!namespace || (namespace !== "palette" && namespace !== "semantic")) {
    throw new Error(`Unsupported color reference: ${ref}`);
  }

  return colorVarName(segments);
}

function traversePalette(node, path = []) {
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === "object" && "hex" in value) {
      const variableName = colorVarName([...path, key]);
      const rgb = toRgb(value.hex);

      addDeclaration(root, `${variableName}--rgb`, rgb);
      addDeclaration(root, variableName, `rgba(${rgb}, 1)`);
      addDeclaration(
        root,
        `${variableName}--dark-background`,
        value["dark-background"] ? 1 : 0
      );
      continue;
    }

    traversePalette(value, [...path, key]);
  }
}

function traverseSemantic(node, path = []) {
  if (node && typeof node === "object" && "ref" in node) {
    const variableName = colorVarName(path);
    const referenceVariable = resolveColorRef(node.ref);

    addDeclaration(root, variableName, `var(${referenceVariable})`);
    addDeclaration(root, `${variableName}--rgb`, `var(${referenceVariable}--rgb)`);
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === "ref") {
      continue;
    }

    if (value && typeof value === "object") {
      traverseSemantic(value, [...path, key]);
    }
  }
}

function slugLanguage(language) {
  return language.toLowerCase();
}

function formatBlock(block, indent = "  ") {
  return Object.entries(block)
    .map(([name, value]) => `${indent}${name}: ${value};`)
    .join("\n");
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function compareOrWrite(filePath, content) {
  if (checkMode) {
    const existing = readFileSync(filePath, "utf8");

    if (existing !== content) {
      console.error(`Token artifact is out of date: ${filePath}`);
      process.exit(1);
    }

    return;
  }

  writeFileSync(filePath, content, "utf8");
}

const root = ensureSelector(":root");
const breakpoints = tokenSource.breakpoints;
const desktopWidth = breakpoints.width[breakpoints.desktop];

for (const [breakpoint, width] of Object.entries(breakpoints.width)) {
  addDeclaration(root, `--breakpoint--${breakpoint}`, `${width}px`);
}

for (const [breakpoint, height] of Object.entries(breakpoints.height)) {
  addDeclaration(root, `--breakpoint--height--${breakpoint}`, `${height}px`);
}

addDeclaration(root, "--breakpoint--desktop", `${desktopWidth}px`);

traversePalette(tokenSource.colors.palette);
traverseSemantic(tokenSource.colors.semantic);

const defaultTextVar = resolveColorRef(tokenSource.colors.defaults.text.ref);
const defaultBackgroundVar = resolveColorRef(
  tokenSource.colors.defaults.background.ref
);
const defaultFocusVar = resolveColorRef(tokenSource.colors.focus.default.ref);
const reverseFocusVar = resolveColorRef(tokenSource.colors.focus.reverse.ref);

addDeclaration(root, "--color--rgb", `var(${defaultTextVar}--rgb)`);
addDeclaration(root, "--color", "rgba(var(--color--rgb), 1)");
addDeclaration(root, "--color--background--rgb", `var(${defaultBackgroundVar}--rgb)`);
addDeclaration(root, "--color--background", "rgba(var(--color--background--rgb), 1)");
addDeclaration(root, "--color--focus", `var(${defaultFocusVar})`);
addDeclaration(root, "--color--focus--rgb", `var(${defaultFocusVar}--rgb)`);
addDeclaration(root, "--color--focus--reverse", `var(${reverseFocusVar})`);
addDeclaration(
  root,
  "--color--focus--reverse--rgb",
  `var(${reverseFocusVar}--rgb)`
);
addDeclaration(
  root,
  "--color--active--alpha",
  tokenSource.colors.focus.default["active-alpha"]
);
addDeclaration(
  root,
  "--color--tap-highlight--alpha",
  tokenSource.colors.focus.default["tap-highlight-alpha"]
);
addDeclaration(
  root,
  "--color--active--alpha--reverse",
  tokenSource.colors.focus.reverse["active-alpha"]
);
addDeclaration(
  root,
  "--color--tap-highlight--alpha--reverse",
  tokenSource.colors.focus.reverse["tap-highlight-alpha"]
);

for (const [familyName, stack] of Object.entries(
  tokenSource.typography["font-families"]
)) {
  addDeclaration(root, `--font-family--${familyName}`, fontStack(stack));
}

for (const [language, face] of Object.entries(
  tokenSource.typography["language-faces"]
)) {
  addDeclaration(
    root,
    `--language-font-face--${slugLanguage(language)}`,
    quoteFontPart(face)
  );
}

const languageDefaultSelector = ensureSelector(":root, :lang(en)");
addDeclaration(
  languageDefaultSelector,
  "--language-font-face",
  "var(--language-font-face--default)"
);

for (const [language] of Object.entries(tokenSource.typography["language-faces"])) {
  if (language === "default" || language === "en") {
    continue;
  }

  addDeclaration(
    ensureSelector(`:lang(${language})`),
    "--language-font-face",
    `var(--language-font-face--${slugLanguage(language)})`
  );
}

for (const [weightName, weightValue] of Object.entries(
  tokenSource.typography["font-weights"]
)) {
  addDeclaration(root, `--font-weight--${weightName}`, weightValue);
}

const typographyMetrics = tokenSource.typography.metrics;
addDeclaration(root, "--typography--cap-height", typographyMetrics["cap-height"]);
addDeclaration(root, "--typography--x-height", typographyMetrics["x-height"]);
addDeclaration(
  root,
  "--typography--shoulder--bottom",
  typographyMetrics["shoulder-bottom"]
);
addDeclaration(
  root,
  "--typography--shoulder--input",
  typographyMetrics["shoulder-input"]
);
addDeclaration(
  root,
  "--typography--shoulder",
  "calc(1 - var(--typography--cap-height))"
);
addDeclaration(
  root,
  "--typography--shoulder--top",
  "calc(var(--typography--shoulder) - var(--typography--shoulder--bottom))"
);
addDeclaration(
  root,
  "--typography--shift--cap",
  "calc(var(--typography--shoulder) / 2)"
);
addDeclaration(
  root,
  "--typography--shift--x",
  "calc((1 - var(--typography--x-height)) / 2)"
);
addDeclaration(root, "--typography--size", typographyMetrics["default-size"]);
addDeclaration(root, "--typography--leading--previous", "var(--typography--leading)");
addDeclaration(root, "--typography--size--previous", "var(--typography--size)");

for (const [faceName, faceValues] of Object.entries(tokenSource.typography.faces)) {
  for (const [tokenName, tokenValue] of Object.entries(faceValues)) {
    addDeclaration(
      root,
      `--typography--face--${faceName}--${tokenName}`,
      tokenValue
    );
  }
}

for (const tokenName of Object.keys(tokenSource.typography.faces.bold)) {
  addDeclaration(
    root,
    `--typography--${tokenName}`,
    `var(--typography--face--bold--${tokenName})`
  );
}

for (const [presetName, presetValues] of Object.entries(
  tokenSource.typography.presets
)) {
  for (const [tokenName, tokenValue] of Object.entries(presetValues)) {
    if (
      tokenValue &&
      typeof tokenValue === "object" &&
      "mobile" in tokenValue
    ) {
      addDeclaration(
        root,
        `--typography--preset--${presetName}--${tokenName}`,
        tokenValue.mobile
      );

      if ("desktop" in tokenValue) {
        addDeclaration(
          root,
          `--typography--preset--${presetName}--${tokenName}--desktop`,
          tokenValue.desktop
        );
      }

      continue;
    }

    addDeclaration(
      root,
      `--typography--preset--${presetName}--${tokenName}`,
      tokenValue
    );
  }
}

addDeclaration(
  root,
  "--typography--leading",
  "var(--typography--preset--solid--leading)"
);
addDeclaration(
  root,
  "--typography--scale--minor",
  "var(--typography--preset--solid--scale-minor)"
);
addDeclaration(
  root,
  "--typography--scale--major",
  "var(--typography--preset--solid--scale-major)"
);
addDeclaration(
  root,
  "--typography--scale--prime",
  "var(--typography--preset--solid--scale-prime)"
);
addDeclaration(
  root,
  "--typography--scale--clear",
  "var(--typography--preset--solid--scale-clear)"
);
addDeclaration(
  root,
  "--typography--ascenders",
  "var(--typography--preset--solid--ascenders)"
);
addDeclaration(
  root,
  "--typography--descenders",
  "var(--typography--preset--solid--descenders)"
);

for (const [sizeName, values] of Object.entries(
  tokenSource.typography.sizes.named
)) {
  for (const [variant, value] of Object.entries(values)) {
    const suffix = variant === "mobile" ? "" : `--${variant}`;
    addDeclaration(root, `--typography--size--${sizeName}${suffix}`, value);
  }
}

for (const size of tokenSource.typography.sizes.discrete) {
  addDeclaration(root, `--typography--size--${size}pt`, size);
}

for (const [tokenName, tokenValue] of Object.entries(tokenSource.layout.root)) {
  addDeclaration(root, `--${tokenName}`, tokenValue);
}

for (const [tokenName, tokenValue] of Object.entries(tokenSource.focus.root)) {
  addDeclaration(root, `--${tokenName}`, tokenValue);
}

for (const duration of tokenSource.motion.durations) {
  addDeclaration(root, `--motion--duration--${duration}`, `${duration}ms`);
}

for (const easing of tokenSource.motion.easings) {
  addDeclaration(root, `--motion--curve--${easing}`, easing);
}

for (const property of tokenSource.motion.properties) {
  addDeclaration(root, `--motion--property--${property}`, property);
}

const desktopRoot = ensureMedia(`(min-width: ${desktopWidth}px)`);
addDeclaration(
  desktopRoot,
  "--typography--scale--major",
  "var(--typography--preset--solid--scale-major--desktop)"
);
addDeclaration(
  desktopRoot,
  "--typography--scale--prime",
  "var(--typography--preset--solid--scale-prime--desktop)"
);

for (const [breakpoint, values] of Object.entries(tokenSource.layout.responsive)) {
  const responsiveRoot = ensureMedia(
    `(min-width: ${tokenSource.breakpoints.width[breakpoint]}px)`
  );

  for (const [tokenName, tokenValue] of Object.entries(values)) {
    addDeclaration(responsiveRoot, `--${tokenName}`, tokenValue);
  }
}

for (const [breakpoint, values] of Object.entries(tokenSource.focus.responsive)) {
  const responsiveRoot = ensureMedia(
    `(min-width: ${tokenSource.breakpoints.width[breakpoint]}px)`
  );

  for (const [tokenName, tokenValue] of Object.entries(values)) {
    addDeclaration(responsiveRoot, `--${tokenName}`, tokenValue);
  }
}

const cssParts = [
  "/*",
  " * Generated by packages/core/scripts/generate-tokens.mjs",
  " * Do not edit this file directly.",
  " */",
  "",
  ":root {",
  formatBlock(selectors[":root"]),
  "}"
];

for (const [selector, declarations] of Object.entries(selectors)) {
  if (selector === ":root") {
    continue;
  }

  cssParts.push("", `${selector} {`, formatBlock(declarations), "}");
}

const mediaQueries = Object.keys(media).sort((left, right) => {
  const leftNumber = Number.parseInt(left.replace(/\D/g, ""), 10);
  const rightNumber = Number.parseInt(right.replace(/\D/g, ""), 10);

  return leftNumber - rightNumber;
});

for (const query of mediaQueries) {
  cssParts.push("", `@media ${query} {`);

  for (const [selector, declarations] of Object.entries(media[query])) {
    cssParts.push(`  ${selector} {`, formatBlock(declarations, "    "), "  }");
  }

  cssParts.push("}");
}

const cssOutput = `${cssParts.join("\n")}\n`;
const jsonOutput = stableJson({
  meta: {
    ...tokenSource.meta,
    "generated-by": "packages/core/scripts/generate-tokens.mjs"
  },
  source: tokenSource,
  css: {
    selectors,
    media
  }
});

mkdirSync(distDir, { recursive: true });

compareOrWrite(cssPath, cssOutput);
compareOrWrite(jsonPath, jsonOutput);

if (!checkMode) {
  console.log(`Generated ${cssPath}`);
  console.log(`Generated ${jsonPath}`);
}
