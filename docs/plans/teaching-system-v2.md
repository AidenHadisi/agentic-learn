# Plan: Teaching System v2

## Goal

The current teach skill is a single-agent, markdown-only loop: one context writes lectures, teaches, quizzes, and grades, so assessment is biased by the teaching conversation, lectures are limited to training data with no sources, there is no retention mechanism, and nothing is visual or interactive. Upgrade the system so specialized subagents do the labor, all material is researched and cited, retention is engineered (spaced repetition, cumulative exams, misconception tracking), and every artifact is beautiful — with interactive HTML that lives in the repo and works in any browser, outside Cursor.

Requirements:
- Five custom subagents in `.cursor/agents/`: `researcher`, `lecture-writer`, `lecture-reviewer`, `quiz-master`, `interactive-builder`.
- Every lecture is researched first; sources are recorded in a per-topic `sources.md` ledger and cited inline plus in a References section in both the markdown and HTML versions.
- Every lecture ships in two forms: canonical markdown and a polished standalone HTML version.
- Quizzes and chapter exams are written and graded by `quiz-master` from fresh context (lecture + syllabus only, never the chat) and are taken in markdown: the student fills answers into the quiz file, the answer key lives in a separate file, and grading appends a results section; HTML quizzes are optional extra practice.
- Spaced-repetition flashcards per topic (Leitner boxes) with a new **Drill** activity run in chat; a standalone HTML deck viewer for passive review.
- A misconception log per topic that Review sessions target and re-test.
- Coding exercises as runnable projects under the topic, reviewed against a rubric.
- Per-chapter cheatsheets — a dense one-pager for pre-quiz review.
- All HTML artifacts are single self-contained files (inline CSS/JS, no CDN, no build step, works from `file://`), sharing one visual language defined in a style guide.
- A `templates/html/` foundation agents inline at generation time: a `base.html` design-system template, dependency-free component snippets (quiz engine, flashcard flip, stepper), and vendored single-file runtime libraries (Chart.js, highlight.js, mermaid) so charts, code highlighting, and diagrams never depend on the network or hand-rolling.
- A root `dashboard.html` regenerated after each session showing cross-topic progress, quiz scores, and weak spots.
- Machine-readable YAML frontmatter on lectures, quizzes, notes, and cheatsheets.

## Out of scope

- Scheduled automations and auto-commit — explicitly deferred by the user.
- Cursor canvases — rejected; everything must live in the repo and open outside Cursor.
- Any server, build toolchain, or npm dependency for the HTML artifacts.
- Migrating existing topics — `topics/` is empty today.

## Approach

The teach skill stays the orchestrator and gains dispatch instructions; five subagents own research, writing, review, assessment, and interactive artifacts. All durable state remains markdown/JSON-in-frontmatter under `topics/<slug>/`; HTML is a presentation layer regenerated from that state. New reference guides carry the quality bars so every subagent produces consistent output.

Repo additions outside topics:

```
templates/html/
├── base.html           # design-system skeleton: inline CSS tokens, light/dark, slots
├── components.js       # quiz engine, flashcard flip, stepper, tabs — no dependencies
└── vendor/             # single-file UMD builds: chart.umd.min.js, highlight.min.js (+ theme css), mermaid.min.js
```

Topic layout v2:

```
topics/<slug>/
├── syllabus.md
├── progress.md
├── sources.md          # research ledger, cited by lectures
├── misconceptions.md   # wrong answers + confusions, open/resolved
├── lectures/           # <ch>-<sec>-<slug>.md + .html
├── tutorials/          # optional interactive HTML companions
├── notes/              # session records
├── cheatsheets/        # one per chapter, md + html
├── quizzes/            # quiz records (md) + optional practice html
├── exams/              # cumulative chapter exams
├── exercises/          # runnable coding projects
└── flashcards/
    ├── deck.md         # cards + Leitner scheduling state
    └── index.html      # standalone viewer, deck embedded
```

## Conventions

