import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSvgMap, svgMapPath } from "./mermaid.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kitDir = path.join(root, "lesson-kit");
const catalogPath = path.join(kitDir, "components/index.jsx");

const [command, ...args] = process.argv.slice(2);

const STUB = `import { Callout, Meta, Quiz, Stepper, Step, Sources } from "@learn/components";

# Lesson Title

<Meta>One-line subtitle</Meta>

Explain what this chapter is about and why it matters — in full paragraphs, not bullet notes.

## Main Idea

Motivate the concept, explain it in plain English, then walk a concrete worked example.

<Stepper>
	<Step>First step of the worked example</Step>
	<Step>Second step</Step>
	<Step>Result and interpretation</Step>
</Stepper>

<Callout variant="key" title="Takeaway">
The one thing the student must remember from this section.
</Callout>

## Practice

Give the student something to try themselves. Do not include the solution.

## Quiz

<Quiz questions={[
	{ q: "Sample application question?", options: ["Wrong", "Right", "Also wrong"], answer: 1, explain: "Why the right option is right." },
]} />

<Sources list={[
	{ author: "Author", year: "2024", title: "Primary source title", url: "https://example.com" },
]} />
`;

function loadCatalog() {
	const src = fs.readFileSync(catalogPath, "utf8");
	const names = new Set();
	for (const block of src.matchAll(/export\s*\{([^}]+)\}/g)) {
		for (const part of block[1].split(",")) {
			const name = part.trim().split(/\s+as\s+/).pop()?.trim();
			if (name) names.add(name);
		}
	}
	names.delete("components");
	return names;
}

function validateComponents(mdxSource) {
	const catalog = loadCatalog();
	const used = [...new Set(
		(mdxSource.match(/<([A-Z]\w*)/g) || []).map((m) => m.slice(1)),
	)];
	if (used.length === 0) return;

	const unknown = used.filter((name) => !catalog.has(name));
	if (unknown.length > 0) {
		console.error(`\nBuild failed: unknown components (not in lesson-kit): ${unknown.join(", ")}`);
		console.error(`Catalog exports: ${[...catalog].sort().join(", ")}`);
		process.exit(1);
	}

	const importSection = mdxSource.split(/\n(?=[^i]|i[^m])/)[0] || "";
	const missing = used.filter((name) => !importSection.includes(name));
	if (missing.length > 0) {
		console.error(`\nBuild failed: components used but not imported: ${missing.join(", ")}`);
		console.error(`Add to the top of your MDX:\n  import { ${missing.join(", ")} } from "@learn/components";\n`);
		process.exit(1);
	}
}

function extractQuizQuestionArrays(mdxSource) {
	const arrays = [];
	const marker = "<Quiz";
	let from = 0;
	while (from < mdxSource.length) {
		const start = mdxSource.indexOf(marker, from);
		if (start === -1) break;
		const questionsAt = mdxSource.indexOf("questions={", start);
		if (questionsAt === -1 || questionsAt > mdxSource.indexOf(">", start) + 2000) {
			from = start + marker.length;
			continue;
		}
		const bracketStart = mdxSource.indexOf("[", questionsAt);
		if (bracketStart === -1) {
			from = start + marker.length;
			continue;
		}
		let depth = 0;
		let end = -1;
		for (let i = bracketStart; i < mdxSource.length; i++) {
			const ch = mdxSource[i];
			if (ch === "[") depth++;
			else if (ch === "]") {
				depth--;
				if (depth === 0) {
					end = i;
					break;
				}
			}
		}
		if (end === -1) {
			console.error("\nBuild failed: could not parse Quiz questions={[...]} array");
			process.exit(1);
		}
		arrays.push(mdxSource.slice(bracketStart, end + 1));
		from = end + 1;
	}
	return arrays;
}

