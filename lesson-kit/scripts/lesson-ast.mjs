import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

// Same remark plugins as vite.config.js, so validators see what the build renders.
// Walking the AST (not raw text) skips component names inside code fences.
const processor = createProcessor({ remarkPlugins: [remarkGfm, remarkMath] });

const JSX_NODES = new Set(["mdxJsxFlowElement", "mdxJsxTextElement"]);

function line(node) {
	return node?.position?.start?.line ?? 0;
}

function attributeExpression(node, name) {
	const attribute = node.attributes?.find(
		(a) => a.type === "mdxJsxAttribute" && a.name === name,
	);
	const value = attribute?.value;
	if (!value || typeof value === "string") return null;
	return value.value ?? null;
}

/** Evaluate a plain JSX attribute literal. Returns `{ ok, value }` or `{ ok: false, reason }`. */
export function evaluateExpression(source) {
	try {
		return { ok: true, value: new Function(`return (${source})`)() };
	} catch (err) {
		return { ok: false, reason: err.message };
	}
}

/**
 * Extract lesson structure for validation and conditional asset loading:
 * used/imported components, quizzes, refs, Sources, Mermaid charts, math, code.
 */
export function parseLesson(mdxSource) {
	const tree = processor.parse(mdxSource);

	const used = new Map();
	const imported = new Set();
	const quizzes = [];
	const refs = [];
	const mermaids = [];
	let sources = null;
	let hasMath = false;
	let hasCode = false;

	visit(tree, (node) => {
		if (node.type === "math" || node.type === "inlineMath") {
			hasMath = true;
			return;
		}

		// Fenced blocks with a language → highlight.js; plain fences stay plain.
		if (node.type === "code" && node.lang) {
			hasCode = true;
			return;
		}

		if (node.type === "mdxjsEsm") {
			for (const statement of node.data?.estree?.body ?? []) {
				if (statement.type !== "ImportDeclaration") continue;
				for (const specifier of statement.specifiers) {
					imported.add(specifier.local.name);
				}
			}
			return;
		}

		if (!JSX_NODES.has(node.type) || !node.name || !/^[A-Z]/.test(node.name)) return;

		if (!used.has(node.name)) used.set(node.name, line(node));
		if (node.name === "CodeBlock") hasCode = true;

		if (node.name === "Quiz") {
			quizzes.push({ expression: attributeExpression(node, "questions"), line: line(node) });
		} else if (node.name === "Ref") {
			refs.push({ expression: attributeExpression(node, "n"), line: line(node) });
		} else if (node.name === "Sources") {
			sources = { expression: attributeExpression(node, "list"), line: line(node) };
		} else if (node.name === "Mermaid") {
			mermaids.push({ expression: attributeExpression(node, "chart"), line: line(node) });
		}
	});

	if (imported.has("CodeBlock")) hasCode = true;

	return { used, imported, quizzes, refs, mermaids, sources, hasMath, hasCode };
}