- This repo is documentation + static HTML only: no package.json, no build step, no test framework.
- Skill guides live in `.cursor/skills/teach/references/`, one concern per file, linked from `SKILL.md` with relative links.
- Guides are written as instructions to a future agent: imperative, concise, with explicit anti-pattern lists (see existing `quizzes.md`).
- Subagent definitions follow the established local format: YAML frontmatter (`name`, `description` ending in a "Use when…" trigger, `model`, `readonly`), body structured as role statement → Responsibilities/Method → fixed Report template (mirror `~/.cursor/agents/*.md`).
- Topic file naming: `<chapter>-<section>-<slug>` (e.g. `2-1-goroutines.md`).
- HTML artifacts: one self-contained file, inline CSS/JS, no external requests, `prefers-color-scheme` aware.
- HTML is assembled by inlining from `templates/html/` — never write styles or interaction logic from scratch; vendor libraries are inlined only into artifacts that use them (network is allowed once, to vendor a library into the repo, never at view time).

## Contracts

- **Frontmatter schema** (lectures, quizzes, exams, notes, cheatsheets): `topic`, `section` (or `chapter` for chapter-scoped files), `type` (`lecture|quiz|exam|notes|cheatsheet`), `date`, plus `score: "8/10"` on graded records.
- **Researcher report** (consumed by lecture-writer): appends to `sources.md` entries of the form `[S<n>] Title — Publisher/Author, URL, accessed <date>` followed by a one-line note of what claims it supports; returns the new `[S<n>]` ids and key findings.
- **Citation format** (lecture-writer, lecture-reviewer): inline `[S3]` markers at the point of use; a `## References` section at the bottom of both `.md` and `.html` listing every cited source; no uncited nontrivial factual claims.
- **Deck card schema** (`flashcards/deck.md`): one card per `### Card <n>` block with `Q:`, `A:`, `Section:`, `Box: 1-5`, `Due: <date>`; Leitner intervals 1/3/7/14/30 days, wrong answer returns the card to box 1.
- **Quiz-master grading report** (consumed by orchestrator): score, per-question verdict with explanation, and a `Gaps:` list the orchestrator copies into `misconceptions.md` and `progress.md`.

## Changes

### Task 1 — Reference guides   (depends on: none)

The quality bars and formats every agent works from — the HTML template foundation, new guides, and upgrades to the existing ones.

**Done when:** every guide referenced by Tasks 2–3 exists, the four contracts above appear verbatim in the guide that owns them, and `base.html` opens standalone in a browser rendering every component class in both light and dark.

**1.1 — Build the HTML template foundation.**
`templates/html/base.html` · create
`templates/html/components.js` · create
`templates/html/vendor/` · create

- `base.html`: full design system as inline CSS — custom properties for color/spacing tokens, system font stack, readable measure (~70ch), light/dark via `prefers-color-scheme`, one accent color, typography, semantic component classes (`.callout`, `.card`, `.quiz-option`, tables, code blocks) — with `<!-- TITLE -->` / `<!-- CONTENT -->` slots. No gradients, no emoji decoration, no shadows.
- `components.js`: dependency-free snippets, each independently copyable — quiz engine (select → instant feedback → explanation reveal → score summary), flashcard flip + due/box filtering, tutorial stepper, tabs, collapsible sections.
- `vendor/`: download single-file UMD builds — `chart.umd.min.js` (Chart.js), `highlight.min.js` + one theme CSS, `mermaid.min.js` — recording each version in a `vendor/VERSIONS.md`.

**1.2 — Write the HTML style guide.**
`.cursor/skills/teach/references/html-style.md` · create

- The shared visual language and assembly rules: every artifact starts from `base.html` and inlines the component snippets it needs; never write styles or interaction logic from scratch; vendor libraries are inlined into a `<script>`/`<style>` block only when used.
- Chart rule: static charts are hand-written inline SVG; inline Chart.js only when interaction teaches something (exploring data, toggling series).
- Structural requirements per artifact type: lectures (sticky table of contents, highlighted code, callouts, References section), quizzes (one question at a time, instant feedback, explanation reveal, score summary), flashcard viewer (flip interaction, filter by due/box), tutorials (stepper or animation controls), dashboard (per-topic completion bars, score history, weak-spot list).

