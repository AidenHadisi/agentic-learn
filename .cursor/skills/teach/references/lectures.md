# How to Write a Lecture

A lecture is the prepared teaching material for one syllabus section. It should work both as something to teach from and as a standalone reference the student can revisit. Every lecture ships in two forms: canonical markdown and a polished standalone HTML twin.

## Frontmatter

**Frontmatter schema** (lectures, quizzes, exams, notes, cheatsheets): `topic`, `section` (or `chapter` for chapter-scoped files), `type` (`lecture|quiz|exam|notes|cheatsheet`), `date`, plus `score: "8/10"` on graded records.

For a lecture:

```yaml
---
topic: <slug>
section: <chapter>.<section>
type: lecture
date: <YYYY-MM-DD>
---
```

## Citations

Lectures are written from research, never from training data alone. Follow the citation contract in [research.md](research.md): inline `[S<n>]` markers at the point of use, a `## References` section at the bottom of both the `.md` and `.html` versions listing every cited source, and no uncited nontrivial factual claims. The ids come from the topic's `sources.md` ledger.

## Required Elements

Every lecture includes:

- **Worked examples** — concrete, stepped-through, not just final code.
- **Analogies keyed to the student profile** — read the profile in `progress.md` and anchor new concepts to what this student already knows.
- **A mermaid diagram wherever structure or flow appears** — architectures, state machines, data flow, lifecycles. If the section has structure, draw it.
- **A "Key takeaways" callout** — the handful of things the student must retain, near the end.
- **Exercises at the end** — for the student to attempt during teaching.
- **A `## References` section** — per the citation contract.

## Quality Bar

Write it like a polished textbook chapter: thorough — cover edge cases, common mistakes, and nuances — clear, and visually easy to read. Use the full power of markdown when it helps:

- Headers and sub-headers to organize ideas
- Code blocks with syntax highlighting
- Tables for comparisons and structured data
- LaTeX math (`$inline$` and `$$block$$`) when formulas matter
- Blockquotes for callouts and key takeaways
- Diagrams (mermaid) when structure or flow needs visualization
- Lists when enumerating steps or properties
- Bold/italic for emphasis on key terms

Do not follow a rigid template. Let the content decide the structure. Algorithms may need code and diagrams; theory may need prose and math.

## The HTML Twin

Alongside `lectures/<ch>-<sec>-<slug>.md`, produce `lectures/<ch>-<sec>-<slug>.html`, assembled per the [HTML style guide](html-style.md): sticky table of contents, highlighted code, callouts, rendered mermaid diagrams, and the References section. The HTML is **content-identical** to the markdown — same claims, same examples, same citations; only the presentation differs.

## Length

Match the complexity. A simple concept might be a page. A dense concept might be several pages with multiple examples. Don't pad, don't rush. Be as long as it needs to be to teach the topic properly.
