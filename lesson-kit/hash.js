// FNV-1a. Short, dependency-free, and identical in Node and the browser, which
// matters because the build script and the components must agree on every key.
export function fnv1a(text) {
	let h = 0x811c9dc5;
	for (const ch of text) {
		h ^= ch.codePointAt(0);
		h = Math.imul(h, 0x01000193);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
