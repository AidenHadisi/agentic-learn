import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

// Parse-only pipeline: the same remark plugins vite.config.js compiles with, so
// what the validators see is what the build will render. Reading the tree rather
// than the raw text means component names inside code fences and inline code are
// not mistaken for real usage.
const processor = createProcessor({ remarkPlugins: [remarkGfm, remarkMath] });

const JSX_NODES = ["mdxJsxFlowElement", "mdxJsxTextElement"];

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

/**
 * Evaluate a JSX attribute expression that is expected to be a plain literal.
 * Returns `{ ok: true, value }`, or `{ ok: false, reason }` when the expression
 * references identifiers or embeds JSX and so cannot be checked statically.
 */
export function evaluateExpression(source) {
	try {
		return { ok: true, value: new Function(`return (${source})`)() };
	} catch (err) {
		return { ok: false, reason: err.message };
	}
}

/**
 * Read a lesson's structure once: which components it uses and imports, where
 * its quizzes, citations and bibliography are, and whether it contains math.
 */
export function parseLesson(mdxSource) {
	const tree = processor.parse(mdxSource);

	const used = new Map();
	const imported = new Set();
	const quizzes = [];
	const refs = [];
	let sources = null;
	let hasMath = false;

	visit(tree, (node) => {
		if (node.type === "math" || node.type === "inlineMath") {
			hasMath = true;
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

		if (!JSX_NODES.includes(node.type) || !node.name) return;
		if (!/^[A-Z]/.test(node.name)) return;

		if (!used.has(node.name)) used.set(node.name, line(node));

		if (node.name === "Quiz") {
			quizzes.push({ expression: attributeExpression(node, "questions"), line: line(node) });
		} else if (node.name === "Ref") {
			refs.push({ expression: attributeExpression(node, "n"), line: line(node) });
		} else if (node.name === "Sources") {
			sources = { expression: attributeExpression(node, "list"), line: line(node) };
		}
	});

	return { used, imported, quizzes, refs, sources, hasMath };
}
