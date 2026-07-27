import fs from "node:fs";
import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { viteSingleFile } from "vite-plugin-singlefile";

// import.meta.dirname → this config file, so aliases resolve relative to lesson-kit/
// regardless of cwd when Vite is invoked.
const kitDir = import.meta.dirname;
const lessonEntry = process.env.LESSON_ENTRY;
const svgMapPath = process.env.MERMAID_SVGS;
const hasMath = Boolean(process.env.LESSON_HAS_MATH);
const hasCode = Boolean(process.env.LESSON_HAS_CODE);

// Every lesson opens as a file:// page, and browsers give all of them the same
// storage origin. Keying saved work by topic and lesson keeps them apart.
const lessonId = lessonEntry
	? path
		.relative(path.resolve(kitDir, ".."), lessonEntry)
		.replace(/\.mdx$/, "")
		.replace(/^topics\//, "")
		.replace(/\/lessons\//, "/")
	: "gallery";

// Serves the SVGs that lesson-kit/scripts/mermaid.mjs pre-rendered, so the
// mermaid library itself never reaches the bundle.
function mermaidSvgs() {
	const id = "virtual:mermaid-svgs";
	const resolved = `\0${id}`;
	return {
		name: "mermaid-svgs",
		resolveId: (source) => (source === id ? resolved : null),
		load(source) {
			if (source !== resolved) return null;
			const json =
				svgMapPath && fs.existsSync(svgMapPath)
					? fs.readFileSync(svgMapPath, "utf8")
					: "{}";
			return `export default ${json};`;
		},
	};
}

// KaTeX's stylesheet and its 20 fonts are ~1.2 MB base64-inlined, so lessons
// with no math skip it entirely.
function katexStyles() {
	const id = "virtual:katex-styles";
	const resolved = `\0${id}`;
	return {
		name: "katex-styles",
		resolveId: (source) => (source === id ? resolved : null),
		load(source) {
			if (source !== resolved) return null;
			return hasMath ? `import "katex/dist/katex.min.css";` : "";
		},
	};
}

// KaTeX declares woff2, woff and ttf for every font. Only woff2 can ever load in
// a browser that runs this bundle, and dropping the other two keeps ~1 MB of
// base64 out of every lesson with math.
function woff2Only() {
	return {
		name: "woff2-only",
		enforce: "pre",
		transform(code, id) {
			if (!id.includes("katex.min.css")) return null;
			return {
				code: code.replace(
					/,url\([^)]+\.woff\) format\("woff"\),url\([^)]+\.ttf\) format\("truetype"\)/g,
					"",
				),
				map: null,
			};
		},
	};
}

export default defineConfig({
	plugins: [
		woff2Only(),
		mdx({
			providerImportSource: "@mdx-js/react",
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
		react({ include: /\.(jsx|mdx)$/ }),
		mermaidSvgs(),
		katexStyles(),
		viteSingleFile(),
	],
	define: {
		__LESSON_ID__: JSON.stringify(lessonId),
	},
	resolve: {
		alias: {
			"@learn/components": path.resolve(kitDir, "components/index.jsx"),
			// highlight.js is ~150 KB; only wire CodeBlock into the MDX map when
			// the lesson actually has fenced code or an explicit <CodeBlock>.
			"@learn/mdx-overrides": path.resolve(
				kitDir,
				hasCode
					? "components/mdx-overrides.jsx"
					: "components/mdx-overrides-plain.jsx",
			),
			"@learn/lesson": lessonEntry
				? path.resolve(lessonEntry)
				: path.resolve(kitDir, "gallery.mdx"),
		},
	},
	build: {
		outDir: path.resolve(kitDir, "dist"),
		emptyOutDir: true,
	},
});
