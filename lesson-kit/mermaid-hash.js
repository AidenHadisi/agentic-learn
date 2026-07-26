// Shared by the build script (Node) and the Mermaid component (browser).
// Both sides must derive the same key for a chart, so there is exactly one implementation.
//
// MDX re-indents multi-line template literals in JSX attributes, so the string the
// browser receives is not byte-identical to the MDX source the build script reads.
// Indentation is cosmetic in mermaid, so the hash ignores it.
import { fnv1a } from "./hash.js";

export function chartHash(chart) {
	return fnv1a(chart.trim().split("\n").map((line) => line.trim()).join("\n"));
}
