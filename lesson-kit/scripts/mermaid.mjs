import fs from "node:fs";
import path from "node:path";
import { chartHash } from "../mermaid-hash.js";
import { evaluateExpression } from "./lesson-ast.mjs";

const kitDir = path.resolve(import.meta.dirname, "..");
const root = path.resolve(kitDir, "..");
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

function extractCharts(lesson) {
	const charts = [];
	for (const mermaid of lesson.mermaids) {
		if (!mermaid.expression) {
			die(
				`line ${mermaid.line}: <Mermaid> is missing chart={\`...\`}.\n` +
				"Diagrams must be written as <Mermaid chart={`...`} /> with a plain template literal.",
			);
		}
		if (mermaid.expression.includes("${")) {
			die(`line ${mermaid.line}: Mermaid chart uses \${} interpolation, which cannot be pre-rendered`);
		}

		const parsed = evaluateExpression(mermaid.expression);
		if (!parsed.ok || typeof parsed.value !== "string") {
			die(
				`line ${mermaid.line}: <Mermaid> chart must be a plain template literal.\n` +
				`  ${parsed.ok ? "got a non-string value" : parsed.reason}`,
			);
		}
		charts.push(parsed.value.trim());
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

		for (const [i, result] of results.entries()) {
			if (result.error) {
				die(`Mermaid diagram failed to render (${jobs[i].theme} theme): ${label(jobs[i].chart)}\n  ${result.error}`);
			}
			fs.writeFileSync(jobs[i].file, result.svg);
		}
		return results.map((r) => r.svg);
	} finally {
		await browser.close();
	}
}

// Pre-render every diagram (once per theme); vite.config.js loads the map as virtual:mermaid-svgs.
export async function buildSvgMap(lesson) {
	const charts = extractCharts(lesson);
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
		jobs.forEach((job, i) => {
			map[job.hash][job.variant] = svgs[i];
		});
	}

	fs.writeFileSync(svgMapPath, JSON.stringify(map));
	const unique = Object.keys(map).length;
	if (unique > 0) {
		console.log(`Mermaid: ${unique} diagram(s) — ${jobs.length} rendered, ${unique * 2 - jobs.length} from cache`);
	}
}
