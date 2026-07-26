// Shared by the build script (Node) and the Mermaid component (browser).
// Both sides must derive the same key for a chart, so there is exactly one implementation.
//
// MDX re-indents multi-line template literals in JSX attributes, so the string the
// browser receives is not byte-identical to the MDX source the build script reads.
// Indentation is cosmetic in mermaid, so the hash ignores it.
export function chartHash(chart) {
	const normalized = chart.trim().split("\n").map((line) => line.trim()).join("\n");
	let h = 0x811c9dc5;
	for (const ch of normalized) {
		h ^= ch.codePointAt(0);
		h = Math.imul(h, 0x01000193);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
