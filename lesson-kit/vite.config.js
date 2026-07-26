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

export default defineConfig({
	plugins: [
		mdx({
			providerImportSource: "@mdx-js/react",
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
		react({ include: /\.(jsx|mdx)$/ }),
		mermaidSvgs(),
		viteSingleFile(),
	],
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
