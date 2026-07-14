import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { build } from "esbuild";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(projectRoot, "templates", "lesson.html");
const runtimeDirectory = path.join(projectRoot, "templates", "runtime");
const generatedStylesPattern =
  /<!-- GENERATED-STYLES:START -->[\s\S]*?<!-- GENERATED-STYLES:END -->/;
const generatedRuntimePattern =
  /<!-- GENERATED-RUNTIME:START -->[\s\S]*?<!-- GENERATED-RUNTIME:END -->/;

function projectPath(value) {
  const resolved = path.resolve(projectRoot, value);
  if (!resolved.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error("Lesson path must stay inside the project");
  }
  return resolved;
}

async function scaffold(targetArgument) {
  const target = projectPath(targetArgument);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(templatePath, target, fs.constants.COPYFILE_EXCL);
  console.log(`Created ${path.relative(projectRoot, target)}`);
}

function detectCapabilities(html) {
  return {
    code: /<pre[^>]*>\s*<code\b/i.test(html),
    mermaid: /\bdata-mermaid\b/.test(html),
    chart: /\bdata-chart\b/.test(html),
    katex: /\bdata-katex\b/.test(html),
    cytoscape: /\bdata-cytoscape\b/.test(html),
  };
}

async function bundleRuntime(capabilities) {
  const imports = [path.join(runtimeDirectory, "core.js")];
  for (const capability of ["mermaid", "chart", "katex", "cytoscape"]) {
    if (capabilities[capability]) {
      imports.push(path.join(runtimeDirectory, "capabilities", `${capability}.js`));
    }
  }

  const result = await build({
    stdin: {
      contents: imports.map((entry) => `import ${JSON.stringify(entry)};`).join("\n"),
      resolveDir: projectRoot,
      sourcefile: "lesson-runtime.js",
    },
    bundle: true,
    format: "iife",
    minify: true,
    target: ["es2022"],
    write: false,
  });
  return result.outputFiles[0].text;
}

async function highlightAssets() {
  const vendor = path.join(projectRoot, "templates", "vendor");
  const [light, dark, script] = await Promise.all([
    fs.readFile(path.join(vendor, "highlight-github.min.css"), "utf8"),
    fs.readFile(path.join(vendor, "highlight-github-dark.min.css"), "utf8"),
    fs.readFile(path.join(vendor, "highlight.min.js"), "utf8"),
  ]);
  return {
    css: `${light}
.hljs-built_in,.hljs-symbol{color:#984600}
@media (prefers-color-scheme: dark) {
${dark}
}`,
    js: `${script}\ndocument.addEventListener("DOMContentLoaded",()=>hljs.highlightAll());`,
  };
}

function fontMimeType(filename) {
  if (filename.endsWith(".woff2")) return "font/woff2";
  if (filename.endsWith(".woff")) return "font/woff";
  if (filename.endsWith(".ttf")) return "font/ttf";
  return "application/octet-stream";
}

async function katexStyles() {
  const katexDirectory = path.join(projectRoot, "node_modules", "katex", "dist");
  let css = await fs.readFile(path.join(katexDirectory, "katex.min.css"), "utf8");
  const fontReferences = [...css.matchAll(/url\(fonts\/([^)]+)\)/g)];
  for (const [, filename] of fontReferences) {
    const font = await fs.readFile(path.join(katexDirectory, "fonts", filename));
    const dataUrl = `data:${fontMimeType(filename)};base64,${font.toString("base64")}`;
    css = css.replaceAll(`url(fonts/${filename})`, `url(${dataUrl})`);
  }
  return css;
}

function replaceGenerated(html, pattern, start, content, end) {
  if (!pattern.test(html)) {
    throw new Error(`Template is missing ${start}`);
  }
  const replacement = `${start}\n${content}\n${end}`;
  return html.replace(pattern, () => replacement);
}

function assertStandalone(html) {
  const forbidden = [
    [/<script\b[^>]*\bsrc\s*=/i, "external script"],
    [/<link\b[^>]*\brel=["']?stylesheet/i, "external stylesheet"],
    [/@import\s+/i, "CSS import"],
    [/url\(\s*["']?https?:/i, "external CSS resource"],
  ];
  for (const [pattern, label] of forbidden) {
    if (pattern.test(html)) throw new Error(`Built lesson contains an ${label}`);
  }
}

async function compile(targetArgument) {
  const target = projectPath(targetArgument);
  let html = await fs.readFile(target, "utf8");
  const content = html.match(/<!-- CONTENT -->([\s\S]*?)<!-- \/CONTENT/)?.[1];
  if (!content) throw new Error("Lesson is missing CONTENT markers");
  const capabilities = detectCapabilities(content);
  const styles = [];
  const scripts = [await bundleRuntime(capabilities)];

  if (capabilities.code) {
    const highlight = await highlightAssets();
    styles.push(highlight.css);
    scripts.push(highlight.js);
  }
  if (capabilities.katex) styles.push(await katexStyles());

  html = replaceGenerated(
    html,
    generatedStylesPattern,
    "<!-- GENERATED-STYLES:START -->",
    styles.length ? `<style>${styles.join("\n")}</style>` : "",
    "<!-- GENERATED-STYLES:END -->",
  );
  html = replaceGenerated(
    html,
    generatedRuntimePattern,
    "<!-- GENERATED-RUNTIME:START -->",
    `<script>${scripts
      .join("\n")
      .replace(/[ \t]+$/gm, "")
      .replaceAll("</script", "<\\/script")}</script>`,
    "<!-- GENERATED-RUNTIME:END -->",
  );
  assertStandalone(html);
  await fs.writeFile(target, html);

  const enabled = Object.entries(capabilities)
    .filter(([, active]) => active)
    .map(([name]) => name);
  console.log(
    `Built ${path.relative(projectRoot, target)} (${enabled.join(", ") || "core"})`,
  );
}

const [command, target] = process.argv.slice(2);
if (!command || !target || !["new", "build"].includes(command)) {
  throw new Error("Usage: node scripts/lesson.mjs <new|build> <lesson-path>");
}

if (command === "new") await scaffold(target);
else await compile(target);