function validateQuizAnswers(mdxSource) {
	const arrays = extractQuizQuestionArrays(mdxSource);
	for (const literal of arrays) {
		let questions;
		try {
			questions = new Function(`return (${literal})`)();
		} catch (err) {
			console.error("\nBuild failed: Quiz questions array is not valid JavaScript");
			console.error(err.message);
			process.exit(1);
		}
		if (!Array.isArray(questions)) {
			console.error("\nBuild failed: Quiz questions must be an array");
			process.exit(1);
		}
		questions.forEach((q, i) => {
			if (!q || !Array.isArray(q.options) || q.options.length === 0) {
				console.error(`\nBuild failed: Quiz question ${i + 1} needs a non-empty options array`);
				process.exit(1);
			}
			const { answer, options } = q;
			if (typeof answer === "number") {
				if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) {
					console.error(`\nBuild failed: Quiz question ${i + 1} answer index ${answer} is out of range (0–${options.length - 1})`);
					console.error(`  q: ${q.q}`);
					process.exit(1);
				}
			} else if (typeof answer === "string") {
				if (!options.includes(answer)) {
					console.error(`\nBuild failed: Quiz question ${i + 1} answer string not found in options`);
					console.error(`  q: ${q.q}`);
					console.error(`  answer: ${JSON.stringify(answer)}`);
					console.error(`  options: ${JSON.stringify(options)}`);
					process.exit(1);
				}
			} else {
				console.error(`\nBuild failed: Quiz question ${i + 1} answer must be an index or exact option string`);
				console.error(`  q: ${q.q}`);
				process.exit(1);
			}
		});
	}
}

function validateSources(mdxSource, resolved) {
	if (resolved.includes(`${path.sep}lesson-kit${path.sep}`)) return;
	if (!/<Sources\b/.test(mdxSource)) {
		console.error("\nBuild failed: lesson must end with a <Sources list={[...]} /> component");
		process.exit(1);
	}
}

if (command === "new") {
	const target = args[0];
	if (!target) {
		console.error("Usage: npm run lesson:new -- <path.mdx>");
		process.exit(1);
	}
	const resolved = path.resolve(root, target);
	if (!resolved.endsWith(".mdx")) {
		console.error("Target must end in .mdx");
		process.exit(1);
	}
	if (fs.existsSync(resolved)) {
		console.error(`Already exists: ${resolved}`);
		process.exit(1);
	}
	fs.mkdirSync(path.dirname(resolved), { recursive: true });
	fs.writeFileSync(resolved, STUB);
	console.log(`Created ${path.relative(root, resolved)}`);
} else if (command === "build") {
	const target = args[0];
	if (!target) {
		console.error("Usage: npm run lesson:build -- <path.mdx>");
		process.exit(1);
	}
	const resolved = path.resolve(root, target);
	if (!fs.existsSync(resolved)) {
		console.error(`Not found: ${resolved}`);
		process.exit(1);
	}

	const mdxSource = fs.readFileSync(resolved, "utf8");
	validateComponents(mdxSource);
	validateQuizAnswers(mdxSource);
	validateSources(mdxSource, resolved);
	await buildSvgMap(mdxSource);

	const outHtml = resolved.replace(/\.mdx$/, ".html");

	execSync(
		`npx vite build --mode production`,
		{
			cwd: kitDir,
			stdio: "inherit",
			env: {
				...process.env,
				LESSON_ENTRY: resolved,
				MERMAID_SVGS: svgMapPath,
			},
		},
	);

	const built = path.join(kitDir, "dist", "index.html");
	if (fs.existsSync(built)) {
		let html = fs.readFileSync(built, "utf8");
		const mdx = fs.readFileSync(resolved, "utf8");
		const headingMatch = mdx.match(/^#\s+(.+)$/m);
		if (headingMatch) {
			html = html.replace(/<title>[^<]*<\/title>/, `<title>${headingMatch[1]}</title>`);
		}
		fs.writeFileSync(outHtml, html);
		console.log(`Built → ${path.relative(root, outHtml)}`);
	} else {
		console.error("Build produced no output");
		process.exit(1);
	}
} else {
	console.error("Commands: new, build");
	process.exit(1);
}
