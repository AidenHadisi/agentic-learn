import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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

const entries = await fs.readdir(topicsDir, { withFileTypes: true });
for (const entry of entries.filter((e) => e.isDirectory())) {
	const topic = path.join(topicsDir, entry.name);
	const rel = (f) => path.relative(root, f);

	const syllabusPath = path.join(topic, "syllabus.md");
	const journalPath = path.join(topic, "journal.md");

	try {
		await fs.access(syllabusPath);
	} catch {
		continue;
	}

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

	if (/\b(?:quiz )?score\s*[:=]\s*\d+/i.test(journal)) {
		failures.push(`${rel(journalPath)}: contains a quiz score`);
	}

	if (/^[<>=]{7}/m.test(syllabus)) {
		failures.push(`${rel(syllabusPath)}: contains merge conflict markers`);
	}
	if (/^[<>=]{7}/m.test(journal)) {
		failures.push(`${rel(journalPath)}: contains merge conflict markers`);
	}
}

if (failures.length) {
	failures.forEach((f) => console.error(f));
	process.exitCode = 1;
} else {
	console.log("Topic state validation passed");
}
