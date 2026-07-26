import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "node:fs";
import path from "node:path";

const lessonEntry = process.env.LESSON_ENTRY;
const svgMapPath = process.env.MERMAID_SVGS;
const hasMath = Boolean(process.env.LESSON_HAS_MATH);

// Serves the SVGs that scripts/mermaid.mjs pre-rendered, so the mermaid
// library itself never reaches the bundle.
function mermaidSvgs() {
	const id = "virtual:mermaid-svgs";
	const resolved = `\0${id}`;
	return {
		name: "mermaid-svgs",
		resolveId: (source) => (source === id ? resolved : null),
		load(source) {
			if (source !== resolved) return null;
			const json = svgMapPath && fs.existsSync(svgMapPath) ? fs.readFileSync(svgMapPath, "utf8") : "{}";
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
		load: (source) =>
			source === resolved ? (hasMath ? `import "katex/dist/katex.min.css";` : "") : null,
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

// Every lesson opens as a file:// page, and browsers give all of them the same
// storage origin. Keying saved work by topic and lesson keeps them apart.
const lessonId = lessonEntry
	? path.relative(path.resolve(__dirname, ".."), lessonEntry)
		.replace(/\.mdx$/, "")
		.replace(/^topics\//, "")
		.replace(/\/lessons\//, "/")
	: "gallery";

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
			"@learn/components": path.resolve(__dirname, "components/index.jsx"),
			"@learn/lesson": lessonEntry
				? path.resolve(lessonEntry)
				: path.resolve(__dirname, "gallery.mdx"),
		},
	},
	build: {
		outDir: path.resolve(__dirname, "dist"),
		emptyOutDir: true,
	},
});
