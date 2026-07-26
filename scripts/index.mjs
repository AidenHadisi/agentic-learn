import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const topicsDir = path.join(root, "topics");
const outPath = path.join(root, "index.html");

function read(file) {
	return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
	return escapeHtml(text)
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
		.replace(/\*([^*]+)\*/g, "<em>$1</em>")
		.replace(/`([^`]+)`/g, "<code>$1</code>");
}

// Everything under `## <heading>` up to the next `##`.
function sectionLines(markdown, heading) {
	const lines = markdown.split("\n");
	const start = lines.findIndex((l) => l.trim().toLowerCase() === `## ${heading.toLowerCase()}`);
	if (start === -1) return [];
	const rest = lines.slice(start + 1);
	const end = rest.findIndex((l) => l.startsWith("## "));
	return (end === -1 ? rest : rest.slice(0, end)).map((l) => l.trim()).filter(Boolean);
}

function parseSyllabus(markdown) {
	const title = markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? "";
	const body = markdown.split("\n");
	const titleAt = body.findIndex((l) => /^#\s+/.test(l));
	const summary = body
		.slice(titleAt + 1)
		.find((l) => l.trim() && !l.startsWith("#")) ?? "";

	const sections = sectionLines(markdown, "Sections")
		.filter((line) => /^- \[[ xX]\]/.test(line))
		.map((line) => {
			const done = /^- \[[xX]\]/.test(line);
			const rest = line.replace(/^- \[[ xX]\]\s*/, "");
			const number = Number(rest.match(/^(\d+)\./)?.[1]);
			return { done, number, text: rest.replace(/^\d+\.\s*/, "") };
		});

	return { title, summary: summary.trim(), sections };
}

function parseWeakSpots(markdown) {
	return sectionLines(markdown, "Weak Spots")
		.filter((line) => line.startsWith("- "))
		.map((line) => line.slice(2).trim())
		.filter((line) => !/^none\b/i.test(line));
}

function lessonLink(slug, number) {
	if (!Number.isInteger(number)) return null;
	const dir = path.join(topicsDir, slug, "lessons");
	if (!fs.existsSync(dir)) return null;
	const file = fs.readdirSync(dir).find((name) => name.endsWith(".html") && name.startsWith(`${number}-`));
	return file ? `topics/${slug}/lessons/${file}` : null;
}

function renderTopic(slug) {
	const syllabus = parseSyllabus(read(path.join(topicsDir, slug, "syllabus.md")));
	if (!syllabus.title) return "";

	const weakSpots = parseWeakSpots(read(path.join(topicsDir, slug, "journal.md")));
	const done = syllabus.sections.filter((s) => s.done).length;
	const total = syllabus.sections.length;
	const percent = total > 0 ? Math.round((done / total) * 100) : 0;

	const sections = syllabus.sections.map((section) => {
		const [, bold, outcome] = section.text.match(/^\*\*(.+?)\*\*\s*(.*)$/s) ?? [];
		const title = escapeHtml(bold ?? section.text);
		const href = lessonLink(slug, section.number);
		return `<li class="${section.done ? "done" : ""}">
	<span class="box">${section.done ? "✓" : ""}</span>
	<span class="num">${section.number || ""}</span>
	<span class="text">${href ? `<a href="${href}">${title}</a>` : `<strong>${title}</strong>`} ${inlineMarkdown(outcome ?? "")}</span>
</li>`;
	}).join("\n");

	const weak = weakSpots.length === 0 ? "" : `<div class="weak">
	<h3>Weak spots</h3>
	<ul>${weakSpots.map((w) => `<li>${inlineMarkdown(w)}</li>`).join("")}</ul>
</div>`;

	return `<article class="card">
	<h2>${escapeHtml(syllabus.title)}</h2>
	<p class="summary">${inlineMarkdown(syllabus.summary)}</p>
	<div class="progress">
		<div class="bar"><span style="width:${percent}%"></span></div>
		<span class="count">${done} / ${total}</span>
	</div>
	<ul class="sections">
${sections}
	</ul>
	${weak}
</article>`;
}

const STYLE = `
:root {
	--bg: #fdfcfa; --bg-raised: #f5f3ef; --bg-inset: #edeae5;
	--text: #1c1917; --text-muted: #57534e;
	--border: #e7e5e4; --border-strong: #d6d3d1;
	--accent: #0d9488; --warn: #92400e; --warn-bg: #fffbeb;
}
@media (prefers-color-scheme: dark) {
	:root {
		--bg: #1a1a1a; --bg-raised: #262626; --bg-inset: #1f1f1f;
		--text: #f5f5f4; --text-muted: #a8a29e;
		--border: #3a3a3a; --border-strong: #525252;
		--accent: #2dd4bf; --warn: #fbbf24; --warn-bg: #451a03;
	}
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
	font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
	font-size: 17px; line-height: 1.7;
	color: var(--text); background: var(--bg);
	padding: 2.5rem 1.5rem;
	-webkit-font-smoothing: antialiased;
}
main { max-width: 60rem; margin: 0 auto; }
h1 { font-family: Georgia, serif; font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 0.25rem; }
.lede { color: var(--text-muted); margin-bottom: 2.5rem; }
.card {
	background: var(--bg-raised); border: 1px solid var(--border);
	border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem;
}
.card h2 { font-family: Georgia, serif; font-size: 1.5rem; line-height: 1.25; }
.summary { color: var(--text-muted); font-size: 0.95rem; margin: 0.5rem 0 1rem; }
.progress { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
.bar { flex: 1; height: 6px; background: var(--bg-inset); border-radius: 3px; overflow: hidden; }
.bar span { display: block; height: 100%; background: var(--accent); }
.count { font-size: 0.82rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }
.sections { list-style: none; }
.sections li { display: flex; gap: 0.6rem; align-items: baseline; padding: 0.2rem 0; font-size: 0.95rem; }
.box {
	flex: none; width: 1.05rem; height: 1.05rem; border: 1px solid var(--border-strong);
	border-radius: 3px; font-size: 0.72rem; line-height: 1rem; text-align: center;
	align-self: flex-start; margin-top: 0.3rem; color: var(--accent);
}
.done .box { border-color: var(--accent); }
.num { color: var(--text-muted); font-size: 0.82rem; min-width: 1.1rem; }
.text { color: var(--text-muted); }
.text strong, .text a { color: var(--text); }
.text a { color: var(--accent); }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
a:hover { opacity: 0.8; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.88em; background: var(--bg-inset); padding: 0.1em 0.3em; border-radius: 4px; }
.weak {
	margin-top: 1.25rem; padding: 0.75rem 1rem;
	background: var(--warn-bg); border-left: 3px solid var(--warn); border-radius: 0 0.5rem 0.5rem 0;
}
.weak h3 { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--warn); margin-bottom: 0.35rem; }
.weak ul { padding-left: 1.1rem; font-size: 0.9rem; }
.empty { color: var(--text-muted); }
`;

const slugs = fs.existsSync(topicsDir)
	? fs.readdirSync(topicsDir).filter((name) => fs.statSync(path.join(topicsDir, name)).isDirectory()).sort()
	: [];

const cards = slugs.map(renderTopic).filter(Boolean);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Learning Index</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<h1>Learning Index</h1>
<p class="lede">${cards.length} topic${cards.length === 1 ? "" : "s"} · generated by <code>npm run index:build</code></p>
${cards.length > 0 ? cards.join("\n") : `<p class="empty">No topics yet.</p>`}
</main>
</body>
</html>
`;

fs.writeFileSync(outPath, html);
console.log(`Built → ${path.relative(root, outPath)} (${cards.length} topic${cards.length === 1 ? "" : "s"})`);
