# Research and Citations

Every lecture is researched before it is written. Research findings live in a per-topic ledger, and every nontrivial factual claim in teaching material traces back to it. Never teach from training data alone.

## The `sources.md` Ledger

Each topic has one `topics/<slug>/sources.md`, appended to by the `researcher` agent and cited by every lecture. Entries have the form:

```markdown
[S<n>] Title — Publisher/Author, URL, accessed <date>
One-line note of what claims it supports.
```

- Ids are sequential across the whole topic: `[S1]`, `[S2]`, … Never renumber or reuse an id — lectures already cite them.
- The one-line note says what the source is used for, so a later agent can judge whether it covers a new claim or fresh research is needed.

## Researcher Report

**Researcher report** (consumed by lecture-writer): appends to `sources.md` entries of the form `[S<n>] Title — Publisher/Author, URL, accessed <date>` followed by a one-line note of what claims it supports; returns the new `[S<n>]` ids and key findings.

## Citation Format

**Citation format** (lecture-writer, lecture-reviewer): inline `[S3]` markers at the point of use; a `## References` section at the bottom of both `.md` and `.html` listing every cited source; no uncited nontrivial factual claims.

- Place markers right after the claim they support.
- The References section lists every cited source (id, title, URL).
- Nontrivial claims include definitions, version-specific behavior, performance numbers, historical facts, and API semantics. Universally known trivia and the lecture's own worked examples need no citation.

## Source Quality Bar

- Prefer, in order: official documentation and specs; peer-reviewed papers; books and posts by recognized domain authors; well-maintained project wikis.
- Avoid content farms, SEO listicles, and unattributed tutorials. A Stack Overflow answer is acceptable only for a narrow practical detail, and note that in the ledger line.
- Always record the access date — sources rot.

## When Research Is Required

- **Every lecture.** Before a lecture is written, the researcher runs for that section and the lecture cites what it found.
- **Fast-moving topics get recency checks.** For tooling, frameworks, cloud services, and language releases, verify claims against sources from the last year or two; prefer the current stable version's docs and say which version the lecture describes.
- Reuse existing ledger entries when they already cover the section's claims — research fills gaps, it doesn't duplicate.

## Anti-Patterns

- Writing the lecture first and back-filling citations after.
- Citing a source you didn't actually read for the claim it supposedly supports.
- Dumping ten generic links no lecture will cite — every entry should support specific claims.
- Renumbering ids when cleaning up the ledger.
- Omitting access dates or the one-line supports note.
