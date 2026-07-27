import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { toString } from "mdast-util-to-string";
import { gfm } from "micromark-extension-gfm";

const root = path.dirname(fileURLToPath(import.meta.url));
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

function stripHtml(html) {
	return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parse(markdown) {
	return fromMarkdown(markdown, {
		extensions: [gfm()],
		mdastExtensions: [gfmFromMarkdown()],
	});
}

/** Render mdast phrasing nodes (bold/italic/code/links) to HTML. */
function phrasingToHtml(nodes) {
	if (!nodes) return "";
	return nodes.map((node) => {
		switch (node.type) {
			case "text":
				return escapeHtml(node.value);
			case "strong":
				return `<strong>${phrasingToHtml(node.children)}</strong>`;
			case "emphasis":
				return `<em>${phrasingToHtml(node.children)}</em>`;
			case "inlineCode":
				return `<code>${escapeHtml(node.value)}</code>`;
			case "link":
				return `<a href="${escapeHtml(node.url)}">${phrasingToHtml(node.children)}</a>`;
			case "break":
				return "<br />";
			default:
				return node.children ? phrasingToHtml(node.children) : escapeHtml(toString(node));
		}
	}).join("");
}

function headingText(node) {
	return toString(node).trim();
}

/** Nodes under `## <heading>` until the next `##` (or end). */
function sectionChildren(tree, heading) {
	const want = heading.toLowerCase();
	const children = tree.children;
	const start = children.findIndex(
		(n) => n.type === "heading" && n.depth === 2 && headingText(n).toLowerCase() === want,
	);
	if (start === -1) return [];

	const out = [];
	for (let i = start + 1; i < children.length; i++) {
		const node = children[i];
		if (node.type === "heading" && node.depth <= 2) break;
		out.push(node);
	}
	return out;
}

function listItems(nodes) {
	return nodes
		.filter((n) => n.type === "list")
		.flatMap((list) => list.children.filter((n) => n.type === "listItem"));
}

/** Phrasing inside a list item (usually one paragraph's children). */
function itemPhrasing(item) {
	const paragraph = item.children.find((n) => n.type === "paragraph");
	return paragraph?.children ?? [];
}

function parseSyllabus(markdown) {
	const tree = parse(markdown);

	const titleNode = tree.children.find((n) => n.type === "heading" && n.depth === 1);
	const title = titleNode ? headingText(titleNode) : "";

	const titleAt = tree.children.indexOf(titleNode);
	const summaryNode = tree.children
		.slice(titleAt + 1)
		.find((n) => n.type === "paragraph");
	const summaryHtml = summaryNode ? phrasingToHtml(summaryNode.children) : "";

	const sections = listItems(sectionChildren(tree, "Sections")).map((item) => {
		const phrasing = itemPhrasing(item);
		const plain = toString({ type: "paragraph", children: phrasing }).trim();
		const number = Number(plain.match(/^(\d+)\./)?.[1]);

		// Drop the leading "N. " text node so the title strong stands alone.
		let rest = phrasing;
		if (rest[0]?.type === "text") {
			rest = [
				{ ...rest[0], value: rest[0].value.replace(/^\d+\.\s*/, "") },
				...rest.slice(1),
			];
			if (!rest[0].value) rest = rest.slice(1);
		}

		const strong = rest.find((n) => n.type === "strong");
		const strongAt = rest.indexOf(strong);
		const titleText = strong ? toString(strong) : toString({ type: "paragraph", children: rest });
		const outcomeNodes = strongAt >= 0 ? rest.slice(strongAt + 1) : [];

		return {
			done: item.checked === true,
			number,
			title: titleText,
			outcomeHtml: phrasingToHtml(outcomeNodes).trim(),
		};
	});

	return { title, summaryHtml, sections };
}

function parseWeakSpots(markdown) {
	return listItems(sectionChildren(parse(markdown), "Weak Spots"))
		.map((item) => ({
			html: phrasingToHtml(itemPhrasing(item)).trim(),
			plain: toString(item).trim(),
		}))
		.filter(({ html, plain }) => html && !/^none\b/i.test(plain))
		.map(({ html }) => html);
}

function lessonLink(slug, number) {
	if (!Number.isInteger(number)) return null;
	const dir = path.join(topicsDir, slug, "lessons");
	if (!fs.existsSync(dir)) return null;
	const file = fs.readdirSync(dir).find((name) => name.endsWith(".html") && name.startsWith(`${number}-`));
	return file ? `topics/${slug}/lessons/${file}` : null;
}

function loadTopic(slug) {
	const syllabus = parseSyllabus(read(path.join(topicsDir, slug, "syllabus.md")));
	if (!syllabus.title) return null;

	const weakSpots = parseWeakSpots(read(path.join(topicsDir, slug, "journal.md")));
	const sections = syllabus.sections.map((section) => ({
		...section,
		href: lessonLink(slug, section.number),
	}));
	const done = sections.filter((s) => s.done).length;
	const total = sections.length;
	const next = sections.find((s) => !s.done);

	return {
		slug,
		title: syllabus.title,
		summaryHtml: syllabus.summaryHtml,
		summaryPlain: stripHtml(syllabus.summaryHtml),
		sections,
		weakSpots,
		done,
		total,
		percent: total > 0 ? Math.round((done / total) * 100) : 0,
		next,
	};
}

function renderTopic(topic) {
	const searchBlob = [
		topic.title,
		topic.summaryPlain,
		...topic.sections.map((s) => s.title),
	].join(" ").toLowerCase();

	const weakBadge = topic.weakSpots.length > 0
		? `<span class="badge">${topic.weakSpots.length} weak</span>`
		: "";

	const continueLink = topic.next?.href
		? `<a class="continue" href="${topic.next.href}">Continue → ${escapeHtml(topic.next.title)}</a>`
		: topic.next
			? `<span class="continue muted">Next: ${escapeHtml(topic.next.title)}</span>`
			: topic.total > 0 && topic.done === topic.total
				? `<span class="continue muted">Complete</span>`
				: "";

	const sections = topic.sections.map((section) => {
		const title = escapeHtml(section.title);
		return `<li class="${section.done ? "done" : ""}" data-section="${escapeHtml(section.title.toLowerCase())}">
	<span class="box">${section.done ? "✓" : ""}</span>
	<span class="num">${section.number || ""}</span>
	<span class="text">${section.href ? `<a href="${section.href}">${title}</a>` : `<strong>${title}</strong>`}${section.outcomeHtml ? ` ${section.outcomeHtml}` : ""}</span>
</li>`;
	}).join("\n");

	const weak = topic.weakSpots.length === 0 ? "" : `<div class="weak">
	<h3>Weak spots</h3>
	<ul>${topic.weakSpots.map((w) => `<li>${w}</li>`).join("")}</ul>
</div>`;

	return `<details class="topic" data-search="${escapeHtml(searchBlob)}">
	<summary>
		<span class="topic-main">
			<span class="topic-title">${escapeHtml(topic.title)}</span>
			${continueLink}
		</span>
		<span class="topic-meta">
			${weakBadge}
			<span class="progress" title="${topic.done} of ${topic.total}">
				<span class="bar"><span style="width:${topic.percent}%"></span></span>
				<span class="count">${topic.done}/${topic.total}</span>
			</span>
		</span>
	</summary>
	<div class="topic-body">
		<p class="summary">${topic.summaryHtml}</p>
		<ul class="sections">
${sections}
		</ul>
		${weak}
	</div>
</details>`;
}

const SCRIPT = `(() => {
	const input = document.getElementById("search");
	const countEl = document.getElementById("count");
	const emptyEl = document.getElementById("no-matches");
	const topics = [...document.querySelectorAll(".topic")];
	const total = topics.length;

	function setCount(visible) {
		if (!countEl) return;
		countEl.textContent = input.value.trim()
			? visible + " matching · " + total + " topic" + (total === 1 ? "" : "s")
			: total + " topic" + (total === 1 ? "" : "s");
	}

	function apply() {
		const q = input.value.trim().toLowerCase();
		let visible = 0;

		for (const topic of topics) {
			const hay = topic.dataset.search || "";
			const match = !q || hay.includes(q);
			topic.hidden = !match;
			if (match) visible++;

			if (q && match) topic.open = true;
			else if (!q) topic.open = false;

			for (const li of topic.querySelectorAll("[data-section]")) {
				const hit = q && li.dataset.section.includes(q);
				li.classList.toggle("hit", Boolean(hit));
			}
		}

		if (emptyEl) emptyEl.hidden = visible > 0 || total === 0;
		setCount(visible);
	}

	input?.addEventListener("input", apply);
	document.querySelectorAll("a.continue").forEach((a) => {
		a.addEventListener("click", (e) => e.stopPropagation());
	});
	setCount(total);
})();`;

const STYLE = fs.readFileSync(path.join(root, "index.css"), "utf8");

const topics = (fs.existsSync(topicsDir)
	? fs.readdirSync(topicsDir)
		.filter((name) => fs.statSync(path.join(topicsDir, name)).isDirectory())
		.map(loadTopic)
		.filter(Boolean)
	: []
).sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));

const cards = topics.map(renderTopic);

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
<header class="page-header">
	<h1>Learning Index</h1>
	<div class="toolbar">
		<label class="search">
			<span class="visually-hidden">Search topics and lessons</span>
			<input id="search" type="search" placeholder="Search topics and lessons…" autocomplete="off" />
		</label>
		<p id="count" class="lede">${topics.length} topic${topics.length === 1 ? "" : "s"}</p>
	</div>
</header>
${cards.length > 0 ? `<div class="topic-list">${cards.join("\n")}</div>` : `<p class="empty">No topics yet.</p>`}
<p id="no-matches" class="empty" hidden>No matching topics.</p>
</main>
<script>${SCRIPT}</script>
</body>
</html>
`;

fs.writeFileSync(outPath, html);
console.log(`Built → ${path.relative(root, outPath)} (${topics.length} topic${topics.length === 1 ? "" : "s"})`);
