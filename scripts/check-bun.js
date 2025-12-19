#!/usr/bin/env node

/**
 * Preinstall script to enforce npm usage
 * This script prevents installation using yarn, pnpm, or bun
 */

const npmExecPath = process.env.npm_execpath || "";

// Check if the package manager is not npm
if (
  npmExecPath.includes("yarn") ||
  npmExecPath.includes("pnpm") ||
  npmExecPath.includes("bun")
) {
  console.error("\n❌ This project requires npm.");
  console.error("Please use: npm install\n");
  process.exit(1);
}

// If we get here, npm is being used
console.log("✓ Using npm package manager");
