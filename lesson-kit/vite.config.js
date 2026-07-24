import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

const lessonEntry = process.env.LESSON_ENTRY;

export default defineConfig({
	plugins: [
		mdx({
			providerImportSource: "@mdx-js/react",
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
		react({ include: /\.(jsx|mdx)$/ }),
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
