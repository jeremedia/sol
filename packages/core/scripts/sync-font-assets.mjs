#!/usr/bin/env node

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { fontFiles } from "./core-fonts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourceDir = resolve(packageRoot, "src", "moma-sans");
const distDir = resolve(packageRoot, "dist", "moma-sans");

const checkMode = process.argv.includes("--check");

function readBuffer(filePath) {
  return readFileSync(filePath);
}

mkdirSync(distDir, { recursive: true });

for (const fileName of fontFiles) {
  const sourcePath = resolve(sourceDir, fileName);
  const destinationPath = resolve(distDir, fileName);

  if (checkMode) {
    const sourceBuffer = readBuffer(sourcePath);
    const destinationBuffer = readBuffer(destinationPath);

    if (!sourceBuffer.equals(destinationBuffer)) {
      console.error(`Font asset is out of date: ${destinationPath}`);
      process.exit(1);
    }

    continue;
  }

  copyFileSync(sourcePath, destinationPath);
  console.log(`Synced ${destinationPath}`);
}
