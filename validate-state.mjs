import fs from "node:fs/promises";
import path from "node:path";

const root = import.meta.dirname;
const topicsDir = path.join(root, "topics");
const failures = [];

function headings(markdown) {
	return [...markdown.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
}

function requireHeadings(file, markdown, expected) {
	const actual = headings(markdown);
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		failures.push(
			`${file}: expected headings [${expected.join(", ")}]; found [${actual.join(", ")}]`,
		);
	}
}

function rejectConflictMarkers(file, markdown) {
	if (/^[<>=]{7}/m.test(markdown)) {
		failures.push(`${file}: contains merge conflict markers`);
	}
}

async function exists(file) {
	try {
		await fs.access(file);
		return true;
	} catch {
		return false;
	}
}

const entries = await fs.readdir(topicsDir, { withFileTypes: true });
for (const entry of entries) {
	if (!entry.isDirectory()) continue;

	const topic = path.join(topicsDir, entry.name);
	const rel = (f) => path.relative(root, f);
	const syllabusPath = path.join(topic, "syllabus.md");
	const journalPath = path.join(topic, "journal.md");
	const sourcesPath = path.join(topic, "sources.md");

	if (!(await exists(syllabusPath))) continue;

	const [syllabus, journal] = await Promise.all([
		fs.readFile(syllabusPath, "utf8"),
		fs.readFile(journalPath, "utf8"),
	]);

	requireHeadings(rel(syllabusPath), syllabus, [
		"Success Criteria",
		"Out of Scope",
		"Sections",
	]);
	requireHeadings(rel(journalPath), journal, [
		"Student Profile",
		"Established Knowledge",
		"Log",
		"Weak Spots",
	]);

	if (!(await exists(sourcesPath))) {
		failures.push(`${rel(sourcesPath)}: missing — record what you read while researching`);
	}

	if (/\b(?:quiz )?score\s*[:=]\s*\d+/i.test(journal)) {
		failures.push(`${rel(journalPath)}: contains a quiz score`);
	}

	rejectConflictMarkers(rel(syllabusPath), syllabus);
	rejectConflictMarkers(rel(journalPath), journal);
}

if (failures.length) {
	for (const f of failures) console.error(f);
	process.exitCode = 1;
} else {
	console.log("Topic state validation passed");
}
