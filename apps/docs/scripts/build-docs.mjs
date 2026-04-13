#!/usr/bin/env node

import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, "..");
const repositoryRoot = resolve(appRoot, "..", "..");
const sourceDir = resolve(appRoot, "src");
const distDir = resolve(appRoot, "dist");
const checkMode = process.argv.includes("--check");

const tailwindBinary = resolve(
  repositoryRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tailwindcss.cmd" : "tailwindcss"
);

const sourceFiles = [
  ["index.html", "index.html"],
  ["app.js", "app.js"]
];

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function compareOrWrite(filePath, content) {
  if (checkMode) {
    const existing = readText(filePath);

    if (existing !== content) {
      console.error(`Docs artifact is out of date: ${filePath}`);
      process.exit(1);
    }

    return;
  }

  writeFileSync(filePath, content, "utf8");
}

function compileCss(outputCssPath) {
  const inputCssPath = resolve(sourceDir, "app.css");
  const result = spawnSync(
    tailwindBinary,
    ["-i", inputCssPath, "-o", outputCssPath],
    {
      cwd: repositoryRoot,
      encoding: "utf8"
    }
  );

  if (result.status !== 0) {
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }

    if (result.stderr) {
      process.stderr.write(result.stderr);
    }

    process.exit(result.status || 1);
  }
}

mkdirSync(distDir, { recursive: true });

for (const [sourceName, destinationName] of sourceFiles) {
  const sourcePath = resolve(sourceDir, sourceName);
  const destinationPath = resolve(distDir, destinationName);
  compareOrWrite(destinationPath, readText(sourcePath));
}

if (checkMode) {
  const tempBuildDir = mkdtempSync(resolve(tmpdir(), "sol-docs-check-"));
  const tempCssPath = resolve(tempBuildDir, "app.css");

  try {
    compileCss(tempCssPath);
    compareOrWrite(resolve(distDir, "app.css"), readText(tempCssPath));
  } finally {
    rmSync(tempBuildDir, { recursive: true, force: true });
  }
} else {
  compileCss(resolve(distDir, "app.css"));
}

if (!checkMode) {
  console.log(`Built docs app into ${distDir}`);
}
