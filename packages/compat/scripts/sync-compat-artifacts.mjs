#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const repositoryRoot = resolve(packageRoot, "..", "..");
const sourceDistDir = resolve(repositoryRoot, "dist");
const compatDistDir = resolve(packageRoot, "dist");
const checkMode = process.argv.includes("--check");

const artifactNames = [
  "sol.css",
  "sol.css.map",
  "sol.min.css",
  "sol.min.css.map",
  "sol.js"
];

function compareOrWrite(filePath, content) {
  if (checkMode) {
    const existing = readFileSync(filePath, "utf8");

    if (existing !== content) {
      console.error(`Compat artifact is out of date: ${filePath}`);
      process.exit(1);
    }

    return;
  }

  writeFileSync(filePath, content, "utf8");
}

mkdirSync(compatDistDir, { recursive: true });

for (const artifactName of artifactNames) {
  const sourcePath = resolve(sourceDistDir, artifactName);
  const destinationPath = resolve(compatDistDir, artifactName);
  compareOrWrite(destinationPath, readFileSync(sourcePath, "utf8"));
}

if (!checkMode) {
  console.log(`Synced compat artifacts into ${compatDistDir}`);
}
