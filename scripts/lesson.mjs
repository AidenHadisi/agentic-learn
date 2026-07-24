import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kitDir = path.join(root, "lesson-kit");

const [command, ...args] = process.argv.slice(2);

const STUB = `import { Callout, Quiz } from "@learn/components";

# Lesson Title

<div className="lesson-meta">15 min</div>

**Objective:** What the student will be able to do.

## Main Idea

Explain the core concept here.

## Example

Walk through a concrete example.

## Practice

Give the student something to try themselves.

<Quiz questions={[
\t{ q: "Sample question?", options: ["A", "B", "C"], answer: 0, explain: "Explanation here." },
]} />

## References

- [Source](https://example.com) — why it matters
`;

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

	const outHtml = resolved.replace(/\.mdx$/, ".html");
	const outDir = path.dirname(outHtml);

	execSync(
		`npx vite build --mode production`,
		{
			cwd: kitDir,
			stdio: "inherit",
			env: {
				...process.env,
				LESSON_ENTRY: resolved,
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
