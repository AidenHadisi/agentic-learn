# File formats

Exact structure for every artifact. Follow these so all topics look identical regardless of which agent or model wrote them. Templates in `assets/` are the canonical starting points; this file defines the sections those templates must keep.

## Topic directory

```
topics/<topic-slug>/
├── syllabus.md
├── progress.md
├── glossary.md
├── flashcards.md
├── notes/NN-unit-slug.md
├── lectures/NN-unit-slug.md
├── quizzes/NN-unit-slug.md
└── projects/NN-slug/BRIEF.md (+ student code)
```

`NN` is the two-digit unit number from the syllabus. Slugs are kebab-case.

## syllabus.md

```markdown
# <Topic> — Syllabus

**Goal:** <student's end goal, one sentence>
**Level at start:** <beginner/intermediate/...>
**Session budget:** <e.g. 45 min>

## Units

| # | Unit | Prerequisites | Status |
| --- | --- | --- | --- |
| 01 | <unit name> | — | not started |
| 02 | <unit name> | 01 | in progress |
```

Status values: `not started` → `in progress` → `taught` → `mastered` (criteria in assessment.md).

## progress.md

The agent's memory. Keep it current and honest.

```markdown
# Progress — <Topic>

**Active unit:** 02
**Last session:** 2026-06-10

## Mastery
- [x] Unit 01: <name> — mastered 2026-06-08 (quizzes 9/10, 8.5/10)
- [~] Unit 02: <name> — taught; exercise attempt shaky on <specific thing>

## Misconceptions observed
- <date> Confused X with Y — corrected via <modality>; re-test next session
- <date> ~~Believed Z~~ — re-tested <date>, resolved

## Preferences learned
- Prefers code-first explanations in Go
- Diagrams land better than prose for structures
```

Strike through resolved misconceptions; never delete them.

## glossary.md

One table, alphabetical, term added the session it's introduced:

```markdown
| Term | Definition | Unit |
| --- | --- | --- |
| <term> | <one-to-two sentence definition> | 02 |
```

## flashcards.md

```markdown
## Card: <short id or question slug>
- **Q:** <question>
- **A:** <answer>
- **unit:** 02
- **last-reviewed:** 2026-06-10
- **interval-days:** 4
```

Review/update rules in pedagogy.md.

## notes/NN-unit-slug.md

Written *during* the lesson, finalized at session end:

```markdown
# Unit NN: <name> — Notes

## Key ideas
<the actual teaching content, distilled — this is the student's reference>

## Questions asked
- Q: <student question> → A: <short answer>

## Exercise
<the exercise, the student's approach, feedback given>

## Open threads
- <anything deferred to next session>
```

## lectures/NN-unit-slug.md

Prepared material for a unit (use `assets/lecture-template.md`). Sections: Objectives, Prior knowledge check, Content (in chunks, each ending with its check-question), Exercise, Further reading.

## quizzes/NN-unit-slug.md

Use `assets/quiz-template.md`. The agent writes Questions + empty Answers; the student fills Answers; the agent appends Graded Attempt. Multiple attempts append multiple Graded Attempt sections — never overwrite. **No answer keys anywhere in the file.**

## projects/NN-slug/BRIEF.md

Use `assets/project-template.md`. Sections: Goal, Constraints, Acceptance criteria (checkboxes), Hints (collapsed, escalating), Review log. Student code lives beside the brief; the agent reviews in Review log, never writes the solution.
