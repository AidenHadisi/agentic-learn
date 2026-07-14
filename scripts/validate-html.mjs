import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { HtmlValidate } from "html-validate";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function lessonFiles() {
  const explicit = process.argv.slice(2);
  if (explicit.length) return explicit.map((file) => path.resolve(projectRoot, file));

  const topicRoot = path.join(projectRoot, "topics");
  const entries = await fs.readdir(topicRoot, { recursive: true });
  return [
    path.join(projectRoot, "templates", "component-gallery.html"),
    ...entries
      .filter((entry) => entry.endsWith(".html"))
      .map((entry) => path.join(topicRoot, entry)),
  ];
}

function validateStandalone(html, filename) {
  const failures = [];
  const checks = [
    [/<script\b[^>]*\bsrc\s*=/i, "external script"],
    [/<link\b[^>]*\brel=["']?stylesheet/i, "external stylesheet"],
    [/@import\s+/i, "CSS import"],
    [/url\(\s*["']?https?:/i, "external CSS resource"],
  ];
  for (const [pattern, label] of checks) {
    if (pattern.test(html)) failures.push(`${filename}: contains ${label}`);
  }
  if (!html.includes("<!-- GENERATED-RUNTIME:START -->")) {
    failures.push(`${filename}: missing generated runtime markers`);
  }
  if (!html.includes("<!-- GENERATED-STYLES:START -->")) {
    failures.push(`${filename}: missing generated style markers`);
  }

  for (const match of html.matchAll(
    /<script\s+type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${filename}: invalid JSON configuration (${error.message})`);
    }
  }
  return failures;
}

const htmlValidate = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "attribute-boolean-style": "off",
    "doctype-style": "off",
    "element-required-attributes": "off",
    "long-title": "off",
    "no-inline-style": "off",
    "prefer-native-element": "off",
    "require-sri": "off",
  },
});

let failed = false;
for (const filename of await lessonFiles()) {
  const relative = path.relative(projectRoot, filename);
  const html = await fs.readFile(filename, "utf8");
  const report = await htmlValidate.validateString(html, relative);

  for (const result of report.results) {
    for (const message of result.messages) {
      console.error(
        `${relative}:${message.line}:${message.column} ${message.ruleId} ${message.message}`,
      );
      failed = true;
    }
  }
  for (const failure of validateStandalone(html, relative)) {
    console.error(failure);
    failed = true;
  }
}

if (failed) process.exitCode = 1;
else console.log("HTML validation passed");
