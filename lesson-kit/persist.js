import { useCallback, useRef, useState } from "react";
import { fnv1a } from "./hash.js";

// Injected by vite.config.js from the lesson's source path. Every lesson opens
// as a file:// page and browsers give them all one storage origin, so the lesson
// has to be part of the key or two lessons would overwrite each other's work.
const LESSON = typeof __LESSON_ID__ === "string" ? __LESSON_ID__ : "lesson";

// Safari refuses localStorage on file:// and any browser can be in a mode that
// throws on write. Saving progress is a convenience, so failing to save is not
// worth breaking a lesson over.
function readStored(key) {
	try {
		const raw = window.localStorage.getItem(key);
		return raw === null ? undefined : JSON.parse(raw);
	} catch {
		return undefined;
	}
}

function writeStored(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage unavailable or full — the component keeps working in memory.
	}
}

/** Flatten a prop that may be a string or a JSX tree down to its visible text. */
function textOf(node) {
	if (node == null || typeof node === "boolean") return "";
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(textOf).join("");
	return textOf(node.props?.children);
}

/**
 * Build a storage key that is stable across reloads and distinct per component
 * instance. `parts` should be content the author wrote (question text, card
 * fronts), so reordering two decks in a lesson doesn't swap their saved state,
 * and editing one starts the student fresh on the new version.
 */
export function contentKey(prefix, parts) {
	return `learn:${LESSON}:${prefix}:${fnv1a(parts.map(textOf).join("\u0000"))}`;
}

/**
 * `useState`, but the value survives a reload. `createInitial` is called only
 * when nothing is stored yet, so a freshly shuffled deck is generated once and
 * then reused rather than re-randomised on every visit.
 */
export function usePersistentState(key, createInitial) {
	const initialRef = useRef(createInitial);
	const [value, setValue] = useState(() => readStored(key) ?? initialRef.current());

	const update = useCallback((next) => {
		setValue((current) => {
			const resolved = typeof next === "function" ? next(current) : next;
			writeStored(key, resolved);
			return resolved;
		});
	}, [key]);

	const reset = useCallback(() => {
		try {
			window.localStorage.removeItem(key);
		} catch {
			// Nothing was stored; resetting in-memory state is enough.
		}
		setValue(initialRef.current());
	}, [key]);

	return [value, update, reset];
}