**1.3 — Write the research and citations guide.**
`.cursor/skills/teach/references/research.md` · create

- The `sources.md` ledger format, the `[S<n>]` citation contract, source-quality bar (prefer official docs, papers, recognized authors; record access dates), and when research is required (every lecture; fast-moving topics get recency checks).

**1.4 — Write the flashcards and spaced-repetition guide.**
`.cursor/skills/teach/references/flashcards.md` · create

- The deck card schema and Leitner scheduling rules from `## Contracts`; how to write good cards (atomic, one fact each, prompt recall not recognition); the Drill flow: agent presents due cards in chat, student answers, agent grades and updates `Box`/`Due`; the HTML viewer is passive review only and never mutates state.

**1.5 — Write the exercises guide.**
`.cursor/skills/teach/references/exercises.md` · create

- Runnable projects under `topics/<slug>/exercises/<ch>-<sec>-<slug>/` with a `README.md` (goal, requirements, rubric) and starter scaffold; the student solves it themselves; grading is a rubric-based review that produces feedback, never a solution.

**1.6 — Write the cheatsheets guide.**
`.cursor/skills/teach/references/cheatsheets.md` · create

- One per completed chapter: dense single-page reference distilled from the chapter's lectures — key facts, patterns, pitfalls; md + html per the style guide.

**1.7 — Upgrade the lecture guide with citations, structure, and the HTML version.**
`.cursor/skills/teach/references/lectures.md` · edit

- Add: required frontmatter; citation contract (link to research.md); required elements — worked examples, analogies keyed to the student profile, a mermaid diagram wherever structure/flow appears, a "Key takeaways" callout, exercises at the end; the companion `.html` per html-style.md, content-identical to the markdown.

**1.8 — Upgrade the quiz guide for fresh-context authorship, fill-in markdown delivery, and chapter exams.**
`.cursor/skills/teach/references/quizzes.md` · edit

- Add: quizzes are written and graded by `quiz-master` from lecture + syllabus only; two files per quiz — `<name>.md` with questions and an `Answer:` blank under each (no key inside), and `<name>-key.md` with correct letters + explanations; the student fills in the quiz file and says "done"; grading compares against the key and appends a `## Results` section (score, per-question verdict + explanation) to the quiz file; the grading report contract; chapter exams as cumulative 12–20 question versions written to `exams/` with the same two-file flow; optional self-contained practice HTML after the graded run; keep all existing anti-pattern rules.

**1.9 — Add the misconception log format and richer observation guidance to the progress template.**
`.cursor/skills/teach/references/progress-template.md` · edit
`.cursor/skills/teach/references/misconceptions-template.md` · create

- Misconceptions: a table — date, section, what the student got wrong, evidence, status (`open|resolved`), resolution date. Progress gains a quiz/exam score history table.

**1.10 — Update the notes guide for frontmatter.**
`.cursor/skills/teach/references/notes.md` · edit

### Task 2 — Subagents   (depends on: Task 1)

Five custom agents in `.cursor/agents/`, each pointing at the guides that define its quality bar.

**Done when:** all five files exist, follow the local frontmatter/body conventions, and each one names its input contract, the exact files it reads and writes, and a fixed report template.

**2.1 — Create `researcher`.**
`.cursor/agents/researcher.md` · create

- Web-searches the section's subject, appends vetted sources to `sources.md` per research.md, reports new `[S<n>]` ids + key findings. `readonly: false` (writes only `sources.md`).

**2.2 — Create `lecture-writer`.**
`.cursor/agents/lecture-writer.md` · create

- Input: topic slug + section. Reads syllabus, progress (student profile), `sources.md`, lectures.md and html-style.md guides; writes the `.md` lecture and its `.html` twin assembled from `templates/html/` with citations; reports paths + summary. Designed to be dispatched in the background while the current section is being taught.

