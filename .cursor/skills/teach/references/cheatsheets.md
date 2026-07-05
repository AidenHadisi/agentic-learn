# Cheatsheets

One cheatsheet per **completed** chapter: a dense single-page reference distilled from the chapter's lectures. Its job is fast pre-quiz and pre-exam review — everything worth re-reading in five minutes, nothing else.

## Files

- `topics/<slug>/cheatsheets/<chapter>-<slug>.md` — the canonical version.
- `topics/<slug>/cheatsheets/<chapter>-<slug>.html` — the polished twin, assembled per the [HTML style guide](html-style.md), content-identical.

Frontmatter per the schema in [lectures.md](lectures.md), with `chapter` instead of `section` and `type: cheatsheet`.

## Content

Distill, don't summarize prose. Pull from the chapter's lectures:

- **Key facts** — definitions, signatures, invariants the student must know cold.
- **Patterns** — the canonical code snippets and idioms, trimmed to their skeleton.
- **Pitfalls** — the chapter's gotchas and the misconceptions this student actually hit (check `misconceptions.md`).

Use compact forms: tables for comparisons, tight code blocks, short bullet fragments. Full sentences only where precision demands them.

## Density Bar

A single page. If it doesn't fit, cut — keep what the student will get quizzed on and what they personally struggled with, drop what they demonstrably know. A cheatsheet that re-teaches is a failed cheatsheet; it assumes the lectures were read.

## Anti-Patterns

- Writing it before the chapter is complete — it distills all of the chapter's lectures.
- Prose paragraphs; explanations of *why* — that's the lecture's job.
- Copying lecture sections wholesale instead of distilling.
- Generic content that ignores this student's recorded weak spots.
- Padding past one page.
