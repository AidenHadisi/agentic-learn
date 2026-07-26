import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chartHash } from "../lesson-kit/mermaid-hash.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(root, ".cache", "mermaid");
const mermaidBundle = path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js");

export const svgMapPath = path.join(cacheDir, "build.json");

const THEMES = { light: "default", dark: "dark" };

function die(message) {
	console.error(`\nBuild failed: ${message}`);
	process.exit(1);
}

function label(chart) {
	return chart.trim().split("\n")[0].slice(0, 80);
}

function extractCharts(mdxSource) {
	const charts = [];
	for (const m of mdxSource.matchAll(/<Mermaid\s+chart=\{`([\s\S]*?)`\}\s*\/>/g)) {
		charts.push(m[1].trim());
	}
	const tags = (mdxSource.match(/<Mermaid\b/g) || []).length;
	if (tags !== charts.length) {
		die(
			`found ${tags} <Mermaid> tag(s) but could only parse ${charts.length}.\n` +
			"Diagrams must be written as <Mermaid chart={`...`} /> with a plain template literal.",
		);
	}
	for (const chart of charts) {
		if (chart.includes("${")) {
			die(`Mermaid chart uses \${} interpolation, which cannot be pre-rendered: ${label(chart)}`);
		}
	}
	return charts;
}

async function renderCharts(jobs) {
	const { default: puppeteer } = await import("puppeteer");
	const browser = await puppeteer.launch();
	try {
		const page = await browser.newPage();
		await page.setContent("<!DOCTYPE html><html><body></body></html>");
		await page.addScriptTag({ path: mermaidBundle });
		const results = await page.evaluate(async (batch) => {
			const out = [];
			for (const job of batch) {
				try {
					window.mermaid.initialize({ startOnLoad: false, theme: job.theme });
					const { svg } = await window.mermaid.render(job.id, job.chart);
					out.push({ svg });
				} catch (err) {
					out.push({ error: String(err && err.message ? err.message : err) });
				}
			}
			return out;
		}, jobs.map(({ id, theme, chart }) => ({ id, theme, chart })));

		results.forEach((result, i) => {
			if (result.error) {
				die(`Mermaid diagram failed to render (${jobs[i].theme} theme): ${label(jobs[i].chart)}\n  ${result.error}`);
			}
			fs.writeFileSync(jobs[i].file, result.svg);
		});
		return results.map((r) => r.svg);
	} finally {
		await browser.close();
	}
}

// Pre-renders every diagram in the lesson to SVG (once per theme) and writes the
// hash -> { light, dark } map that vite.config.js serves as `virtual:mermaid-svgs`.
export async function buildSvgMap(mdxSource) {
	const charts = extractCharts(mdxSource);
	fs.mkdirSync(cacheDir, { recursive: true });

	const map = {};
	const jobs = [];
	for (const chart of charts) {
		const hash = chartHash(chart);
		if (map[hash]) continue;
		map[hash] = {};
		for (const [variant, theme] of Object.entries(THEMES)) {
			const file = path.join(cacheDir, `${hash}.${variant}.svg`);
			if (fs.existsSync(file)) {
				map[hash][variant] = fs.readFileSync(file, "utf8");
			} else {
				jobs.push({ hash, variant, theme, chart, file, id: `m-${hash}-${variant}` });
			}
		}
	}

	if (jobs.length > 0) {
		const svgs = await renderCharts(jobs);
		jobs.forEach((job, i) => { map[job.hash][job.variant] = svgs[i]; });
	}

	fs.writeFileSync(svgMapPath, JSON.stringify(map));
	const unique = Object.keys(map).length;
	if (unique > 0) {
		console.log(`Mermaid: ${unique} diagram(s) — ${jobs.length} rendered, ${unique * 2 - jobs.length} from cache`);
	}
}
