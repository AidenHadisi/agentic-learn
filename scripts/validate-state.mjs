import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const topicsDirectory = path.join(root, "topics");
const failures = [];

function headings(markdown) {
  return [...markdown.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
}

function requireHeadings(filename, markdown, expected) {
  const actual = headings(markdown);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(
      `${filename}: expected headings "${expected.join(", ")}"; found "${actual.join(", ")}"`,
    );
  }
}

const topicEntries = await fs.readdir(topicsDirectory, { withFileTypes: true });
for (const topicEntry of topicEntries.filter((entry) => entry.isDirectory())) {
  const topic = path.join(topicsDirectory, topicEntry.name);
  try {
    await fs.access(path.join(topic, "syllabus.md"));
  } catch {
    continue;
  }
  const relative = (filename) => path.relative(root, filename);
  const read = (name) => fs.readFile(path.join(topic, name), "utf8");
  const [syllabus, journal, sources] = await Promise.all([
    read("syllabus.md"),
    read("journal.md"),
    read("sources.md"),
  ]);

  requireHeadings(relative(path.join(topic, "syllabus.md")), syllabus, [
    "Why",
    "Success Criteria",
    "Constraints",
    "Out of Scope",
    "Sections",
  ]);
  requireHeadings(relative(path.join(topic, "journal.md")), journal, [
    "Student Profile",
    "Established Knowledge",
    "Log",
    "Weak Spots",
  ]);
  requireHeadings(relative(path.join(topic, "sources.md")), sources, [
    "Source Ledger",
    "Conflicts and Gaps",
  ]);

  if (/\b(?:quiz )?score\s*[:=]\s*\d+/i.test(journal)) {
    failures.push(`${relative(path.join(topic, "journal.md"))}: contains a quiz score`);
  }

  const sourceEntries = [...sources.matchAll(/^### \[(S\d{3})\] (.+)$/gm)];
  const sourceIds = new Set(sourceEntries.map((entry) => entry[1]));
  const sourceUrls = new Map(
    [...sources.matchAll(
      /^### \[(S\d{3})\][\s\S]*?^- \*\*URL\*\*: (.+)$/gm,
    )].map((entry) => [entry[1], entry[2]]),
  );
  if (!sourceEntries.length) {
    failures.push(`${relative(path.join(topic, "sources.md"))}: empty source ledger`);
  }
  const urls = [...sources.matchAll(/^- \*\*URL\*\*: (.+)$/gm)].map((match) => match[1]);
  if (new Set(urls).size !== urls.length) {
    failures.push(`${relative(path.join(topic, "sources.md"))}: duplicate canonical URL`);
  }
  const requiredSourceFields = [
    "Author / Publisher",
    "Date",
    "Accessed",
    "URL",
    "Type",
    "Trust",
    "Supports",
    "Used in",
  ];
  for (const field of requiredSourceFields) {
    const count = [...sources.matchAll(new RegExp(`^- \\*\\*${field}\\*\\*:`, "gm"))].length;
    if (count !== sourceEntries.length) {
      failures.push(
        `${relative(path.join(topic, "sources.md"))}: ${field} appears ${count} times for ${sourceEntries.length} sources`,
      );
    }
  }

  const researchDirectory = path.join(topic, "research");
  const researchFiles = (await fs.readdir(researchDirectory))
    .filter((name) => name.endsWith(".md"))
    .sort();
  for (const name of researchFiles) {
    const filename = path.join(researchDirectory, name);
    const markdown = await fs.readFile(filename, "utf8");
    const expected = name.startsWith("000-")
      ? [
          "Mission",
          "Foundations",
          "Prerequisites",
          "Learning Sequence",
          "Applications",
          "Misconceptions",
          "Assessment Strategy",
          "Conflicts and Gaps",
        ]
      : [
          "Learning Objective",
          "Prerequisites",
          "Claims in Teaching Order",
          "Worked Examples",
          "Practice Opportunities",
          "Misconceptions and Counterexamples",
          "Visuals and Interactions",
          "Conflicts and Gaps",
        ];
    requireHeadings(relative(filename), markdown, expected);

    for (const citation of markdown.matchAll(/\[(S\d{3})\]/g)) {
      if (!sourceIds.has(citation[1])) {
        failures.push(`${relative(filename)}: unknown source ${citation[1]}`);
      }
    }
  }

  const lessonsDirectory = path.join(topic, "lessons");
  const lessonFiles = (await fs.readdir(lessonsDirectory))
    .filter((name) => name.endsWith(".html"));
  for (const name of lessonFiles) {
    const filename = path.join(lessonsDirectory, name);
    const html = await fs.readFile(filename, "utf8");
    for (const citation of html.matchAll(
      /<a class="cite" href="([^"]+)">\[(S\d{3})\]<\/a>/g,
    )) {
      const [, url, id] = citation;
      if (!sourceIds.has(id)) {
        failures.push(`${relative(filename)}: unknown source ${id}`);
      } else if (sourceUrls.get(id) !== url) {
        failures.push(
          `${relative(filename)}: ${id} links to ${url}, expected ${sourceUrls.get(id)}`,
        );
      }
    }
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log("Topic state validation passed");
}