**2.3 — Create `lecture-reviewer`.**
`.cursor/agents/lecture-reviewer.md` · create

- `readonly: true`. Fact-checks claims against the cited sources, verifies citation coverage and md/html content parity, checks the style guide. Verdict: PASS / CHANGES_REQUESTED with itemized fixes.

**2.4 — Create `quiz-master`.**
`.cursor/agents/quiz-master.md` · create

- Two modes: **author** (write the quiz/exam file + key file from lecture + syllabus only) and **grade** (read the filled-in quiz and the key, append `## Results`, produce the grading report per the contract). Never sees the teaching chat.

**2.5 — Create `interactive-builder`.**
`.cursor/agents/interactive-builder.md` · create

- Owns all non-lecture HTML: tutorials, practice-quiz HTML, `flashcards/index.html` (embeds current deck state), and root `dashboard.html` (reads every topic's progress/misconceptions/scores and regenerates). Assembles everything from `templates/html/` per html-style.md, inlining vendor libraries only where used.

### Task 3 — Skill orchestration   (depends on: Tasks 1–2)

Rewire `SKILL.md` so the main agent orchestrates subagents and the new activities.

**Done when:** SKILL.md maps every activity to who does the work, links every new guide, shows the topic layout v2, and a fresh agent could run a full section cycle from it alone.

**3.1 — Rewrite SKILL.md activities and dispatch rules.**
`.cursor/skills/teach/SKILL.md` · edit

- Prepare becomes: dispatch `researcher` → `lecture-writer` → `lecture-reviewer` (loop on CHANGES_REQUESTED), in the background while teaching continues.
- Assess becomes: dispatch `quiz-master` (author) to write the quiz + key files, point the student at the quiz file to fill in, wait for "done", dispatch `quiz-master` (grade) to append Results, then record score + gaps into progress/misconceptions and add flashcards for missed concepts.
- New activities: **Drill** (due flashcards in chat per flashcards.md), **Exam** (cumulative at chapter completion, then cheatsheet generation), and Review now driven by open entries in `misconceptions.md` which get re-tested and marked resolved.
- End-of-session step: update progress/notes, dispatch `interactive-builder` to refresh the flashcard viewer and dashboard.

**3.2 — Update the syllabus template for chapter exams.**
`.cursor/skills/teach/references/syllabus-template.md` · edit

- Each chapter ends with an exam checkbox row.

### Task 4 — Repo docs and dashboard seed   (depends on: Task 3)

**Done when:** README and AGENTS.md describe the v2 layout and workflow, and a valid empty-state dashboard exists.

**4.1 — Update README.md and AGENTS.md.**
`README.md` · edit
`AGENTS.md` · edit

- New layout tree, the subagent roster, new common requests ("drill me", "chapter exam", "show my dashboard").

**4.2 — Seed the root dashboard.**
`dashboard.html` · create

- Self-contained per html-style.md; with no topics yet it renders a minimal "no topics yet — say 'I want to learn X'" state (the one permitted empty state, since the file must exist for the regeneration contract).

## Tests

No automated tests — this repo is markdown and static HTML with no toolchain, and adding one contradicts the zero-dependency requirement.

### Not tested
- Guide/agent prose — verified by review and the live test below.
- HTML artifacts — verified by opening in a real browser during live test.

## Verification

- Every file listed above exists; all SKILL.md relative links resolve (`grep` the link targets).
- Subagent frontmatter parses and matches the local convention (name/description/model/readonly).
- `base.html` and `dashboard.html` open correctly from `file://` in a browser with no console errors and no network requests; `templates/html/vendor/` contains the three libraries with versions recorded.
- Live test: run one full cycle on a small sample topic — Discover → Plan → Prepare (researcher + lecture-writer + reviewer) → verify citations in md + html → fill-in markdown quiz graded from its key → flashcards created → Drill → dashboard regenerated — then remove the sample topic.
