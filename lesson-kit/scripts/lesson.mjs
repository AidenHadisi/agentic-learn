import fs from "node:fs";
import path from "node:path";
import { build } from "vite";
import { evaluateExpression, parseLesson } from "./lesson-ast.mjs";
import { buildSvgMap, svgMapPath } from "./mermaid.mjs";

const kitDir = path.resolve(import.meta.dirname, "..");
const root = path.resolve(kitDir, "..");
const topicsDir = path.join(root, "topics");
const catalogPath = path.join(kitDir, "components/index.jsx");
const galleryPath = path.join(kitDir, "gallery.mdx");

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

function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function loadCatalog() {
	const names = new Set();
	for (const line of fs.readFileSync(catalogPath, "utf8").split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("//")) continue;
		const match = /^export\s*\{([^}]+)\}\s*from\s*["'][^"']+["']\s*;?\s*$/.exec(trimmed);
		if (!match) {
			throw new Error(`unexpected catalog line in ${path.relative(root, catalogPath)}: ${trimmed}`);
		}
		for (const part of match[1].split(",")) {
			const name = part.trim().split(/\s+as\s+/).pop()?.trim();
			if (name) names.add(name);
		}
	}
	return names;
}

const catalog = loadCatalog();

function validateComponents(lesson, failures) {
	for (const [name, line] of lesson.used) {
		if (!catalog.has(name)) {
			failures.push(
				`line ${line}: <${name}> is not in the lesson kit.\n` +
				`  Catalog: ${[...catalog].sort().join(", ")}`,
			);
		} else if (!lesson.imported.has(name)) {
			failures.push(
				`line ${line}: <${name}> is used but not imported.\n` +
				`  Add it to the import at the top: import { ${name} } from "@learn/components";`,
			);
		}
	}
}

function validateQuizzes(lesson, failures) {
	for (const quiz of lesson.quizzes) {
		if (!quiz.expression) {
			failures.push(`line ${quiz.line}: <Quiz> is missing a questions={[...]} array`);
			continue;
		}

		const parsed = evaluateExpression(quiz.expression);
		if (!parsed.ok) {
			failures.push(
				`line ${quiz.line}: <Quiz> questions must be a plain array literal so answers can be checked.\n` +
				`  ${parsed.reason}`,
			);
			continue;
		}
		if (!Array.isArray(parsed.value)) {
			failures.push(`line ${quiz.line}: <Quiz> questions must be an array`);
			continue;
		}

		for (const [index, question] of parsed.value.entries()) {
			const where = `line ${quiz.line}, question ${index + 1}`;
			if (!question || !Array.isArray(question.options) || question.options.length === 0) {
				failures.push(`${where}: needs a non-empty options array`);
				continue;
			}

			const { answer, options, q } = question;
			if (typeof answer === "number") {
				if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) {
					failures.push(
						`${where}: answer index ${answer} is out of range (0–${options.length - 1})\n  q: ${q}`,
					);
				}
			} else if (typeof answer === "string") {
				if (!options.includes(answer)) {
					failures.push(
						`${where}: answer string is not one of the options\n` +
						`  q: ${q}\n  answer: ${JSON.stringify(answer)}\n  options: ${JSON.stringify(options)}`,
					);
				}
			} else {
				failures.push(`${where}: answer must be an option index or an exact option string\n  q: ${q}`);
			}
		}
	}
}

function validateSources(lesson, failures) {
	if (!lesson.sources) {
		failures.push("lesson must end with a <Sources list={[...]} /> component");
		return null;
	}

	const parsed = evaluateExpression(lesson.sources.expression ?? "");
	if (!parsed.ok || !Array.isArray(parsed.value)) {
		failures.push(`line ${lesson.sources.line}: <Sources> list must be a plain array literal`);
		return null;
	}

	for (const [index, source] of parsed.value.entries()) {
		if (!source?.url) continue;
		// Sources.jsx uses `new URL` for the hostname; a bad href blanks the lesson.
		try {
			new URL(source.url);
		} catch {
			failures.push(
				`line ${lesson.sources.line}: source ${index + 1} has an unparseable url: ${JSON.stringify(source.url)}`,
			);
		}
	}

	return parsed.value.length;
}

function validateRefs(lesson, sourceCount, failures) {
	if (sourceCount === null) return;

	for (const ref of lesson.refs) {
		const parsed = evaluateExpression(ref.expression ?? "");
		if (!parsed.ok) {
			failures.push(`line ${ref.line}: <Ref n={...}> must be a number or an array of numbers`);
			continue;
		}

		const numbers = Array.isArray(parsed.value) ? parsed.value : [parsed.value];
		for (const n of numbers) {
			if (!Number.isInteger(n) || n < 1 || n > sourceCount) {
				failures.push(
					`line ${ref.line}: <Ref n={${n}}> does not point at a source ` +
					`(the bibliography has ${sourceCount} ${sourceCount === 1 ? "entry" : "entries"})`,
				);
			}
		}
	}
}

function validateLesson(mdxSource, resolved) {
	const lesson = parseLesson(mdxSource);
	const failures = [];

	validateComponents(lesson, failures);
	validateQuizzes(lesson, failures);

	// Gallery demos components; it has no bibliography.
	if (path.resolve(resolved) !== galleryPath) {
		validateRefs(lesson, validateSources(lesson, failures), failures);
	}

	if (failures.length > 0) {
		console.error(`\nBuild failed — ${path.relative(root, resolved)}\n`);
		for (const failure of failures) console.error(`  ${failure}\n`);
		process.exit(1);
	}

	return lesson;
}

async function buildLesson(resolved) {
	const mdxSource = fs.readFileSync(resolved, "utf8");
	const lesson = validateLesson(mdxSource, resolved);
	await buildSvgMap(lesson);

	process.env.LESSON_ENTRY = resolved;
	process.env.MERMAID_SVGS = svgMapPath;
	process.env.LESSON_HAS_MATH = lesson.hasMath ? "1" : "";
	process.env.LESSON_HAS_CODE = lesson.hasCode ? "1" : "";

	await build({
		configFile: path.join(kitDir, "vite.config.js"),
		root: kitDir,
		mode: "production",
	});

	const built = path.join(kitDir, "dist", "index.html");
	if (!fs.existsSync(built)) {
		console.error("Build produced no output");
		process.exit(1);
	}

	let html = fs.readFileSync(built, "utf8");
	const heading = mdxSource.match(/^#\s+(.+)$/m);
	if (heading) {
		html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(heading[1])}</title>`);
	}

	const outHtml = resolved.replace(/\.mdx$/, ".html");
	fs.writeFileSync(outHtml, html);
	console.log(`Built → ${path.relative(root, outHtml)}`);
}

function listTopicLessons() {
	if (!fs.existsSync(topicsDir)) return [];
	return fs.readdirSync(topicsDir)
		.map((slug) => path.join(topicsDir, slug, "lessons"))
		.filter((dir) => fs.existsSync(dir))
		.flatMap((dir) => fs.readdirSync(dir)
			.filter((name) => name.endsWith(".mdx"))
			.sort()
			.map((name) => path.join(dir, name)));
}

const [command, ...args] = process.argv.slice(2);

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
	await buildLesson(resolved);
} else if (command === "build-all") {
	const lessons = listTopicLessons();
	for (const lesson of lessons) {
		await buildLesson(lesson);
	}
	console.log(`\nRebuilt ${lessons.length} lesson(s)`);
} else {
	console.error("Commands: new, build, build-all");
	process.exit(1);
}
