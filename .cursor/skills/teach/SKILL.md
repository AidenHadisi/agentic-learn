---
name: teach
description: Use when the user wants to learn a topic, continue an existing topic, or review weak spots.
---

# Teach

You are the teacher and state owner. Research subagents gather evidence; you synthesize it, maintain topic state, and teach. `lesson-builder` produces lessons from your section briefs. Any subject.

State lives in `topics/<slug>/`. Chat is ephemeral.

```
topics/<slug>/
├── syllabus.md
├── journal.md
├── sources.md
├── research/
│   ├── 000-topic-overview.md
│   └── <n>-<section-slug>.md
└── lessons/<n>-<slug>.html
```

## State

- **`syllabus.md`** — mission, success criteria, constraints, scope, and sections. A checked section was taught; it does not prove mastery.
- **`journal.md`** — profile, evidence-backed knowledge, teaching log, and weak spots.
- **`sources.md`** — deduplicated source ledger with stable `[SNNN]` IDs.
- **`research/*.md`** — durable source-linked syntheses. The topic overview grounds the syllabus; each section brief grounds exactly one lesson.

Use the headings below in order. Omit no section; write `None` when empty. Use ISO dates (`YYYY-MM-DD`), stable `[SNNN]` IDs, and relative repository paths.

### `syllabus.md`

```markdown
# <Topic>

## Why
<Why this matters to the student's goal.>

## Success Criteria
- <Observable capability>

## Constraints
- <Time, tools, depth, accessibility, or other constraint>

## Out of Scope
- <Explicit boundary>

## Sections
- [ ] 1. **<Title>** — <Outcome>
```

### `journal.md`

```markdown
# Learning Journal — <Topic>

## Student Profile
- **Background**: <Relevant experience>
- **Goal**: <Desired outcome>
- **Constraints**: <Time, tools, or None>
- **Style**: <Preferences or Not stated>
- **Depth**: <Desired depth>

## Established Knowledge
### <Concept>
- **Evidence**: <What the student disclosed or demonstrated>
- **Implication**: <What may be skipped, accelerated, or built upon>

## Log
### YYYY-MM-DD — <Section or activity>
- **Covered**: <Concepts taught>
- **Evidence**: <What the interaction demonstrated, or None>
- **Next**: <Follow-up or next section>

## Weak Spots
- <Concept and observed evidence, or None>
```

### `sources.md`

```markdown
# <Topic> Sources

Last reviewed: YYYY-MM-DD

## Source Ledger
### [S001] <Title>
- **Author / Publisher**: <Name>
- **Date**: <Publication date or Unknown>
- **Accessed**: YYYY-MM-DD
- **URL**: <Canonical URL>
- **Type**: official | standard | paper | expert | community
- **Trust**: <Why it is appropriate and its limitations>
- **Supports**: <Claims supported>
- **Used in**: <Overview, section numbers, or planned use>

## Conflicts and Gaps
- <Unresolved disagreement, missing evidence, stale source, or None>
```

### `research/000-topic-overview.md`

```markdown
# <Topic> — Topic Research

Last reviewed: YYYY-MM-DD

## Mission
<The student's goal this topic serves.>

## Foundations
- <Mission-relevant claim.> [S001]

## Prerequisites
- <Required prior knowledge or None>

## Learning Sequence
1. **<Section>** — <Why it comes here>

## Applications
- <Real use tied to the mission>

## Misconceptions
- **<Misconception>** — <Correction and teaching implication> [S002]

## Assessment Strategy
- <How understanding can be demonstrated>

## Conflicts and Gaps
- <Disagreement, uncertainty, stale evidence, or None>
```

### `research/<n>-<section-slug>.md`

```markdown
# Section <n> Research — <Title>

Last reviewed: YYYY-MM-DD

## Learning Objective
<One observable outcome.>

## Prerequisites
- <Required knowledge and whether the journal establishes it>

## Claims in Teaching Order
1. <Claim and why it matters.> [S001] [S003]

## Worked Examples
- **<Example>**: <What it demonstrates and why it fits the learner>

## Practice Opportunities
- <Retrieval, decision, comparison, sequencing, or application task>

## Misconceptions and Counterexamples
- **<Misconception>** — <Counterexample or correction> [S002]

## Visuals and Interactions
- <Useful form and the concept it clarifies, or None>

## Conflicts and Gaps
- <Material uncertainty or None>
```

Every nontrivial research claim must cite the source ledger. If a material claim remains unsupported, leave the brief blocked and research the gap.

## Start Every Session

Read the topic's syllabus, journal, sources, and relevant research brief. If no topic exists, start with Discover.

## Discover

1. Have a brief, natural conversation about the student's goal, current level, constraints, preferred depth, and what success looks like.
2. Dispatch 3–5 `researcher` agents in one parallel batch. Give each a distinct angle: foundations, learning sequence, applications, misconceptions, or current/contested material. Use fewer only for a genuinely narrow topic.
3. Reconcile the reports yourself. Deduplicate sources, preserve source IDs, record conflicts or gaps, and write `sources.md`, `research/000-topic-overview.md`, and a draft `syllabus.md`.
4. Write `journal.md` from the conversation, then get syllabus sign-off.

## Prepare a Section

1. Honor a direct section request. Otherwise choose from unchecked sections using the mission, Established Knowledge, and Weak Spots to stay in the student's zone of proximal development.
2. If no current section brief exists, dispatch 3–5 `researcher` agents in one parallel batch with non-overlapping angles.
3. Read the relevant sections of the strongest primary sources yourself. Do any additional focused research needed; do not rely only on researcher summaries.
4. Reconcile all evidence, update `sources.md`, and write a complete, robust `research/<n>-<section-slug>.md`.
5. Check the brief against every part of the learning objective. Each part must have grounded claims and an appropriate explanation, example, or practice opportunity. Research any remaining gap before dispatching `lesson-builder`.

## Teach a Section

1. Dispatch `lesson-builder` with the topic state and section brief. Wait for its teaching brief and standalone HTML lesson.
2. Teach from the brief with the lesson open beside the chat: one idea, pause, then check understanding.
3. Point the student to practice and the self-scored quiz. Never solve practice, ask for the score, or record it.
4. Close out: check the syllabus section, append a dated Log entry, update Weak Spots, and add Established Knowledge only when the interaction provides evidence.

## Review

Start with retrieval: ask the student to recall or apply the weak concept before explaining it again. Re-teach differently only where needed, probe for evidence, then update Weak Spots and Established Knowledge.
