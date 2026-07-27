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

function renderTopic(slug) {
	const syllabus = parseSyllabus(read(path.join(topicsDir, slug, "syllabus.md")));
	if (!syllabus.title) return "";

	const weakSpots = parseWeakSpots(read(path.join(topicsDir, slug, "journal.md")));
	const done = syllabus.sections.filter((s) => s.done).length;
	const total = syllabus.sections.length;
	const percent = total > 0 ? Math.round((done / total) * 100) : 0;

	const sections = syllabus.sections.map((section) => {
		const title = escapeHtml(section.title);
		const href = lessonLink(slug, section.number);
		return `<li class="${section.done ? "done" : ""}">
	<span class="box">${section.done ? "✓" : ""}</span>
	<span class="num">${section.number || ""}</span>
	<span class="text">${href ? `<a href="${href}">${title}</a>` : `<strong>${title}</strong>`}${section.outcomeHtml ? ` ${section.outcomeHtml}` : ""}</span>
</li>`;
	}).join("\n");

	const weak = weakSpots.length === 0 ? "" : `<div class="weak">
	<h3>Weak spots</h3>
	<ul>${weakSpots.map((w) => `<li>${w}</li>`).join("")}</ul>
</div>`;

	return `<article class="card">
	<h2>${escapeHtml(syllabus.title)}</h2>
	<p class="summary">${syllabus.summaryHtml}</p>
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

const STYLE = fs.readFileSync(path.join(root, "index.css"), "utf8");

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
