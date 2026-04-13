#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const usage = `
Usage: yarn release [--dry-run] [--skip-tests] [--no-push] <version>

Examples:
  yarn release 4.2.1
  yarn release --dry-run 5.0.0-beta.1
`;

const args = process.argv.slice(2);
const options = {
  dryRun: false,
  skipTests: false,
  push: true,
};
const positionals = [];

for (const arg of args) {
  if (arg === "--dry-run") {
    options.dryRun = true;
    continue;
  }

  if (arg === "--skip-tests") {
    options.skipTests = true;
    continue;
  }

  if (arg === "--no-push") {
    options.push = false;
    continue;
  }

  positionals.push(arg);
}

if (positionals.length !== 1) {
  console.error(usage.trim());
  process.exit(1);
}

const version = positionals[0];
const semverPattern =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

if (!semverPattern.test(version)) {
  console.error(`Invalid semantic version: ${version}`);
  process.exit(1);
}

process.chdir(repoRoot);

function query(command, commandArgs) {
  return execFileSync(command, commandArgs, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}

function run(command, commandArgs) {
  const display = [command, ...commandArgs].join(" ");
  console.log(`$ ${display}`);

  if (options.dryRun) {
    return "";
  }

  execFileSync(command, commandArgs, {
    cwd: repoRoot,
    stdio: "inherit",
  });
}

function capture(command, commandArgs) {
  return query(command, commandArgs);
}

const branch = capture("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

if (branch === "HEAD") {
  console.error("Refusing to release from a detached HEAD.");
  process.exit(1);
}

const workingTreeStatus = capture("git", ["status", "--porcelain"]);

if (workingTreeStatus) {
  console.error("Refusing to release with a dirty working tree.");
  process.exit(1);
}

const existingTag = capture("git", ["tag", "--list", `v${version}`]);

if (existingTag) {
  console.error(`Tag v${version} already exists.`);
  process.exit(1);
}

let releaseState = "clean";

try {
  console.log(`Preparing release ${version} from branch ${branch}.`);

  run("yarn", ["install", "--frozen-lockfile"]);

  if (!options.skipTests) {
    run("yarn", ["test"]);
  }

  releaseState = "versioned";
  run("yarn", [
    "version",
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--new-version",
    version,
  ]);

  run("yarn", ["build"]);

  run("git", ["add", "package.json", "yarn.lock", "dist"]);
  run("git", ["commit", "-m", `Release v${version}`]);

  releaseState = "committed";
  run("git", ["tag", "-a", `v${version}`, "-m", `Release v${version}`]);

  if (options.push) {
    run("git", ["push", "origin", branch]);
    run("git", ["push", "origin", `v${version}`]);
  }

  console.log(`sol: Release v${version} created from ${branch}.`);
} catch (error) {
  if (!options.dryRun && releaseState === "versioned") {
    try {
      execFileSync("git", ["restore", "package.json", "yarn.lock", "dist"], {
        cwd: repoRoot,
        stdio: "inherit",
      });
    } catch (restoreError) {
      console.error("Automatic rollback failed after the release error.");
    }
  }

  if (!options.dryRun && releaseState === "committed") {
    console.error("Release failed after the commit was created. Inspect the branch and tag state before retrying.");
  }

  if (error instanceof Error) {
    process.exit(typeof error.status === "number" ? error.status : 1);
  }

  process.exit(1);
}
